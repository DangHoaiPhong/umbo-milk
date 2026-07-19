"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, ShoppingCart, Plus, Minus } from "lucide-react";
import { useQuickView } from "./QuickViewContext";
import { useCart } from "./CartContext";

export default function QuickViewModal() {
  const { product, close } = useQuickView();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (product) {
      setQty(1);
      setActiveImg(0);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  function handleClose() {
    setVisible(false);
    setTimeout(close, 280);
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) handleClose();
  }

  if (!product) return null;

  const images = product.images ?? [product.image];
  const { name, category, price, oldPrice, discount, isNew, volume } = product;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 transition-opacity duration-[280ms]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[960px] max-h-[90vh] overflow-y-auto transition-[transform,opacity] duration-[280ms]"
        style={{
          transform: visible ? "scale(1)" : "scale(0.95)",
          opacity: visible ? 1 : 0,
        }}
        role="dialog"
        aria-modal="true"
        aria-label={`Xem nhanh: ${name}`}
      >
        {/* Nút đóng */}
        <button
          onClick={handleClose}
          aria-label="Đóng"
          className="absolute top-3.5 right-3.5 z-10 w-[34px] h-[34px] rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#F7a3a9] hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Body 2 cột */}
        <div className="grid grid-cols-[55%_45%]  p-[25px]">
          {/* ── Cột trái: ảnh ── */}
          <div className="flex flex-col gap-3 animate-[fadeRight_300ms_ease_both]">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white">
              <Image
                src={images[activeImg]}
                alt={name}
                fill
                sizes="500px"
                className="object-contain transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Ảnh ${i + 1}`}
                    className={`relative w-[60px] h-[60px] rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border-2 transition-colors duration-200 cursor-pointer ${
                      i === activeImg
                        ? "border-[#F7a3a9]"
                        : "border-transparent hover:border-[#F7a3a9]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Cột phải: thông tin ── */}
          <div className="flex flex-col gap-4 animate-[fadeLeft_300ms_ease_both]">
            {/* 1. Tên */}
            <h2 className="text-xl font-bold text-[#F7a3a9] leading-snug">
              {name}
            </h2>

            {/* 2. Thông tin nhanh */}
            <div className="flex flex-col gap-1.5">
              {[
                [
                  "Tình trạng",
                  <span key="stock" className="text-green-500 font-semibold">
                    Còn hàng
                  </span>,
                ],
                ["Thương hiệu", "Um Bò Milk"],
                category && ["Danh mục", category],
                volume && ["Quy cách", volume],
              ]
                .filter(Boolean)
                .map(([label, value]) => (
                  <div key={label} className="flex gap-1.5 text-xs">
                    <span className="font-semibold text-[#2d3748] whitespace-nowrap">
                      {label}:
                    </span>
                    <span className="text-gray-500">{value}</span>
                  </div>
                ))}
            </div>

            {/* 3. Giá */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-2xl font-bold text-[#F7a3a9]">
                {price.toLocaleString("vi-VN")}đ
              </span>
              {oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {oldPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
              {discount && (
                <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              )}
              {isNew && !discount && (
                <span className="text-xs font-bold bg-yellow-400 text-white px-2 py-0.5 rounded-full">
                  MỚI
                </span>
              )}
            </div>

            {/* 4. Số lượng */}
            <div className="flex items-center w-fit border-2 border-[#f7d0d3] rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Giảm"
                className="w-[38px] h-[38px] flex items-center justify-center bg-[#fff3f4] text-[#F7a3a9] hover:bg-[#F7a3a9] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="min-w-[44px] text-center text-sm font-bold text-[#2d3748] select-none">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Tăng"
                className="w-[38px] h-[38px] flex items-center justify-center bg-[#fff3f4] text-[#F7a3a9] hover:bg-[#F7a3a9] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* 5. Thêm vào giỏ */}
            <button
              onClick={() => { addToCart(product, qty); handleClose(); }}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#F7a3a9] text-white text-sm font-bold rounded-xl shadow-[0_4px_14px_rgba(247,163,169,0.35)] hover:bg-[#f08a91] hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(247,163,169,0.45)] transition-all duration-200 cursor-pointer">
              <ShoppingCart size={18} />
              Thêm vào giỏ
            </button>

            {/* 6. Xem chi tiết */}
            <Link
              href={`/products/${product.id}`}
              onClick={handleClose}
              className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#F7a3a9] hover:text-[#f08a91] hover:underline transition-colors duration-200"
            >
              Xem chi tiết sản phẩm
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
