"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";
import { useCart } from "./CartContext";

export default function CartToast() {
  const { toast, setToast } = useCart();
  const [visible, setVisible] = useState(false);
  const [headerH, setHeaderH] = useState(0);
  const timerRef = useRef(null);
  const hoverRef = useRef(false);

  // Đo chiều cao Header thực tế
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      if (header) setHeaderH(header.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => setToast(null), 350);
  };

  const startTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!hoverRef.current) dismiss();
    }, 2800);
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
  const topOffset = (headerH || 70) + 12;

  return (
    <>
      <style>{`
        .umbo-toast {
          position: fixed;
          z-index: 9999;
          pointer-events: none;
          /* Desktop: góc phải */
          top: ${topOffset}px;
          right: 16px;
          left: auto;
          width: 320px;
        }
        .umbo-toast-inner {
          pointer-events: auto;
          background: white;
          border: 1px solid #f7d0d3;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(247,163,169,0.22);
          /* Desktop animation: slide từ phải */
          transform: ${visible ? "translateX(0)" : "translateX(40px)"};
          opacity: ${visible ? 1 : 0};
          transition: transform 350ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease;
        }
        /* Mobile */
        @media (max-width: 767px) {
          .umbo-toast {
            top: ${topOffset}px;
            left: 50%;
            right: auto;
            width: 92vw;
            max-width: 400px;
            transform: translateX(-50%);
          }
          .umbo-toast-inner {
            border-radius: 14px;
            /* Mobile animation: slide từ trên xuống */
            transform: ${visible ? "translateY(0)" : "translateY(-16px)"};
            opacity: ${visible ? 1 : 0};
            transition: transform 350ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease;
          }
        }
      `}</style>

      <div className="umbo-toast">
        <div
          className="umbo-toast-inner"
          onMouseEnter={() => { hoverRef.current = true; clearTimeout(timerRef.current); }}
          onMouseLeave={() => { hoverRef.current = false; startTimer(); }}
        >
          {/* Thanh màu thương hiệu */}
          <div className="h-1 w-full bg-gradient-to-r from-[#F7a3a9] to-[#f7c5c8]" />

          <div className="p-3 sm:p-4">
            {/* Header toast */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7a3a9] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-[#2d3748]">
                  Đã thêm vào giỏ hàng
                </span>
              </div>
              <button
                onClick={dismiss}
                aria-label="Đóng"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X size={12} />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#f7d0d3] mb-2.5" />

            {/* Product info */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] flex-shrink-0 rounded-xl overflow-hidden bg-[#fff3f4]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-sm font-semibold text-[#2d3748] line-clamp-2 leading-snug">
                  {product.name}
                </p>
                <p className="text-[11px] sm:text-sm font-bold text-[#F7a3a9] mt-1">
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
