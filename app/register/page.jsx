"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import umboMilk from "../../assets/images/umboMilk.jpg";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

const defaultRegisterTokens = {
  pageBg: "#3d0606",
  cardBg: "#2d0404",
  cardBorder: "rgba(255,228,160,0.15)",
  shadow: "0 32px 90px rgba(0,0,0,0.45)",
  textPrimary: "#FFF6E5",
  textSecondary: "#FFDDC0",
  accentColor: "#FFE4A0",
  accentBg: "rgba(255,228,160,0.08)",
  buttonBg: "#FFE4A0",
  buttonText: "#7B0000",
  buttonHoverBg: "#ffd060",
  inputBg: "rgba(255,228,160,0.06)",
  inputBorder: "rgba(255,228,160,0.25)",
  inputText: "#FFF6E5",
  inputPlaceholder: "rgba(255,220,192,0.6)",
  divider: "rgba(255,228,160,0.15)",
  linkColor: "#FFE4A0",
  linkHoverColor: "#ffd060",
  googleBg: "#2d0404",
  googleBorder: "rgba(255,228,160,0.15)",
  googleText: "#FFE4A0",
  errorText: "#FF6B6B",
  mutedText: "rgba(255,228,160,0.7)",
};

export default function RegisterPage() {
  const [mode, setMode] = useState(null); // null | "email" | "phone"
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.registerPage ?? defaultRegisterTokens;
  const pageStyle = { background: t.pageBg, color: t.textPrimary };
  const cardStyle = {
    background: t.cardBg,
    border: `1px solid ${t.cardBorder}`,
    boxShadow: t.shadow,
  };
  const googleButtonStyle = {
    background: t.googleBg,
    border: `1px solid ${t.googleBorder}`,
    color: t.googleText,
  };
  const primaryButtonStyle = { background: t.buttonBg, color: t.buttonText };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={pageStyle}
    >
      <div
        className="w-full max-w-[560px] rounded-[28px] px-10 py-12 animate-slideUp"
        style={{ ...cardStyle, animation: "slideUp 400ms ease-out both" }}
      >
        {/* Logo + Header */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src={umboMilk}
            alt="Um Bò Milk"
            width={80}
            height={80}
            className="rounded-full mb-3"
          />
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: t.textPrimary }}
          >
            Đăng ký tài khoản
          </h1>
          <p
            className="text-sm mt-2 text-center max-w-xs leading-relaxed"
            style={{ color: t.textSecondary }}
          >
            Tạo tài khoản để mua hàng, theo dõi đơn hàng và nhận các ưu đãi mới
            nhất.
          </p>
        </div>

        {/* Google */}
        <button
          className="w-full flex items-center justify-center gap-3 h-[52px] rounded-full text-sm font-medium transition-all duration-300"
          style={googleButtonStyle}
        >
          <GoogleIcon />
          Đăng ký bằng Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: t.divider }} />
          <span className="text-xs" style={{ color: t.mutedText }}>
            Hoặc
          </span>
          <div className="flex-1 h-px" style={{ background: t.divider }} />
        </div>

        {/* Email / Phone buttons hoặc Form */}
        {mode === null && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setMode("phone")}
              className="w-full flex items-center justify-center gap-3 h-[52px] rounded-full text-sm font-medium transition-all duration-300"
              style={primaryButtonStyle}
            >
              <PhoneIcon />
              Đăng ký bằng Số điện thoại
            </button>
          </div>
        )}

        {mode === "email" && <EmailForm onBack={() => setMode(null)} />}

        {mode === "phone" && <PhoneForm onBack={() => setMode(null)} />}

        {/* Footer */}
        <p
          className="text-center text-sm mt-7 mb-2"
          style={{ color: t.mutedText }}
        >
          Đã có tài khoản?{" "}
          <Link
            href="/"
            className="font-semibold transition-colors"
            style={{ color: t.linkColor }}
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
