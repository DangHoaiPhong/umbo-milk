"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/components/CartContext";
import { useTheme } from "@/components/ThemeProvider";
import LocationBadge from "@/components/LocationBadge";

const defaultTokens = {
  bg: "#fff3f4",
  breadcrumbColor: "#9ca3af",
  breadcrumbActiveColor: "#F7a3a9",
  imageBg: "white",
  imagePlaceholderBg: "#fff0f1",
  categoryBadgeBg: "#fff0f1",
  categoryBadgeColor: "#F7a3a9",
  brandColor: "#9ca3af",
  nameColor: "#2d3748",
  metaColor: "#9ca3af",
  metaValueColor: "#2d3748",
  priceColor: "#F7a3a9",
  oldPriceColor: "#9ca3af",
  discountBadge: { bg: "#ef4444", text: "white" },
  newBadge: { bg: "#eab308", text: "white" },
  volumeColor: "#6b7280",
  descriptionColor: "#6b7280",
  descriptionBorder: "#f3f4f6",
  qtyLabelColor: "#2d3748",
  qtyBorder: "1px solid #f7d0d3",
  qtyBtnColor: "#F7a3a9",
  qtyBtnHoverBg: "#fff0f1",
  qtyNumColor: "#2d3748",
  addCartBorder: "#F7a3a9",
  addCartColor: "#F7a3a9",
  addCartBg: "white",
  addCartHoverBg: "#F7a3a9",
  addCartHoverColor: "white",
  buyNowBg: "#F7a3a9",
  buyNowHoverBg: "#e8848b",
  accordionBg: "white",
  accordionBorder: "#f3f4f6",
  accordionTitleColor: "#2d3748",
  accordionTitleHoverColor: "#F7a3a9",
  accordionIconColor: "#F7a3a9",
  accordionValueColor: "#6b7280",
  tabBorderColor: "#f3f4f6",
  tabBg: "white",
  tabActiveColor: "#F7a3a9",
  tabActiveBorder: "#F7a3a9",
  tabInactiveColor: "#9ca3af",
  tabContentBg: "white",
  tabContentColor: "#6b7280",
  relatedHeadingColor: "#2d3748",
  relatedDividerColor: "#F7a3a9",
};

const DETAIL_DEFAULT = {
  description: "Sản phẩm được làm từ nguồn sữa bò tươi nguyên chất, thanh trùng theo tiêu chuẩn an toàn thực phẩm. Giữ nguyên dưỡng chất tự nhiên, phù hợp cho cả gia đình.",
  ingredients: "Sữa bò tươi nguyên chất, không chất bảo quản.",
  expiry: "7 ngày kể từ ngày sản xuất",
  storage: "Bảo quản 2–6°C, dùng trong 24h sau khi mở nắp.",
  origin: "Việt Nam",
  brand: "Um Bò Milk",
  usage: "Lắc đều trước khi dùng. Uống lạnh hoặc hâm nóng tùy thích. Thích hợp cho bữa sáng hoặc bữa phụ.",
};

const ACCORDION_ITEMS = [
  { key: "ingredients", label: "Thành phần" },
  { key: "expiry", label: "Hạn sử dụng" },
  { key: "storage", label: "Bảo quản" },
  { key: "origin", label: "Xuất xứ" },
];

