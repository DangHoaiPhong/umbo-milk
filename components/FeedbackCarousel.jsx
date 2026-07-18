"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { feedbacks } from "@/data/feedbacks";

const AUTOPLAY_DELAY = 4000;

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    transition: { duration: 0.5, ease: "easeIn" },
  }),
};

const avatarVariants = {
  enter: { opacity: 0, scale: 0.85 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.4 } },
};

const FeedbackCarousel = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image */}
      <Image
        src="/images/review_banner.png"
        alt="Review Banner"
        fill
        className="object-center"
        priority
      />
      {/* Overlay hồng pastel */}
      <div className="absolute inset-0 bg-[#fff3f4]/75" />

      {/* Trang trí blur */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#f9c0cb]/40 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-[#fbb6c2]/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/15 blur-2xl" />
        {/* Hoa trang trí */}
        {[
          "top-5 left-6 text-4xl",
          "top-8 right-10 text-3xl",
          "bottom-6 left-14 text-3xl",
          "bottom-5 right-7 text-4xl",
          "top-1/2 left-4 -translate-y-1/2 text-2xl",
          "top-1/2 right-4 -translate-y-1/2 text-2xl",
        ].map((cls, i) => (
          <span
            key={i}
            className={`absolute ${cls} text-[#f9a8b8]/50 select-none`}
          >
            ✿
          </span>
        ))}
        {/* Họa tiết giọt sữa */}
        {["top-10 left-1/4", "bottom-10 right-1/4"].map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} text-white/20 text-5xl select-none`}
          >
            🥛
          </span>
        ))}
      </div>

      {/* Nội dung */}
      <div className="relative z-10 flex flex-col items-center justify-center sm:min-h-[700px] px-6 py-14">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#F7a3a9] text-center leading-tight drop-shadow-sm">
          Khách hàng nói về Um Bò Milk
        </h2>
        <p className="mt-2 mb-10 text-sm sm:text-base text-[#F7a3a9]/75 font-medium text-center">
          Chia sẻ cảm nhận thật từ trải nghiệm sản phẩm của chúng tôi.
        </p>

        {/* Slider */}
        <div className="relative w-full max-w-[700px] flex items-center">
          {/* Arrow Prev */}
          <button
            onClick={() => go(-1)}
            aria-label="Trước"
            className="absolute -left-2 sm:-left-10 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 bg-white/30 flex items-center justify-center text-white opacity-70 hover:opacity-100 hover:bg-white/50 transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Slide content */}
          <div className="flex-1 overflow-hidden px-8 sm:px-12">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center text-center"
              >
                {/* Avatar */}
                <motion.div
                  key={current.id + "-avatar"}
                  variants={avatarVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-full overflow-hidden border-4 border-white shadow-lg mb-5"
                >
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Quote */}
                <p className="text-[#5a2d3a]/80 text-sm sm:text-base leading-relaxed max-w-[600px] mb-5 font-medium">
                  &ldquo;{current.content}&rdquo;
                </p>

                {/* Name */}
                <p className="font-black text-[#F7a3a9] text-base sm:text-lg drop-shadow-sm">
                  {current.name}
                </p>
                <p className="text-xs text-[#F7a3a9]/65 mt-1">{current.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow Next */}
          <button
            onClick={() => go(1)}
            aria-label="Tiếp theo"
            className="absolute -right-2 sm:-right-10 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 bg-white/30 flex items-center justify-center text-white opacity-70 hover:opacity-100 hover:bg-white/50 transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {feedbacks.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#e8547a]" : "w-2 bg-[#f9a8b8]/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackCarousel;
