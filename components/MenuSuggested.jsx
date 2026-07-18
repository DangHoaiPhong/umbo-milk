"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { menuItems, promotions } from "@/data/menuSuggested";

const formatPrice = (p) => p.toLocaleString("vi-VN") + "đ";

const MenuItem = ({ item, index, visible }) => (
  <div
    className="flex items-center gap-4 bg-white border border-[#F7a3a9]/20 rounded-2xl p-5 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-[#F7a3a9]/15"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 400ms ease ${index * 100}ms, transform 400ms ease ${index * 100}ms, box-shadow 300ms ease, translate 300ms ease`,
    }}
  >
    {/* Ảnh */}
    <div className="relative w-[80px] h-[80px] flex-shrink-0 rounded-xl overflow-hidden bg-[#FFF1F5]">
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="80px"
        className="object-contain p-1"
      />
    </div>

    {/* Nội dung */}
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-[#2d3748] text-sm leading-snug">{item.name}</h3>
      <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">
        {item.description}
      </p>
    </div>

    {/* Giá */}
    <div className="flex-shrink-0 text-right ml-2">
      {item.inStock ? (
        <span className="text-[#F7a3a9] font-bold text-sm whitespace-nowrap">
          {formatPrice(item.price)}
        </span>
      ) : (
        <span className="text-red-300 text-xs font-medium">Hết hàng</span>
      )}
    </div>
  </div>
);

const MenuSuggested = () => {
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
    <section ref={sectionRef} className="w-full bg-[#FFF1F5] py-16 px-4">
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
          <p className="text-[#F7a3a9] text-sm font-medium tracking-widest uppercase mb-1">
            Um Bò Milk
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2d3748] uppercase tracking-wide">
            Menu Gợi Ý
          </h2>
          <div className="mt-3 h-1 w-14 bg-[#F7a3a9] rounded-full mx-auto" />
        </div>

        {/* 2 cột */}
        <div className="flex flex-col lg:flex-row gap-9">

          {/* Cột trái — danh sách sản phẩm */}
          <div className="flex flex-col gap-3 lg:w-[70%]">
            {menuItems.map((item, i) => (
              <MenuItem key={item.id} item={item} index={i} visible={visible} />
            ))}
          </div>

          {/* Cột phải — khuyến mãi */}
          <div
            className="lg:w-[30%]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 500ms ease 300ms, transform 500ms ease 300ms",
            }}
          >
            <div className="bg-white border border-[#F7a3a9]/20 rounded-2xl overflow-hidden sticky top-24">
              {/* Tiêu đề card */}
              <div className="bg-[#F7a3a9] px-6 py-4">
                <h3 className="text-white font-bold text-base uppercase tracking-wide">
                  Chương trình khuyến mãi
                </h3>
              </div>

              {/* Danh sách ưu đãi */}
              <ul className="px-6 py-5 flex flex-col gap-3">
                {promotions.map((promo, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#2d3748]">
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-[#FFF1F5] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#F7a3a9] block" />
                    </span>
                    {promo}
                  </li>
                ))}
              </ul>

              {/* Footer card */}
              <div className="px-6 pb-5">
                <div className="h-px bg-[#F7a3a9]/20 mb-4" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  Ưu đãi áp dụng tại tất cả chi nhánh Um Bò Milk. Liên hệ để biết thêm chi tiết.
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
