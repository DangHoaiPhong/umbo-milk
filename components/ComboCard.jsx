"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import placeholder from "@/assets/images/umboMilk.jpg";
import { useCart } from "./CartContext";
import { useTheme } from "@/components/ThemeProvider";

const ComboCard = ({ combo, delay = 0 }) => {
  const {
    id, tag = "Combo tiết kiệm", title = "Combo",
    description = "Combo ưu đãi hấp dẫn", price = 0, image,
    category = "combo", name, oldPrice, discount,
    volume, available, sku, bodyHtml, isNew,
  } = combo ?? {};

  const router = useRouter();
  const { addToCart, setDrawerOpen } = useCart();
  const { theme } = useTheme();

  const cardRef = useRef(null);
  const btnRef  = useRef(null);
  const [visible,  setVisible]  = useState(false);
  const [ripples,  setRipples]  = useState([]);
  const [tilt,     setTilt]     = useState({ x: 0, y: 0 });
  const [hovered,  setHovered]  = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 4,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * -4,
    });
  };

  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  const handleRipple = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const rid = Date.now();
    setRipples((p) => [...p, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rid }]);
    setTimeout(() => setRipples((p) => p.filter((r) => r.id !== rid)), 600);
  };

  const handleCardClick = () => { if (id) router.push(`/products/${id}`); };

  const handleBuy = (e) => {
    e.preventDefault(); e.stopPropagation(); handleRipple(e);
    addToCart({ id, name: name ?? title, title, category, description,
      price: Number(price) || 0, oldPrice: Number(oldPrice) || undefined,
      discount: Number(discount) || undefined, image, volume, available, sku, bodyHtml, isNew }, 1);
    setDrawerOpen(true);
  };

  // ── Đọc tokens từ theme.sectionTheme.comboCard ──────────────────────────────
  const ct = theme?.sectionTheme?.comboCard;
  const cardBg        = ct?.bg             ?? "white";
  const cardBorder    = ct?.border         ?? "none";
  const hoverShadow   = ct?.hoverShadow    ?? "0 0 0 1px rgba(255,110,160,.12), 0 24px 48px rgba(255,110,160,.16)";
  const defaultShadow = ct?.defaultShadow  ?? "0 2px 16px rgba(0,0,0,.07)";
  const overlayBg     = ct?.overlayBg      ?? "linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,90,150,.02))";
  const tagColor      = ct?.tagColor       ?? "#FF5B93";
  const titleColor    = ct?.titleColor     ?? "#1F2937";
  const titleHover    = ct?.titleHoverColor ?? "#FF5B93";
  const dividerColor  = ct?.dividerColor   ?? "#FF5B93";
  const descColor     = ct?.descColor      ?? "#4B5563";
  const priceColor    = ct?.priceColor     ?? "#FF5B93";
  const btnBg         = hovered ? (ct?.btn?.bgHover ?? "linear-gradient(90deg, #ff5b93, #ff3b80)") : (ct?.btn?.bg ?? "#F7a3a9");
  const btnText       = ct?.btn?.text      ?? "white";
  const btnShadow     = hovered ? (ct?.btn?.shadowHover ?? "0 12px 28px rgba(255,80,140,.32)") : (ct?.btn?.shadow ?? "0 3px 10px rgba(255,91,147,.2)");

  return (
    <div
      ref={cardRef}
      role="button" tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleCardClick(); } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-[20px] overflow-hidden flex flex-col items-center text-center cursor-pointer"
      style={{
        background: cardBg,
        border: cardBorder,
        opacity: visible ? 1 : 0,
        transform: visible
          ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${hovered ? "-10px" : "0"}) scale(${hovered ? "1.02" : "1"})`
          : "translateY(24px)",
        transition: visible
          ? "opacity 600ms ease-out, transform 400ms ease-out, box-shadow 400ms ease-out"
          : `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
        boxShadow: hovered ? hoverShadow : defaultShadow,
        transformStyle: "flat", isolation: "isolate", willChange: "transform",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: overlayBg, opacity: hovered ? 1 : 0, transition: "opacity 300ms ease" }} />

      {/* Image */}
      <div className="relative w-full h-32 overflow-hidden">
        <img src={image || placeholder.src} alt={title} className="w-full h-full object-cover"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 500ms ease-out" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.18) 100%)",
            opacity: hovered ? 1 : 0, transition: "opacity 300ms ease" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-5 py-4"
        style={{ transform: hovered ? "translateY(-2px)" : "translateY(0)", transition: "transform 350ms ease-out" }}>

        <span className="font-semibold text-[11px] tracking-wide mb-1.5" style={{ color: tagColor }}>
          {tag}
        </span>

        <h3 className="text-[19px] font-bold mb-2"
          style={{
            color: hovered ? titleHover : titleColor,
            letterSpacing: hovered ? "0.02em" : "0em",
            transform: hovered ? "scale(1.02)" : "scale(1)",
            transition: "color 300ms ease, letter-spacing 300ms ease, transform 300ms ease",
          }}>
          {title}
        </h3>

        <div className="h-[2px] rounded-full mb-3"
          style={{ background: dividerColor, width: hovered ? "72px" : "48px", transition: "width 300ms ease-out" }} />

        <p className="text-[11px] leading-relaxed mb-3 font-normal" style={{ color: descColor }}>
          {description}
        </p>

        <p className="text-[22px] font-bold mb-4"
          style={{
            color: priceColor,
            transform: hovered ? "scale(1.04)" : "scale(1)",
            filter: hovered ? "brightness(1.08)" : "brightness(1)",
            transition: "transform 300ms ease, filter 300ms ease",
          }}>
          {(Number(price) || 0).toLocaleString("vi-VN")}đ
        </p>

        <button ref={btnRef} type="button" onClick={handleBuy}
          className="relative overflow-hidden flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-semibold cursor-pointer active:scale-95"
          style={{
            background: btnBg, color: btnText,
            transform: hovered ? "scale(1.05) translateY(-2px)" : "scale(1) translateY(0)",
            boxShadow: btnShadow,
            transition: "background 300ms ease, transform 300ms ease, box-shadow 300ms ease",
          }}>
          Chọn Mua
          <ArrowRight className="w-3.5 h-3.5"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)",
              transition: "opacity 250ms ease, transform 250ms ease" }} />
          {ripples.map((r) => (
            <span key={r.id} className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
              style={{ width: 64, height: 64, left: r.x - 32, top: r.y - 32 }} />
          ))}
        </button>
      </div>
    </div>
  );
};

export default ComboCard;
