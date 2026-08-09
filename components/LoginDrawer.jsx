"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

// Fallback tokens cho pink-classic
const defaultTokens = {
  panelBg: "white",
  panelBorder: "1px solid #f3f4f6",
  panelShadow: "0 20px 40px rgba(0,0,0,0.15)",
  caretBg: "white",
  caretBorder: "#f3f4f6",
  titleColor: "#1f2937",
  inputBg: "white",
  inputBorder: "#d1d5db",
  inputFocusColor: "#F7a3a9",
  inputText: "#1f2937",
  inputPlaceholder: "#9ca3af",
  showHideColor: "#9ca3af",
  errorColor: "#ef4444",
  captchaColor: "#9ca3af",
  captchaLink: "#F7a3a9",
  btnBg: "#F7a3a9",
  btnHoverBg: "#f08a91",
  btnShadow: "0 4px 14px rgba(247,163,169,0.3)",
  footerColor: "#6b7280",
  footerLink: "#F7a3a9",
  iconBg: "#fff0f1",
  iconColor: "#F7a3a9",
  dividerColor: "#f7d0d3",
  closeColor: "#9ca3af",
  closeHoverColor: "#ef4444",
  successBg: "#f0fdf4",
  successColor: "#22c55e",
};

const ADMIN_EMAILS = ["admin@umbo.com", "admin@umbo.vn"];

