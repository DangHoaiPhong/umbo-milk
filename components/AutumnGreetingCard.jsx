"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

// ─── Config ───────────────────────────────────────────────────────────────────
const CONFIG = {
  themeId: "trung-thu",
  storageKey: "autumnGreetingViewed_v2",
};

// ─── Static particles (tránh random mỗi lần render) ──────────────────────────
const PARTICLES = [
  { x: 8, y: 12, s: 2.5, dur: 3.2, del: 0 },
  { x: 18, y: 78, s: 1.5, dur: 2.8, del: 0.5 },
  { x: 28, y: 35, s: 2, dur: 3.6, del: 1.1 },
  { x: 42, y: 88, s: 1.5, dur: 2.5, del: 0.3 },
  { x: 55, y: 20, s: 3, dur: 4, del: 0.8 },
  { x: 65, y: 60, s: 1.5, dur: 3, del: 1.5 },
  { x: 75, y: 42, s: 2, dur: 2.7, del: 0.2 },
  { x: 88, y: 15, s: 2.5, dur: 3.4, del: 0.9 },
  { x: 92, y: 72, s: 1.5, dur: 2.9, del: 1.3 },
  { x: 35, y: 55, s: 2, dur: 3.1, del: 0.6 },
  { x: 50, y: 5, s: 1.5, dur: 3.8, del: 1.7 },
  { x: 82, y: 90, s: 2, dur: 2.6, del: 0.4 },
];

// ─── Lantern SVG ──────────────────────────────────────────────────────────────
function Lantern({ w = 36, opacity = 1 }) {
  const h = Math.round(w * 1.55);
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 36 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* string */}
      <line x1="18" y1="0" x2="18" y2="7" stroke="#FFE4A0" strokeWidth="1.2" />
      {/* top cap */}
      <ellipse cx="18" cy="8" rx="7" ry="2.5" fill="#D4A017" />
      {/* body */}
      <path
        d="M6 10 Q4 28 6 44 Q12 50 18 50 Q24 50 30 44 Q32 28 30 10 Z"
        fill="#C0392B"
      />
      {/* inner glow */}
      <path
        d="M6 10 Q4 28 6 44 Q12 50 18 50 Q24 50 30 44 Q32 28 30 10 Z"
        fill="url(#lGlow)"
      />
      {/* ribs */}
      <line
        x1="6"
        y1="22"
        x2="30"
        y2="22"
        stroke="#FFE4A0"
        strokeWidth="0.6"
        opacity="0.4"
      />
      <line
        x1="5"
        y1="32"
        x2="31"
        y2="32"
        stroke="#FFE4A0"
        strokeWidth="0.6"
        opacity="0.4"
      />
      {/* bottom cap */}
      <ellipse cx="18" cy="44" rx="7" ry="2.5" fill="#D4A017" />
      {/* tassels */}
      <line x1="14" y1="46" x2="12" y2="54" stroke="#FFD700" strokeWidth="1" />
      <line x1="18" y1="46" x2="18" y2="56" stroke="#FFD700" strokeWidth="1" />
      <line x1="22" y1="46" x2="24" y2="54" stroke="#FFD700" strokeWidth="1" />
      <defs>
        <radialGradient id="lGlow" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#FFE4A0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C0392B" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