function AccordionInfo({ label, value, t }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${t.accordionBorder}` }} className="last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 text-sm font-semibold transition-colors"
        style={{ color: t.accordionTitleColor }}
        onMouseEnter={(e) => { e.currentTarget.style.color = t.accordionTitleHoverColor; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = t.accordionTitleColor; }}
      >
        <span>{label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${open ? "rotate-180" : ""}`}
          style={{ color: t.accordionIconColor }} />
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 260ms ease-in-out" }}>
        <div className="overflow-hidden">
          <p className="pb-3 text-xs leading-relaxed" style={{ color: t.accordionValueColor }}>{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart, setDrawerOpen } = useCart();
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.productDetailPage ?? defaultTokens;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/haravan/products");
        if (!res.ok) throw new Error();
        const allData = await res.json();
        const found = allData.find((p) => String(p.id) === String(id));
        if (!found) throw new Error();
        setProduct(found);
        setRelated(allData.filter((p) => p.category === found.category && p.id !== found.id).slice(0, 4));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="flex-1 min-h-screen flex items-center justify-center" style={{ background: t.bg }}>
        <p className="text-sm" style={{ color: t.metaColor }}>Đang tải sản phẩm...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex-1 min-h-screen flex items-center justify-center" style={{ background: t.bg }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: t.metaColor }}>Không tìm thấy sản phẩm.</p>
          <Link href="/products" className="text-sm font-semibold hover:opacity-75" style={{ color: t.breadcrumbActiveColor }}>
            ← Quay lại danh mục
          </Link>
        </div>
      </main>
    );
  }

  const detail = DETAIL_DEFAULT;

  return (
    <main className="flex-1 min-h-screen" style={{ background: t.bg }}>
      <div className="max-w-[1200px] mx-auto px-4 py-12 sm:py-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: t.breadcrumbColor }}>
          <Link href="/" className="transition-colors hover:opacity-80" style={{ color: t.breadcrumbColor }}>Trang chủ</Link>
          <span>/</span>
          <Link href="/products" className="transition-colors hover:opacity-80" style={{ color: t.breadcrumbColor }}>Sản phẩm</Link>
          <span>/</span>
          <span className="line-clamp-1" style={{ color: t.breadcrumbActiveColor }}>{product.name}</span>
        </nav>

        {/* Main 2-col */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

          {/* LEFT: Image */}
          <div className="w-full lg:w-1/2 flex-shrink-0" style={{ animation: "fadeInRight 450ms ease-out both" }}>
            <div className="rounded-2xl shadow-sm p-6 flex items-center justify-center aspect-square overflow-hidden group"
              style={{ background: t.imageBg }}>
              <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-[1.03]">
                {product.image ? (
                  <Image src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain" priority unoptimized />
                ) : (
                  <div className="w-full h-full rounded-xl" style={{ background: t.imagePlaceholderBg }} />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5" style={{ animation: "fadeInLeft 450ms ease-out both" }}>
            {/* Category + Brand */}
            <div className="flex items-center gap-3 text-xs" style={{ color: t.brandColor }}>
              <span className="px-3 py-1 rounded-full font-semibold"
                style={{ background: t.categoryBadgeBg, color: t.categoryBadgeColor }}>
                {product.category}
              </span>
              <span>•</span>
              <span>{detail.brand}</span>
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-bold leading-snug" style={{ color: t.nameColor }}>
              {product.name}
            </h1>

            {/* SKU + Stock */}
            <div className="flex items-center gap-3 text-sm">
              {product.sku && (
                <span style={{ color: t.metaColor }}>
                  Mã sản phẩm: <span className="font-semibold" style={{ color: t.metaValueColor }}>{product.sku}</span>
                </span>
              )}
              {product.sku && <span style={{ color: t.metaColor }}>|</span>}
              <span style={{ color: t.metaColor }}>
                Tình trạng:{" "}
                <span className="font-semibold" style={{ color: product.available !== false ? "#22c55e" : "#ef4444" }}>
                  {product.available !== false ? "Còn hàng" : "Hết hàng"}
                </span>
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold" style={{ color: t.priceColor }}>
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              {product.oldPrice && (
                <span className="text-sm line-through" style={{ color: t.oldPriceColor }}>
                  {product.oldPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
              {product.discount && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: t.discountBadge.bg, color: t.discountBadge.text }}>
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: t.newBadge.bg, color: t.newBadge.text }}>
                  MỚI
                </span>
              )}
            </div>

            {/* Tồn kho theo chi nhánh */}
            {product.locations?.length > 0 && (
              <LocationBadge
                locations={product.locations}
                mode="detail"
                textColor={t.metaColor}
                accentColor={t.priceColor}
              />
            )}

            {/* Volume */}
            {product.volume && (
              <p className="text-sm" style={{ color: t.volumeColor }}>
                Dung tích: <span className="font-semibold" style={{ color: t.metaValueColor }}>{product.volume}</span>
              </p>
            )}

            {/* Short description */}
            <div
              className="text-sm leading-relaxed border-t pt-4 prose prose-sm max-w-none"
              style={{ color: t.descriptionColor, borderColor: t.descriptionBorder }}
              dangerouslySetInnerHTML={{ __html: product.bodyHtml || detail.description }}
            />

            {/* Quantity */}
            <div className="flex items-center gap-4" style={{ animation: "fadeInUp 500ms ease-out 200ms both" }}>
              <span className="text-sm font-semibold" style={{ color: t.qtyLabelColor }}>Số lượng:</span>
              <div className="flex items-center rounded-lg overflow-hidden" style={{ border: t.qtyBorder }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center transition-colors"
                  style={{ color: t.qtyBtnColor }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = t.qtyBtnHoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold select-none" style={{ color: t.qtyNumColor }}>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center transition-colors"
                  style={{ color: t.qtyBtnColor }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = t.qtyBtnHoverBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3" style={{ animation: "fadeInUp 500ms ease-out 300ms both" }}>
              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 font-semibold text-sm transition-all duration-250 hover:shadow-md hover:scale-[1.02] active:scale-100"
                style={{ borderColor: t.addCartBorder, color: t.addCartColor, background: t.addCartBg }}
                onMouseEnter={(e) => { e.currentTarget.style.background = t.addCartHoverBg; e.currentTarget.style.color = t.addCartHoverColor; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = t.addCartBg; e.currentTarget.style.color = t.addCartColor; }}
              >
                <ShoppingCart className="w-4 h-4" />
                Thêm vào giỏ
              </button>
              <button
                onClick={() => { addToCart(product, qty); setDrawerOpen(true); }}
                className="flex-1 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all duration-250 hover:shadow-md hover:scale-[1.02] active:scale-100"
                style={{ background: t.buyNowBg }}
                onMouseEnter={(e) => { e.currentTarget.style.background = t.buyNowHoverBg; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = t.buyNowBg; }}
              >
                Mua ngay
              </button>
            </div>

            {/* Accordion info */}
            <div className="rounded-xl p-4 mt-1" style={{ background: t.accordionBg, border: `1px solid ${t.accordionBorder}` }}>
              {ACCORDION_ITEMS.map((item) => (
                <AccordionInfo key={item.key} label={item.label} value={detail[item.key]} t={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Detail tabs */}
        <div className="mt-16 rounded-2xl shadow-sm overflow-hidden" style={{ background: t.tabBg }}>
          <div className="flex" style={{ borderBottom: `1px solid ${t.tabBorderColor}` }}>
            {[
              { key: "description", label: "Mô tả chi tiết" },
              { key: "ingredients", label: "Thành phần" },
              { key: "usage", label: "Hướng dẫn sử dụng" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-5 py-4 text-sm font-semibold transition-colors duration-200 border-b-2 -mb-px"
                style={{
                  borderColor: activeTab === tab.key ? t.tabActiveBorder : "transparent",
                  color: activeTab === tab.key ? t.tabActiveColor : t.tabInactiveColor,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6 text-sm leading-relaxed min-h-[100px]" style={{ background: t.tabContentBg, color: t.tabContentColor }}>
            {activeTab === "description" && (
              product.bodyHtml
                ? <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: product.bodyHtml }} />
                : <p>{detail.description}</p>
            )}
            {activeTab === "ingredients" && <p>{detail.ingredients}</p>}
            {activeTab === "usage" && <p>{detail.usage}</p>}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold" style={{ color: t.relatedHeadingColor }}>SẢN PHẨM LIÊN QUAN</h2>
              <div className="mt-2 h-1 w-16 rounded-full" style={{ background: t.relatedDividerColor }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInLeft  { from { opacity: 0; transform: translateX(30px);  } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp    { from { opacity: 0; transform: translateY(16px);  } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}
