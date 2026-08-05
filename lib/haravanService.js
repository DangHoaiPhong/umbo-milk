import { detectCategory } from "@/lib/detectCategory";

const HARAVAN_API_URL = process.env.HARAVAN_API_URL;
const HARAVAN_TOKEN = process.env.HARAVAN_TOKEN;

const HEADERS = {
  Authorization: `Bearer ${HARAVAN_TOKEN}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

// ─── Fetch helpers ────────────────────────────────────────────────────────────
async function haravanGet(path) {
  const base = HARAVAN_API_URL.replace(/\/products\.json.*$/, "");
  const res = await fetch(`${base}${path}`, { headers: HEADERS, cache: "no-store" });
  if (!res.ok) throw new Error(`Haravan ${path} → ${res.status} ${res.statusText}`);
  return res.json();
}

// ─── Locations ────────────────────────────────────────────────────────────────
/** @returns {Promise<Array<{id:number, name:string}>>} */
export async function fetchLocations() {
  try {
    const data = await haravanGet("/locations.json");
    return (data.locations ?? []).map((l) => ({ id: l.id, name: l.name }));
  } catch (err) {
    console.error("[haravanService] fetchLocations failed:", err.message);
    return [];
  }
}

// ─── Inventory levels cho 1 inventory_item_id ────────────────────────────────
/**
 * @param {number[]} inventoryItemIds
 * @returns {Promise<Map<number, Array<{locationId:number, quantity:number}>>>}
 *   Map: inventoryItemId → [{locationId, quantity}]
 */
async function fetchInventoryLevels(inventoryItemIds) {
  const result = new Map();
  if (!inventoryItemIds.length) return result;

  try {
    // Haravan hỗ trợ query nhiều ids cùng lúc (tối đa 50)
    const chunks = [];
    for (let i = 0; i < inventoryItemIds.length; i += 50)
      chunks.push(inventoryItemIds.slice(i, i + 50));

    await Promise.all(
      chunks.map(async (chunk) => {
        const ids = chunk.join(",");
        const data = await haravanGet(
          `/inventory_levels.json?inventory_item_ids=${ids}&limit=250`
        );
        for (const lvl of data.inventory_levels ?? []) {
          const itemId = lvl.inventory_item_id;
          if (!result.has(itemId)) result.set(itemId, []);
          result.get(itemId).push({
            locationId: lvl.location_id,
            quantity: lvl.available ?? 0,
          });
        }
      })
    );
  } catch (err) {
    console.error("[haravanService] fetchInventoryLevels failed:", err.message);
  }
  return result;
}

// ─── Map product ──────────────────────────────────────────────────────────────
function mapProduct(product) {
  const variant = product.variants?.[0] ?? {};
  const tags = product.tags
    ? product.tags.split(",").map((tag) => tag.trim())
    : [];
  const inventoryQty = variant.inventory_quantity;
  const available =
    inventoryQty != null ? inventoryQty > 0 : variant.available !== false;

  return {
    id: product.id,
    name: product.title,
    category: detectCategory(product.title ?? ""),
    volume: variant.title !== "Default Title" ? variant.title : "",
    price: Number(variant.price) || 0,
    oldPrice: Number(variant.compare_at_price) || undefined,
    discount:
      variant.compare_at_price && variant.price
        ? Math.round((1 - variant.price / variant.compare_at_price) * 100)
        : undefined,
    image: product.images?.[0]?.src ?? "",
    isNew: tags.includes("new"),
    stores: tags.filter((tag) => ["CN1", "CN2", "CN3", "CN4"].includes(tag)),
    bodyHtml: product.body_html ?? "",
    sku: variant.sku ?? "",
    available,
    // inventory_item_id dùng để join với inventory_levels
    inventoryItemId: variant.inventory_item_id ?? null,
    // locations sẽ được enrich sau
    locations: [],
  };
}

// ─── Enrich products với location inventory ───────────────────────────────────
/**
 * Nhận products đã map + locations + inventoryLevels map,
 * trả về products với field locations[] đầy đủ.
 */
function enrichWithLocations(products, locations, inventoryLevels) {
  // Map locationId → name để tra cứu O(1)
  const locationMap = new Map(locations.map((l) => [l.id, l.name]));

  return products.map((p) => {
    const levels = p.inventoryItemId
      ? (inventoryLevels.get(p.inventoryItemId) ?? [])
      : [];

    const productLocations = levels
      .map((lvl) => ({
        id: lvl.locationId,
        name: locationMap.get(lvl.locationId) ?? `Chi nhánh ${lvl.locationId}`,
        quantity: lvl.quantity,
      }))
      .sort((a, b) => b.quantity - a.quantity); // còn nhiều lên trước

    return { ...p, locations: productLocations };
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function fetchProductById(id) {
  try {
    const products = await fetchProducts();
    return (
      products.find((product) => String(product.id) === String(id)) ?? null
    );
  } catch (error) {
    console.error("[haravanService] fetchProductById failed:", error.message);
    throw error;
  }
}

export async function fetchProducts() {
  try {
    const res = await fetch(`${HARAVAN_API_URL}?limit=250`, {
      headers: HEADERS,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Haravan API error: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();
    const rawProducts = (data.products ?? []).map(mapProduct);

    // Fetch locations + inventory song song
    const inventoryItemIds = rawProducts
      .map((p) => p.inventoryItemId)
      .filter(Boolean);

    const [locations, inventoryLevels] = await Promise.all([
      fetchLocations(),
      fetchInventoryLevels(inventoryItemIds),
    ]);

    return enrichWithLocations(rawProducts, locations, inventoryLevels);
  } catch (error) {
    console.error("[haravanService] fetchProducts failed:", error.message);
    throw error;
  }
}