// phase: hidden | visible | flipping | opened | leaving
export default function AutumnGreetingCard() {
  const { currentThemeId } = useTheme();
  const [phase, setPhase] = useState("hidden");
  const backdropRef = useRef(null);
  // dùng path tĩnh để tránh vấn đề next/image fill trong context 3D

  // Kiểm tra điều kiện hiển thị
  useEffect(() => {
    if (currentThemeId !== CONFIG.themeId) return;
    if (localStorage.getItem(CONFIG.storageKey)) return;
    const t = setTimeout(() => setPhase("visible"), 100);
    return () => clearTimeout(t);
  }, [currentThemeId]);

  const handleOpen = () => {
    setPhase("flipping");
    setTimeout(() => setPhase("opened"), 750);
  };

  const handleSkip = () => dismiss();
  const handleContinue = () => dismiss();

  const dismiss = () => {
    localStorage.setItem(CONFIG.storageKey, "true");
    setPhase("leaving");
  };

  if (phase === "hidden") return null;

  const isLeaving = phase === "leaving";
  const isFlipping = phase === "flipping";
  const isOpened = phase === "opened";
  const showContent = isFlipping || isOpened;

  return (
    <>
      <style>{`
        @keyframes ag-sway {
          0%,100% { transform: rotate(-7deg) translateX(0); }
          50%      { transform: rotate(7deg)  translateX(0); }
        }
        @keyframes ag-twinkle {
          0%,100% { opacity:.12; transform:scale(1);   }
          50%      { opacity:.6;  transform:scale(1.5); }
        }
        @keyframes ag-moonpulse {
          0%,100% { box-shadow: 0 0 24px 8px rgba(255,228,160,.18); }
          50%      { box-shadow: 0 0 48px 18px rgba(255,228,160,.32); }
        }
        @keyframes ag-fadein {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .ag-sway      { animation: ag-sway 3.2s ease-in-out infinite; transform-origin: top center; }
        .ag-twinkle   { animation: ag-twinkle var(--dur,3s) var(--del,0s) ease-in-out infinite; }
        .ag-moonpulse { animation: ag-moonpulse 3s ease-in-out infinite; }
        .ag-fadein    { animation: ag-fadein .5s cubic-bezier(.22,1,.36,1) both; }

        /* 3-D flip */
        .ag-scene       { perspective: 1200px; }
        .ag-card-inner  {
          position: relative;
          width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform .75s cubic-bezier(.4,0,.2,1);
        }
        .ag-card-inner.flipped { transform: rotateY(-180deg); }
        .ag-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 20px;
          overflow: hidden;
        }
        .ag-back { transform: rotateY(180deg); }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background: "rgba(10,2,2,.88)",
          backdropFilter: "blur(4px)",
          transition: "opacity .45s ease",
          opacity: isLeaving ? 0 : 1,
          padding: "clamp(12px,3vw,32px)",
        }}
        onTransitionEnd={() => {
          if (isLeaving) setPhase("hidden");
        }}
      >
        {/* ── Particles ── */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#FFE4A0] ag-twinkle pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              "--dur": `${p.dur}s`,
              "--del": `${p.del}s`,
            }}
          />
        ))}

        {/* ── Moon (top-center) ── */}
        <div
          className="absolute ag-moonpulse pointer-events-none rounded-full"
          style={{
            top: "clamp(10px,3vh,28px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(44px,6vw,64px)",
            height: "clamp(44px,6vw,64px)",
            background:
              "radial-gradient(circle at 38% 36%, #FFF8DC, #FFD700 55%, #FFB800)",
            boxShadow: "0 0 24px 8px rgba(255,228,160,.18)",
          }}
        />

        {/* ── Lanterns ── */}
        {[
          { left: "4%", delay: "0s", w: 38, op: 0.9 },
          { right: "4%", delay: ".9s", w: 34, op: 0.85 },
          { left: "22%", delay: "1.5s", w: 26, op: 0.6, hide: true },
          { right: "20%", delay: ".4s", w: 28, op: 0.65, hide: true },
        ].map(({ hide, delay, w, op, ...pos }, i) => (
          <div
            key={i}
            className={`absolute top-0 ag-sway pointer-events-none${hide ? " hidden sm:block" : ""}`}
            style={{ ...pos, animationDelay: delay }}
          >
            <Lantern w={w} opacity={op} />
          </div>
        ))}

        {/* ── Wrapper: thiệp + nút CTA bên dưới ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            width: "min(92vw, 480px)",
          }}
        >
          {/* ── Card scene ── */}
          <div
            className="ag-scene"
            style={{ width: "100%", height: "min(88vh, 680px)" }}
          >
            <div className={`ag-card-inner${showContent ? " flipped" : ""}`}>
              {/* ══ FRONT — bìa thiệp ══ */}
              <div className="ag-face ag-front">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cover.png"
                  alt="Thiệp Trung Thu UmBo Milk"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>

              {/* ══ BACK — nội dung thiệp ══ */}
              <div className="ag-face ag-back">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/descriptions.png"
                  alt="Nội dung thiệp Trung Thu UmBo Milk"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── CTA footer — nằm ngoài thiệp, không đè lên ảnh ── */}
          {phase === "visible" && (
            <div className="flex flex-col items-center gap-3 w-full ag-fadein">
              <button
                onClick={handleOpen}
                style={{
                  background: "linear-gradient(135deg,#FFD700,#FFB800)",
                  color: "#7B0000",
                  border: "2px solid #D4A017",
                  borderRadius: 999,
                  padding: "13px 40px",
                  fontWeight: 700,
                  fontSize: "clamp(14px,2.5vw,16px)",
                  cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(255,200,0,.35)",
                  letterSpacing: ".04em",
                  transition: "transform .2s, box-shadow .2s",
                  maxWidth: 260,
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(255,200,0,.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 18px rgba(255,200,0,.35)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.97)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
              >
                🎑 Mở thiệp
              </button>
            </div>
          )}

          {isOpened && (
            <div className="flex justify-center w-full ag-fadein">
              <button
                onClick={handleContinue}
                style={{
                  background: "linear-gradient(135deg,#FFD700,#FFB800)",
                  color: "#7B0000",
                  border: "2px solid #D4A017",
                  borderRadius: 999,
                  padding: "13px 40px",
                  fontWeight: 700,
                  fontSize: "clamp(14px,2.5vw,16px)",
                  cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(255,200,0,.35)",
                  letterSpacing: ".04em",
                  transition: "transform .2s, box-shadow .2s",
                  maxWidth: 280,
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(255,200,0,.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 18px rgba(255,200,0,.35)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.97)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
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
