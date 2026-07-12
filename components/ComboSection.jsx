"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { combos } from "@/data/combos";
import ComboCard from "./ComboCard";

const GAP = 32; // gap-8 = 32px

const getBreakpoint = (width) => {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

const getVisibleCount = (bp) => {
  if (bp === "mobile") return 1;
  if (bp === "tablet") return 2;
  return 3;
};

const ComboSection = () => {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const trackRef = useRef(null);
  const bpRef = useRef("desktop");

  const total = combos.length;

  const calcItemWidth = useCallback((count) => {
    if (!trackRef.current) return 0;
    const containerWidth = trackRef.current.offsetWidth;
    return (containerWidth - GAP * (count - 1)) / count;
  }, []);

  const reset = useCallback(
    (count) => {
      setTransitioning(false);
      setCurrent(0);
      setVisibleCount(count);
      requestAnimationFrame(() => {
        setItemWidth(calcItemWidth(count));
        requestAnimationFrame(() => setTransitioning(true));
      });
    },
    [calcItemWidth],
  );

  useEffect(() => {
    const handleResize = () => {
      const newBp = getBreakpoint(window.innerWidth);
      const newCount = getVisibleCount(newBp);

      if (newBp !== bpRef.current) {
        // Breakpoint thực sự thay đổi → reset hoàn toàn
        bpRef.current = newBp;
        reset(newCount);
      } else {
        // Cùng breakpoint, chỉ recalc width (window resize nhỏ)
        setItemWidth(calcItemWidth(newCount));
      }
    };

    // Init
    const initBp = getBreakpoint(window.innerWidth);
    const initCount = getVisibleCount(initBp);
    bpRef.current = initBp;
    setVisibleCount(initCount);
    setItemWidth(calcItemWidth(initCount));

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [reset, calcItemWidth]);

  const canScroll = total > visibleCount;
  const maxIndex = Math.max(0, total - visibleCount);

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));

  const translateX = current * (itemWidth + GAP);

  return (
    <div className="w-full bg-[#FFF1F5] py-6 px-4">
      <section className="max-w-7xl mx-auto bg-[#FFF1F5] rounded-[40px] py-16 px-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1F2937] uppercase leading-tight">
            COMBO TIẾT KIỆM
          </h2>
          <div className="mt-3 h-1 w-[70px] bg-[#F7a3a9] rounded-full" />
        </div>

        {/* Carousel */}
        <div className="relative">
          {canScroll && (
            <button
              onClick={prev}
              disabled={current === 0}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#F7a3a9] flex items-center justify-center text-[#F7a3a9] shadow-md transition-all duration-300 hover:bg-[#F7a3a9] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScroll && (
            <button
              onClick={next}
              disabled={current === maxIndex}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#F7a3a9] flex items-center justify-center text-[#F7a3a9] shadow-md transition-all duration-300 hover:bg-[#F7a3a9] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Tiếp"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          <div className="overflow-hidden">
          <div className="overflow-visible py-4" ref={trackRef}>
            <div
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(-${translateX}px)`,
                transition: transitioning
                  ? "transform 500ms ease-in-out"
                  : "none",
              }}
            >
              {combos.map((combo, index) => (
                <div
                  key={combo.id}
                  style={{
                    width: itemWidth > 0 ? `${itemWidth}px` : undefined,
                    flexShrink: 0,
                  }}
                >
                  <ComboCard combo={combo} delay={index * 120} />
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>

        {canScroll && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2.5 bg-[#F7a3a9]"
                    : "w-2.5 h-2.5 bg-[#F7a3a9]/30"
                }`}
                aria-label={`Combo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ComboSection;
