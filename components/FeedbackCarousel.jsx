"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { feedbacks } from "@/data/feedbacks";

const AUTOPLAY_DELAY = 4000;

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    transition: { duration: 0.4, ease: "easeIn" },
  }),
};

const FeedbackCarousel = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback(
    (step) => {
      setDir(step);
      setIndex((prev) => (prev + step + feedbacks.length) % feedbacks.length);
    },
    []
  );

  // Autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(1), AUTOPLAY_DELAY);
    return () => clearInterval(timerRef.current);
  }, [paused, go]);

  const current = feedbacks[index];

  return (
    <section
      className="relative w-full py-16 px-4 overflow-hidden bg-[#fde2e0]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Trang trí nền */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#f9c0cb]/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#fbb6c2]/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/20 blur-2xl" />
        {/* Hoa trang trí */}
        {["top-6 left-8", "top-10 right-12", "bottom-8 left-16", "bottom-6 right-8"].map(
          (pos, i) => (
            <span key={i} className={`absolute ${pos} text-[#f9a8b8]/40 text-3xl select-none`}>
              ✿
            </span>
          )
        )}
      </div>

      {/* Container */}
      <div className="relative max-w-[860px] mx-auto bg-white/60 backdrop-blur-sm border border-white/80 rounded-[28px] px-6 py-10 sm:px-12 sm:py-14 shadow-sm">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#e8547a] leading-tight">
            Khách hàng nói về Um Bò Milk
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#e8547a]/70 font-medium">
            Chia sẻ cảm nhận thật từ trải nghiệm sản phẩm của chúng tôi.
          </p>
        </div>

        {/* Slide area */}
        <div className="relative flex items-center gap-3 sm:gap-6">

          {/* Prev */}
          <button
            onClick={() => go(-1)}
            aria-label="Trước"
            className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 border border-[#f9a8b8]/50 flex items-center justify-center text-[#e8547a] shadow-sm hover:bg-[#e8547a] hover:text-white hover:border-[#e8547a] transition-colors duration-200"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Card */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center text-center px-2"
              >
                {/* Avatar */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-5">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Quote */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-[520px] mb-5">
                  &ldquo;{current.content}&rdquo;
                </p>

                {/* Name & role */}
                <p className="font-black text-[#e8547a] text-base sm:text-lg">
                  {current.name}
                </p>
                <p className="text-xs text-[#e8547a]/60 mt-0.5">{current.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          <button
            onClick={() => go(1)}
            aria-label="Tiếp theo"
            className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 border border-[#f9a8b8]/50 flex items-center justify-center text-[#e8547a] shadow-sm hover:bg-[#e8547a] hover:text-white hover:border-[#e8547a] transition-colors duration-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {feedbacks.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#e8547a]" : "w-2 bg-[#f9a8b8]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackCarousel;
