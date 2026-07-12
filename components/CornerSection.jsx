"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { corners } from "@/data/corners";

const AUTOPLAY_DELAY = 3500;
const GAP = 16;

const getVisibleCount = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
};

// Nhân đôi để infinite loop
const items = [...corners, ...corners];

const CornerSection = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [itemWidth, setItemWidth] = useState(0);
  const wrapperRef = useRef(null);
  const indexRef = useRef(0);

  const calcItemWidth = (count) => {
    if (!wrapperRef.current) return 0;
    return (wrapperRef.current.offsetWidth - GAP * (count - 1)) / count;
  };

  // Responsive
  useEffect(() => {
    const update = () => {
      const count = getVisibleCount();
      setVisibleCount(count);
      setAnimated(false);
      setIndex(0);
      indexRef.current = 0;
      requestAnimationFrame(() => {
        setItemWidth(calcItemWidth(count));
        requestAnimationFrame(() => setAnimated(true));
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Autoplay — trượt 1 card mỗi lần
  useEffect(() => {
    if (!itemWidth) return;
    const timer = setInterval(() => {
      const next = indexRef.current + 1;
      // Khi đã trượt hết bản gốc → reset về 0 không animation
      if (next >= corners.length) {
        setIndex(next);
        indexRef.current = next;
        setTimeout(() => {
          setAnimated(false);
          setIndex(0);
          indexRef.current = 0;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setAnimated(true)),
          );
        }, 780);
      } else {
        setIndex(next);
        indexRef.current = next;
      }
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [itemWidth]);

  const translateX = index * (itemWidth + GAP);

  return (
    <section className="py-12 bg-[#fff3f4] w-full">
      <div className="px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2d3748]">GÓC NHỎ ỤM BÒ</h2>
          <div className="mt-2 h-1 w-16 bg-[#F7a3a9] rounded-full" />
        </div>

        <div className="overflow-hidden" ref={wrapperRef}>
          <div
            className="flex"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(-${translateX}px)`,
              transition: animated
                ? "transform 750ms cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
          >
            {items.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                style={{ width: itemWidth || "auto", flexShrink: 0 }}
              >
                <CornerCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CornerCard = ({ item }) => (
  <div className="relative w-full h-48 rounded-[20px] overflow-hidden">
    <Image
      src={item.image}
      alt={item.title}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover"
    />
  </div>
);

export default CornerSection;
