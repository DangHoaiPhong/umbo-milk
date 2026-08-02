"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
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

const defaultTokens = {
  bg: "#fffafc",
  brandColor: "#F7a3a9",
  headingColor: "#2d3748",
  subColor: "#6b7280",
  accentColor: "#F7a3a9",
  sectionBg: "#ffffff",
  sectionBorder: "#f7d0d3",
  sectionShadow: "0 18px 45px rgba(247,163,169,0.09)",
  iconBg: "#fff3f4",
  iconColor: "#F7a3a9",
  sectionHeadingColor: "#2d3748",
  sectionSubColor: "#6b7280",
  fieldLabelColor: "#2d3748",
  fieldRequiredColor: "#f08a91",
  inputBg: "#ffffff",
  inputBorder: "#f7d0d3",
  inputColor: "#2d3748",
  inputFocusBorder: "#F7a3a9",
  inputFocusRing: "rgba(247,163,169,0.2)",
  inputErrorBorder: "#ff7f7f",
  inputErrorBg: "#fee2e2",
  inputErrorColor: "#b91c1c",
  errorTextColor: "#b91c1c",
  radioActiveBorder: "#F7a3a9",
  radioActiveBg: "#fff3f4",
  radioInactiveBorder: "#f7d0d3",
  radioInactiveBg: "#ffffff",
  radioLabelColor: "#2d3748",
  radioSubColor: "#6b7280",
  radioIconColor: "#F7a3a9",
  qrBorder: "#f7d0d3",
  qrBg: "#fffdfd",
  qrHeadingColor: "#2d3748",
  qrBankBg: "#2d0404",
  qrBankBorder: "rgba(255,228,160,0.15)",
  qrBankNameColor: "#FFF6E5",
  qrBankInfoColor: "#FFDDC0",
  orderItemBg: "#fffdfd",
  orderItemBorder: "#f7d0d3",
  orderImageBg: "#fff3f4",
  orderNameColor: "#2d3748",
  orderVariantColor: "#6b7280",
  orderQtyBorder: "#f7d0d3",
  orderQtyBtnColor: "#F7a3a9",
  orderQtyBtnHoverBg: "#fff3f4",
  orderQtyNumColor: "#2d3748",
  orderTotalColor: "#2d3748",
  showMoreColor: "#F7a3a9",
  showMoreHoverColor: "#f08a91",
  summaryBg: "#fffdfd",
  summaryLabelColor: "#6b7280",
  summaryValueColor: "#2d3748",
  summaryDividerColor: "#f7d0d3",
  summaryTotalLabelColor: "#2d3748",
  summaryTotalColor: "#F7a3a9",
  submitBtnBg: "#F7a3a9",
  submitBtnShadow: "0 10px 30px rgba(247,163,169,0.25)",
  submitBtnHoverBg: "#f08a91",
  successBg: "#fff3f4",
  successBorder: "#f7d0d3",
  successIconColor: "#F7a3a9",
  successTextColor: "#2d3748",
  successSubColor: "#6b7280",
  addressBg: "#fff4f7",
  addressBorder: "#f7d0d3",
  addressLabelColor: "#2d3748",
  addressValueColor: "#6b7280",
  emptyBg: "#fffafc",
  emptyCardBg: "#ffffff",
  emptyCardBorder: "#f7d0d3",
  emptyIconBg: "#fff3f4",
  emptyIconColor: "#F7a3a9",
  emptyHeadingColor: "#2d3748",
  emptySubColor: "#6b7280",
  emptyBtnBg: "#F7a3a9",
  emptyBtnHoverBg: "#f08a91",
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required = false,
  children,
  tokens,
}) {
  const labelColor = tokens?.fieldLabelColor ?? "#2d3748";
  const requiredColor = tokens?.fieldRequiredColor ?? "#f08a91";
  const borderColor = error
    ? (tokens?.inputErrorBorder ?? "#ff7f7f")
    : (tokens?.inputBorder ?? "#f7d0d3");
  const background = error
    ? (tokens?.inputErrorBg ?? "#fee2e2")
    : (tokens?.inputBg ?? "#ffffff");
  const textColor = error
    ? (tokens?.inputErrorColor ?? "#b91c1c")
    : (tokens?.inputColor ?? "#2d3748");
  const focusBorder = tokens?.inputFocusBorder ?? "#F7a3a9";
  const focusRing = tokens?.inputFocusRing ?? "rgba(247,163,169,0.2)";

  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-semibold" style={{ color: labelColor }}>
        {label}
        {required && (
          <span className="ml-1" style={{ color: requiredColor }}>
            *
          </span>
        )}
      </span>
      {children || (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-all"
          style={{
            borderColor,
            background,
            color: textColor,
          }}
          onFocus={(event) => {
            event.currentTarget.style.borderColor = focusBorder;
            event.currentTarget.style.boxShadow = `0 0 0 4px ${focusRing}`;
          }}
          onBlur={(event) => {
            event.currentTarget.style.borderColor = borderColor;
            event.currentTarget.style.boxShadow = "none";
          }}
        />
      )}
      {error ? (
        <span
          className="text-xs"
          style={{ color: tokens?.errorTextColor ?? "#b91c1c" }}
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

export default function CheckoutPage() {
  const { items, totalCount, totalPrice, updateQty } = useCart();
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.checkoutPage ?? defaultTokens;

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
      <main
        className="min-h-screen px-4 py-16 sm:px-6 lg:px-8"
        style={{ background: t.emptyBg }}
      >
        <div
          className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-4xl border p-10 text-center"
          style={{
            background: t.emptyCardBg,
            borderColor: t.emptyCardBorder,
            boxShadow: "0 20px 60px rgba(247,163,169,0.12)",
          }}
        >
          <div
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: t.emptyIconBg }}
          >
            <Truck className="h-10 w-10" style={{ color: t.emptyIconColor }} />
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ color: t.emptyHeadingColor }}
          >
            Giỏ hàng đang trống
          </h1>
          <p
            className="mt-2 max-w-md text-sm"
            style={{ color: t.emptySubColor }}
          >
            Thêm sản phẩm trước khi tiến hành đặt hàng để xem trang thanh toán.
          </p>
          <Link
            href="/products"
            className="mt-6 rounded-full px-6 py-3 text-sm font-semibold text-white transition"
            style={{ background: t.emptyBtnBg }}
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
      style={{ background: t.bg }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-2">
          <p
            className="text-sm font-semibold uppercase tracking-[0.25em]"
            style={{ color: t.brandColor }}
          >
            Umbo Milk
          </p>
          <h1
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: t.headingColor }}
          >
            Thanh toán đơn hàng
          </h1>
          <p className="text-sm" style={{ color: t.subColor }}>
            Bạn đang có{" "}
            <span className="font-semibold" style={{ color: t.accentColor }}>
              {totalCount} sản phẩm
            </span>{" "}
            trong đơn hàng.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
          style={{ color: t.sectionHeadingColor }}
        >
          <div className="space-y-6">
            <section
              className="rounded-[28px] border p-5 shadow-sm sm:p-6"
              style={{
                background: t.sectionBg,
                borderColor: t.sectionBorder,
                boxShadow: t.sectionShadow,
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ background: t.iconBg, color: t.iconColor }}
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2
                    className="text-lg font-bold"
                    style={{ color: t.sectionHeadingColor }}
                  >
                    Thông tin khách hàng
                  </h2>
                  <p className="text-sm" style={{ color: t.sectionSubColor }}>
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
                  tokens={t}
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
                  tokens={t}
                />
                <Field
                  label="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="email@example.com"
                  type="email"
                  tokens={t}
                />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Field
                  label="Tỉnh/Thành phố"
                  required
                  error={errors.province}
                  tokens={t}
                >
                  <div className="relative">
                    <select
                      value={provinceCode}
                      onChange={(event) => {
                        setProvinceCode(event.target.value);
                        if (errors.province)
                          setErrors((prev) => ({ ...prev, province: "" }));
                      }}
                      className={`w-full appearance-none rounded-2xl border px-4 py-3 pr-10 text-sm outline-none transition-all ${!provinceCode ? "cursor-not-allowed opacity-60" : ""}`}
                      style={{
                        borderColor: errors.province
                          ? t.inputErrorBorder
                          : t.inputBorder,
                        backgroundColor: errors.province
                          ? t.inputErrorBg
                          : t.inputBg,
                        color: errors.province
                          ? t.inputErrorColor
                          : t.inputColor,
                      }}
                      onFocus={(event) => {
                        event.currentTarget.style.borderColor =
                          t.inputFocusBorder;
                        event.currentTarget.style.boxShadow = `0 0 0 4px ${t.inputFocusRing}`;
                      }}
                      onBlur={(event) => {
                        event.currentTarget.style.borderColor = errors.province
                          ? t.inputErrorBorder
                          : t.inputBorder;
                        event.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Chọn tỉnh/thành</option>
                      {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                      style={{ color: t.radioSubColor }}
                    />
                  </div>
                </Field>
                <Field
                  label="Quận/Huyện"
                  required
                  error={errors.district}
                  tokens={t}
                >
                  <div className="relative">
                    <select
                      value={districtCode}
                      onChange={(event) => {
                        setDistrictCode(event.target.value);
                        if (errors.district)
                          setErrors((prev) => ({ ...prev, district: "" }));
                      }}
                      disabled={!provinceCode}
                      className={`w-full appearance-none rounded-2xl border px-4 py-3 pr-10 text-sm outline-none transition-all ${!provinceCode ? "cursor-not-allowed opacity-60" : ""}`}
                      style={{
                        borderColor: errors.district
                          ? t.inputErrorBorder
                          : t.inputBorder,
                        backgroundColor: errors.district
                          ? t.inputErrorBg
                          : t.inputBg,
                        color: errors.district
                          ? t.inputErrorColor
                          : t.inputColor,
                      }}
                      onFocus={(event) => {
                        event.currentTarget.style.borderColor =
                          t.inputFocusBorder;
                        event.currentTarget.style.boxShadow = `0 0 0 4px ${t.inputFocusRing}`;
                      }}
                      onBlur={(event) => {
                        event.currentTarget.style.borderColor = errors.district
                          ? t.inputErrorBorder
                          : t.inputBorder;
                        event.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                      style={{ color: t.radioSubColor }}
                    />
                  </div>
                </Field>
                <Field
                  label="Phường/Xã"
                  required
                  error={errors.ward}
                  tokens={t}
                >
                  <div className="relative">
                    <select
                      value={wardCode}
                      onChange={(event) => {
                        setWardCode(event.target.value);
                        if (errors.ward)
                          setErrors((prev) => ({ ...prev, ward: "" }));
                      }}
                      disabled={!districtCode}
                      className={`w-full appearance-none rounded-2xl border px-4 py-3 pr-10 text-sm outline-none transition-all ${!districtCode ? "cursor-not-allowed opacity-60" : ""}`}
                      style={{
                        borderColor: errors.ward
                          ? t.inputErrorBorder
                          : t.inputBorder,
                        backgroundColor: errors.ward
                          ? t.inputErrorBg
                          : t.inputBg,
                        color: errors.ward ? t.inputErrorColor : t.inputColor,
                      }}
                      onFocus={(event) => {
                        event.currentTarget.style.borderColor =
                          t.inputFocusBorder;
                        event.currentTarget.style.boxShadow = `0 0 0 4px ${t.inputFocusRing}`;
                      }}
                      onBlur={(event) => {
                        event.currentTarget.style.borderColor = errors.ward
                          ? t.inputErrorBorder
                          : t.inputBorder;
                        event.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Chọn phường/xã</option>
                      {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                      style={{ color: t.radioSubColor }}
                    />
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
                  tokens={t}
                />
                <label className="flex flex-col gap-1.5 text-sm">
                  <span
                    className="font-semibold"
                    style={{ color: t.fieldLabelColor }}
                  >
                    Ghi chú đơn hàng
                  </span>
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={3}
                    placeholder="Ví dụ: Gọi trước khi giao, để ở tầng 3..."
                    className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      borderColor: t.inputBorder,
                      background: t.inputBg,
                      color: t.inputColor,
                    }}
                    onFocus={(event) => {
                      event.currentTarget.style.borderColor =
                        t.inputFocusBorder;
                      event.currentTarget.style.boxShadow = `0 0 0 4px ${t.inputFocusRing}`;
                    }}
                    onBlur={(event) => {
                      event.currentTarget.style.borderColor = t.inputBorder;
                      event.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </label>
              </div>
            </section>

            <section
              className="rounded-[28px] border p-5 shadow-sm sm:p-6"
              style={{
                background: t.sectionBg,
                borderColor: t.sectionBorder,
                boxShadow: t.sectionShadow,
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ background: t.iconBg, color: t.iconColor }}
                >
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h2
                    className="text-lg font-bold"
                    style={{ color: t.sectionHeadingColor }}
                  >
                    Phương thức giao hàng
                  </h2>
                  <p className="text-sm" style={{ color: t.sectionSubColor }}>
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
                      className="flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition-all"
                      style={{
                        borderColor: checked
                          ? t.radioActiveBorder
                          : t.radioInactiveBorder,
                        background: checked
                          ? t.radioActiveBg
                          : t.radioInactiveBg,
                      }}
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
                          className="mt-1 h-4 w-4"
                          style={{ accentColor: t.accentColor }}
                        />
                        <div>
                          <p
                            className="font-semibold"
                            style={{ color: t.orderNameColor }}
                          >
                            {option.name}
                          </p>
                          <p
                            className="text-sm"
                            style={{ color: t.orderVariantColor }}
                          >
                            {option.service}
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: t.orderTotalColor }}
                      >
                        {currency(option.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.shippingMethod ? (
                <p className="mt-2 text-xs" style={{ color: t.errorTextColor }}>
                  {errors.shippingMethod}
                </p>
              ) : null}
            </section>

            <section
              className="rounded-[28px] border p-5 shadow-sm sm:p-6"
              style={{
                background: t.sectionBg,
                borderColor: t.sectionBorder,
                boxShadow: t.sectionShadow,
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ background: t.iconBg, color: t.iconColor }}
                >
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h2
                    className="text-lg font-bold"
                    style={{ color: t.sectionHeadingColor }}
                  >
                    Phương thức thanh toán
                  </h2>
                  <p className="text-sm" style={{ color: t.sectionSubColor }}>
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
                        className="flex cursor-pointer items-start justify-between rounded-2xl border px-4 py-3 transition-all"
                        style={{
                          borderColor: checked
                            ? t.radioActiveBorder
                            : t.radioInactiveBorder,
                          background: checked ? t.radioActiveBg : t.inputBg,
                        }}
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
                            className="mt-1 h-4 w-4"
                            style={{ accentColor: t.accentColor }}
                          />
                          <div>
                            <p
                              className="font-semibold"
                              style={{ color: t.orderNameColor }}
                            >
                              {option.name}
                            </p>
                            <p
                              className="text-sm"
                              style={{ color: t.orderVariantColor }}
                            >
                              {option.description}
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex items-center gap-2"
                          style={{ color: t.accentColor }}
                        >
                          {option.id === "cod" ? (
                            <Banknote className="h-4 w-4" />
                          ) : (
                            <CreditCard className="h-4 w-4" />
                          )}
                        </div>
                      </label>

                      {option.id === "qr" && checked ? (
                        <div
                          className="mt-3 rounded-2xl border p-4"
                          style={{
                            borderColor: t.sectionBorder,
                            background: t.sectionBg,
                          }}
                        >
                          <div
                            className="mb-3 flex items-center gap-2 text-sm font-semibold"
                            style={{ color: t.qrHeadingColor }}
                          >
                            <ShieldCheck
                              className="h-4 w-4"
                              style={{ color: t.accentColor }}
                            />
                            Thông tin chuyển khoản nhanh
                          </div>
                          <div className="grid gap-4 md:grid-cols-[minmax(0,140px)_1fr]">
                            <div
                              className="flex items-center justify-center rounded-2xl border p-3"
                              style={{
                                borderColor: t.sectionBorder,
                                background: t.inputBg,
                              }}
                            >
                              <svg viewBox="0 0 120 120" className="h-32 w-32">
                                <rect
                                  x="8"
                                  y="8"
                                  width="104"
                                  height="104"
                                  rx="12"
                                  fill="white"
                                />
                                <rect
                                  x="22"
                                  y="24"
                                  width="20"
                                  height="20"
                                  fill={t.accentColor}
                                />
                                <rect
                                  x="52"
                                  y="24"
                                  width="16"
                                  height="16"
                                  fill={t.orderTotalColor}
                                />
                                <rect
                                  x="74"
                                  y="24"
                                  width="24"
                                  height="24"
                                  fill={t.accentColor}
                                />
                                <rect
                                  x="24"
                                  y="52"
                                  width="24"
                                  height="24"
                                  fill={t.orderTotalColor}
                                />
                                <rect
                                  x="56"
                                  y="52"
                                  width="20"
                                  height="20"
                                  fill={t.accentColor}
                                />
                                <rect
                                  x="82"
                                  y="52"
                                  width="12"
                                  height="12"
                                  fill={t.orderTotalColor}
                                />
                                <rect
                                  x="24"
                                  y="82"
                                  width="18"
                                  height="12"
                                  fill={t.accentColor}
                                />
                                <rect
                                  x="48"
                                  y="82"
                                  width="30"
                                  height="14"
                                  fill={t.orderTotalColor}
                                />
                                <rect
                                  x="84"
                                  y="80"
                                  width="12"
                                  height="16"
                                  fill={t.accentColor}
                                />
                              </svg>
                            </div>
                            <div
                              className="space-y-2 text-sm"
                              style={{ color: t.orderVariantColor }}
                            >
                              {option.banks.map((bank) => (
                                <div
                                  key={bank.name}
                                  className="rounded-2xl border p-3"
                                  style={{
                                    borderColor: t.sectionBorder,
                                    background: t.inputBg,
                                  }}
                                >
                                  <p
                                    className="font-semibold"
                                    style={{ color: t.orderNameColor }}
                                  >
                                    {bank.name} - {bank.branch}
                                  </p>
                                  <p style={{ color: t.orderVariantColor }}>
                                    Số tài khoản: {bank.account}
                                  </p>
                                  <p style={{ color: t.orderVariantColor }}>
                                    Chủ tài khoản: {bank.owner}
                                  </p>
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
                <p className="mt-2 text-xs" style={{ color: t.errorTextColor }}>
                  {errors.paymentMethod}
                </p>
              ) : null}
            </section>
          </div>

          <aside className="space-y-6">
            <section
              className="rounded-[28px] border p-5 shadow-sm sm:p-6"
              style={{
                background: t.sectionBg,
                borderColor: t.sectionBorder,
                boxShadow: t.sectionShadow,
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2
                    className="text-lg font-bold"
                    style={{ color: t.sectionHeadingColor }}
                  >
                    Đơn hàng
                  </h2>
                  <p className="text-sm" style={{ color: t.sectionSubColor }}>
                    Tổng {items.length} sản phẩm
                  </p>
                </div>
                <div
                  className="rounded-full px-3 py-1 text-sm font-semibold"
                  style={{
                    background: t.orderCountBadgeBg || t.orderImageBg,
                    color: t.orderCountBadgeColor || t.accentColor,
                  }}
                >
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
                      className="flex gap-3 rounded-2xl p-3"
                      style={{
                        border: `1px solid ${t.orderItemBorder}`,
                        background: t.orderItemBg,
                      }}
                    >
                      <div
                        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl"
                        style={{ background: t.orderImageBg }}
                      >
                        <Image
                          src={imageSrc}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-sm font-semibold line-clamp-2"
                          style={{ color: t.orderNameColor }}
                        >
                          {item.product.name}
                        </p>
                        <p
                          className="mt-1 text-xs"
                          style={{ color: t.orderVariantColor }}
                        >
                          {item.product.volume ||
                            item.product.variant ||
                            "Hộp tiêu chuẩn"}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div
                            className="flex items-center rounded-xl overflow-hidden"
                            style={{ border: `1px solid ${t.orderQtyBorder}` }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                item.qty > 1 &&
                                updateQty(item.product.id, item.qty - 1)
                              }
                              className="flex h-8 w-8 items-center justify-center transition"
                              style={{ color: t.orderQtyBtnColor }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  t.orderQtyBtnHoverBg;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";
                              }}
                            >
                              <Minus size={14} />
                            </button>
                            <span
                              className="min-w-7 text-center text-sm font-semibold"
                              style={{ color: t.orderQtyNumColor }}
                            >
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(item.product.id, item.qty + 1)
                              }
                              className="flex h-8 w-8 items-center justify-center transition"
                              style={{ color: t.orderQtyBtnColor }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  t.orderQtyBtnHoverBg;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";
                              }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: t.orderTotalColor }}
                          >
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
                  className="mt-4 text-sm font-semibold transition"
                  style={{ color: t.showMoreColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = t.showMoreHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = t.showMoreColor;
                  }}
                >
                  {showAllItems
                    ? "Thu gọn danh sách"
                    : `Xem thêm ${items.length - 1} sản phẩm khác`}
                </button>
              ) : null}
            </section>

            <section
              className="rounded-[28px] border p-5 shadow-sm sm:p-6"
              style={{
                background: t.sectionBg,
                borderColor: t.sectionBorder,
                boxShadow: t.sectionShadow,
              }}
            >
              <h3
                className="text-lg font-bold"
                style={{ color: t.sectionHeadingColor }}
              >
                Tóm tắt thanh toán
              </h3>
              <div
                className="mt-4 space-y-3 text-sm"
                style={{ color: t.summaryLabelColor }}
              >
                <div className="flex items-center justify-between">
                  <span>Tổng tiền hàng</span>
                  <span
                    className="font-semibold"
                    style={{ color: t.summaryValueColor }}
                  >
                    {currency(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phí vận chuyển</span>
                  <span
                    className="font-semibold"
                    style={{ color: t.summaryValueColor }}
                  >
                    {currency(shippingFee)}
                  </span>
                </div>

                <div
                  className="border-t border-dashed pt-3"
                  style={{ borderColor: t.summaryDividerColor }}
                >
                  <div
                    className="flex items-center justify-between text-base font-bold"
                    style={{ color: t.summaryTotalLabelColor }}
                  >
                    <span>Tổng thanh toán</span>
                    <span style={{ color: t.summaryTotalColor }}>
                      {currency(totalPayment)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition"
                style={{
                  background: t.submitBtnBg,
                  boxShadow: t.submitBtnShadow,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = t.submitBtnHoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = t.submitBtnBg;
                }}
              >
                Đặt hàng ngay
              </button>

              {submitted ? (
                <div
                  className="mt-4 flex items-start gap-2 rounded-2xl border p-3 text-sm"
                  style={{
                    background: t.successBg,
                    borderColor: t.successBorder,
                    color: t.successTextColor,
                  }}
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4"
                    style={{ color: t.successIconColor }}
                  />
                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: t.successTextColor }}
                    >
                      Đặt hàng thành công
                    </p>
                    <p style={{ color: t.successSubColor }}>
                      Đơn hàng sẽ được xác nhận trong thời gian sớm nhất. Chúng
                      tôi sẽ liên hệ với bạn qua {phone || "số điện thoại"}.
                    </p>
                  </div>
                </div>
              ) : null}

              <div
                className="mt-4 rounded-2xl border p-3 text-xs"
                style={{
                  background: t.addressBg,
                  borderColor: t.addressBorder,
                  color: t.addressValueColor,
                }}
              >
                <p
                  className="font-semibold"
                  style={{ color: t.addressLabelColor }}
                >
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
