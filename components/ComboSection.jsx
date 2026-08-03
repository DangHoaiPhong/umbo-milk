"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ComboCard from "./ComboCard";
import { useTheme } from "@/components/ThemeProvider";

const GAP = 32;
const getBreakpoint = (w) =>
  w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";
const getVisibleCount = (bp) => (bp === "mobile" ? 1 : bp === "tablet" ? 2 : 3);

function ComboDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes floatLantern{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-10px) rotate(4deg)}}
        @keyframes shimmer{0%,100%{opacity:.2}50%{opacity:.5}}
      `}</style>
      <div
        className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,228,160,0.12) 0%, transparent 70%)",
        }}
      />
      <svg
        className="absolute left-4 top-4 w-16 h-20 opacity-35"
        viewBox="0 0 64 80"
        fill="none"
        style={{ animation: "floatLantern 4s ease-in-out infinite" }}
      >
        <line
          x1="32"
          y1="0"
          x2="32"
          y2="8"
          stroke="#FFE4A0"
          strokeWidth="1.5"
        />
        <rect x="10" y="8" width="44" height="5" rx="2.5" fill="#c0392b" />
        <ellipse cx="32" cy="44" rx="22" ry="28" fill="#FFE4A0" opacity=".85" />
        <ellipse cx="32" cy="44" rx="10" ry="14" fill="white" opacity=".12" />
        {[0.3, 0.5, 0.7].map((t, i) => (
          <line
            key={i}
            x1={64 * t}
            y1="13"
            x2={64 * t}
            y2="75"
            stroke="#8B0000"
            strokeWidth="1"
            opacity=".3"
          />
        ))}
        <rect x="10" y="69" width="44" height="5" rx="2.5" fill="#c0392b" />
        {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
          <line
            key={i}
            x1={64 * t}
            y1="74"
            x2={64 * t + (i % 2 === 0 ? -3 : 3)}
            y2="80"
            stroke="#FFE4A0"
            strokeWidth="1.2"
            opacity=".7"
          />
        ))}
      </svg>
      <svg
        className="absolute right-4 top-4 w-14 h-18 opacity-35"
        viewBox="0 0 56 72"
        fill="none"
        style={{ animation: "floatLantern 3.5s ease-in-out .6s infinite" }}
      >
        <line
          x1="28"
          y1="0"
          x2="28"
          y2="7"
          stroke="#FFE4A0"
          strokeWidth="1.5"
        />
        <rect x="8" y="7" width="40" height="4" rx="2" fill="#c0392b" />
        <ellipse cx="28" cy="38" rx="20" ry="24" fill="#ffb347" opacity=".8" />
        <ellipse cx="28" cy="38" rx="9" ry="12" fill="white" opacity=".1" />
        <rect x="8" y="59" width="40" height="4" rx="2" fill="#c0392b" />
      </svg>
      {[
        [10, 15],
        [88, 8],
        [50, 5],
        [25, 85],
        [75, 90],
      ].map(([x, y], i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#FFE4A0]"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animation: `shimmer ${1.8 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

const ComboSection = () => {
  const [combos, setCombos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const trackRef = useRef(null);
  const bpRef = useRef("desktop");
  const { theme } = useTheme();
  const isMidAutumn = theme?.id === "trung-thu";
  const st = theme?.sectionTheme?.comboSection;

  const total = combos.length;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/haravan/products");
        if (!res.ok) throw new Error();
        const data = await res.json();
        const payload = Array.isArray(data) ? data : (data.products ?? []);
        setCombos(
          payload
            .filter((p) => {
              const cat = String(p.category ?? "").toLowerCase();
              const name = String(p.name ?? p.title ?? "").toLowerCase();
              return cat === "combo" || name.includes("combo");
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
                        (1 -
                          item.variant.price / item.variant.compare_at_price) *
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
            }),
        );
      } catch {
        /* giữ nguyên */
      }
    };
    load();
  }, []);

  const calcItemWidth = useCallback((count) => {
    if (!trackRef.current) return 0;
    return (trackRef.current.offsetWidth - GAP * (count - 1)) / count;
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
        bpRef.current = newBp;
        reset(newCount);
      } else setItemWidth(calcItemWidth(newCount));
    };
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

  const carouselTrack = (
    <div className="overflow-hidden">
      <div className="overflow-visible py-4" ref={trackRef}>
        <div
          className="flex"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(-${translateX}px)`,
            transition: transitioning ? "transform 500ms ease-in-out" : "none",
          }}
        >
          {combos.map((combo, i) => (
            <div
              key={combo.id}
              style={{
                width: itemWidth > 0 ? `${itemWidth}px` : undefined,
                flexShrink: 0,
              }}
            >
              <ComboCard combo={combo} delay={i * 120} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNav = (navStyle) =>
    canScroll && (
      <>
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Trước"
          className="absolute -left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
          style={navStyle}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          disabled={current === maxIndex}
          aria-label="Tiếp"
          className="absolute -right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
          style={navStyle}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </>
    );

  // ── Default ─────────────────────────────────────────────────────────────────
  if (!isMidAutumn) {
    return (
      <div className="w-full bg-[#FFF1F5] py-6 px-4">
        <section className="max-w-7xl mx-auto bg-[#FFF1F5] rounded-[40px] px-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F2937] uppercase leading-tight">
              COMBO TIẾT KIỆM
            </h2>
            <div className="mt-3 h-1 w-[70px] rounded-full bg-[#F7a3a9]" />
          </div>
          <div className="relative">
            {renderNav({
              background: "white",
              border: "1px solid #F7a3a9",
              color: "#F7a3a9",
            })}
            {carouselTrack}
          </div>
          {canScroll && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Combo ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === current ? "h-2.5 w-6 bg-[#F7a3a9]" : "h-2.5 w-2.5 bg-[#F7a3a9]/30"}`}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  // ── Trung Thu ───────────────────────────────────────────────────────────────
  return (
    <div
      className="relative w-full py-6 px-4 overflow-hidden"
      style={{ background: st?.bg }}
    >
      <ComboDecor />
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: st?.accentTop }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: st?.accentBottom }}
      />

      <section className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <p
            className="text-xs font-medium tracking-[0.3em] uppercase mb-2 opacity-75"
            style={{ color: st?.labelColor }}
          >
            {st?.label}
          </p>
          <h2
            className="text-xl sm:text-2xl font-bold tracking-wide uppercase"
            style={{ color: st?.titleColor }}
          >
            COMBO TIẾT KIỆM
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div
              className="h-[1px] w-12"
              style={{
                background: `linear-gradient(to right, transparent, ${st?.labelColor})`,
              }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: st?.labelColor }}
            />
            <div
              className="h-[2px] w-6 rounded-full"
              style={{ background: st?.labelColor }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: st?.labelColor }}
            />
            <div
              className="h-[1px] w-12"
              style={{
                background: `linear-gradient(to left, transparent, ${st?.labelColor})`,
              }}
            />
          </div>
        </div>

        <div className="relative">
          {renderNav(st?.navBtn)}
          {carouselTrack}
        </div>

        {canScroll && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Combo ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "24px" : "10px",
                  height: "10px",
                  background:
                    i === current ? st?.dot?.active : st?.dot?.inactive,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ComboSection;
