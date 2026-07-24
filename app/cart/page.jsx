"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  Truck,
  Store,
  Shield,
  Leaf,
  Tag,
} from "lucide-react";
import { useCart } from "@/components/CartContext";
import placeholderImage from "@/assets/images/umboMilk.jpg";

const STORES = [
  "CN 1: 111 Tôn Đản, Quận 4",
  "CN 2: 120 Hoàng Diệu 2, TP. Thủ Đức",
  "CN 3: 261 Tô Hiến Thành, Quận 10",
  "CN 4: 130 Vạn Kiếp, Bình Thạnh",
];

const SHIPPING_FEE = 0; // miễn phí nội thành

/* ── Input chung ── */
const Field = ({ label, type = "text", placeholder, value, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-[#2d3748]">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 text-sm border border-[#f7d0d3] rounded-xl outline-none focus:ring-2 focus:ring-[#F7a3a9]/30 focus:border-[#F7a3a9] text-gray-700 placeholder-gray-400 transition-all"
    />
  </div>
);

/* ── Card sản phẩm ── */
function CartItem({ item, onRemove, onUpdate, index }) {
  const { product, qty } = item;
  const [removing, setRemoving] = useState(false);
  const imageSrc =
    typeof product.image === "string" && product.image.trim().length > 0
      ? product.image
      : placeholderImage;

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(product.id), 320);
  };

  return (
    <div
      className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-[#f7d0d3]/60 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
      style={{
        animation: `fadeSlideUp 350ms ease-out ${index * 60}ms both`,
        opacity: removing ? 0 : 1,
        transform: removing ? "translateX(24px)" : undefined,
        transition: removing
          ? "opacity 300ms ease, transform 300ms ease"
          : undefined,
      }}
    >
      {/* Ảnh */}
      <Link href={`/products/${product.id}`} className="flex-shrink-0">
        <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden bg-[#fff3f4]">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        </div>
      </Link>

      {/* Thông tin */}
      <div className="flex-1 min-w-0">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-[#2d3748] text-sm leading-snug line-clamp-2 hover:text-[#F7a3a9] transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.volume && (
          <p className="text-xs text-gray-400 mt-0.5">{product.volume}</p>
        )}
        <p className="text-sm font-bold text-[#F7a3a9] mt-1">
          {product.price.toLocaleString("vi-VN")}đ
        </p>

        {/* Qty */}
        <div className="flex items-center gap-2 mt-2.5">
          <div className="flex items-center border border-[#f7d0d3] rounded-lg overflow-hidden">
            <button
              onClick={() =>
                qty === 1 ? handleRemove() : onUpdate(product.id, qty - 1)
              }
              className="w-8 h-8 flex items-center justify-center text-[#F7a3a9] hover:bg-[#fff3f4] transition-colors"
            >
              <Minus size={13} />
            </button>
            <span className="min-w-[32px] text-center text-sm font-bold text-[#2d3748] select-none">
              {qty}
            </span>
            <button
              onClick={() => onUpdate(product.id, qty + 1)}
              className="w-8 h-8 flex items-center justify-center text-[#F7a3a9] hover:bg-[#fff3f4] transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Thành tiền + Xóa */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <button
          onClick={handleRemove}
          className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors"
        >
          <X size={14} />
        </button>
        <p className="text-sm font-bold text-[#2d3748] whitespace-nowrap">
          {(product.price * qty).toLocaleString("vi-VN")}đ
        </p>
      </div>
    </div>
  );
}

/* ── Trang chính ── */
export default function CartPage() {
  const { items, totalCount, totalPrice, removeFromCart, updateQty } =
    useCart();

  const [note, setNote] = useState("");
  const [delivery, setDelivery] = useState("home");
  const [selectedStore, setSelectedStore] = useState(STORES[0]);
  const [wantVat, setWantVat] = useState(false);
  const [vat, setVat] = useState({
    company: "",
    taxCode: "",
    email: "",
    address: "",
  });

  const finalTotal = totalPrice + SHIPPING_FEE;

  /* Giỏ rỗng */
  if (items.length === 0) {
    return (
      <main className="flex-1 bg-[#fff3f4] min-h-screen flex items-center justify-center px-4">
        <div
          className="text-center flex flex-col items-center gap-5"
          style={{ animation: "fadeSlideUp 400ms ease-out both" }}
        >
          <div className="w-28 h-28 rounded-full bg-white shadow-sm flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-[#f7c5c8]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2d3748]">
              Giỏ hàng của bạn đang trống.
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Hãy thêm sản phẩm để tiếp tục mua sắm.
            </p>
          </div>
          <Link
            href="/products"
            className="px-8 py-3 bg-[#F7a3a9] text-white text-sm font-bold rounded-full shadow-[0_4px_14px_rgba(247,163,169,0.35)] hover:bg-[#f08a91] hover:scale-[1.02] transition-all duration-200"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[#fff3f4] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-gray-400 mb-8"
          style={{ animation: "fadeSlideUp 300ms ease-out both" }}
        >
          <Link href="/" className="hover:text-[#F7a3a9] transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-[#F7a3a9] font-semibold">Giỏ hàng</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
          {/* ══ CỘT TRÁI ══ */}
          <div
            className="w-full lg:w-[68%] flex flex-col gap-6"
            style={{ animation: "fadeSlideUp 380ms ease-out both" }}
          >
            {/* Tiêu đề */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#2d3748]">
                Giỏ hàng của bạn
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Bạn đang có{" "}
                <span className="text-[#F7a3a9] font-semibold">
                  {totalCount} sản phẩm
                </span>{" "}
                trong giỏ hàng.
              </p>
              <div className="mt-2 h-1 w-14 bg-[#F7a3a9] rounded-full" />
            </div>

            {/* Danh sách sản phẩm */}
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  index={i}
                  onRemove={removeFromCart}
                  onUpdate={updateQty}
                />
              ))}
            </div>

            {/* Ghi chú */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f7d0d3]/60">
              <h3 className="text-sm font-bold text-[#2d3748] mb-3">
                Ghi chú đơn hàng
              </h3>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nhập ghi chú cho đơn hàng..."
                className="w-full px-4 py-3 text-sm border border-[#f7d0d3] rounded-xl outline-none focus:ring-2 focus:ring-[#F7a3a9]/30 focus:border-[#F7a3a9] text-gray-700 placeholder-gray-400 resize-none transition-all"
              />
            </div>

            {/* Xuất hóa đơn VAT */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f7d0d3]/60">
              {/* Checkbox toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={wantVat}
                    onChange={(e) => setWantVat(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                      wantVat
                        ? "bg-[#F7a3a9] border-[#F7a3a9]"
                        : "border-[#f7d0d3] bg-white"
                    }`}
                  >
                    {wantVat && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#2d3748]">
                  Tôi muốn xuất hóa đơn VAT
                </span>
              </label>

              {/* Form VAT — slide down */}
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: wantVat ? "1fr" : "0fr",
                  transition: "grid-template-rows 300ms ease-in-out",
                }}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <Field
                      label="Tên công ty"
                      placeholder="Công ty TNHH..."
                      value={vat.company}
                      onChange={(e) =>
                        setVat({ ...vat, company: e.target.value })
                      }
                    />
                    <Field
                      label="Mã số thuế"
                      placeholder="0123456789"
                      value={vat.taxCode}
                      onChange={(e) =>
                        setVat({ ...vat, taxCode: e.target.value })
                      }
                    />
                    <Field
                      label="Email nhận hóa đơn"
                      type="email"
                      placeholder="ketoan@company.com"
                      value={vat.email}
                      onChange={(e) =>
                        setVat({ ...vat, email: e.target.value })
                      }
                    />
                    <Field
                      label="Địa chỉ công ty"
                      placeholder="Số nhà, đường, phường, quận..."
                      value={vat.address}
                      onChange={(e) =>
                        setVat({ ...vat, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ CỘT PHẢI ══ */}
          <div
            className="w-full lg:w-[32%] flex flex-col gap-4 lg:sticky lg:top-24"
            style={{ animation: "fadeSlideUp 450ms ease-out both" }}
          >
            {/* Tóm tắt đơn hàng */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f7d0d3]/60">
              <h3 className="text-sm font-bold text-[#2d3748] mb-4">
                Thông tin đơn hàng
              </h3>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Tổng sản phẩm</span>
                  <span className="font-semibold text-[#2d3748]">
                    {totalCount}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tạm tính</span>
                  <span className="font-semibold text-[#2d3748]">
                    {totalPrice.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold text-green-500">Miễn phí</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span className="flex items-center gap-1">
                    <Tag size={13} /> Khuyến mãi
                  </span>
                  <span className="text-gray-400 text-xs">Chưa áp dụng</span>
                </div>
                <div className="h-px bg-[#f7d0d3] my-1" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#2d3748]">
                    Tổng thanh toán
                  </span>
                  <span className="text-lg font-bold text-[#F7a3a9]">
                    {finalTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>
            </div>

            {/* Hình thức giao hàng */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f7d0d3]/60">
              <h3 className="text-sm font-bold text-[#2d3748] mb-4">
                Hình thức giao hàng
              </h3>

              <div className="flex flex-col gap-3">
                {/* Giao tận nơi */}
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${delivery === "home" ? "border-[#F7a3a9] bg-[#fff3f4]" : "border-gray-100 hover:border-[#f7d0d3]"}`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="home"
                    checked={delivery === "home"}
                    onChange={() => setDelivery("home")}
                    className="accent-[#F7a3a9]"
                  />
                  <Truck size={16} className="text-[#F7a3a9] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#2d3748]">
                    Giao tận nơi
                  </span>
                </label>

                {/* Nhận tại cửa hàng */}
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${delivery === "store" ? "border-[#F7a3a9] bg-[#fff3f4]" : "border-gray-100 hover:border-[#f7d0d3]"}`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="store"
                    checked={delivery === "store"}
                    onChange={() => setDelivery("store")}
                    className="accent-[#F7a3a9]"
                  />
                  <Store size={16} className="text-[#F7a3a9] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#2d3748]">
                    Nhận tại cửa hàng
                  </span>
                </label>

                {/* Danh sách chi nhánh */}
                {delivery === "store" && (
                  <div
                    className="flex flex-col gap-2 pl-2 mt-1"
                    style={{ animation: "fadeSlideUp 250ms ease-out both" }}
                  >
                    {STORES.map((s) => (
                      <label
                        key={s}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all text-xs ${selectedStore === s ? "border-[#F7a3a9] bg-[#fff3f4] text-[#2d3748] font-semibold" : "border-gray-100 text-gray-500 hover:border-[#f7d0d3]"}`}
                      >
                        <input
                          type="radio"
                          name="store"
                          value={s}
                          checked={selectedStore === s}
                          onChange={() => setSelectedStore(s)}
                          className="accent-[#F7a3a9] mt-0.5 flex-shrink-0"
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Nút thanh toán */}
            <Link
              href="/checkout"
              className="w-full py-4 bg-[#F7a3a9] text-white font-bold text-sm rounded-2xl shadow-[0_4px_18px_rgba(247,163,169,0.4)] hover:bg-[#f08a91] hover:shadow-[0_6px_24px_rgba(247,163,169,0.5)] hover:scale-[1.01] active:scale-100 transition-all duration-200 text-center block"
            >
              Thanh toán ngay
            </Link>

            <Link
              href="/products"
              className="w-full py-3 text-sm font-semibold text-[#F7a3a9] border-2 border-[#F7a3a9] rounded-2xl text-center hover:bg-[#fff3f4] transition-colors duration-200 block"
            >
              ← Tiếp tục mua sắm
            </Link>

            {/* Chính sách */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#f7d0d3]/60">
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: <Truck size={15} className="text-[#F7a3a9]" />,
                    text: "Miễn phí giao nội thành",
                  },
                  {
                    icon: <Shield size={15} className="text-[#F7a3a9]" />,
                    text: "Thanh toán an toàn",
                  },
                  {
                    icon: <Leaf size={15} className="text-[#F7a3a9]" />,
                    text: "Cam kết sản phẩm tươi mới",
                  },
                ].map(({ icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 text-xs text-gray-500"
                  >
                    {icon}
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
