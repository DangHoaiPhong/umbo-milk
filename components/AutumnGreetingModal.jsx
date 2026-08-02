"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

// ─── Config (dễ tái sử dụng cho theme khác) ───────────────────────────────────
const GREETING_CONFIG = {
  themeId: "trung-thu",
  storageKey: "autumnGreetingViewed",
  title: "🌕 Chúc Mừng Tết Trung Thu",
  message: [
    "Cảm ơn bạn đã ghé thăm UmBo Milk.",
    "Nhân dịp Tết Trung Thu, kính chúc bạn và gia đình luôn mạnh khỏe, hạnh phúc và có một mùa đoàn viên trọn vẹn.",
    "Chúc bạn có những phút giây ấm áp bên người thân và đừng quên thưởng thức những sản phẩm thơm ngon từ UmBo Milk.",
    "🌕 Chúc bạn một mùa Trung Thu an lành và hạnh phúc!",
  ],
};

// ─── Particles (hạt sáng nhẹ) ─────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.round(5 + ((i * 37) % 90)),
  y: Math.round(5 + ((i * 53) % 90)),
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  delay: (i * 0.3) % 3,
  duration: 2.5 + (i % 4) * 0.5,
}));

// ─── Lantern SVG ──────────────────────────────────────────────────────────────
function Lantern({ style, className }) {
  return (
    <svg
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <line x1="20" y1="0" x2="20" y2="8" stroke="#FFE4A0" strokeWidth="1.5" />
      <ellipse cx="20" cy="10" rx="8" ry="3" fill="#FFD700" opacity="0.9" />
      <rect x="8" y="10" width="24" height="34" rx="12" fill="#E53E3E" />
      <rect x="8" y="10" width="24" height="34" rx="12" fill="url(#lg)" opacity="0.6" />
      <line x1="8" y1="27" x2="32" y2="27" stroke="#FFE4A0" strokeWidth="0.8" opacity="0.5" />
      <ellipse cx="20" cy="44" rx="8" ry="3" fill="#FFD700" opacity="0.9" />
      <line x1="16" y1="47" x2="14" y2="55" stroke="#FFD700" strokeWidth="1.2" />
      <line x1="20" y1="47" x2="20" y2="57" stroke="#FFD700" strokeWidth="1.2" />
      <line x1="24" y1="47" x2="26" y2="55" stroke="#FFD700" strokeWidth="1.2" />
      <defs>
        <linearGradient id="lg" x1="8" y1="10" x2="32" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE4A0" />
          <stop offset="100%" stopColor="#E53E3E" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Moon SVG ─────────────────────────────────────────────────────────────────
function Moon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-3">
      <circle cx="40" cy="40" r="30" fill="#FFE4A0" opacity="0.15" />
      <circle cx="40" cy="40" r="22" fill="#FFE4A0" opacity="0.25" />
      <circle cx="40" cy="40" r="16" fill="#FFD700" />
      <circle cx="40" cy="40" r="16" fill="url(#moonGrad)" />
      <defs>
        <radialGradient id="moonGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="100%" stopColor="#FFB800" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AutumnGreetingModal() {
  const { currentThemeId } = useTheme();
  const [phase, setPhase] = useState("hidden"); // hidden | entering | idle | opened | leaving
  const config = GREETING_CONFIG;

  // Kiểm tra điều kiện hiển thị
  useEffect(() => {
    if (currentThemeId !== config.themeId) return;
    const viewed = localStorage.getItem(config.storageKey);
    if (viewed) return;
    // Delay nhỏ để tránh flash khi hydrate
    const t = setTimeout(() => setPhase("entering"), 80);
    return () => clearTimeout(t);
  }, [currentThemeId, config.themeId, config.storageKey]);

  // entering → idle sau 400ms
  useEffect(() => {
    if (phase !== "entering") return;
    const t = setTimeout(() => setPhase("idle"), 400);
    return () => clearTimeout(t);
  }, [phase]);

  const handleSkip = () => {
    localStorage.setItem(config.storageKey, "true");
    setPhase("leaving");
  };

  const handleOpen = () => setPhase("opened");

  const handleContinue = () => {
    localStorage.setItem(config.storageKey, "true");
    setPhase("leaving");
  };

  if (phase === "hidden" || phase === "leaving" && false) return null;
  // Ẩn hoàn toàn sau khi leaving animation xong
  if (phase === "hidden") return null;

  const visible = phase === "idle" || phase === "opened";
  const isLeaving = phase === "leaving";

  return (
    <>
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.4); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0.4; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        .lantern-sway { animation: sway 3s ease-in-out infinite; transform-origin: top center; }
        .particle-twinkle { animation: twinkle var(--dur, 3s) var(--delay, 0s) ease-in-out infinite; }
        .particle-float { animation: floatUp var(--dur, 3s) var(--delay, 0s) ease-in-out infinite; }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{
          background: "rgba(20,4,4,0.82)",
          backdropFilter: "blur(3px)",
          transition: "opacity 400ms ease",
          opacity: isLeaving ? 0 : visible ? 1 : 0,
          pointerEvents: isLeaving ? "none" : "auto",
        }}
        onTransitionEnd={() => {
          if (isLeaving) setPhase("hidden");
        }}
      >
        {/* Particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#FFE4A0] particle-twinkle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              "--dur": `${p.duration}s`,
              "--delay": `${p.delay}s`,
            }}
          />
        ))}

        {/* Lanterns */}
        <div className="absolute top-0 left-[8%] lantern-sway" style={{ animationDelay: "0s" }}>
          <Lantern style={{ width: 32, height: 48, opacity: 0.85 }} />
        </div>
        <div className="absolute top-0 right-[8%] lantern-sway" style={{ animationDelay: "0.8s" }}>
          <Lantern style={{ width: 28, height: 42, opacity: 0.75 }} />
        </div>
        <div className="absolute top-0 left-[30%] lantern-sway hidden sm:block" style={{ animationDelay: "1.4s" }}>
          <Lantern style={{ width: 22, height: 34, opacity: 0.55 }} />
        </div>
        <div className="absolute top-0 right-[28%] lantern-sway hidden sm:block" style={{ animationDelay: "0.4s" }}>
          <Lantern style={{ width: 24, height: 36, opacity: 0.6 }} />
        </div>

        {/* Card */}
        <div
          style={{
            background: "linear-gradient(160deg, #5a0a0a 0%, #8B0000 45%, #6b0d0d 100%)",
            border: "1px solid rgba(255,228,160,0.35)",
            borderRadius: 24,
            boxShadow: "0 0 60px rgba(255,180,0,0.18), 0 24px 64px rgba(0,0,0,0.6)",
            maxWidth: 480,
            width: "100%",
            padding: "clamp(24px, 5vw, 40px)",
            position: "relative",
            overflow: "hidden",
            transition: "opacity 400ms ease, transform 400ms cubic-bezier(.22,1,.36,1)",
            opacity: visible || isLeaving ? 1 : 0,
            transform: visible || isLeaving ? "scale(1) translateY(0)" : "scale(0.92) translateY(16px)",
          }}
        >
          {/* Top gold line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #FFE4A0, transparent)" }} />
          {/* Bottom gold line */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #FFE4A0, transparent)" }} />

          {/* Corner ornaments */}
          {[["top-3 left-3", "rotate-0"], ["top-3 right-3", "rotate-90"], ["bottom-3 left-3", "-rotate-90"], ["bottom-3 right-3", "rotate-180"]].map(([pos, rot], i) => (
            <div key={i} className={`absolute ${pos} ${rot} opacity-40`} style={{ fontSize: 14, color: "#FFE4A0" }}>✦</div>
          ))}

          {/* Phase: Cover (idle) */}
          {phase !== "opened" && (
            <div className="text-center">
              <Moon />
              <h2 style={{ color: "#FFE4A0", fontSize: "clamp(18px,4vw,24px)", fontWeight: 700, marginBottom: 8, letterSpacing: "0.02em" }}>
                {config.title}
              </h2>
              <p style={{ color: "rgba(255,228,160,0.7)", fontSize: 14, marginBottom: 28 }}>
                Nhấn để mở thiệp chúc mừng của bạn
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={handleOpen}
                  style={{
                    background: "linear-gradient(135deg, #FFD700, #FFB800)",
                    color: "#7B0000",
                    border: "none",
                    borderRadius: 50,
                    padding: "10px 28px",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(255,200,0,0.35)",
                    transition: "transform 150ms, box-shadow 150ms",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,200,0,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,200,0,0.35)"; }}
                >
                  🎑 Mở thiệp
                </button>
                <button
                  onClick={handleSkip}
                  style={{
                    background: "transparent",
                    color: "rgba(255,228,160,0.55)",
                    border: "1px solid rgba(255,228,160,0.25)",
                    borderRadius: 50,
                    padding: "10px 22px",
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "color 150ms, border-color 150ms",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,228,160,0.9)"; e.currentTarget.style.borderColor = "rgba(255,228,160,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,228,160,0.55)"; e.currentTarget.style.borderColor = "rgba(255,228,160,0.25)"; }}
                >
                  Bỏ qua
                </button>
              </div>
            </div>
          )}

          {/* Phase: Opened */}
          {phase === "opened" && (
            <div className="text-center">
              <Moon />
              <h2 style={{ color: "#FFE4A0", fontSize: "clamp(17px,3.5vw,22px)", fontWeight: 700, marginBottom: 20, letterSpacing: "0.02em" }}>
                {config.title}
              </h2>
              <div style={{ borderTop: "1px solid rgba(255,228,160,0.2)", borderBottom: "1px solid rgba(255,228,160,0.2)", padding: "16px 0", marginBottom: 24 }}>
                {config.message.map((line, i) => (
                  <p
                    key={i}
                    style={{
                      color: i === config.message.length - 1 ? "#FFE4A0" : "rgba(255,228,160,0.82)",
                      fontSize: "clamp(13px,2.5vw,15px)",
                      lineHeight: 1.75,
                      marginBottom: i < config.message.length - 1 ? 10 : 0,
                      fontStyle: i === config.message.length - 1 ? "italic" : "normal",
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
              <button
                onClick={handleContinue}
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFB800)",
                  color: "#7B0000",
                  border: "none",
                  borderRadius: 50,
                  padding: "11px 32px",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(255,200,0,0.35)",
                  transition: "transform 150ms, box-shadow 150ms",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,200,0,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,200,0,0.35)"; }}
              >
                🛍️ Tiếp tục mua sắm
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
