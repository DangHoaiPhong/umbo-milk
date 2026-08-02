"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { useTheme } from "@/components/ThemeProvider";
import { products as staticProducts } from "@/data/products";

const defaultTokens = {
  bg: "#fff3f4",
  headingColor: "#2d3748",
  dividerColor: "#F7a3a9",
  sidebarBg: "white",
  sidebarBorder: "none",
  accordionBorderColor: "#f7d0d3",
  accordionTitleColor: "#2d3748",
  accordionTitleHoverColor: "#F7a3a9",
  accordionIconColor: "#F7a3a9",
  checkboxLabelColor: "#4b5563",
  checkboxLabelHoverColor: "#F7a3a9",
  emptyTextColor: "#6b7280",
  resetBtnBg: "#F7a3a9",
  resetBtnText: "white",
  resetBtnHoverBg: "#f08a91",
  loadMoreColor: "#F7a3a9",
  loadMoreBorder: "#F7a3a9",
  loadMoreHoverBg: "#F7a3a9",
  loadMoreHoverText: "white",
  allSeenColor: "#9ca3af",
};

const CATEGORIES = [
  { label: "Sữa", values: ["sua", "Sữa"] },
  { label: "Váng sữa", values: ["vang-sua", "Váng sữa"] },
  { label: "Combo", values: ["combo", "Combo"] },
  { label: "Đồ ăn vặt/Bánh kẹo", values: ["do-an-vat", "Đồ ăn vặt/Bánh kẹo"] },
  { label: "Sản phẩm khác", values: ["khac", "phu-kien", "Sản phẩm khác"] },
];

const CATEGORIES_TRUNG_THU = [
  { label: "Hộp Quà Biếu Cao Cấp", values: ["Hộp Quà Biếu"] },
  { label: "Bánh Truyền Thống", values: ["Bánh & Combo"] },
  { label: "Đồ Chơi & Đèn Lồng", values: ["Đèn Lồng & Đồ Chơi"] },
];

const STORES = [
  { label: "CN 1: 111 Tôn Đản, Quận 4", key: "CN1" },
  { label: "CN 2: 120 Hoàng Diệu 2, Quận Thủ Đức", key: "CN2" },
  { label: "CN 3: 261 Tô Hiến Thành, Quận 10", key: "CN3" },
  { label: "CN 4: 130 Vạn Kiếp, Quận Bình Thạnh", key: "CN4" },
];

const PAGE_SIZE = 8;
const DEFAULT_CATEGORIES = ["sua", "vang-sua", "do-an-vat", "Sữa", "Váng sữa"];

function filterProducts(products, selectedCategoryKeys, stores, allCategories) {
  const allValues =
    selectedCategoryKeys.length > 0
      ? selectedCategoryKeys.flatMap(
          (key) => allCategories.find((c) => c.label === key)?.values ?? [key],
        )
      : DEFAULT_CATEGORIES;

  return products.filter((p) => {
    const categoryMatch = allValues.includes(p.category);
    const storeMatch =
      stores.length === 0 || p.stores?.some((s) => stores.includes(s));
    return categoryMatch && storeMatch;
  });
}

