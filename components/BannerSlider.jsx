"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import banner from "@/assets/images/banner.jpg";
import bannerMobile from "@/assets/images/BANNER_MOBILE.jpg";

const banners = [
  { src: banner, alt: "Banner 1" },
  // thêm ảnh vào đây: { src: banner2, alt: "Banner 2" },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const next = () => setCurrent((c) => (c + 1) % banners.length);

  return (
    <>
      {/* Mobile: ảnh tĩnh */}
      <div className="sm:hidden w-full">
        <Image
          src={bannerMobile}
          alt="Banner Mobile"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Desktop: Slider */}
      <div
        className="hidden sm:block relative w-full overflow-hidden"
        style={{ aspectRatio: "1920/800" }}
      >
        {banners.map((banner, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Prev / Next - chỉ hiện khi có nhiều hơn 1 ảnh */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white/90 rounded-full p-2 transition"
              aria-label="Ảnh trước"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white/90 rounded-full p-2 transition"
              aria-label="Ảnh tiếp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BannerSlider;
