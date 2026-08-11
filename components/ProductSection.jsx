"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useTheme } from "@/components/ThemeProvider";
import { products as allProducts } from "@/data/products";

function MidAutumnCornerDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes glowPulse { 0%,100%{opacity:.55} 50%{opacity:.85} }
      `}</style>
      <svg
        className="absolute -top-2 -left-2 w-40 h-40 opacity-30"
        viewBox="0 0 160 160"
        fill="none"
      >
        <ellipse cx="30" cy="50" rx="28" ry="14" fill="#FFE4A0" opacity=".4" />
        <ellipse cx="52" cy="44" rx="20" ry="12" fill="#FFE4A0" opacity=".3" />
        <g
          style={{ animation: "floatSlow 4s ease-in-out infinite" }}
          transform="translate(70,10)"
        >
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="6"
            stroke="#FFE4A0"
            strokeWidth="1.2"
          />
          <rect x="3" y="6" width="14" height="3" rx="1.5" fill="#c0392b" />
          <ellipse cx="10" cy="21" rx="9" ry="12" fill="#FFE4A0" opacity=".9" />
          <rect x="3" y="33" width="14" height="3" rx="1.5" fill="#c0392b" />
        </g>
        <circle
          cx="110"
          cy="20"
          r="2"
          fill="#FFE4A0"
          style={{ animation: "glowPulse 2s ease-in-out infinite" }}
        />
        <circle
          cx="130"
          cy="35"
          r="1.5"
          fill="#FFE4A0"
          style={{ animation: "glowPulse 2.5s ease-in-out .5s infinite" }}
        />
      </svg>
      <svg
        className="absolute -top-2 -right-2 w-48 h-40 opacity-25"
        viewBox="0 0 192 160"
        fill="none"
      >
        <circle cx="160" cy="30" r="28" fill="#FFE4A0" opacity=".18" />
        <circle cx="160" cy="30" r="18" fill="#FFE4A0" opacity=".22" />
        <circle
          cx="60"
          cy="18"
          r="2"
          fill="#FFE4A0"
          style={{ animation: "glowPulse 2.2s ease-in-out .3s infinite" }}
        />
        <circle
          cx="90"
          cy="8"
          r="1.5"
          fill="#FFE4A0"
          style={{ animation: "glowPulse 1.8s ease-in-out .8s infinite" }}
        />
        <circle
          cx="120"
          cy="55"
          r="1.8"
          fill="#FFE4A0"
          style={{ animation: "glowPulse 2.6s ease-in-out .1s infinite" }}
        />
        <g opacity=".5" transform="translate(20,30)">
          <ellipse cx="12" cy="22" rx="10" ry="12" fill="#FFE4A0" />
          <ellipse cx="8" cy="8" rx="3" ry="7" fill="#FFE4A0" />
          <ellipse cx="16" cy="8" rx="3" ry="7" fill="#FFE4A0" />
          <circle cx="12" cy="18" r="4" fill="white" opacity=".6" />
        </g>
      </svg>
      <svg
        className="absolute -bottom-4 -right-4 w-36 h-36 opacity-20"
        viewBox="0 0 144 144"
        fill="none"
      >
        <circle
          cx="100"
          cy="100"
          r="60"
          stroke="#FFE4A0"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="100"
          cy="100"
          r="44"
          stroke="#FFE4A0"
          strokeWidth=".7"
          fill="none"
        />
        <circle
          cx="100"
          cy="100"
          r="28"
          stroke="#FFE4A0"
          strokeWidth=".5"
          fill="none"
        />
      </svg>
    </div>
  );
}

const ProductSection = () => {
  const [apiProducts, setApiProducts] = useState([]);
  const { theme } = useTheme();
  const isMidAutumn = theme?.id === "trung-thu";
  const st = theme?.sectionTheme?.productSection;

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/haravan/products");
        if (!res.ok) throw new Error();
        const data = await res.json();
        const payload = Array.isArray(data) ? data : (data.products ?? []);
        setApiProducts(
          payload
            .filter((p) => {
              const cat = String(p.category ?? "").toLowerCase();
              const name = String(p.name ?? p.title ?? "").toLowerCase();
              return (
                cat === "sua" ||
                cat === "vang-sua" ||
                name.includes("sua") ||
                name.includes("vang sua")
              );
            })
            .slice(0, 4)
            .map((item) => ({
              id: item.id,
              name: item.title ?? item.name ?? "Sản phẩm",
              title: item.title ?? item.name ?? "Sản phẩm",
              category: item.category ?? "sua",
              price: Number(item.price ?? item.variant?.price ?? 0) || 0,
              oldPrice:
                Number(item.oldPrice ?? item.variant?.compare_at_price) ||
                undefined,
              discount:
                item.discount ??
                (item.variant?.compare_at_price && item.variant?.price
                  ? Math.round(
                      (1 - item.variant.price / item.variant.compare_at_price) *
                        100,
                    )
                  : undefined),
              image: item.image ?? item.images?.[0]?.src ?? "",
              volume: item.volume ?? item.variant?.title ?? "",
              available: item.available ?? true,
              sku: item.sku ?? "",
              bodyHtml: item.bodyHtml ?? "",
              description: item.description ?? "",
              isNew: Boolean(item.isNew),
            })),
        );
      } catch {
        /* giữ nguyên mảng rỗng */
      }
    };
    load();
  }, []);

  // ── Default (pink-classic) ──────────────────────────────────────────────────
  if (!isMidAutumn) {
    return (
      <section className="py-8 bg-[#fff3f4] w-full">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2d3748]">
                SỮA BÒ THANH TRÙNG
              </h2>
              <div className="mt-2 h-1 w-16 bg-[#F7a3a9] rounded-full" />
            </div>
            <Link
              href="/products"
              className="text-[#F7a3a9] text-sm font-medium hover:opacity-75 transition-opacity"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {apiProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Trung Thu — Tab Showcase ────────────────────────────────────────────────
  const tabs = st?.tabs ?? [];
  const currentCategory = tabs[activeTab]?.category ?? "";
  const tabProducts = allProducts
    .filter((p) => p.category === currentCategory)
    .slice(0, 4);

  return (
    <section
      className="relative py-10 w-full overflow-hidden"
      style={{ background: st?.bg }}
    >
      <MidAutumnCornerDecor />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: st?.textureBg, opacity: st?.textureOpacity }}
      />

      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p
              className="text-xs font-medium tracking-[0.25em] uppercase mb-1.5 opacity-80"
              style={{ color: st?.labelColor }}
            >
              {st?.label}
            </p>
            <h2
              className="text-xl sm:text-2xl font-bold tracking-wide"
              style={{ color: st?.titleColor }}
            >
              DANH MỤC TRUNG THU
            </h2>
            <div className="mt-2.5 flex items-center gap-2">
              {st?.divider?.colors?.map((color, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    background: color,
                    width: st.divider.widths[i],
                    height: i === 1 ? "4px" : "2px",
                  }}
                />
              ))}
            </div>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium transition-opacity hover:opacity-75 flex items-center gap-1"
            style={{ color: st?.linkColor }}
          >
            Xem tất cả <span className="text-base">→</span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab, i) => {
            const isActive = i === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(i)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: isActive ? st?.tabActiveBg : st?.tabInactiveBg,
                  color: isActive ? st?.tabActiveText : st?.tabInactiveText,
                  border: isActive ? st?.tabActiveBorder : st?.tabBorder,
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tabProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: st?.accentBottom }}
      />
    </section>
  );
};

export default ProductSection;
