"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const AUTUMN_THEME_IDS = ["autumn", "trung-thu"];
const STORAGE_KEY = "autumnGreetingViewed";

const messageLines = [
  "Cảm ơn bạn đã ghé thăm UmBo Milk.",
  "Nhân dịp Tết Trung Thu, UmBo Milk kính chúc bạn và gia đình luôn mạnh khỏe, bình an, hạnh phúc và có một mùa đoàn viên trọn vẹn.",
  "Hy vọng những sản phẩm của UmBo Milk sẽ góp phần mang đến những khoảnh khắc ngọt ngào bên gia đình và người thân.",
  "🌕 Chúc bạn một mùa Trung Thu an lành, ấm áp và tràn đầy niềm vui.",
];

const sparkles = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${(index * 7 + 6) % 100}%`,
  top: `${(index * 13 + 3) % 100}%`,
  size: [10, 12, 14][index % 3],
  delay: `${(index % 5) * 0.35}s`,
  duration: `${2.6 + (index % 4) * 0.5}s`,
}));

const cardSurfaceStyle = {
  background:
    "linear-gradient(160deg, rgba(255,228,160,0.06), rgba(255,255,255,0.02))",
  backfaceVisibility: "hidden",
};

const cardShellClassName =
  "relative flex min-h-[320px] flex-col items-center justify-center rounded-[22px] border border-[#FFE4A0]/20 px-4 py-6 text-center text-[#FFF7D8] sm:min-h-[460px] sm:rounded-[24px] sm:px-8 sm:py-8";

const actionButtonClassName =
  "mt-7 rounded-full bg-[linear-gradient(135deg,#FFD86A_0%,#FFB800_100%)] px-6 py-3 text-sm font-semibold text-[#7B0000] shadow-[0_10px_30px_rgba(255,200,0,0.25)]";

function getGreetingPhase(phase) {
  return (
    phase === "ready" ||
    phase === "opening" ||
    phase === "opened" ||
    phase === "closing"
  );
}

function MoonDecor() {
  return (
    <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-[#FFE8A8] opacity-25 blur-xl" />
      <div className="absolute inset-2 rounded-full border border-[#FFE8A8]/40" />
      <div
        className="relative h-14 w-14 rounded-full shadow-[0_0_35px_rgba(255,208,99,0.45)]"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #FFF9E5 0%, #FFD163 50%, #F7A200 100%)",
        }}
      />
    </div>
  );
}

function LanternDecor({ className, delay }) {
  return (
    <motion.div
      className={className}
      initial={{ rotate: -6 }}
      animate={{ rotate: [-6, 6, -6] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ transformOrigin: "top center" }}
    >
      <svg
        viewBox="0 0 48 70"
        className="h-14 w-12 sm:h-16 sm:w-14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="10" width="28" height="40" rx="12" fill="#D94B3D" />
        <rect
          x="10"
          y="10"
          width="28"
          height="40"
          rx="12"
          fill="url(#lanternGlow)"
          opacity="0.7"
        />
        <line x1="24" y1="5" x2="24" y2="12" stroke="#FFE4A0" strokeWidth="2" />
        <line
          x1="14"
          y1="28"
          x2="34"
          y2="28"
          stroke="#FFE4A0"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <path
          d="M16 50L14 60"
          stroke="#FFD76B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M32 50L34 60"
          stroke="#FFD76B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="lanternGlow"
            x1="10"
            y1="10"
            x2="38"
            y2="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFF1B9" />
            <stop offset="100%" stopColor="#D94B3D" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export default function AutumnGreetingCard() {
  const pathname = usePathname();
  const { currentThemeId } = useTheme();
  const [phase, setPhase] = useState("hidden");
  const [isReady, setIsReady] = useState(false);

  const isAutumnTheme = useMemo(
    () => AUTUMN_THEME_IDS.includes(currentThemeId),
    [currentThemeId],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isAutumnTheme) {
      setPhase("hidden");
      return;
    }

    const alreadyViewed = window.localStorage.getItem(STORAGE_KEY) === "true";
    if (alreadyViewed) {
      setPhase("hidden");
      return;
    }

    setIsReady(true);
    const timer = window.setTimeout(() => setPhase("entering"), 120);
    return () => window.clearTimeout(timer);
  }, [isAutumnTheme]);

  useEffect(() => {
    if (phase !== "entering") return;

    const timer = window.setTimeout(() => setPhase("ready"), 420);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleOpen = () => setPhase("opening");

  const handleContinue = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
    setPhase("closing");
  };

  const handleExited = () => setPhase("hidden");

  if (!isReady || !isAutumnTheme || pathname !== "/" || phase === "hidden") {
    return null;
  }

  const isVisible = getGreetingPhase(phase);

  return (
    <AnimatePresence onExitComplete={handleExited}>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-[rgba(12,4,4,0.72)] px-3 py-4 sm:px-4 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "closing" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ backdropFilter: "blur(8px)" }}
        >
          {sparkles.map((sparkle) => (
            <motion.span
              key={sparkle.id}
              className="pointer-events-none absolute rounded-full bg-[#FFE4A0]"
              style={{
                left: sparkle.left,
                top: sparkle.top,
                width: sparkle.size,
                height: sparkle.size,
                boxShadow: "0 0 14px rgba(255,228,160,0.35)",
              }}
              initial={{ opacity: 0.15, scale: 0.8 }}
              animate={{ opacity: [0.15, 0.6, 0.15], scale: [0.8, 1.25, 0.8] }}
              transition={{
                duration: Number(sparkle.duration.replace("s", "")),
                repeat: Infinity,
                delay: sparkle.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="absolute left-[8%] top-4 hidden sm:block">
            <LanternDecor className="opacity-80" delay={0.1} />
          </div>
          <div className="absolute right-[8%] top-4 hidden sm:block">
            <LanternDecor className="opacity-70" delay={0.35} />
          </div>

          <motion.div
            className="relative max-h-[calc(100vh-2rem)] w-full max-w-140"
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative w-full rounded-[26px] border border-[#FFE4A0]/35 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:rounded-[30px] sm:p-6"
              style={{
                background:
                  "linear-gradient(145deg, #5f0a0a 0%, #8b0000 48%, #6d0d0d 100%)",
                transformStyle: "preserve-3d",
                perspective: 1600,
              }}
              animate={{
                rotateY: phase === "opening" || phase === "opened" ? 180 : 0,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-[#FFE4A0] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-transparent via-[#FFE4A0] to-transparent" />
              <div className="absolute left-3 top-3 text-sm text-[#FFE4A0]/45">
                ✦
              </div>
              <div className="absolute right-3 top-3 text-sm text-[#FFE4A0]/45">
                ✦
              </div>
              <div className="absolute bottom-3 left-3 text-sm text-[#FFE4A0]/45">
                ✦
              </div>
              <div className="absolute bottom-3 right-3 text-sm text-[#FFE4A0]/45">
                ✦
              </div>

              <div className={cardShellClassName} style={cardSurfaceStyle}>
                <MoonDecor />
                <h2 className="text-[clamp(1.1rem,2.6vw,1.55rem)] font-semibold tracking-[0.2em] text-[#FFE4A0]">
                  🌕 Chúc Mừng Tết Trung Thu
                </h2>
                <p className="mt-3 text-sm text-[#FFDDA9]/80 sm:text-[15px]">
                  Nhấn để mở thiệp chúc mừng của bạn
                </p>

                <motion.button
                  type="button"
                  onClick={handleOpen}
                  whileTap={{ scale: 0.97 }}
                  className={actionButtonClassName}
                >
                  🎑 Mở thiệp
                </motion.button>
              </div>

              <div
                className={`${cardShellClassName} absolute inset-0`}
                style={{
                  ...cardSurfaceStyle,
                  transform: "rotateY(180deg)",
                }}
              >
                <MoonDecor />
                <h3 className="text-[clamp(1rem,2.4vw,1.35rem)] font-semibold tracking-[0.16em] text-[#FFE4A0]">
                  🌕 Chúc Mừng Tết Trung Thu
                </h3>
                <div className="mt-5 max-h-[50vh] w-full max-w-107.5 overflow-y-auto rounded-[20px] border border-[#FFE4A0]/20 bg-[#5b0a0a]/60 px-4 py-5 text-left shadow-[inset_0_1px_0_rgba(255,228,160,0.08)] sm:px-6">
                  {messageLines.map((line, index) => (
                    <p
                      key={line}
                      className={`text-sm leading-7 text-[#FFEFD2] sm:text-[15px] ${index === messageLines.length - 1 ? "mt-3 font-medium italic text-[#FFE4A0]" : "mt-2"}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <motion.button
                  type="button"
                  onClick={handleContinue}
                  whileTap={{ scale: 0.97 }}
                  className={actionButtonClassName}
                >
                  🛍️ Tiếp tục mua sắm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
