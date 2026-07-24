"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Tag,
  Truck,
} from "lucide-react";
import { useCart } from "@/components/CartContext";
import placeholderImage from "@/assets/images/umboMilk.jpg";
import { FALLBACK_ADDRESS_DATA } from "@/data/addressData";

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    name: "Giao hàng tiêu chuẩn",
    service: "3-4 ngày",
    price: 35000,
  },
  { id: "fast", name: "Giao hàng nhanh", service: "1-2 ngày", price: 55000 },
  {
    id: "express",
    name: "Giao hàng hỏa tốc",
    service: "Trong ngày",
    price: 90000,
  },
];

const PAYMENT_OPTIONS = [
  {
    id: "qr",
    name: "Chuyển khoản QR",
    description: "Quét mã QR hoặc chuyển khoản nhanh",
    banks: [
      {
        name: "Vietcombank",
        branch: "CN Quận 1",
        account: "1028 699 920",
        owner: "Công ty Umbo Milk",
      },
      {
        name: "Techcombank",
        branch: "CN Bình Thạnh",
        account: "1902 201 909",
        owner: "Công ty Umbo Milk",
      },
    ],
  },
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng",
    description: "Thanh toán bằng tiền mặt khi giao hàng",
  },
];

const currency = (value) => `${value.toLocaleString("vi-VN")}đ`;

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required = false,
  children,
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-semibold text-[#2d3748]">
        {label}
        {required && <span className="ml-1 text-[#f08a91]">*</span>}
      </span>
      {children || (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-all ${
            error
              ? "border-red-300 bg-red-50 text-red-700"
              : "border-[#f7d0d3] bg-white text-[#2d3748] focus:border-[#F7a3a9] focus:ring-2 focus:ring-[#F7a3a9]/20"
          }`}
        />
      )}
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </label>
  );
}

export default function CheckoutPage() {
  const { items, totalCount, totalPrice, updateQty } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [note, setNote] = useState("");
  const [shippingMethod, setShippingMethod] = useState(SHIPPING_OPTIONS[0].id);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_OPTIONS[0].id);
  const [couponCode, setCouponCode] = useState("");
  const [couponState, setCouponState] = useState({
    applied: false,
    percent: 0,
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const loadAddressData = async () => {
      try {
        const res = await fetch("https://provinces.open-api.vn/api/p/");
        if (!res.ok) throw new Error("Failed to fetch provinces");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProvinces(data);
          return;
        }
      } catch (error) {
        console.warn("Using fallback address data", error);
      }

      setProvinces(
        FALLBACK_ADDRESS_DATA.map(({ code, name }) => ({ code, name })),
      );
    };

    loadAddressData();
  }, []);

  useEffect(() => {
    if (!provinceCode) {
      setDistricts([]);
      setDistrictCode("");
      setWards([]);
      setWardCode("");
      return;
    }

    const selectedProvince = FALLBACK_ADDRESS_DATA.find(
      (item) => String(item.code) === String(provinceCode),
    );

    if (selectedProvince) {
      setDistricts(selectedProvince.districts || []);
      return;
    }

    const loadDistricts = async () => {
      try {
        const res = await fetch(
          `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
        );
        if (!res.ok) throw new Error("Failed to fetch districts");
        const data = await res.json();
        setDistricts(data.districts || []);
      } catch (error) {
        console.warn("Unable to load districts from API", error);
        setDistricts([]);
      }
    };

    loadDistricts();
  }, [provinceCode]);

  useEffect(() => {
    if (!districtCode) {
      setWards([]);
      setWardCode("");
      return;
    }

    const selectedProvince = FALLBACK_ADDRESS_DATA.find((province) =>
      province.districts.some(
        (district) => String(district.code) === String(districtCode),
      ),
    );
    const selectedDistrict = selectedProvince?.districts.find(
      (district) => String(district.code) === String(districtCode),
    );

    if (selectedDistrict) {
      setWards(selectedDistrict.wards || []);
      return;
    }

    const loadWards = async () => {
      try {
        const res = await fetch(
          `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
        );
        if (!res.ok) throw new Error("Failed to fetch wards");
        const data = await res.json();
        setWards(data.wards || []);
      } catch (error) {
        console.warn("Unable to load wards from API", error);
        setWards([]);
      }
    };

    loadWards();
  }, [districtCode]);

  const selectedShipping =
    SHIPPING_OPTIONS.find((item) => item.id === shippingMethod) ||
    SHIPPING_OPTIONS[0];
  const selectedPayment =
    PAYMENT_OPTIONS.find((item) => item.id === paymentMethod) ||
    PAYMENT_OPTIONS[0];

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [items],
  );
  const shippingFee = selectedShipping.price;
  const discountAmount = couponState.applied
    ? Math.round(subtotal * (couponState.percent / 100))
    : 0;
  const totalPayment = Math.max(0, subtotal + shippingFee - discountAmount);
  const visibleItems = showAllItems ? items : items.slice(0, 1);

  const provinceName =
    provinces.find((item) => item.code === Number(provinceCode))?.name || "";
  const districtName =
    districts.find((item) => item.code === Number(districtCode))?.name || "";
  const wardName =
    wards.find((item) => item.code === Number(wardCode))?.name || "";

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponState({
        applied: false,
        percent: 0,
        message: "Vui lòng nhập mã giảm giá.",
      });
      return;
    }

    if (code === "UMBO10") {
      setCouponState({
        applied: true,
        percent: 10,
        message: "Mã giảm giá áp dụng thành công.",
      });
      return;
    }

    if (code === "SAVE20") {
      setCouponState({
        applied: true,
        percent: 20,
        message: "Mã giảm giá áp dụng thành công.",
      });
      return;
    }

    setCouponState({
      applied: false,
      percent: 0,
      message: "Mã giảm giá không hợp lệ.",
    });
  };

  const validate = () => {
    const nextErrors = {};

    if (!fullName.trim()) nextErrors.fullName = "Vui lòng nhập họ tên.";
    if (!phone.trim()) nextErrors.phone = "Vui lòng nhập số điện thoại.";
    if (!provinceCode) nextErrors.province = "Vui lòng chọn tỉnh/thành.";
    if (!districtCode) nextErrors.district = "Vui lòng chọn quận/huyện.";
    if (!wardCode) nextErrors.ward = "Vui lòng chọn phường/xã.";
    if (!addressDetail.trim())
      nextErrors.addressDetail = "Vui lòng nhập địa chỉ cụ thể.";
    if (!shippingMethod)
      nextErrors.shippingMethod = "Vui lòng chọn phương thức giao hàng.";
    if (!paymentMethod)
      nextErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán.";

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#fffafc] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-4xl border border-[#f7d0d3] bg-white p-10 text-center shadow-[0_20px_60px_rgba(247,163,169,0.12)]">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#fff3f4]">
            <Truck className="h-10 w-10 text-[#F7a3a9]" />
          </div>
          <h1 className="text-2xl font-bold text-[#2d3748]">
            Giỏ hàng đang trống
          </h1>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            Thêm sản phẩm trước khi tiến hành đặt hàng để xem trang thanh toán.
          </p>
          <Link
            href="/products"
            className="mt-6 rounded-full bg-[#F7a3a9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#f08a91]"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffafc] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F7a3a9]">
            Umbo Milk
          </p>
          <h1 className="text-2xl font-bold text-[#2d3748] sm:text-3xl">
            Thanh toán đơn hàng
          </h1>
          <p className="text-sm text-gray-500">
            Bạn đang có{" "}
            <span className="font-semibold text-[#F7a3a9]">
              {totalCount} sản phẩm
            </span>{" "}
            trong đơn hàng.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="space-y-6">
            <section className="rounded-[28px] border border-[#f7d0d3] bg-white p-5 shadow-[0_18px_45px_rgba(247,163,169,0.09)] sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff3f4] text-[#F7a3a9]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#2d3748]">
                    Thông tin khách hàng
                  </h2>
                  <p className="text-sm text-gray-500">
                    Vui lòng điền đầy đủ để đơn hàng được xử lý nhanh nhất.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Họ tên"
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                    if (errors.fullName)
                      setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  placeholder="Nguyễn Văn A"
                  required
                  error={errors.fullName}
                />
                <Field
                  label="Số điện thoại"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    if (errors.phone)
                      setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  placeholder="0909 123 456"
                  type="tel"
                  required
                  error={errors.phone}
                />
                <Field
                  label="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="email@example.com"
                  type="email"
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Field label="Tỉnh/Thành phố" required error={errors.province}>
                  <div className="relative">
                    <select
                      value={provinceCode}
                      onChange={(event) => {
                        setProvinceCode(event.target.value);
                        if (errors.province)
                          setErrors((prev) => ({ ...prev, province: "" }));
                      }}
                      className={`w-full appearance-none rounded-2xl border bg-white px-4 py-3 pr-10 text-sm outline-none transition-all ${
                        errors.province
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-[#f7d0d3] text-[#2d3748] focus:border-[#F7a3a9] focus:ring-2 focus:ring-[#F7a3a9]/20"
                      }`}
                    >
                      <option value="">Chọn tỉnh/thành</option>
                      {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </Field>
                <Field label="Quận/Huyện" required error={errors.district}>
                  <div className="relative">
                    <select
                      value={districtCode}
                      onChange={(event) => {
                        setDistrictCode(event.target.value);
                        if (errors.district)
                          setErrors((prev) => ({ ...prev, district: "" }));
                      }}
                      disabled={!provinceCode}
                      className={`w-full appearance-none rounded-2xl border bg-white px-4 py-3 pr-10 text-sm outline-none transition-all ${
                        errors.district
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-[#f7d0d3] text-[#2d3748] focus:border-[#F7a3a9] focus:ring-2 focus:ring-[#F7a3a9]/20"
                      } ${!provinceCode ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </Field>
                <Field label="Phường/Xã" required error={errors.ward}>
                  <div className="relative">
                    <select
                      value={wardCode}
                      onChange={(event) => {
                        setWardCode(event.target.value);
                        if (errors.ward)
                          setErrors((prev) => ({ ...prev, ward: "" }));
                      }}
                      disabled={!districtCode}
                      className={`w-full appearance-none rounded-2xl border bg-white px-4 py-3 pr-10 text-sm outline-none transition-all ${
                        errors.ward
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-[#f7d0d3] text-[#2d3748] focus:border-[#F7a3a9] focus:ring-2 focus:ring-[#F7a3a9]/20"
                      } ${!districtCode ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      <option value="">Chọn phường/xã</option>
                      {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </Field>
              </div>

              <div className="mt-4 grid gap-4">
                <Field
                  label="Địa chỉ cụ thể"
                  value={addressDetail}
                  onChange={(event) => {
                    setAddressDetail(event.target.value);
                    if (errors.addressDetail)
                      setErrors((prev) => ({ ...prev, addressDetail: "" }));
                  }}
                  placeholder="Số nhà, tên đường, khu phố..."
                  required
                  error={errors.addressDetail}
                />
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-semibold text-[#2d3748]">
                    Ghi chú đơn hàng
                  </span>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={3}
                    placeholder="Ví dụ: Gọi trước khi giao, để ở tầng 3..."
                    className="w-full rounded-2xl border border-[#f7d0d3] bg-white px-4 py-3 text-sm text-[#2d3748] outline-none transition-all focus:border-[#F7a3a9] focus:ring-2 focus:ring-[#F7a3a9]/20"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[28px] border border-[#f7d0d3] bg-white p-5 shadow-[0_18px_45px_rgba(247,163,169,0.09)] sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff3f4] text-[#F7a3a9]">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#2d3748]">
                    Phương thức giao hàng
                  </h2>
                  <p className="text-sm text-gray-500">
                    Chọn 1 gói vận chuyển phù hợp.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((option) => {
                  const checked = shippingMethod === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
                        checked
                          ? "border-[#F7a3a9] bg-[#fff3f4]"
                          : "border-[#f7d0d3] bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={checked}
                          onChange={() => {
                            setShippingMethod(option.id);
                            if (errors.shippingMethod)
                              setErrors((prev) => ({
                                ...prev,
                                shippingMethod: "",
                              }));
                          }}
                          className="mt-1 h-4 w-4 accent-[#F7a3a9]"
                        />
                        <div>
                          <p className="font-semibold text-[#2d3748]">
                            {option.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {option.service}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#2d3748]">
                        {currency(option.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.shippingMethod ? (
                <p className="mt-2 text-xs text-red-500">
                  {errors.shippingMethod}
                </p>
              ) : null}
            </section>

            <section className="rounded-[28px] border border-[#f7d0d3] bg-white p-5 shadow-[0_18px_45px_rgba(247,163,169,0.09)] sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff3f4] text-[#F7a3a9]">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#2d3748]">
                    Phương thức thanh toán
                  </h2>
                  <p className="text-sm text-gray-500">
                    Chọn cách thanh toán phù hợp cho bạn.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {PAYMENT_OPTIONS.map((option) => {
                  const checked = paymentMethod === option.id;
                  return (
                    <div key={option.id}>
                      <label
                        className={`flex cursor-pointer items-start justify-between rounded-2xl border px-4 py-3 transition-all ${
                          checked
                            ? "border-[#F7a3a9] bg-[#fff3f4]"
                            : "border-[#f7d0d3] bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value={option.id}
                            checked={checked}
                            onChange={() => {
                              setPaymentMethod(option.id);
                              if (errors.paymentMethod)
                                setErrors((prev) => ({
                                  ...prev,
                                  paymentMethod: "",
                                }));
                            }}
                            className="mt-1 h-4 w-4 accent-[#F7a3a9]"
                          />
                          <div>
                            <p className="font-semibold text-[#2d3748]">
                              {option.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {option.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#F7a3a9]">
                          {option.id === "cod" ? (
                            <Banknote className="h-4 w-4" />
                          ) : (
                            <CreditCard className="h-4 w-4" />
                          )}
                        </div>
                      </label>

                      {option.id === "qr" && checked ? (
                        <div className="mt-3 rounded-2xl border border-[#f7d0d3] bg-[#fffdfd] p-4">
                          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#2d3748]">
                            <ShieldCheck className="h-4 w-4 text-[#F7a3a9]" />
                            Thông tin chuyển khoản nhanh
                          </div>
                          <div className="grid gap-4 md:grid-cols-[minmax(0,140px)_1fr]">
                            <div className="flex items-center justify-center rounded-2xl border border-[#f7d0d3] bg-white p-3">
                              <svg viewBox="0 0 120 120" className="h-32 w-32">
                                <rect
                                  x="8"
                                  y="8"
                                  width="104"
                                  height="104"
                                  rx="12"
                                  fill="#fff"
                                />
                                <rect
                                  x="22"
                                  y="24"
                                  width="20"
                                  height="20"
                                  fill="#F7a3a9"
                                />
                                <rect
                                  x="52"
                                  y="24"
                                  width="16"
                                  height="16"
                                  fill="#2d3748"
                                />
                                <rect
                                  x="74"
                                  y="24"
                                  width="24"
                                  height="24"
                                  fill="#F7a3a9"
                                />
                                <rect
                                  x="24"
                                  y="52"
                                  width="24"
                                  height="24"
                                  fill="#2d3748"
                                />
                                <rect
                                  x="56"
                                  y="52"
                                  width="20"
                                  height="20"
                                  fill="#F7a3a9"
                                />
                                <rect
                                  x="82"
                                  y="52"
                                  width="12"
                                  height="12"
                                  fill="#2d3748"
                                />
                                <rect
                                  x="24"
                                  y="82"
                                  width="18"
                                  height="12"
                                  fill="#F7a3a9"
                                />
                                <rect
                                  x="48"
                                  y="82"
                                  width="30"
                                  height="14"
                                  fill="#2d3748"
                                />
                                <rect
                                  x="84"
                                  y="80"
                                  width="12"
                                  height="16"
                                  fill="#F7a3a9"
                                />
                              </svg>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                              {option.banks.map((bank) => (
                                <div
                                  key={bank.name}
                                  className="rounded-2xl border border-[#f7d0d3] bg-white p-3"
                                >
                                  <p className="font-semibold text-[#2d3748]">
                                    {bank.name} - {bank.branch}
                                  </p>
                                  <p>Số tài khoản: {bank.account}</p>
                                  <p>Chủ tài khoản: {bank.owner}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              {errors.paymentMethod ? (
                <p className="mt-2 text-xs text-red-500">
                  {errors.paymentMethod}
                </p>
              ) : null}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-[#f7d0d3] bg-white p-5 shadow-[0_18px_45px_rgba(247,163,169,0.09)] sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#2d3748]">Đơn hàng</h2>
                  <p className="text-sm text-gray-500">
                    Tổng {items.length} sản phẩm
                  </p>
                </div>
                <div className="rounded-full bg-[#fff3f4] px-3 py-1 text-sm font-semibold text-[#F7a3a9]">
                  {totalCount} món
                </div>
              </div>

              <div className="space-y-3">
                {visibleItems.map((item) => {
                  const imageSrc =
                    typeof item.product.image === "string" &&
                    item.product.image.trim().length > 0
                      ? item.product.image
                      : placeholderImage;

                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-3 rounded-2xl border border-[#f7d0d3]/70 bg-[#fffdfd] p-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#fff3f4]">
                        <Image
                          src={imageSrc}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#2d3748] line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.product.volume ||
                            item.product.variant ||
                            "Hộp tiêu chuẩn"}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-xl border border-[#f7d0d3] overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                item.qty > 1 &&
                                updateQty(item.product.id, item.qty - 1)
                              }
                              className="flex h-8 w-8 items-center justify-center text-[#F7a3a9] transition hover:bg-[#fff3f4]"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-7 text-center text-sm font-semibold text-[#2d3748]">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(item.product.id, item.qty + 1)
                              }
                              className="flex h-8 w-8 items-center justify-center text-[#F7a3a9] transition hover:bg-[#fff3f4]"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-[#2d3748]">
                            {currency(item.product.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {items.length > 1 ? (
                <button
                  type="button"
                  onClick={() => setShowAllItems((prev) => !prev)}
                  className="mt-4 text-sm font-semibold text-[#F7a3a9] transition hover:text-[#f08a91]"
                >
                  {showAllItems
                    ? "Thu gọn danh sách"
                    : `Xem thêm ${items.length - 1} sản phẩm khác`}
                </button>
              ) : null}
            </section>

            <section className="rounded-[28px] border border-[#f7d0d3] bg-[#fffdfd] p-5 shadow-[0_18px_45px_rgba(247,163,169,0.09)] sm:p-6">
              <h3 className="text-lg font-bold text-[#2d3748]">
                Tóm tắt thanh toán
              </h3>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Tổng tiền hàng</span>
                  <span className="font-semibold text-[#2d3748]">
                    {currency(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold text-[#2d3748]">
                    {currency(shippingFee)}
                  </span>
                </div>

                <div className="border-t border-dashed border-[#f7d0d3] pt-3">
                  <div className="flex items-center justify-between text-base font-bold text-[#2d3748]">
                    <span>Tổng thanh toán</span>
                    <span className="text-[#F7a3a9]">
                      {currency(totalPayment)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-2xl bg-[#F7a3a9] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(247,163,169,0.25)] transition hover:bg-[#f08a91]"
              >
                Đặt hàng ngay
              </button>

              {submitted ? (
                <div className="mt-4 flex items-start gap-2 rounded-2xl border border-[#f7d0d3] bg-[#fff3f4] p-3 text-sm text-[#2d3748]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#F7a3a9]" />
                  <div>
                    <p className="font-semibold">Đặt hàng thành công</p>
                    <p className="text-gray-600">
                      Đơn hàng sẽ được xác nhận trong thời gian sớm nhất. Chúng
                      tôi sẽ liên hệ với bạn qua {phone || "số điện thoại"}.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="mt-4 rounded-2xl border border-[#f7d0d3] bg-[#fffafc] p-3 text-xs text-gray-500">
                <p className="font-semibold text-[#2d3748]">
                  Địa chỉ nhận hàng
                </p>
                <p className="mt-1">
                  {provinceName && districtName && wardName
                    ? `${addressDetail}, ${wardName}, ${districtName}, ${provinceName}`
                    : "Chọn đầy đủ địa chỉ để xem chi tiết."}
                </p>
              </div>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}