const LoginDrawer = ({ open, onClose, triggerRef, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pos, setPos] = useState({ top: 0, left: 0, caretLeft: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);
  const { theme } = useTheme();

  // Đọc tokens từ theme — fallback về default
  const t = theme?.sectionTheme?.loginDrawer ?? defaultTokens;

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const calcPos = () => {
    if (!triggerRef?.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popupWidth = 320;
    const viewportWidth = window.innerWidth;
    const iconCenterX = rect.left + rect.width / 2;
    let left = iconCenterX - popupWidth / 2;
    left = Math.max(8, Math.min(left, viewportWidth - popupWidth - 8));
    setPos({ top: rect.bottom + 12, left, caretLeft: iconCenterX - left - 8 });
  };

  useEffect(() => {
    if (!open || isMobile) return;
    calcPos();
    window.addEventListener("scroll", calcPos, true);
    window.addEventListener("resize", calcPos);
    return () => {
      window.removeEventListener("scroll", calcPos, true);
      window.removeEventListener("resize", calcPos);
    };
  }, [open, triggerRef, isMobile]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setView("login");
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, triggerRef]);

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }

    const normalizedEmail = trimmedEmail.toLowerCase();
    const isAdmin = ADMIN_EMAILS.includes(normalizedEmail);

    onLogin?.({
      name: isAdmin
        ? "Admin Umbo"
        : trimmedEmail.includes("@")
          ? trimmedEmail.split("@")[0]
          : "Khách hàng Umbo",
      email: trimmedEmail,
      phone: "",
      password: trimmedPassword,
      isVip: true,
      isOwner: isAdmin,
    });

    setError("");
    onClose();
  };

  const inputStyle = {
    background: t.inputBg,
    border: `1px solid ${t.inputBorder}`,
    color: t.inputText,
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  };
  const onFocusInput = (e) => {
    e.target.style.borderColor = t.inputFocusColor;
    e.target.style.boxShadow = `0 0 0 3px ${t.inputFocusColor}22`;
  };
  const onBlurInput = (e) => {
    e.target.style.borderColor = t.inputBorder;
    e.target.style.boxShadow = "none";
  };

  const loginContent = (
    <>
      <h2
        className="text-base font-bold tracking-wide mb-5"
        style={{ color: t.titleColor }}
      >
        ĐĂNG NHẬP TÀI KHOẢN
      </h2>
      <p
        className="text-[11px] text-center mb-1"
        style={{ color: t.captchaColor }}
      >
        Sử dụng email và mật khẩu của bạn để đăng nhập.
      </p>
      <div className="flex flex-col gap-3 mt-3">
        <input
          type="email"
          value={email}
          placeholder="Email"
          style={inputStyle}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Mật khẩu"
            style={{ ...inputStyle, paddingRight: "48px" }}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
            style={{ color: t.showHideColor }}
          >
            {showPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-3 text-xs" style={{ color: t.errorColor }}>
          {error}
        </p>
      )}
      <p
        className="text-[11px] mt-3 leading-relaxed"
        style={{ color: t.captchaColor }}
      >
        Trang này được bảo vệ bởi reCAPTCHA.{" "}
        <a href="#" className="underline" style={{ color: t.captchaLink }}>
          Chính sách bảo mật
        </a>{" "}
        và{" "}
        <a href="#" className="underline" style={{ color: t.captchaLink }}>
          Điều khoản dịch vụ
        </a>{" "}
        được áp dụng.
      </p>
      <button
        onClick={handleLogin}
        className="mt-4 w-full text-white text-sm font-semibold py-2.5 rounded transition-all duration-200 hover:scale-[1.01]"
        style={{ background: t.btnBg, boxShadow: t.btnShadow }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = t.btnHoverBg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = t.btnBg;
        }}
      >
        Đăng nhập
      </button>
      <div className="flex justify-between mt-3 text-xs">
        <Link
          href="/register"
          onClick={onClose}
          style={{ color: t.footerColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = t.footerLink;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = t.footerColor;
          }}
        >
          Tạo tài khoản
        </Link>
        <button
          type="button"
          style={{ color: t.footerColor }}
          onClick={() => {
            setView("forgot");
            setForgotSent(false);
            setForgotEmail("");
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = t.footerLink;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = t.footerColor;
          }}
        >
          Khôi phục mật khẩu
        </button>
      </div>
    </>
  );

  const forgotContent = (
    <>
      <div className="flex flex-col items-center mb-5">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
          style={{ background: t.iconBg }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: t.iconColor }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <h2
          className="text-base font-bold tracking-wide"
          style={{ color: t.titleColor }}
        >
          KHÔI PHỤC MẬT KHẨU
        </h2>
        {!forgotSent && (
          <p
            className="text-xs mt-1 text-center"
            style={{ color: t.captchaColor }}
          >
            Nhập email của bạn:
          </p>
        )}
      </div>

      {forgotSent ? (
        <div className="flex flex-col items-center gap-3 py-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: t.successBg }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: t.successColor }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm text-center" style={{ color: t.captchaColor }}>
            Đã gửi link khôi phục đến
            <br />
            <span className="font-semibold" style={{ color: t.footerLink }}>
              {forgotEmail}
            </span>
          </p>
          <p className="text-xs text-center" style={{ color: t.captchaColor }}>
            Vui lòng kiểm tra hộp thư của bạn.
          </p>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            style={inputStyle}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          />
          <p
            className="text-[10px] mt-2 leading-relaxed"
            style={{ color: t.captchaColor }}
          >
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              style={{ color: t.captchaLink }}
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
              style={{ color: t.captchaLink }}
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
          <button
            onClick={() => forgotEmail.trim() && setForgotSent(true)}
            className="mt-4 w-full text-white text-sm font-semibold py-2.5 rounded transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
            style={{ background: t.btnBg }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = t.btnHoverBg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = t.btnBg;
            }}
          >
            Khôi phục
          </button>
        </>
      )}

      <p className="text-center text-xs mt-4" style={{ color: t.captchaColor }}>
        Bạn đã nhớ mật khẩu?{" "}
        <button
          type="button"
          className="font-semibold"
          style={{ color: t.footerLink }}
          onClick={() => setView("login")}
        >
          Trở về đăng nhập
        </button>
      </p>
    </>
  );

  const formContent = view === "forgot" ? forgotContent : loginContent;
  if (!open || !mounted) return null;
  const modalRoot = typeof document !== "undefined" ? document.body : null;
  if (!modalRoot) return null;

  const modalLayerStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    isolation: "isolate",
    overflow: "visible",
  };

  const CloseBtn = () => (
    <button
      onClick={onClose}
      aria-label="Đóng"
      className="absolute top-3 right-3 transition-colors"
      style={{ color: t.closeColor }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = t.closeHoverColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = t.closeColor;
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );

  if (isMobile) {
    return createPortal(
      <div style={modalLayerStyle}>
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div
          ref={dropdownRef}
          className="absolute w-[calc(100vw-32px)] max-w-sm rounded-2xl"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1001,
            background: t.panelBg,
            border: t.panelBorder,
            boxShadow: t.panelShadow,
          }}
        >
          <CloseBtn />
          <div className="px-6 py-6">{formContent}</div>
        </div>
      </div>,
      modalRoot,
    );
  }

  return createPortal(
    <div style={modalLayerStyle}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={dropdownRef}
        className="absolute w-80 rounded-lg"
        style={{
          top: pos.top,
          left: pos.left,
          zIndex: 1001,
          background: t.panelBg,
          border: t.panelBorder,
          boxShadow: t.panelShadow,
        }}
      >
        <div
          className="absolute -top-2 w-4 h-4 rotate-45"
          style={{
            left: pos.caretLeft,
            background: t.caretBg,
            borderLeft: `1px solid ${t.caretBorder}`,
            borderTop: `1px solid ${t.caretBorder}`,
          }}
        />
        <CloseBtn />
        <div className="px-6 py-6">{formContent}</div>
      </div>
    </div>,
    modalRoot,
  );
};

export default LoginDrawer;
