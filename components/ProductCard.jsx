"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useQuickView } from "./QuickViewContext";
import { useCart } from "./CartContext";
import { useTheme } from "@/components/ThemeProvider";
import LocationBadge from "@/components/LocationBadge";

const ProductCard = ({ product, displayLocations }) => {
  const { id, name, volume, price, oldPrice, discount, isNew, image } = product;
  const { open } = useQuickView();
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const isMidAutumn = theme?.id === "trung-thu";

  // Đọc tokens từ theme object — fallback về pink-classic defaults
  const ct = theme?.sectionTheme?.productCard;
  const cardBg          = ct?.bg            ?? "white";
  const cardBorder      = ct?.border        ?? "none";
  const hoverShadow     = ct?.hoverShadow   ?? undefined;
  const imageBg         = ct?.imageBg       ?? "#fff9fa";
  const nameColor       = ct?.nameColor     ?? "#2d3748";
  const nameHover       = ct?.nameHoverColor ?? "#F7a3a9";
  const volumeColor     = ct?.volumeColor   ?? "#9ca3af";
  const priceColor      = ct?.priceColor    ?? "#F7a3a9";
  const oldPriceColor   = ct?.oldPriceColor ?? "#9ca3af";
  const discountBg      = ct?.discountBadge?.bg   ?? "#ef4444";
  const discountText    = ct?.discountBadge?.text ?? "white";
  const newBg           = ct?.newBadge?.bg   ?? "#facc15";
  const newText         = ct?.newBadge?.text ?? "white";
  const cartBg          = ct?.cartBtn?.bg   ?? "#F7a3a9";
  const cartText        = ct?.cartBtn?.text ?? "white";
  const actionHoverBg   = ct?.actionHoverBg   ?? "#F7a3a9";
  const actionHoverText = ct?.actionHoverText ?? "white";
  const actionIconColor = ct?.actionIconColor ?? "#F7a3a9";

  return (
    <Link href={`/products/${id}`} className="block w-full h-full">
      <div
        className="group relative w-full h-full min-w-0 rounded-[20px] shadow-sm p-4 flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
        style={{ background: cardBg, border: cardBorder }}
        onMouseEnter={(e) => { if (hoverShadow) e.currentTarget.style.boxShadow = hoverShadow; }}
        onMouseLeave={(e) => { if (hoverShadow) e.currentTarget.style.boxShadow = "none"; }}
      >
        {/* Badges */}
        <div className="absolute top-5 left-5 z-10 flex flex-col gap-1">
          {discount && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: discountBg, color: discountText }}>
              -{discount}%
            </span>
          )}
          {isNew && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: newBg, color: newText }}>
              MỚI
            </span>
          )}
        </div>

        {/* Image */}
        <div className="relative w-full h-48 min-h-[12rem] overflow-hidden rounded-xl mb-4"
          style={{ background: imageBg }}>
          {image && (
            <Image src={image} alt={name} fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="w-full h-full object-contain p-2 transition-transform duration-300 ease-in-out group-hover:scale-[1.08]"
            />
          )}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

          {/* Action buttons — desktop only */}
          <div className="absolute inset-0 hidden sm:flex items-center justify-center gap-4">
            <button
              aria-label="Xem nhanh sản phẩm"
              onClick={(e) => { e.preventDefault(); open(product); }}
              className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = actionHoverBg;
                e.currentTarget.querySelector("svg").style.color = actionHoverText;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.querySelector("svg").style.color = actionIconColor;
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-colors"
                style={{ color: actionIconColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              aria-label="Thêm vào giỏ hàng"
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = actionHoverBg;
                e.currentTarget.querySelector("svg").style.color = actionHoverText;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.querySelector("svg").style.color = actionIconColor;
              }}
            >
              <ShoppingCart className="w-5 h-5 transition-colors" style={{ color: actionIconColor }} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col items-center gap-1 mt-auto">
          <h3
            className="text-center font-bold text-sm line-clamp-2 min-h-[56px] leading-7 flex items-center justify-center transition-colors duration-300"
            style={{ color: nameColor }}
            onMouseEnter={(e) => { e.currentTarget.style.color = nameHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = nameColor; }}
          >
            {name}
          </h3>
          <p className="text-xs" style={{ color: volumeColor }}>{volume}</p>

          <div className="flex items-center justify-between sm:justify-center w-full mt-1 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm" style={{ color: priceColor }}>
                {price.toLocaleString("vi-VN")}đ
              </span>
              {oldPrice && (
                <span className="text-xs line-through" style={{ color: oldPriceColor }}>
                  {oldPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>
            {/* Cart button — mobile only */}
            <button
              aria-label="Thêm vào giỏ hàng"
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform flex-shrink-0"
              style={{ background: cartBg, color: cartText }}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>

          {/* Tồn kho theo chi nhánh */}
          <LocationBadge
            locations={displayLocations ?? product.locations}
            mode="card"
            textColor={volumeColor}
            accentColor={priceColor}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
