"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";
import placeholderImage from "@/assets/images/umboMilk.jpg";
import { useCart } from "./CartContext";
import { useTheme } from "@/components/ThemeProvider";

const defaultTokens = {
  bg: "white", border: "1px solid #f7d0d3", shadow: "0 8px 32px rgba(247,163,169,0.22)",
  accentBar: "linear-gradient(90deg, #F7a3a9, #f7c5c8)",
  checkColor: "#F7a3a9", labelColor: "#2d3748",
  closeColor: "#9ca3af", closeHoverBg: "#f3f4f6",
  dividerColor: "#f7d0d3", imageBg: "#fff3f4",
  nameColor: "#2d3748", priceColor: "#F7a3a9",
};

export default function CartToast() {
  const { toast, setToast } = useCart();
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.cartToast ?? defaultTokens;

  const [visible, setVisible] = useState(false);
  const [headerH, setHeaderH] = useState(0);
  const timerRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      if (header) setHeaderH(header.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const dismiss = () => { setVisible(false); setTimeout(() => setToast(null), 350); };
  const startTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { if (!hoverRef.current) dismiss(); }, 2800);
  };

  useEffect(() => {
    if (!toast) return;
    setVisible(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    startTimer();
    return () => clearTimeout(timerRef.current);
  }, [toast]);

  if (!toast) return null;

  const { product } = toast;
  const imageSrc = typeof product.image === "string" && product.image.trim().length > 0
    ? product.image : placeholderImage;
  const topOffset = (headerH || 70) + 12;

  return (
    <>
      <style>{`
        .umbo-toast {
          position: fixed; z-index: 9999; pointer-events: none;
          top: ${topOffset}px; right: 16px; left: auto; width: 320px;
        }
        .umbo-toast-inner {
          pointer-events: auto;
          background: ${t.bg};
          border: ${t.border};
          border-radius: 16px;
          overflow: hidden;
          box-shadow: ${t.shadow};
          transform: ${visible ? "translateX(0)" : "translateX(40px)"};
          opacity: ${visible ? 1 : 0};
          transition: transform 350ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease;
        }
        @media (max-width: 767px) {
          .umbo-toast { top: ${topOffset}px; left: 50%; right: auto; width: 92vw; max-width: 400px; transform: translateX(-50%); }
          .umbo-toast-inner {
            border-radius: 14px;
            transform: ${visible ? "translateY(0)" : "translateY(-16px)"};
            opacity: ${visible ? 1 : 0};
            transition: transform 350ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease;
          }
        }
      `}</style>

      <div className="umbo-toast">
        <div className="umbo-toast-inner"
          onMouseEnter={() => { hoverRef.current = true; clearTimeout(timerRef.current); }}
          onMouseLeave={() => { hoverRef.current = false; startTimer(); }}>

          <div className="h-1 w-full" style={{ background: t.accentBar }} />

          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: t.checkColor }} />
                <span className="text-[11px] sm:text-xs font-semibold" style={{ color: t.labelColor }}>
                  Đã thêm vào giỏ hàng
                </span>
              </div>
              <button onClick={dismiss} aria-label="Đóng"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors"
                style={{ color: t.closeColor }}
                onMouseEnter={(e) => { e.currentTarget.style.background = t.closeHoverBg; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                <X size={12} />
              </button>
            </div>

            <div className="h-px mb-2.5" style={{ background: t.dividerColor }} />

            <div className="flex items-center gap-2.5">
              <div className="relative w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] flex-shrink-0 rounded-xl overflow-hidden"
                style={{ background: t.imageBg }}>
                <Image src={imageSrc} alt={product.name} fill sizes="64px" className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-sm font-semibold line-clamp-2 leading-snug"
                  style={{ color: t.nameColor }}>
                  {product.name}
                </p>
                <p className="text-[11px] sm:text-sm font-bold mt-1" style={{ color: t.priceColor }}>
                  {product.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
