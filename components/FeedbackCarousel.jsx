"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { feedbacks } from "@/data/feedbacks";
import { useTheme } from "@/components/ThemeProvider";

const AUTOPLAY_DELAY = 4000;

const defaultTokens = {
  sectionBg: "#fff3f4",
  overlay: "rgba(255,243,244,0.75)",
  blur1: "rgba(249,192,203,0.4)",
  blur2: "rgba(251,182,194,0.3)",
  decorColor: "rgba(249,168,184,0.5)",
  titleColor: "#F7a3a9",
  subtitleColor: "rgba(247,163,169,0.75)",
  quoteColor: "rgba(90,45,58,0.8)",
  nameColor: "#F7a3a9",
  roleColor: "rgba(247,163,169,0.65)",
  arrowBg: "rgba(255,255,255,0.3)",
  arrowBorder: "rgba(255,255,255,0.6)",
  arrowColor: "white",
  dotActive: "#e8547a",
  dotInactive: "rgba(249,168,184,0.7)",
  avatarBorder: "white",
};

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, transition: { duration: 0.5, ease: "easeIn" } }),
};

const avatarVariants = {
  enter: { opacity: 0, scale: 0.85 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.4 } },
};

const DECOR_POSITIONS = [
  "top-5 left-6 text-4xl", "top-8 right-10 text-3xl",
  "bottom-6 left-14 text-3xl", "bottom-5 right-7 text-4xl",
  "top-1/2 left-4 -translate-y-1/2 text-2xl", "top-1/2 right-4 -translate-y-1/2 text-2xl",
];

const FeedbackCarousel = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.feedbackCarousel ?? defaultTokens;

  const go = useCallback((step) => {
    setDir(step);
    setIndex((prev) => (prev + step + feedbacks.length) % feedbacks.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(1), AUTOPLAY_DELAY);
    return () => clearInterval(timerRef.current);
  }, [paused, go]);

  const current = feedbacks[index];

  return (
    <section
      className="relative w-full sm:min-h-[700px] overflow-hidden"
      style={{ background: t.sectionBg }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image */}
      <Image src="/images/review_banner.png" alt="Review Banner" fill className="object-center" priority />
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: t.overlay }} />

      {/* Blur decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl" style={{ background: t.blur1 }} />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full blur-3xl" style={{ background: t.blur2 }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/15 blur-2xl" />
        {DECOR_POSITIONS.map((cls, i) => (
          <span key={i} className={`absolute ${cls} select-none`} style={{ color: t.decorColor }}>✿</span>
        ))}
        {["top-10 left-1/4", "bottom-10 right-1/4"].map((pos, i) => (
          <span key={i} className={`absolute ${pos} text-white/20 text-5xl select-none`}>🥛</span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center sm:min-h-[700px] px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-center leading-tight drop-shadow-sm"
          style={{ color: t.titleColor }}>
          Khách hàng nói về Um Bò Milk
        </h2>
        <p className="mt-2 mb-10 text-sm sm:text-base font-medium text-center"
          style={{ color: t.subtitleColor }}>
          Chia sẻ cảm nhận thật từ trải nghiệm sản phẩm của chúng tôi.
        </p>

        <div className="relative w-full max-w-[700px] flex items-center">
          <button onClick={() => go(-1)} aria-label="Trước"
            className="absolute -left-2 sm:-left-10 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-200"
            style={{ background: t.arrowBg, border: `1px solid ${t.arrowBorder}`, color: t.arrowColor }}>
            <ChevronLeft size={18} />
          </button>

          <div className="flex-1 overflow-hidden px-8 sm:px-12">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={current.id} custom={dir} variants={variants}
                initial="enter" animate="center" exit="exit"
                className="flex flex-col items-center text-center">
                <motion.div key={current.id + "-avatar"} variants={avatarVariants}
                  initial="enter" animate="center" exit="exit"
                  className="relative w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-full overflow-hidden border-4 shadow-lg mb-5"
                  style={{ borderColor: t.avatarBorder }}>
                  <Image src={current.avatar} alt={current.name} fill className="object-cover" />
                </motion.div>
                <p className="text-sm sm:text-base leading-relaxed max-w-[600px] mb-5 font-medium"
                  style={{ color: t.quoteColor }}>
                  &ldquo;{current.content}&rdquo;
                </p>
                <p className="font-black text-base sm:text-lg drop-shadow-sm" style={{ color: t.nameColor }}>
                  {current.name}
                </p>
                <p className="text-xs mt-1" style={{ color: t.roleColor }}>{current.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={() => go(1)} aria-label="Tiếp theo"
            className="absolute -right-2 sm:-right-10 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-200"
            style={{ background: t.arrowBg, border: `1px solid ${t.arrowBorder}`, color: t.arrowColor }}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {feedbacks.map((_, i) => (
            <button key={i} onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
              aria-label={`Slide ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === index ? "24px" : "8px",
                background: i === index ? t.dotActive : t.dotInactive,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackCarousel;
