"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [combos, setCombos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const trackRef = useRef(null);
  const bpRef = useRef("desktop");

  const total = combos.length;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/haravan/products");
        if (!res.ok) throw new Error();
        const data = await res.json();
        const payload = Array.isArray(data) ? data : (data.products ?? []);

        const normalizedCombos = payload
          .filter((p) => {
            const category = String(p.category ?? "").toLowerCase();
            const name = String(p.name ?? p.title ?? "").toLowerCase();
            return category === "combo" || name.includes("combo");
          })
          .map((item) => {
            const title = item.title ?? item.name ?? "Combo";
            const description =
              item.description ??
              (item.bodyHtml
                ? item.bodyHtml.replace(/<[^>]+>/g, "").trim()
                : "Combo ưu đãi hấp dẫn");

            return {
              id: item.id,
              name: title,
              title,
              tag: item.tag ?? "Combo tiết kiệm",
              category: item.category ?? "combo",
              description,
              price: Number(item.price ?? item.variant?.price ?? 0) || 0,
              oldPrice:
                Number(item.oldPrice ?? item.variant?.compare_at_price) ||
                undefined,
              discount:
                item.discount ??
                (item.variant?.compare_at_price && item.variant?.price
                  ? Math.round(
                      (1 - item.variant.price / item.variant.compare_at_price) *
                        100,
                    )
                  : undefined),
              image: item.image ?? item.images?.[0]?.src ?? "",
              volume: item.volume ?? item.variant?.title ?? "",
              available: item.available ?? true,
              sku: item.sku ?? "",
              bodyHtml: item.bodyHtml ?? "",
              isNew: Boolean(item.isNew),
            };
          });

        setCombos(normalizedCombos);
      } catch {
        // giữ nguyên mảng rỗng nếu lỗi
      }
    };
    load();
  }, []);

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
      <section className="max-w-7xl mx-auto bg-[#FFF1F5] rounded-[40px] px-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F2937] uppercase leading-tight">
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
