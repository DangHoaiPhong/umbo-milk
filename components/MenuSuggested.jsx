"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/assets/images/umboMilk.jpg";
import { promotions } from "@/data/menuSuggested";
import { useTheme } from "@/components/ThemeProvider";

const formatPrice = (p) => p.toLocaleString("vi-VN") + "đ";

const getShortText = (value, fallback = "") => {
  if (!value) return fallback;
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const MenuItem = ({ item, index, visible, t }) => {
  const href = item.id ? `/products/${item.id}` : "/products";
  const imageSrc =
    typeof item.image === "string" && item.image.trim().length > 0
      ? item.image
      : placeholderImage;

  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-2xl p-5 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1"
      style={{
        background: t.cardBg,
        borderColor: t.cardBorder,
        borderStyle: "solid",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 400ms ease ${index * 100}ms, transform 400ms ease ${index * 100}ms, box-shadow 300ms ease`,
      }}
    >
      {/* Ảnh */}
      <div
        className="relative w-[80px] h-[80px] flex-shrink-0 rounded-xl overflow-hidden"
        style={{ background: t.pageBg }}
      >
        <Image
          src={imageSrc}
          alt={item.name}
          fill
          sizes="80px"
          className="object-contain p-1"
        />
      </div>

      {/* Nội dung */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-bold text-sm leading-snug"
          style={{ color: t.textPrimary }}
        >
          {item.name}
        </h3>
        <p
          className="text-xs mt-1 line-clamp-2 leading-relaxed"
          style={{ color: t.accentColor }}
        >
          {item.extraDescription}
        </p>
      </div>

      {/* Giá */}
      <div className="flex-shrink-0 text-right ml-2">
        {item.inStock ? (
          <span
            className="font-bold text-sm whitespace-nowrap"
            style={{ color: t.accentColor }}
          >
            {formatPrice(item.price)}
          </span>
        ) : (
          <span className="text-red-300 text-xs font-medium">Hết hàng</span>
        )}
      </div>
    </Link>
  );
};

const MenuSuggested = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.menuSuggested ?? {
    pageBg: "#FFF1F5",
    accentColor: "#F7a3a9",
    textPrimary: "#2d3748",
    textSecondary: "#6b7280",
    cardBg: "#ffffff",
    cardBorder: "#F7a3a9",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/haravan/products");
        if (!res.ok) throw new Error();
        const data = await res.json();
        const payload = Array.isArray(data) ? data : (data.products ?? []);

        const milkItems = payload
          .filter((p) => {
            const category = String(p.category ?? "").toLowerCase();
            const name = String(p.name ?? p.title ?? "").toLowerCase();
            return (
              category === "sua" ||
              category === "vang-sua" ||
              name.includes("sua") ||
              name.includes("vang sua")
            );
          })
          .slice(0, 6)
          .map((p) => ({
            id: p.id,
            name: p.title ?? p.name ?? "Sản phẩm",
            extraDescription: getShortText(
              p.bodyHtml || p.description || "Sản phẩm sữa chất lượng",
            ),
            price: Number(p.price ?? p.variant?.price ?? 0) || 0,
            image: p.image ?? p.images?.[0]?.src ?? "",
            inStock: true,
          }));

        setMenuItems(milkItems);
      } catch {
        // giữ nguyên mảng rỗng nếu lỗi
      }
    };
    load();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-4"
      style={{ background: t.pageBg }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div
          className="text-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 500ms ease, transform 500ms ease",
          }}
        >
          <p
            className="text-sm font-medium tracking-widest uppercase mb-1"
            style={{ color: t.accentColor }}
          >
            Um Bò Milk
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold uppercase tracking-wide"
            style={{ color: t.textPrimary }}
          >
            Menu Gợi Ý
          </h2>
          <div
            className="mt-3 h-1 w-14 rounded-full mx-auto"
            style={{ background: t.accentColor }}
          />
        </div>

        {/* 2 cột */}
        <div className="flex flex-col lg:flex-row gap-9">
          {/* Cột trái — danh sách sản phẩm */}
          <div className="flex flex-col gap-3 lg:w-[70%]">
            {menuItems.map((item, i) => (
              <MenuItem
                key={item.id}
                item={item}
                index={i}
                visible={visible}
                t={t}
              />
            ))}
          </div>

          {/* Cột phải — khuyến mãi */}
          <div
            className="lg:w-[30%]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition:
                "opacity 500ms ease 300ms, transform 500ms ease 300ms",
            }}
          >
            <div
              className="rounded-2xl overflow-hidden sticky top-24"
              style={{
                background: t.cardBg,
                border: `1px solid ${t.cardBorder}`,
              }}
            >
              {/* Tiêu đề card */}
              <div
                style={{ background: t.backgroudColor }}
                className="px-6 py-4"
              >
                <h3 className="text-white font-bold text-base uppercase tracking-wide">
                  Chương trình khuyến mãi
                </h3>
              </div>

              {/* Danh sách ưu đãi */}
              <ul className="px-6 py-5 flex flex-col gap-3">
                {promotions.map((promo, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: t.textPrimary }}
                  >
                    <span
                      className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center"
                      style={{ background: t.pageBg }}
                    >
                      <span
                        className="w-2 h-2 rounded-full block"
                        style={{ background: t.accentColor }}
                      />
                    </span>
                    {promo}
                  </li>
                ))}
              </ul>

              {/* Footer card */}
              <div className="px-6 pb-5">
                <div
                  className="h-px mb-4"
                  style={{ background: t.cardBorder }}
                />
                <p className="text-xs text-gray-400 leading-relaxed">
                  Ưu đãi áp dụng tại tất cả chi nhánh Um Bò Milk. Liên hệ để
                  biết thêm chi tiết.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSuggested;
