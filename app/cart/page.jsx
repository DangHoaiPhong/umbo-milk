"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, Truck, Store, Shield, Leaf, Tag } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useTheme } from "@/components/ThemeProvider";
import placeholderImage from "@/assets/images/umboMilk.jpg";

const defaultTokens = {
  bg: "#fff3f4",
  breadcrumbColor: "#9ca3af",
  breadcrumbActiveColor: "#F7a3a9",
  headingColor: "#2d3748",
  subColor: "#9ca3af",
  accentColor: "#F7a3a9",
  dividerColor: "#F7a3a9",
  cardBg: "white",
  cardBorder: "rgba(247,208,211,0.6)",
  itemImageBg: "#fff3f4",
  itemNameColor: "#2d3748",
  itemNameHoverColor: "#F7a3a9",
  itemVolumeColor: "#9ca3af",
  itemPriceColor: "#F7a3a9",
  itemTotalColor: "#2d3748",
  qtyBorder: "#f7d0d3",
  qtyBtnColor: "#F7a3a9",
  qtyBtnHoverBg: "#fff3f4",
  qtyNumColor: "#2d3748",
  removeColor: "#d1d5db",
  removeHoverColor: "#f87171",
  removeHoverBg: "#fef2f2",
  noteBg: "white",
  noteBorder: "rgba(247,208,211,0.6)",
  noteHeadingColor: "#2d3748",
  noteInputBg: "white",
  noteInputBorder: "#f7d0d3",
  noteInputColor: "#374151",
  noteInputFocusBorder: "#F7a3a9",
  vatBg: "white",
  vatBorder: "rgba(247,208,211,0.6)",
  vatCheckActiveBg: "#F7a3a9",
  vatCheckActiveBorder: "#F7a3a9",
  vatCheckActiveIcon: "white",
  vatCheckInactiveBorder: "#f7d0d3",
  vatLabelColor: "#2d3748",
  summaryBg: "white",
  summaryBorder: "rgba(247,208,211,0.6)",
  summaryHeadingColor: "#2d3748",
  summaryLabelColor: "#6b7280",
  summaryValueColor: "#2d3748",
  summaryTotalColor: "#F7a3a9",
  shippingBg: "white",
  shippingBorder: "rgba(247,208,211,0.6)",
  shippingHeadingColor: "#2d3748",
  radioActiveBorder: "#F7a3a9",
  radioActiveBg: "#fff3f4",
  radioInactiveBorder: "#f3f4f6",
  radioLabelColor: "#2d3748",
  radioIconColor: "#F7a3a9",
  storeBranchActiveBorder: "#F7a3a9",
  storeBranchActiveBg: "#fff3f4",
  storeBranchActiveColor: "#2d3748",
  storeBranchInactiveBorder: "#f3f4f6",
  storeBranchInactiveColor: "#6b7280",
  checkoutBtnBg: "#F7a3a9",
  checkoutBtnShadow: "0 4px 18px rgba(247,163,169,0.4)",
  checkoutBtnHoverBg: "#f08a91",
  continueBtnColor: "#F7a3a9",
  continueBtnBorder: "#F7a3a9",
  continueBtnHoverBg: "#fff3f4",
  policyBg: "white",
  policyBorder: "rgba(247,208,211,0.6)",
  policyIconColor: "#F7a3a9",
  policyTextColor: "#6b7280",
  emptyBg: "#fff3f4",
  emptyIconBg: "white",
  emptyIconColor: "#f7c5c8",
  emptyHeadingColor: "#2d3748",
  emptySubColor: "#9ca3af",
  emptyBtnBg: "#F7a3a9",
  emptyBtnShadow: "0 4px 14px rgba(247,163,169,0.35)",
};

const STORES = [
  "CN 1: 111 Tôn Đản, Quận 4",
  "CN 2: 120 Hoàng Diệu 2, TP. Thủ Đức",
  "CN 3: 261 Tô Hiến Thành, Quận 10",
  "CN 4: 130 Vạn Kiếp, Bình Thạnh",
];

const SHIPPING_FEE = 0;

function Field({ label, type = "text", placeholder, value, onChange, t }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: t.summaryHeadingColor }}>{label}</label>
      <input
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        className="w-full px-4 py-2.5 text-sm rounded-xl outline-none transition-all"
        style={{ border: `1px solid ${t.noteInputBorder}`, background: t.noteInputBg, color: t.noteInputColor }}
        onFocus={(e) => { e.currentTarget.style.borderColor = t.noteInputFocusBorder; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = t.noteInputBorder; }}
      />
    </div>
  );
}

