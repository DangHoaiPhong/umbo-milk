"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { popularProducts, bannerImage } from "@/data/popularProducts";
import { products } from "@/data/products";

const formatPrice = (p) => p.toLocaleString("vi-VN") + "đ";

/* ── SVG trang trí nhẹ ── */
const BgDecor = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    {/* Blob trái trên */}
    <ellipse cx="5%" cy="12%" rx="120" ry="80" fill="#F7a3a9" fillOpacity="0.12" />
    {/* Blob phải dưới */}
    <ellipse cx="95%" cy="88%" rx="150" ry="100" fill="#F7a3a9" fillOpacity="0.10" />
    {/* Mây nhỏ giữa trên */}
    <ellipse cx="50%" cy="4%" rx="200" ry="40" fill="#fff" fillOpacity="0.35" />
    {/* Chấm trang trí */}
    <circle cx="20%" cy="75%" r="6" fill="#F7a3a9" fillOpacity="0.18" />
    <circle cx="78%" cy="20%" r="9" fill="#F7a3a9" fillOpacity="0.14" />
    <circle cx="88%" cy="55%" r="5" fill="#F7a3a9" fillOpacity="0.20" />
    <circle cx="12%" cy="45%" r="7" fill="#F7a3a9" fillOpacity="0.15" />
    {/* Hoa nhỏ — 4 cánh đơn giản */}
    <g transform="translate(92,60)" opacity="0.18">
      <ellipse cx="0" cy="-8" rx="4" ry="7" fill="#F7a3a9" />
      <ellipse cx="0" cy="8" rx="4" ry="7" fill="#F7a3a9" />
      <ellipse cx="-8" cy="0" rx="7" ry="4" fill="#F7a3a9" />
      <ellipse cx="8" cy="0" rx="7" ry="4" fill="#F7a3a9" />
      <circle cx="0" cy="0" r="4" fill="#fff" />
    </g>
    <g transform="translate(1100,320)" opacity="0.14">
      <ellipse cx="0" cy="-10" rx="5" ry="9" fill="#F7a3a9" />
      <ellipse cx="0" cy="10" rx="5" ry="9" fill="#F7a3a9" />
      <ellipse cx="-10" cy="0" rx="9" ry="5" fill="#F7a3a9" />
      <ellipse cx="10" cy="0" rx="9" ry="5" fill="#F7a3a9" />
      <circle cx="0" cy="0" r="5" fill="#fff" />
    </g>
  </svg>
);

/* ── Item sản phẩm ── */
const ProductItem = ({ item, index, visible }) => {
  const matched = products.find((p) => p.name === item.name);
  const href = matched ? `/products/${matched.id}` : "/products";
  return (
  <Link
    href={href}
    className="flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-[#F7a3a9]/20 rounded-2xl px-5 py-4 cursor-pointer hover:-translate-y-1 hover:shadow-md hover:shadow-[#F7a3a9]/20 hover:bg-white"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 400ms ease ${index * 100}ms, transform 400ms ease ${index * 100}ms, box-shadow 280ms ease, background 280ms ease`,
    }}
  >
    {/* Ảnh */}
    <div className="relative w-[76px] h-[76px] flex-shrink-0 rounded-xl overflow-hidden bg-[#FFF1F5]">
      <Image src={item.image} alt={item.name} fill sizes="76px" className="object-contain p-1" />
    </div>

    {/* Nội dung */}
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-[#2d3748] text-sm leading-snug">{item.name}</h3>
      <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
    </div>

    {/* Divider dọc */}
    <div className="self-stretch w-px bg-[#F7a3a9]/20 mx-1 flex-shrink-0" />

    {/* Giá */}
    <div className="flex-shrink-0 text-right min-w-[72px]">
      <span className="text-[#F7a3a9] font-bold text-sm whitespace-nowrap block">
        {formatPrice(item.price)}
      </span>
      {!item.inStock && (
        <span className="text-red-300 text-[11px] font-medium mt-0.5 block">Hết hàng</span>
      )}
    </div>
  </Link>
  );
};

/* ── Main component ── */
const PopularSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#FFF1F5] overflow-hidden py-20 px-4">
      <BgDecor />

      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* Header */}
        <div
          className="text-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 500ms ease, transform 500ms ease",
          }}
        >
          <p className="text-[#F7a3a9] text-sm font-medium tracking-widest uppercase mb-1">
            Um Bò Milk
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d3748] uppercase tracking-wide">
            Nhiều Khách Yêu Thích
          </h2>
          <div className="mt-3 h-1 w-14 bg-[#F7a3a9] rounded-full mx-auto" />
        </div>

        {/* Body: mobile = 1 cột (header → banner → list), desktop = 2 cột (list | banner) */}
        <div className="flex flex-col lg:flex-row gap-9">

          {/* Banner — mobile: trên list, desktop: cột phải */}
          <div
            className="order-first lg:order-last lg:w-[35%]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(28px)",
              transition: "opacity 550ms ease 200ms, transform 550ms ease 200ms",
            }}
          >
            <div className="relative w-full rounded-3xl overflow-hidden shadow-lg shadow-[#F7a3a9]/20 group lg:sticky lg:top-24 aspect-[3/4] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[420px]">
              <Image
                src={bannerImage}
                alt="Sản phẩm nổi bật Um Bò Milk"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              {/* Overlay gradient nhẹ */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F7a3a9]/30 via-transparent to-transparent" />
              {/* Label */}
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-[#F7a3a9] font-bold text-sm px-4 py-2 rounded-full shadow-sm">
                  🌟 Bán chạy nhất tháng
                </span>
              </div>
            </div>
          </div>

          {/* Danh sách sản phẩm — cột trái desktop */}
          <div className="order-last lg:order-first lg:w-[65%] flex flex-col gap-3">
            {popularProducts.map((item, i) => (
              <ProductItem key={item.id} item={item} index={i} visible={visible} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PopularSection;
