"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const {
    items,
    totalCount,
    totalPrice,
    removeFromCart,
    updateQty,
    drawerOpen,
    setDrawerOpen,
  } = useCart();

  const clearCart = () => items.forEach((i) => removeFromCart(i.product.id));
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setDrawerOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setDrawerOpen(false)}
        className="fixed inset-0 bg-black/40 z-[9990] transition-opacity duration-300"
        style={{
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
        }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[9991] flex flex-col shadow-2xl transition-transform duration-300 ease-out"
        style={{ transform: drawerOpen ? "translateX(0)" : "translateX(100%)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Giỏ hàng"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f7d0d3]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F7a3a9]" />
            <h2 className="font-bold text-[#2d3748] text-base">Giỏ hàng</h2>
            {totalCount > 0 && (
              <span className="bg-[#F7a3a9] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-red-400 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
              >
                Xóa tất cả
              </button>
            )}
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Đóng giỏ hàng"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="w-24 h-24 rounded-full bg-[#fff3f4] flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-[#f7c5c8]" />
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Chưa có sản phẩm trong giỏ hàng.
            </p>
            <button
              onClick={() => setDrawerOpen(false)}
              className="px-6 py-2.5 text-sm font-semibold text-[#F7a3a9] border-2 border-[#F7a3a9] rounded-full hover:bg-[#F7a3a9] hover:text-white transition-all duration-200"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex items-start gap-3">
                  <div className="relative w-[72px] h-[72px] flex-shrink-0 rounded-xl overflow-hidden bg-[#fff3f4]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="72px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2d3748] line-clamp-2 leading-snug">
                      {product.name}
                    </p>
                    <p className="text-sm font-bold text-[#F7a3a9] mt-0.5">
                      {product.price.toLocaleString("vi-VN")}đ
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#f7d0d3] rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(product.id, qty - 1)}
                          aria-label="Giảm"
                          className="w-7 h-7 flex items-center justify-center text-[#F7a3a9] hover:bg-[#fff3f4] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="min-w-[28px] text-center text-xs font-bold text-[#2d3748] select-none">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQty(product.id, qty + 1)}
                          aria-label="Tăng"
                          className="w-7 h-7 flex items-center justify-center text-[#F7a3a9] hover:bg-[#fff3f4] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        aria-label="Xóa"
                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-[#2d3748] whitespace-nowrap flex-shrink-0">
                    {(product.price * qty).toLocaleString("vi-VN")}đ
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-[#f7d0d3] px-5 py-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Tổng cộng</span>
                <span className="text-lg font-bold text-[#F7a3a9]">
                  {totalPrice.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-3.5 bg-[#F7a3a9] text-white text-sm font-bold rounded-xl shadow-[0_4px_14px_rgba(247,163,169,0.35)] hover:bg-[#f08a91] hover:scale-[1.01] transition-all duration-200 text-center block"
              >
                Thanh toán ngay
              </Link>
              <Link
                href="/cart"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-2.5 text-sm font-semibold text-[#F7a3a9] border-2 border-[#F7a3a9] rounded-xl text-center hover:bg-[#fff3f4] transition-colors duration-200 block"
              >
                Xem giỏ hàng
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
