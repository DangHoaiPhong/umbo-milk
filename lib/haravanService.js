import { detectCategory } from "@/lib/detectCategory";

const HARAVAN_API_URL = process.env.HARAVAN_API_URL;
const HARAVAN_TOKEN = process.env.HARAVAN_TOKEN;

function mapProduct(p) {
  const variant = p.variants?.[0] ?? {};
  const tags = p.tags ? p.tags.split(",").map((t) => t.trim()) : [];

  const inventoryQty = variant.inventory_quantity;
  const available =
    inventoryQty != null ? inventoryQty > 0 : (variant.available !== false);

  return {
    id: p.id,
    name: p.title,
    category: detectCategory(p.title ?? ""),
    volume: variant.title !== "Default Title" ? variant.title : "",
    price: Number(variant.price) || 0,
    oldPrice: Number(variant.compare_at_price) || undefined,
    discount:
      variant.compare_at_price && variant.price
        ? Math.round((1 - variant.price / variant.compare_at_price) * 100)
        : undefined,
    image: p.images?.[0]?.src ?? "",
    isNew: tags.includes("new"),
    stores: tags.filter((t) => ["CN1", "CN2", "CN3", "CN4"].includes(t)),
    bodyHtml: p.body_html ?? "",
    sku: variant.sku ?? "",
    available,
  };
}

export async function fetchProductById(id) {
  try {
    const products = await fetchProducts();
    return products.find((p) => String(p.id) === String(id)) ?? null;
  } catch (error) {
    console.error("[haravanService] fetchProductById failed:", error.message);
    throw error;
  }
}

export async function fetchProducts() {
  try {
    const res = await fetch(`${HARAVAN_API_URL}?limit=250`, {
      headers: {
        Authorization: `Bearer ${HARAVAN_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Haravan API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return (data.products ?? []).map(mapProduct);
  } catch (error) {
    console.error("[haravanService] fetchProducts failed:", error.message);
    throw error;
  }
}
