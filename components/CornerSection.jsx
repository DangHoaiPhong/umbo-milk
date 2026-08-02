"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { corners } from "@/data/corners";
import { useTheme } from "@/components/ThemeProvider";

const AUTOPLAY_DELAY = 3500;
const GAP = 16;
const getVisibleCount = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
};
const items = [...corners, ...corners];

const CornerSection = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [itemWidth, setItemWidth] = useState(0);
  const wrapperRef = useRef(null);
  const indexRef = useRef(0);
  const { theme } = useTheme();
  const isMidAutumn = theme?.id === "trung-thu";
  const st = theme?.sectionTheme?.cornerSection;

  const calcItemWidth = (count) => {
    if (!wrapperRef.current) return 0;
    return (wrapperRef.current.offsetWidth - GAP * (count - 1)) / count;
  };

  useEffect(() => {
    const update = () => {
      const count = getVisibleCount();
      setVisibleCount(count); setAnimated(false); setIndex(0); indexRef.current = 0;
      requestAnimationFrame(() => {
        setItemWidth(calcItemWidth(count));
        requestAnimationFrame(() => setAnimated(true));
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!itemWidth) return;
    const timer = setInterval(() => {
      const next = indexRef.current + 1;
      if (next >= corners.length) {
        setIndex(next); indexRef.current = next;
        setTimeout(() => {
          setAnimated(false); setIndex(0); indexRef.current = 0;
          requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
        }, 780);
      } else { setIndex(next); indexRef.current = next; }
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [itemWidth]);

  const translateX = index * (itemWidth + GAP);

  const sliderTrack = (
    <div className="overflow-hidden" ref={wrapperRef}>
      <div className="flex" style={{
        gap: `${GAP}px`,
        transform: `translateX(-${translateX}px)`,
        transition: animated ? "transform 750ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
      }}>
        {items.map((item, i) => (
          <div key={`${item.id}-${i}`} style={{ width: itemWidth || "auto", flexShrink: 0 }}>
            <CornerCard item={item} cardStyle={isMidAutumn ? st?.card : null} />
          </div>
        ))}
      </div>
    </div>
  );

  if (!isMidAutumn) {
    return (
      <section className="py-12 bg-[#fff3f4] w-full">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#2d3748]">GÓC NHỎ ỤM BÒ</h2>
            <div className="mt-2 h-1 w-16 bg-[#F7a3a9] rounded-full" />
          </div>
          {sliderTrack}
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12 w-full overflow-hidden" style={{ background: st?.bg }}>
      <style>{`@keyframes glowPulse{0%,100%{opacity:.2}50%{opacity:.6}}`}</style>

      {/* Sóng mây trên */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-12 overflow-hidden"
        style={{ opacity: st?.waveOpacity }}>
        <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="w-full h-full" fill="none">
          <path d="M0,24 Q100,8 200,24 Q300,40 400,24 Q500,8 600,24 Q700,40 800,24 Q900,8 1000,24 Q1100,40 1200,24 L1200,0 L0,0 Z"
            fill={st?.waveColor} opacity=".15"/>
        </svg>
      </div>

      {/* Sóng mây dưới */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 overflow-hidden"
        style={{ opacity: st?.waveOpacity }}>
        <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="w-full h-full" fill="none">
          <path d="M0,24 Q100,40 200,24 Q300,8 400,24 Q500,40 600,24 Q700,8 800,24 Q900,40 1000,24 Q1100,8 1200,24 L1200,48 L0,48 Z"
            fill={st?.waveColor} opacity=".15"/>
        </svg>
      </div>

      {/* Ngôi sao */}
      <div className="pointer-events-none absolute inset-0">
        {[[5,20],[95,15],[15,75],[85,80],[50,10]].map(([x,y],i)=>(
          <div key={i} className="absolute w-1 h-1 rounded-full"
            style={{left:`${x}%`,top:`${y}%`,background:st?.waveColor,
              animation:`glowPulse ${1.5+i*0.5}s ease-in-out ${i*0.4}s infinite alternate`}}/>
        ))}
      </div>

      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-1.5 opacity-75"
            style={{ color: st?.labelColor }}>{st?.label}</p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide"
            style={{ color: st?.titleColor }}>GÓC NHỎ ỤM BÒ</h2>
          <div className="mt-2.5 flex items-center gap-2">
            <div className="h-[2px] w-8 rounded-full" style={{ background: st?.labelColor }} />
            <div className="h-1 w-1 rounded-full opacity-60" style={{ background: st?.labelColor }} />
            <div className="h-[2px] w-4 rounded-full opacity-40" style={{ background: st?.labelColor }} />
          </div>
        </div>
        {sliderTrack}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, rgba(255,228,160,0.4), transparent)` }} />
    </section>
  );
};

const CornerCard = ({ item, cardStyle }) => (
  <div className="relative w-full h-48 rounded-[20px] overflow-hidden"
    style={cardStyle ? { border: cardStyle.border, boxShadow: cardStyle.shadow } : {}}>
    <Image src={item.image} alt={item.title} fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover" />
    {cardStyle && (
      <div className="absolute inset-0" style={{ background: cardStyle.overlayBg }} />
    )}
  </div>
);

export default CornerSection;
