"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, ShoppingCart, Plus, Minus } from "lucide-react";
import placeholderImage from "@/assets/images/umboMilk.jpg";
import { useQuickView } from "./QuickViewContext";
import { useCart } from "./CartContext";
import { useTheme } from "@/components/ThemeProvider";

const defaultTokens = {
  overlayBg: "rgba(0,0,0,0.5)",
  modalBg: "white",
  modalBorder: "none",
  closeBtnBg: "#f3f4f6",
  closeBtnColor: "#6b7280",
  closeBtnHoverBg: "#F7a3a9",
  closeBtnHoverColor: "white",
  imgBg: "white",
  imgThumbBg: "#f9fafb",
  imgThumbActiveBorder: "#F7a3a9",
  imgThumbInactiveBorder: "transparent",
  titleColor: "#F7a3a9",
  labelColor: "#2d3748",
  valueColor: "#6b7280",
  stockColor: "#22c55e",
  priceColor: "#F7a3a9",
  oldPriceColor: "#9ca3af",
  discountBadge: { bg: "#ef4444", text: "white" },
  newBadge: { bg: "#facc15", text: "white" },
  qtyBorder: "2px solid #f7d0d3",
  qtyBtnBg: "#fff3f4",
  qtyBtnColor: "#F7a3a9",
  qtyBtnHoverBg: "#F7a3a9",
  qtyBtnHoverColor: "white",
  qtyNumColor: "#2d3748",
  addBtnBg: "#F7a3a9",
  addBtnHoverBg: "#f08a91",
  addBtnShadow: "0 4px 14px rgba(247,163,169,0.35)",
  addBtnHoverShadow: "0 6px 20px rgba(247,163,169,0.45)",
  detailColor: "#F7a3a9",
  detailHoverColor: "#f08a91",
};

export default function QuickViewModal() {
  const { product, close } = useQuickView();
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.quickViewModal ?? defaultTokens;

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (product) {
      setQty(1);
      setActiveImg(0);
      requestAnimationFrame(() => setVisible(true));
    } else setVisible(false);
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

  const rawImages = Array.isArray(product.images)
    ? product.images.filter(
        (img) => typeof img === "string" && img.trim().length > 0,
      )
    : [product.image].filter(
        (img) => typeof img === "string" && img.trim().length > 0,
      );
  const images = rawImages.length > 0 ? rawImages : [placeholderImage];
  const { name, category, price, oldPrice, discount, isNew, volume } = product;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-[280ms]"
      style={{ background: t.overlayBg, opacity: visible ? 1 : 0 }}
    >
      <div
        className="relative rounded-[20px] shadow-2xl w-full max-w-[960px] max-h-[90vh] overflow-y-auto transition-[transform,opacity] duration-[280ms]"
        style={{
          background: t.modalBg,
          border: t.modalBorder,
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
          className="absolute top-3.5 right-3.5 z-10 w-[34px] h-[34px] rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
          style={{ background: t.closeBtnBg, color: t.closeBtnColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = t.closeBtnHoverBg;
            e.currentTarget.style.color = t.closeBtnHoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = t.closeBtnBg;
            e.currentTarget.style.color = t.closeBtnColor;
          }}
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-[55%_45%] p-[25px]">
          {/* ── Cột trái: ảnh ── */}
          <div className="flex flex-col gap-3 animate-[fadeRight_300ms_ease_both] pr-[15px]">
            <div
              className="relative w-full aspect-square rounded-2xl overflow-hidden"
              style={{ background: t.imgBg }}
            >
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
                    className="relative w-[60px] h-[60px] rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors duration-200 cursor-pointer"
                    style={{
                      background: t.imgThumbBg,
                      borderColor:
                        i === activeImg
                          ? t.imgThumbActiveBorder
                          : t.imgThumbInactiveBorder,
                    }}
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
            <h2
              className="text-xl font-bold leading-snug"
              style={{ color: t.titleColor }}
            >
              {name}
            </h2>

            <div className="flex flex-col gap-1.5">
              {[
                [
                  "Tình trạng",
                  <span
                    key="s"
                    className="font-semibold"
                    style={{ color: t.stockColor }}
                  >
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
                    <span
                      className="font-semibold whitespace-nowrap"
                      style={{ color: t.labelColor }}
                    >
                      {label}:
                    </span>
                    <span style={{ color: t.valueColor }}>{value}</span>
                  </div>
                ))}
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className="text-2xl font-bold"
                style={{ color: t.priceColor }}
              >
                {price.toLocaleString("vi-VN")}đ
              </span>
              {oldPrice && (
                <span
                  className="text-sm line-through"
                  style={{ color: t.oldPriceColor }}
                >
                  {oldPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
              {discount && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: t.discountBadge.bg,
                    color: t.discountBadge.text,
                  }}
                >
                  -{discount}%
                </span>
              )}
              {isNew && !discount && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: t.newBadge.bg, color: t.newBadge.text }}
                >
                  MỚI
                </span>
              )}
            </div>

            <div
              className="flex items-center w-fit rounded-xl overflow-hidden"
              style={{ border: t.qtyBorder }}
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Giảm"
                className="w-[38px] h-[38px] flex items-center justify-center transition-colors duration-200 cursor-pointer"
                style={{ background: t.qtyBtnBg, color: t.qtyBtnColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = t.qtyBtnHoverBg;
                  e.currentTarget.style.color = t.qtyBtnHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = t.qtyBtnBg;
                  e.currentTarget.style.color = t.qtyBtnColor;
                }}
              >
                <Minus size={14} />
              </button>
              <span
                className="min-w-[44px] text-center text-sm font-bold select-none"
                style={{ color: t.qtyNumColor }}
              >
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Tăng"
                className="w-[38px] h-[38px] flex items-center justify-center transition-colors duration-200 cursor-pointer"
                style={{ background: t.qtyBtnBg, color: t.qtyBtnColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = t.qtyBtnHoverBg;
                  e.currentTarget.style.color = t.qtyBtnHoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = t.qtyBtnBg;
                  e.currentTarget.style.color = t.qtyBtnColor;
                }}
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, qty);
                handleClose();
              }}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-white text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer hover:scale-[1.02]"
              style={{ background: t.addBtnBg, boxShadow: t.addBtnShadow }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = t.addBtnHoverBg;
                e.currentTarget.style.boxShadow = t.addBtnHoverShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = t.addBtnBg;
                e.currentTarget.style.boxShadow = t.addBtnShadow;
              }}
            >
              <ShoppingCart size={18} />
              Thêm vào giỏ
            </button>

            <Link
              href={`/products/${product.id}`}
              onClick={handleClose}
              className="flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors duration-200"
              style={{ color: t.detailColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.detailHoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.detailColor;
              }}
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
