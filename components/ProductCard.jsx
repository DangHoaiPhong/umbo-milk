"use client";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { name, volume, price, oldPrice, discount, isNew, image } = product;

  return (
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
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.08]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

        {/* Cart button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            aria-label="Thêm vào giỏ hàng"
            className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out"
          >
            <ShoppingCart className="w-6 h-6 text-[#F7a3a9]" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col items-center gap-1 mt-auto">
        <h3 className="text-center font-bold text-[#2d3748] text-sm transition-colors duration-300 group-hover:text-[#F7a3a9] line-clamp-2 min-h-[56px] leading-7 flex items-center justify-center">
          {name}
        </h3>
        <p className="text-gray-400 text-xs">{volume}</p>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#F7a3a9] font-bold text-sm">
            {price.toLocaleString("vi-VN")}đ
          </span>
          {oldPrice && (
            <span className="text-gray-400 text-xs line-through">
              {oldPrice.toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
