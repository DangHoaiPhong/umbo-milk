"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/components/CartContext";

// ── Static detail data per product (fallback nếu chưa có) ──
const DETAIL_MAP = {
  default: {
    description:
      "Sản phẩm được làm từ nguồn sữa bò tươi nguyên chất, thanh trùng theo tiêu chuẩn an toàn thực phẩm. Giữ nguyên dưỡng chất tự nhiên, phù hợp cho cả gia đình.",
    ingredients: "Sữa bò tươi nguyên chất, không chất bảo quản.",
    expiry: "7 ngày kể từ ngày sản xuất",
    storage: "Bảo quản 2–6°C, dùng trong 24h sau khi mở nắp.",
    origin: "Việt Nam",
    brand: "Um Bò Milk",
    subCategory: "Thức uống có lợi",
    usage:
      "Lắc đều trước khi dùng. Uống lạnh hoặc hâm nóng tùy thích. Thích hợp cho bữa sáng hoặc bữa phụ.",
  },
};

const ACCORDION_ITEMS = [
  { key: "ingredients", label: "Thành phần" },
  { key: "expiry", label: "Hạn sử dụng" },
  { key: "storage", label: "Bảo quản" },
  { key: "origin", label: "Xuất xứ" },
];

function AccordionInfo({ label, value }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-[#2d3748] hover:text-[#F7a3a9] transition-colors"
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#F7a3a9] transition-transform duration-250 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 260ms ease-in-out",
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-3 text-xs text-gray-500 leading-relaxed">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart, setDrawerOpen } = useCart();

  if (!product) {
    return (
      <main className="flex-1 bg-[#fff3f4] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">Không tìm thấy sản phẩm.</p>
          <Link href="/products" className="text-[#F7a3a9] text-sm font-semibold hover:opacity-75">
            ← Quay lại danh mục
          </Link>
        </div>
      </main>
    );
  }

  const detail = DETAIL_MAP[product.id] ?? DETAIL_MAP.default;
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="flex-1 bg-[#fff3f4] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-12 sm:py-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#F7a3a9] transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#F7a3a9] transition-colors">Sản phẩm</Link>
          <span>/</span>
          <span className="text-[#F7a3a9] line-clamp-1">{product.name}</span>
        </nav>

        {/* ── Main 2-col layout ── */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

          {/* ── LEFT: Image ── */}
          <div
            className="w-full lg:w-1/2 flex-shrink-0"
            style={{ animation: "fadeInRight 450ms ease-out both" }}
          >
            <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center aspect-square overflow-hidden group">
              <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-[1.03]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Info ── */}
          <div
            className="w-full lg:w-1/2 flex flex-col gap-5"
            style={{ animation: "fadeInLeft 450ms ease-out both" }}
          >
            {/* Category + Brand */}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="bg-[#fff0f1] text-[#F7a3a9] px-3 py-1 rounded-full font-semibold">
                {product.category}
              </span>
              <span>•</span>
              <span>{detail.brand}</span>
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2d3748] leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#F7a3a9]">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.oldPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  MỚI
                </span>
              )}
            </div>

            {/* Volume */}
            {product.volume && (
              <p className="text-sm text-gray-500">
                Dung tích: <span className="font-semibold text-[#2d3748]">{product.volume}</span>
              </p>
            )}

            {/* Short description */}
            <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
              {detail.description}
            </p>

            {/* Quantity */}
            <div
              className="flex items-center gap-4"
              style={{ animation: "fadeInUp 500ms ease-out 200ms both" }}
            >
              <span className="text-sm font-semibold text-[#2d3748]">Số lượng:</span>
              <div className="flex items-center border border-[#f7d0d3] rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-[#F7a3a9] hover:bg-[#fff0f1] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-[#2d3748]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-[#F7a3a9] hover:bg-[#fff0f1] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3"
              style={{ animation: "fadeInUp 500ms ease-out 300ms both" }}
            >
              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#F7a3a9] text-[#F7a3a9] bg-white font-semibold text-sm transition-all duration-250 hover:bg-[#F7a3a9] hover:text-white hover:shadow-md hover:scale-[1.02] active:scale-100"
              >
                <ShoppingCart className="w-4 h-4" />
                Thêm vào giỏ
              </button>
              <button
                onClick={() => { addToCart(product, qty); setDrawerOpen(true); }}
                className="flex-1 px-6 py-3 rounded-full bg-[#F7a3a9] text-white font-semibold text-sm transition-all duration-250 hover:bg-[#e8848b] hover:shadow-md hover:scale-[1.02] active:scale-100"
              >
                Mua ngay
              </button>
            </div>

            {/* Accordion info */}
            <div className="border border-gray-100 rounded-xl p-4 bg-white mt-1">
              {ACCORDION_ITEMS.map((item) => (
                <AccordionInfo
                  key={item.key}
                  label={item.label}
                  value={detail[item.key]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Detail tabs ── */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            {[
              { key: "description", label: "Mô tả chi tiết" },
              { key: "ingredients", label: "Thành phần" },
              { key: "usage", label: "Hướng dẫn sử dụng" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-4 text-sm font-semibold transition-colors duration-200 border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-[#F7a3a9] text-[#F7a3a9]"
                    : "border-transparent text-gray-400 hover:text-[#F7a3a9]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6 text-sm text-gray-500 leading-relaxed min-h-[100px]">
            {activeTab === "description" && <p>{detail.description}</p>}
            {activeTab === "ingredients" && <p>{detail.ingredients}</p>}
            {activeTab === "usage" && <p>{detail.usage}</p>}
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#2d3748]">
                SẢN PHẨM LIÊN QUAN
              </h2>
              <div className="mt-2 h-1 w-16 bg-[#F7a3a9] rounded-full" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
