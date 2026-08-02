import React from "react";

// Lồng đèn SVG đơn — size tính bằng px
function Lantern({ swayDelay = 0, scale = 1, color = "#FFE4A0" }) {
  const w = 22 * scale;
  const h = 30 * scale;
  const cx = w / 2;
  return (
    <g style={{ animation: `lanternSway 3.2s ease-in-out ${swayDelay}s infinite alternate`, transformOrigin: `${cx}px 0px` }}>
      {/* dây treo */}
      <line x1={cx} y1={0} x2={cx} y2={5 * scale} stroke={color} strokeWidth={1.2 * scale} opacity={0.7} />
      {/* vành trên */}
      <rect x={w * 0.12} y={5 * scale} width={w * 0.76} height={3 * scale} rx={1.5 * scale} fill="#c0392b" />
      {/* thân */}
      <ellipse cx={cx} cy={5 * scale + 3 * scale + h * 0.38} rx={cx * 0.92} ry={h * 0.38} fill={color} opacity={0.9} />
      {/* sọc dọc trang trí */}
      {[0.3, 0.5, 0.7].map((t, i) => (
        <line
          key={i}
          x1={w * t} y1={5 * scale + 3 * scale + h * 0.04}
          x2={w * t} y2={5 * scale + 3 * scale + h * 0.72}
          stroke="#8B0000" strokeWidth={0.7 * scale} opacity={0.35}
        />
      ))}
      {/* ánh sáng bên trong */}
      <ellipse cx={cx} cy={5 * scale + 3 * scale + h * 0.38} rx={cx * 0.45} ry={h * 0.22} fill="white" opacity={0.15} />
      {/* vành dưới */}
      <rect x={w * 0.12} y={5 * scale + 3 * scale + h * 0.76} width={w * 0.76} height={3 * scale} rx={1.5 * scale} fill="#c0392b" />
      {/* tua */}
      {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
        <line
          key={i}
          x1={w * t} y1={5 * scale + 3 * scale + h * 0.76 + 3 * scale}
          x2={w * t + (i % 2 === 0 ? -1.5 : 1.5) * scale}
          y2={5 * scale + 3 * scale + h * 0.76 + 3 * scale + 9 * scale}
          stroke={color} strokeWidth={scale} opacity={0.75}
        />
      ))}
    </g>
  );
}

function Stars() {
  const stars = [
    { cx: "14%", cy: 7, r: 1.8, delay: 0 },
    { cx: "21%", cy: 15, r: 1.3, delay: 0.6 },
    { cx: "34%", cy: 5, r: 2.2, delay: 1.1 },
    { cx: "66%", cy: 9, r: 1.9, delay: 0.3 },
    { cx: "79%", cy: 4, r: 1.5, delay: 0.8 },
    { cx: "87%", cy: 13, r: 2, delay: 0.5 },
  ];
  return (
    <>
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.cx} cy={s.cy} r={s.r}
          fill="#FFE4A0"
          style={{ animation: `starTwinkle 2.2s ease-in-out ${s.delay}s infinite alternate` }}
        />
      ))}
    </>
  );
}

export function MidAutumnDecorations({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <style>{`
        @keyframes lanternSway {
          from { transform: rotate(-5deg); }
          to   { transform: rotate(5deg); }
        }
        @keyframes starTwinkle {
          from { opacity: 0.25; }
          to   { opacity: 0.85; }
        }
      `}</style>

      {/* ── Lồng đèn TRÁI — SVG riêng, absolute left ── */}
      <svg
        className="absolute left-0 top-0"
        width={120} height={70}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        {/* lồng lớn */}
        <g transform="translate(14, 4)">
          <Lantern swayDelay={0} scale={1.3} color="#FFE4A0" />
        </g>
        {/* lồng nhỏ */}
        <g transform="translate(62, 8)">
          <Lantern swayDelay={0.9} scale={0.85} color="#ffb347" />
        </g>
      </svg>

      {/* ── Lồng đèn PHẢI — SVG riêng, absolute right ── */}
      <svg
        className="absolute right-0 top-0"
        width={120} height={70}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        {/* lồng lớn */}
        <g transform="translate(76, 4)">
          <Lantern swayDelay={0.45} scale={1.3} color="#FFE4A0" />
        </g>
        {/* lồng nhỏ */}
        <g transform="translate(28, 9)">
          <Lantern swayDelay={1.2} scale={0.85} color="#ffb347" />
        </g>
      </svg>

      {/* ── Trăng + sao + đường hoa văn — SVG full width ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* trăng rằm mờ giữa */}
        <circle cx="50%" cy={-14} r={26} fill="#FFE4A0" opacity={0.12}
          style={{ animation: "starTwinkle 3s ease-in-out 0s infinite alternate" }} />
        <circle cx="50%" cy={-14} r={16} fill="#FFE4A0" opacity={0.18} />

        {/* ngôi sao */}
        <Stars />

        {/* đường hoa văn sóng dưới header */}
        <path
          d="M0,58 Q25%,50 50%,58 Q75%,66 100%,58"
          fill="none" stroke="#FFE4A0" strokeWidth={0.7} opacity={0.2}
        />
      </svg>
    </div>
  );
}

export default MidAutumnDecorations;
