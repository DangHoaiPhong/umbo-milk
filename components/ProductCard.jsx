"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useQuickView } from "./QuickViewContext";
import { useCart } from "./CartContext";

const ProductCard = ({ product }) => {
  const { id, name, volume, price, oldPrice, discount, isNew, image } = product;
  const { open } = useQuickView();
  const { addToCart } = useCart();

  return (
    <Link href={`/products/${id}`} className="block">
      <div className="group relative bg-white rounded-[20px] shadow-sm p-4 flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        {/* Badges */}
        <div className="absolute top-5 left-5 z-10 flex flex-col gap-1">
          {discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
          {isNew && (
            <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              MỚI
            </span>
          )}
        </div>

        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4">
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.08]"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

          {/* Action buttons — desktop only */}
          <div className="absolute inset-0 hidden sm:flex items-center justify-center gap-4">
            <button
              aria-label="Xem nhanh sản phẩm"
              onClick={(e) => {
                e.preventDefault();
                open(product);
              }}
              className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out hover:bg-[#F7a3a9] group/eye"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[#F7a3a9] group-hover/eye:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            <button
              aria-label="Thêm vào giỏ hàng"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out hover:bg-[#F7a3a9] group/cart"
            >
              <ShoppingCart className="w-5 h-5 text-[#F7a3a9] group-hover/cart:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col items-center gap-1 mt-auto">
          <h3 className="text-center font-bold text-[#2d3748] text-sm transition-colors duration-300 group-hover:text-[#F7a3a9] line-clamp-2 min-h-[56px] leading-7 flex items-center justify-center">
            {name}
          </h3>
          <p className="text-gray-400 text-xs">{volume}</p>

          <div className="flex items-center justify-between sm:justify-center w-full mt-1">
            <div className="flex items-center gap-2">
              <span className="text-[#F7a3a9] font-bold text-sm">
                {price.toLocaleString("vi-VN")}đ
              </span>
              {oldPrice && (
                <span className="text-gray-400 text-xs line-through">
                  {oldPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>

            {/* Cart button — mobile only */}
            <button
              aria-label="Thêm vào giỏ hàng"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="sm:hidden w-8 h-8 rounded-full bg-[#F7a3a9] flex items-center justify-center shadow-sm active:scale-90 transition-transform flex-shrink-0"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