function AccordionGroup({ title, items, checked, onChange, t }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: t.accordionBorderColor }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 px-1 text-left text-sm font-bold transition-colors"
        style={{ color: t.accordionTitleColor }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = t.accordionTitleHoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = t.accordionTitleColor;
        }}
      >
        <span>{title}</span>
        <span
          className="text-xl leading-none select-none w-5 text-center"
          style={{ color: t.accordionIconColor }}
        >
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 280ms ease-in-out",
        }}
      >
        <div className="overflow-hidden">
          <ul className="pb-4 flex flex-col gap-2.5 px-1">
            {items.map((item) => {
              const key = typeof item === "object" ? item.key : item;
              const label = typeof item === "object" ? item.label : item;
              return (
                <li key={key}>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checked.includes(key)}
                      onChange={() => onChange(key)}
                      className="mt-0.5 w-4 h-4 cursor-pointer flex-shrink-0"
                      style={{ accentColor: t.accordionIconColor }}
                    />
                    <span
                      className="text-xs pt-[6px] transition-colors leading-none"
                      style={{ color: t.checkboxLabelColor }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = t.checkboxLabelHoverColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = t.checkboxLabelColor;
                      }}
                    >
                      {label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const newStartRef = useRef(0);
  const { theme } = useTheme();
  const isMidAutumn = theme?.id === "trung-thu";
  const t = theme?.sectionTheme?.productsPage ?? defaultTokens;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/haravan/products");
        if (!res.ok) throw new Error(`Lỗi ${res.status}`);
        const data = await res.json();
        setApiProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Merge data tĩnh Trung Thu khi isMidAutumn
  const products = useMemo(() => {
    if (!isMidAutumn) return apiProducts;
    const trungThuCategories = [
      "Hộp Quà Biếu",
      "Bánh & Combo",
      "Đèn Lồng & Đồ Chơi",
    ];
    const trungThuStatic = staticProducts.filter((p) =>
      trungThuCategories.includes(p.category),
    );
    return [...apiProducts, ...trungThuStatic];
  }, [apiProducts, isMidAutumn]);

  const allCategories = isMidAutumn
    ? [...CATEGORIES, ...CATEGORIES_TRUNG_THU]
    : CATEGORIES;

  const toggle = (setter) => (item) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item],
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedStores([]);
  };

  const filteredProducts = useMemo(
    () =>
      filterProducts(
        products,
        selectedCategories,
        selectedStores,
        allCategories,
      ),
    [products, selectedCategories, selectedStores, isMidAutumn],
  );

  useEffect(() => {
    newStartRef.current = 0;
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategories, selectedStores]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    newStartRef.current = visibleCount;
    setVisibleCount((prev) =>
      Math.min(prev + PAGE_SIZE, filteredProducts.length),
    );
  };

  return (
    <main className="flex-1 min-h-screen" style={{ background: t.bg }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1
            className="text-xl sm:text-2xl font-bold"
            style={{ color: t.headingColor }}
          >
            DANH MỤC SẢN PHẨM
          </h1>
          <div
            className="mt-2 h-1 w-16 rounded-full"
            style={{ background: t.dividerColor }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Sidebar */}
          <aside className="w-full  lg:w-[280px] lg:flex-shrink-0">
            <div
              className="rounded-2xl shadow-sm p-2"
              style={{ background: t.sidebarBg, border: t.sidebarBorder }}
            >
              <AccordionGroup
                title="Danh mục sản phẩm"
                items={CATEGORIES.map((c) => ({
                  key: c.label,
                  label: c.label,
                }))}
                checked={selectedCategories}
                onChange={toggle(setSelectedCategories)}
                t={t}
              />
              {isMidAutumn && (
                <AccordionGroup
                  title="🌕 Đặc Biệt Trung Thu"
                  items={CATEGORIES_TRUNG_THU.map((c) => ({
                    key: c.label,
                    label: c.label,
                  }))}
                  checked={selectedCategories}
                  onChange={toggle(setSelectedCategories)}
                  t={t}
                />
              )}
              <AccordionGroup
                title="Các cửa hàng"
                items={STORES}
                checked={selectedStores}
                onChange={toggle(setSelectedStores)}
                t={t}
              />
            </div>
          </aside>

          {/* Product grid */}
          <section className="flex-1 min-w-0 w-full">
            <div className="grid w-full grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
              {visibleProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="w-full min-w-0 h-full"
                  style={
                    index >= newStartRef.current
                      ? {
                          animation: `fadeSlideUp 350ms ease-out both`,
                          animationDelay: `${(index - newStartRef.current) * 60}ms`,
                        }
                      : undefined
                  }
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {loading && (
              <p
                className="text-center text-sm py-16"
                style={{ color: t.allSeenColor }}
              >
                Đang tải sản phẩm...
              </p>
            )}
            {!loading && error && (
              <p className="text-center text-red-400 text-sm py-16">
                Không thể tải sản phẩm: {error}
              </p>
            )}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <span className="text-5xl">📦</span>
                <p className="font-medium" style={{ color: t.emptyTextColor }}>
                  Không tìm thấy sản phẩm phù hợp.
                </p>
                {(selectedCategories.length > 0 ||
                  selectedStores.length > 0) && (
                  <button
                    onClick={resetFilters}
                    className="mt-1 px-6 py-2 text-sm font-semibold rounded-full transition-colors"
                    style={{ background: t.resetBtnBg, color: t.resetBtnText }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = t.resetBtnHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = t.resetBtnBg;
                    }}
                  >
                    Xóa bộ lọc
                  </button>
                )}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-2.5 text-sm font-semibold rounded-full border-2 transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-100"
                  style={{
                    color: t.loadMoreColor,
                    borderColor: t.loadMoreBorder,
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = t.loadMoreHoverBg;
                    e.currentTarget.style.color = t.loadMoreHoverText;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = t.loadMoreColor;
                  }}
                >
                  Xem thêm sản phẩm
                </button>
              ) : filteredProducts.length > 0 ? (
                <p className="text-sm" style={{ color: t.allSeenColor }}>
                  Bạn đã xem tất cả sản phẩm.
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