function CartItem({ item, onRemove, onUpdate, index, t }) {
  const { product, qty } = item;
  const [removing, setRemoving] = useState(false);
  const imageSrc = typeof product.image === "string" && product.image.trim().length > 0 ? product.image : placeholderImage;

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(product.id), 320);
  };

  return (
    <div
      className="flex items-start gap-4 rounded-2xl p-4 hover:-translate-y-0.5 transition-all duration-300"
      style={{
        background: t.cardBg,
        border: `1px solid ${t.cardBorder}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        animation: `fadeSlideUp 350ms ease-out ${index * 60}ms both`,
        opacity: removing ? 0 : 1,
        transform: removing ? "translateX(24px)" : undefined,
        transition: removing ? "opacity 300ms ease, transform 300ms ease" : undefined,
      }}
    >
      <Link href={`/products/${product.id}`} className="flex-shrink-0">
        <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden" style={{ background: t.itemImageBg }}>
          <Image src={imageSrc} alt={product.name} fill sizes="80px" className="object-contain p-1" />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-sm leading-snug line-clamp-2 transition-colors"
            style={{ color: t.itemNameColor }}
            onMouseEnter={(e) => { e.currentTarget.style.color = t.itemNameHoverColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = t.itemNameColor; }}>
            {product.name}
          </h3>
        </Link>
        {product.volume && <p className="text-xs mt-0.5" style={{ color: t.itemVolumeColor }}>{product.volume}</p>}
        <p className="text-sm font-bold mt-1" style={{ color: t.itemPriceColor }}>
          {product.price.toLocaleString("vi-VN")}đ
        </p>
        <div className="flex items-center gap-2 mt-2.5">
          <div className="flex items-center rounded-lg overflow-hidden" style={{ border: `1px solid ${t.qtyBorder}` }}>
            <button onClick={() => qty === 1 ? handleRemove() : onUpdate(product.id, qty - 1)}
              className="w-8 h-8 flex items-center justify-center transition-colors"
              style={{ color: t.qtyBtnColor }}
              onMouseEnter={(e) => { e.currentTarget.style.background = t.qtyBtnHoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              <Minus size={13} />
            </button>
            <span className="min-w-[32px] text-center text-sm font-bold select-none" style={{ color: t.qtyNumColor }}>{qty}</span>
            <button onClick={() => onUpdate(product.id, qty + 1)}
              className="w-8 h-8 flex items-center justify-center transition-colors"
              style={{ color: t.qtyBtnColor }}
              onMouseEnter={(e) => { e.currentTarget.style.background = t.qtyBtnHoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              <Plus size={13} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <button onClick={handleRemove}
          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
          style={{ color: t.removeColor }}
          onMouseEnter={(e) => { e.currentTarget.style.color = t.removeHoverColor; e.currentTarget.style.background = t.removeHoverBg; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = t.removeColor; e.currentTarget.style.background = "transparent"; }}>
          <X size={14} />
        </button>
        <p className="text-sm font-bold whitespace-nowrap" style={{ color: t.itemTotalColor }}>
          {(product.price * qty).toLocaleString("vi-VN")}đ
        </p>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, totalCount, totalPrice, removeFromCart, updateQty } = useCart();
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.cartPage ?? defaultTokens;

  const [note, setNote] = useState("");
  const [delivery, setDelivery] = useState("home");
  const [selectedStore, setSelectedStore] = useState(STORES[0]);
  const [wantVat, setWantVat] = useState(false);
  const [vat, setVat] = useState({ company: "", taxCode: "", email: "", address: "" });

  const finalTotal = totalPrice + SHIPPING_FEE;

  if (items.length === 0) {
    return (
      <main className="flex-1 min-h-screen flex items-center justify-center px-4" style={{ background: t.emptyBg }}>
        <div className="text-center flex flex-col items-center gap-5" style={{ animation: "fadeSlideUp 400ms ease-out both" }}>
          <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-sm" style={{ background: t.emptyIconBg }}>
            <ShoppingBag className="w-12 h-12" style={{ color: t.emptyIconColor }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: t.emptyHeadingColor }}>Giỏ hàng của bạn đang trống.</h2>
            <p className="text-sm mt-1" style={{ color: t.emptySubColor }}>Hãy thêm sản phẩm để tiếp tục mua sắm.</p>
          </div>
          <Link href="/products"
            className="px-8 py-3 text-white text-sm font-bold rounded-full hover:scale-[1.02] transition-all duration-200"
            style={{ background: t.emptyBtnBg, boxShadow: t.emptyBtnShadow }}>
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 min-h-screen" style={{ background: t.bg }}>
      <div className="max-w-[1200px] mx-auto px-4 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: t.breadcrumbColor, animation: "fadeSlideUp 300ms ease-out both" }}>
          <Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: t.breadcrumbColor }}>Trang chủ</Link>
          <span>/</span>
          <span className="font-semibold" style={{ color: t.breadcrumbActiveColor }}>Giỏ hàng</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
          {/* LEFT */}
          <div className="w-full lg:w-[68%] flex flex-col gap-6" style={{ animation: "fadeSlideUp 380ms ease-out both" }}>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: t.headingColor }}>Giỏ hàng của bạn</h1>
              <p className="text-sm mt-1" style={{ color: t.subColor }}>
                Bạn đang có <span className="font-semibold" style={{ color: t.accentColor }}>{totalCount} sản phẩm</span> trong giỏ hàng.
              </p>
              <div className="mt-2 h-1 w-14 rounded-full" style={{ background: t.dividerColor }} />
            </div>

            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <CartItem key={item.product.id} item={item} index={i} onRemove={removeFromCart} onUpdate={updateQty} t={t} />
              ))}
            </div>

            {/* Note */}
            <div className="rounded-2xl p-5 shadow-sm" style={{ background: t.noteBg, border: `1px solid ${t.noteBorder}` }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: t.noteHeadingColor }}>Ghi chú đơn hàng</h3>
              <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)}
                placeholder="Nhập ghi chú cho đơn hàng..."
                className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none transition-all"
                style={{ border: `1px solid ${t.noteInputBorder}`, background: t.noteInputBg, color: t.noteInputColor }}
                onFocus={(e) => { e.currentTarget.style.borderColor = t.noteInputFocusBorder; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = t.noteInputBorder; }}
              />
            </div>

            {/* VAT */}
            <div className="rounded-2xl p-5 shadow-sm" style={{ background: t.vatBg, border: `1px solid ${t.vatBorder}` }}>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className="relative flex-shrink-0">
                  <input type="checkbox" checked={wantVat} onChange={(e) => setWantVat(e.target.checked)} className="sr-only" />
                  <div className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200"
                    style={{
                      background: wantVat ? t.vatCheckActiveBg : "transparent",
                      borderColor: wantVat ? t.vatCheckActiveBorder : t.vatCheckInactiveBorder,
                    }}>
                    {wantVat && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke={t.vatCheckActiveIcon} strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm font-semibold" style={{ color: t.vatLabelColor }}>Tôi muốn xuất hóa đơn VAT</span>
              </label>
              <div style={{ display: "grid", gridTemplateRows: wantVat ? "1fr" : "0fr", transition: "grid-template-rows 300ms ease-in-out" }}>
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <Field label="Tên công ty" placeholder="Công ty TNHH..." value={vat.company} onChange={(e) => setVat({ ...vat, company: e.target.value })} t={t} />
                    <Field label="Mã số thuế" placeholder="0123456789" value={vat.taxCode} onChange={(e) => setVat({ ...vat, taxCode: e.target.value })} t={t} />
                    <Field label="Email nhận hóa đơn" type="email" placeholder="ketoan@company.com" value={vat.email} onChange={(e) => setVat({ ...vat, email: e.target.value })} t={t} />
                    <Field label="Địa chỉ công ty" placeholder="Số nhà, đường, phường, quận..." value={vat.address} onChange={(e) => setVat({ ...vat, address: e.target.value })} t={t} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[32%] flex flex-col gap-4 lg:sticky lg:top-24" style={{ animation: "fadeSlideUp 450ms ease-out both" }}>
            {/* Summary */}
            <div className="rounded-2xl p-5 shadow-sm" style={{ background: t.summaryBg, border: `1px solid ${t.summaryBorder}` }}>
              <h3 className="text-sm font-bold mb-4" style={{ color: t.summaryHeadingColor }}>Thông tin đơn hàng</h3>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between" style={{ color: t.summaryLabelColor }}>
                  <span>Tổng sản phẩm</span>
                  <span className="font-semibold" style={{ color: t.summaryValueColor }}>{totalCount}</span>
                </div>
                <div className="flex justify-between" style={{ color: t.summaryLabelColor }}>
                  <span>Tạm tính</span>
                  <span className="font-semibold" style={{ color: t.summaryValueColor }}>{totalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="flex justify-between" style={{ color: t.summaryLabelColor }}>
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold text-green-500">Miễn phí</span>
                </div>
                <div className="flex justify-between" style={{ color: t.summaryLabelColor }}>
                  <span className="flex items-center gap-1"><Tag size={13} /> Khuyến mãi</span>
                  <span className="text-xs" style={{ color: t.summaryLabelColor }}>Chưa áp dụng</span>
                </div>
                <div className="h-px my-1" style={{ background: t.qtyBorder }} />
                <div className="flex justify-between items-center">
                  <span className="font-bold" style={{ color: t.summaryValueColor }}>Tổng thanh toán</span>
                  <span className="text-lg font-bold" style={{ color: t.summaryTotalColor }}>{finalTotal.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="rounded-2xl p-5 shadow-sm" style={{ background: t.shippingBg, border: `1px solid ${t.shippingBorder}` }}>
              <h3 className="text-sm font-bold mb-4" style={{ color: t.shippingHeadingColor }}>Hình thức giao hàng</h3>
              <div className="flex flex-col gap-3">
                {[
                  { value: "home", icon: <Truck size={16} />, label: "Giao tận nơi" },
                  { value: "store", icon: <Store size={16} />, label: "Nhận tại cửa hàng" },
                ].map(({ value, icon, label }) => (
                  <label key={value}
                    className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all"
                    style={{
                      borderColor: delivery === value ? t.radioActiveBorder : t.radioInactiveBorder,
                      background: delivery === value ? t.radioActiveBg : "transparent",
                    }}>
                    <input type="radio" name="delivery" value={value} checked={delivery === value}
                      onChange={() => setDelivery(value)} style={{ accentColor: t.radioActiveBorder }} />
                    <span style={{ color: t.radioIconColor }}>{icon}</span>
                    <span className="text-sm font-semibold" style={{ color: t.radioLabelColor }}>{label}</span>
                  </label>
                ))}

                {delivery === "store" && (
                  <div className="flex flex-col gap-2 pl-2 mt-1" style={{ animation: "fadeSlideUp 250ms ease-out both" }}>
                    {STORES.map((s) => (
                      <label key={s}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all text-xs"
                        style={{
                          borderColor: selectedStore === s ? t.storeBranchActiveBorder : t.storeBranchInactiveBorder,
                          background: selectedStore === s ? t.storeBranchActiveBg : "transparent",
                          color: selectedStore === s ? t.storeBranchActiveColor : t.storeBranchInactiveColor,
                          fontWeight: selectedStore === s ? "600" : "400",
                        }}>
                        <input type="radio" name="store" value={s} checked={selectedStore === s}
                          onChange={() => setSelectedStore(s)}
                          className="mt-0.5 flex-shrink-0" style={{ accentColor: t.radioActiveBorder }} />
                        {s}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Checkout btn */}
            <Link href="/checkout"
              className="w-full py-4 text-white font-bold text-sm rounded-2xl text-center block hover:scale-[1.01] active:scale-100 transition-all duration-200"
              style={{ background: t.checkoutBtnBg, boxShadow: t.checkoutBtnShadow }}
              onMouseEnter={(e) => { e.currentTarget.style.background = t.checkoutBtnHoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = t.checkoutBtnBg; }}>
              Thanh toán ngay
            </Link>
            <Link href="/products"
              className="w-full py-3 text-sm font-semibold rounded-2xl text-center border-2 block transition-colors duration-200"
              style={{ color: t.continueBtnColor, borderColor: t.continueBtnBorder }}
              onMouseEnter={(e) => { e.currentTarget.style.background = t.continueBtnHoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              ← Tiếp tục mua sắm
            </Link>

            {/* Policy */}
            <div className="rounded-2xl p-4 shadow-sm" style={{ background: t.policyBg, border: `1px solid ${t.policyBorder}` }}>
              <div className="flex flex-col gap-3">
                {[
                  { icon: <Truck size={15} />, text: "Miễn phí giao nội thành" },
                  { icon: <Shield size={15} />, text: "Thanh toán an toàn" },
                  { icon: <Leaf size={15} />, text: "Cam kết sản phẩm tươi mới" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-xs" style={{ color: t.policyTextColor }}>
                    <span style={{ color: t.policyIconColor }}>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
