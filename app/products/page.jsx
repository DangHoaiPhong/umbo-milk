"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = [
  { label: "Sữa", values: ["sua"] },
  { label: "Váng sữa", values: ["vang-sua"] },
  { label: "Combo", values: ["combo"] },
  { label: "Đồ ăn vặt/Bánh kẹo", values: ["do-an-vat"] },
  { label: "Sản phẩm khác", values: ["khac", "phu-kien"] },
];

const STORES = [
  { label: "CN 1: 111 Tôn Đản, Quận 4", key: "CN1" },
  { label: "CN 2: 120 Hoàng Diệu 2, Quận Thủ Đức", key: "CN2" },
  { label: "CN 3: 261 Tô Hiến Thành, Quận 10", key: "CN3" },
  { label: "CN 4: 130 Vạn Kiếp, Quận Bình Thạnh", key: "CN4" },
];

const PAGE_SIZE = 8;

const DEFAULT_CATEGORIES = ["sua", "vang-sua", "do-an-vat"];

function filterProducts(products, selectedCategoryKeys, stores) {
  const slugs =
    selectedCategoryKeys.length > 0
      ? selectedCategoryKeys.flatMap(
          (key) => CATEGORIES.find((c) => c.label === key)?.values ?? [key],
        )
      : DEFAULT_CATEGORIES;
  return products.filter((p) => {
    const categoryMatch = slugs.includes(p.category);
    const storeMatch =
      stores.length === 0 || p.stores?.some((s) => stores.includes(s));
    return categoryMatch && storeMatch;
  });
}

function AccordionGroup({ title, items, checked, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#f7d0d3] last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 px-1 text-left text-sm font-bold text-[#2d3748] hover:text-[#F7a3a9] transition-colors"
      >
        <span>{title}</span>
        <span className="text-[#F7a3a9] text-xl leading-none select-none w-5 text-center">
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
                  <label className="flex items-centers gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checked.includes(key)}
                      onChange={() => onChange(key)}
                      className="mt-0.5 w-4 h-4 accent-[#F7a3a9] cursor-pointer flex-shrink-0"
                    />
                    <span className="text-xs pt-[6px] text-gray-600 group-hover:text-[#F7a3a9] transition-colors leading-none">
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const newStartRef = useRef(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/haravan/products");
        if (!res.ok) throw new Error(`Lỗi ${res.status}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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
    () => filterProducts(products, selectedCategories, selectedStores),
    [products, selectedCategories, selectedStores],
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
    <main className="flex-1 bg-[#fff3f4] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#2d3748]">
            DANH MỤC SẢN PHẨM
          </h1>
          <div className="mt-2 h-1 w-16 bg-[#F7a3a9] rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-[280px] lg:flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <AccordionGroup
                title="Danh mục sản phẩm"
                items={CATEGORIES.map((c) => ({
                  key: c.label,
                  label: c.label,
                }))}
                checked={selectedCategories}
                onChange={toggle(setSelectedCategories)}
              />
              <AccordionGroup
                title="Các cửa hàng"
                items={STORES}
                checked={selectedStores}
                onChange={toggle(setSelectedStores)}
              />
            </div>
          </aside>

          {/* ── Product grid ── */}
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
              <p className="text-center text-gray-400 text-sm py-16">
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
                <p className="text-gray-500 font-medium">
                  Không tìm thấy sản phẩm phù hợp.
                </p>
                {(selectedCategories.length > 0 ||
                  selectedStores.length > 0) && (
                  <button
                    onClick={resetFilters}
                    className="mt-1 px-6 py-2 text-sm font-semibold text-white bg-[#F7a3a9] rounded-full hover:bg-[#f08a91] transition-colors"
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
                  className="px-8 py-2.5 text-sm font-semibold text-[#F7a3a9] bg-white border-2 border-[#F7a3a9] rounded-full transition-all duration-300 hover:bg-[#F7a3a9] hover:text-white hover:shadow-md hover:scale-[1.02] active:scale-100"
                >
                  Xem thêm sản phẩm
                </button>
              ) : filteredProducts.length > 0 ? (
                <p className="text-sm text-gray-400">
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
