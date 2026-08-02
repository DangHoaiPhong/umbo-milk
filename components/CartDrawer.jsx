"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import placeholderImage from "@/assets/images/umboMilk.jpg";
import { useCart } from "./CartContext";
import { useTheme } from "@/components/ThemeProvider";

const defaultTokens = {
  bg: "white",
  overlayBg: "rgba(0,0,0,0.4)",
  headerBorder: "1px solid #f7d0d3",
  titleColor: "#2d3748",
  badgeBg: "#F7a3a9",
  badgeText: "white",
  clearColor: "#9ca3af",
  clearHoverBg: "#fef2f2",
  clearHoverColor: "#f87171",
  closeColor: "#9ca3af",
  closeHoverBg: "#f3f4f6",
  emptyBg: "#fff3f4",
  emptyIconColor: "#f7c5c8",
  emptyTextColor: "#6b7280",
  emptyBtnColor: "#F7a3a9",
  emptyBtnBorder: "#F7a3a9",
  emptyBtnHoverBg: "#fff3f4",
  itemImageBg: "#fff3f4",
  itemNameColor: "#2d3748",
  itemPriceColor: "#F7a3a9",
  itemTotalColor: "#2d3748",
  qtyBorder: "1px solid #f7d0d3",
  qtyBtnColor: "#F7a3a9",
  qtyBtnHoverBg: "#fff3f4",
  qtyNumColor: "#2d3748",
  trashHoverBg: "#fef2f2",
  trashHoverColor: "#f87171",
  footerBorder: "1px solid #f7d0d3",
  totalLabelColor: "#6b7280",
  totalAmountColor: "#F7a3a9",
  checkoutBg: "#F7a3a9",
  checkoutHoverBg: "#f08a91",
  checkoutShadow: "0 4px 14px rgba(247,163,169,0.35)",
  viewCartColor: "#F7a3a9",
  viewCartBorder: "#F7a3a9",
  viewCartHoverBg: "#fff3f4",
  iconColor: "#F7a3a9",
};

export default function CartDrawer() {
  const {
    items, totalCount, totalPrice,
    removeFromCart, updateQty, clearCart,
    drawerOpen, setDrawerOpen,
  } = useCart();
  const overlayRef = useRef(null);
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.cartDrawer ?? defaultTokens;

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setDrawerOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setDrawerOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setDrawerOpen(false)}
        className="fixed inset-0 z-[9990] transition-opacity duration-300"
        style={{
          background: t.overlayBg,
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
        }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-[400px] z-[9991] flex flex-col shadow-2xl transition-transform duration-300 ease-out"
        style={{
          background: t.bg,
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
        }}
        role="dialog" aria-modal="true" aria-label="Giỏ hàng"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: t.headerBorder }}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" style={{ color: t.iconColor }} />
            <h2 className="font-bold text-base" style={{ color: t.titleColor }}>Giỏ hàng</h2>
            {totalCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: t.badgeBg, color: t.badgeText }}>
                {totalCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button onClick={clearCart}
                className="text-xs px-2 py-1 rounded-lg transition-colors"
                style={{ color: t.clearColor }}
                onMouseEnter={(e) => { e.currentTarget.style.background = t.clearHoverBg; e.currentTarget.style.color = t.clearHoverColor; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = t.clearColor; }}>
                Xóa tất cả
              </button>
            )}
            <button onClick={() => setDrawerOpen(false)} aria-label="Đóng giỏ hàng"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ color: t.closeColor }}
              onMouseEnter={(e) => { e.currentTarget.style.background = t.closeHoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: t.emptyBg }}>
              <ShoppingBag className="w-10 h-10" style={{ color: t.emptyIconColor }} />
            </div>
            <p className="text-sm font-medium" style={{ color: t.emptyTextColor }}>
              Chưa có sản phẩm trong giỏ hàng.
            </p>
            <button onClick={() => setDrawerOpen(false)}
              className="px-6 py-2.5 text-sm font-semibold rounded-full border-2 transition-all duration-200"
              style={{ color: t.emptyBtnColor, borderColor: t.emptyBtnBorder }}
              onMouseEnter={(e) => { e.currentTarget.style.background = t.emptyBtnHoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {items.map(({ product, qty }) => {
                const imageSrc = typeof product.image === "string" && product.image.trim().length > 0
                  ? product.image : placeholderImage;
                return (
                  <div key={product.id} className="flex items-start gap-3">
                    <div className="relative w-[72px] h-[72px] flex-shrink-0 rounded-xl overflow-hidden"
                      style={{ background: t.itemImageBg }}>
                      <Image src={imageSrc} alt={product.name} fill sizes="72px" className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold line-clamp-2 leading-snug" style={{ color: t.itemNameColor }}>
                        {product.name}
                      </p>
                      <p className="text-sm font-bold mt-0.5" style={{ color: t.itemPriceColor }}>
                        {product.price.toLocaleString("vi-VN")}đ
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center rounded-lg overflow-hidden" style={{ border: t.qtyBorder }}>
                          <button onClick={() => updateQty(product.id, qty - 1)} aria-label="Giảm"
                            className="w-7 h-7 flex items-center justify-center transition-colors"
                            style={{ color: t.qtyBtnColor }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = t.qtyBtnHoverBg; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                            <Minus size={12} />
                          </button>
                          <span className="min-w-[28px] text-center text-xs font-bold select-none"
                            style={{ color: t.qtyNumColor }}>{qty}</span>
                          <button onClick={() => updateQty(product.id, qty + 1)} aria-label="Tăng"
                            className="w-7 h-7 flex items-center justify-center transition-colors"
                            style={{ color: t.qtyBtnColor }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = t.qtyBtnHoverBg; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(product.id)} aria-label="Xóa"
                          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                          style={{ color: t.closeColor }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = t.trashHoverBg; e.currentTarget.style.color = t.trashHoverColor; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = t.closeColor; }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs font-bold whitespace-nowrap flex-shrink-0" style={{ color: t.itemTotalColor }}>
                      {(product.price * qty).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 flex flex-col gap-3" style={{ borderTop: t.footerBorder }}>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: t.totalLabelColor }}>Tổng cộng</span>
                <span className="text-lg font-bold" style={{ color: t.totalAmountColor }}>
                  {totalPrice.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <Link href="/checkout" onClick={() => setDrawerOpen(false)}
                className="w-full py-3.5 text-white text-sm font-bold rounded-xl text-center block transition-all duration-200 hover:scale-[1.01]"
                style={{ background: t.checkoutBg, boxShadow: t.checkoutShadow }}
                onMouseEnter={(e) => { e.currentTarget.style.background = t.checkoutHoverBg; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = t.checkoutBg; }}>
                Thanh toán ngay
              </Link>
              <Link href="/cart" onClick={() => setDrawerOpen(false)}
                className="w-full py-2.5 text-sm font-semibold rounded-xl text-center border-2 block transition-colors duration-200"
                style={{ color: t.viewCartColor, borderColor: t.viewCartBorder }}
                onMouseEnter={(e) => { e.currentTarget.style.background = t.viewCartHoverBg; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                Xem giỏ hàng
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
