"use client";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import placeholder from "@/assets/images/umboMilk.jpg";

const ComboCard = ({ combo, delay = 0 }) => {
  const { tag, title, description, price } = combo;
  const cardRef = useRef(null);
  const btnRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const handleRipple = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
    ]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      600,
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white rounded-[20px] overflow-hidden flex flex-col items-center text-center cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${hovered ? "-10px" : "0"}) scale(${hovered ? "1.02" : "1"})`
          : "translateY(24px)",
        transition: visible
          ? "opacity 600ms ease-out, transform 400ms ease-out, box-shadow 400ms ease-out"
          : `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
        boxShadow: hovered
          ? "0 0 0 1px rgba(255,110,160,.12), 0 24px 48px rgba(255,110,160,.16)"
          : "0 2px 16px rgba(0,0,0,.07)",
        transformStyle: "flat",
        isolation: "isolate",
        willChange: "transform",
      }}
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,90,150,.02))",
          opacity: hovered ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
      />

      {/* Image - không có padding để tràn full width */}
      <div className="relative w-full h-32 overflow-hidden">
        <Image
          src={placeholder}
          alt={title}
          fill
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 500ms ease-out",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.12) 100%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 300ms ease",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center w-full px-5 py-4"
        style={{
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 350ms ease-out",
        }}
      >
        {/* Tag */}
        <span className="text-[#FF5B93] font-semibold text-[11px] tracking-wide mb-1.5">
          {tag}
        </span>

        {/* Title */}
        <h3
          className="text-[19px] font-bold mb-2"
          style={{
            color: hovered ? "#FF5B93" : "#1F2937",
            letterSpacing: hovered ? "0.02em" : "0em",
            transform: hovered ? "scale(1.02)" : "scale(1)",
            transition:
              "color 300ms ease, letter-spacing 300ms ease, transform 300ms ease",
          }}
        >
          {title}
        </h3>

        {/* Divider */}
        <div
          className="h-[2px] bg-[#FF5B93] rounded-full mb-3"
          style={{
            width: hovered ? "72px" : "48px",
            transition: "width 300ms ease-out",
          }}
        />

        {/* Description */}
        <p className="text-[#4B5563] text-[11px] leading-relaxed mb-3 font-normal">
          {description}
        </p>

        {/* Price */}
        <p
          className="text-[22px] font-bold text-[#FF5B93] mb-4"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            filter: hovered ? "brightness(1.08)" : "brightness(1)",
            transition: "transform 300ms ease, filter 300ms ease",
          }}
        >
          {price.toLocaleString("vi-VN")}đ
        </p>

        {/* Button */}
        <button
          ref={btnRef}
          onClick={handleRipple}
          className="relative overflow-hidden flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white text-[13px] font-semibold cursor-pointer active:scale-95"
          style={{
            background: hovered
              ? "linear-gradient(90deg, #ff5b93, #ff3b80)"
              : "#FF5B93",
            transform: hovered
              ? "scale(1.05) translateY(-2px)"
              : "scale(1) translateY(0)",
            boxShadow: hovered
              ? "0 12px 28px rgba(255,80,140,.32)"
              : "0 3px 10px rgba(255,91,147,.2)",
            transition:
              "background 300ms ease, transform 300ms ease, box-shadow 300ms ease",
          }}
        >
          Chọn Mua
          <ArrowRight
            className="w-3.5 h-3.5"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(-8px)",
              transition: "opacity 250ms ease, transform 250ms ease",
            }}
          />
          {ripples.map((r) => (
            <span
              key={r.id}
              className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
              style={{ width: 64, height: 64, left: r.x - 32, top: r.y - 32 }}
            />
          ))}
        </button>
      </div>
    </div>
  );
};

export default ComboCard;
