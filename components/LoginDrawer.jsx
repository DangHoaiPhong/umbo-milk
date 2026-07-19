"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const DEMO_ACCOUNT = {
  email: "demo@umbo.vn",
  password: "123456",
  name: "Nguyễn Văn Demo",
  phone: "0909123456",
};

const LoginDrawer = ({ open, onClose, triggerRef, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState("login"); // "login" | "forgot"
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pos, setPos] = useState({ top: 0, left: 0, caretLeft: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Tính vị trí popup desktop — bám theo icon
  const calcPos = () => {
    if (!triggerRef?.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popupWidth = 320;
    const viewportWidth = window.innerWidth;
    const iconCenterX = rect.left + rect.width / 2;
    let left = iconCenterX - popupWidth / 2;
    left = Math.max(8, Math.min(left, viewportWidth - popupWidth - 8));
    setPos({
      top: rect.bottom + 12, // fixed: dùng viewport coords trực tiếp
      left,
      caretLeft: iconCenterX - left - 8,
    });
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

  // Đóng khi click ngoài
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

  const handleDemoLogin = () => {
    if (
      email.trim() === DEMO_ACCOUNT.email &&
      password === DEMO_ACCOUNT.password
    ) {
      onLogin?.({
        name: DEMO_ACCOUNT.name,
        email: DEMO_ACCOUNT.email,
        phone: DEMO_ACCOUNT.phone,
        isVip: true,
      });
      setError("");
      onClose();
      return;
    }

    setError("Email hoặc mật khẩu không đúng. Hãy dùng demo@umbo.vn / 123456");
  };

  const loginContent = (
    <>
      <h2 className="text-base font-bold text-gray-800 tracking-wide mb-5">
        ĐĂNG NHẬP TÀI KHOẢN
      </h2>
      <div className="rounded-2xl border border-[#f7d0d3] bg-[#fff3f4] px-3 py-2 text-xs text-[#a35a62]">
        Tài khoản demo: <span className="font-semibold">demo@umbo.vn</span> /{" "}
        <span className="font-semibold">123456</span>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="Email"
          className="border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-[#F7a3a9]"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            placeholder="Mật khẩu"
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-[#F7a3a9]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
          >
            {showPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>
      </div>
      {error ? <p className="mt-3 text-xs text-red-500">{error}</p> : null}
      <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
        Trang này được bảo vệ bởi reCAPTCHA.{" "}
        <a href="#" className="underline hover:text-[#F7a3a9]">
          Chính sách bảo mật
        </a>{" "}
        và{" "}
        <a href="#" className="underline hover:text-[#F7a3a9]">
          Điều khoản dịch vụ
        </a>{" "}
        được áp dụng.
      </p>
      <button
        onClick={handleDemoLogin}
        className="mt-4 w-full bg-[#F7a3a9] hover:bg-[#f08a91] text-white text-sm font-semibold py-2.5 rounded transition-colors"
      >
        Đăng nhập
      </button>
      <div className="flex justify-between mt-3 text-xs text-gray-500">
        <Link
          href="/register"
          onClick={onClose}
          className="hover:text-[#F7a3a9] transition-colors"
        >
          Tạo tài khoản
        </Link>
        <button
          type="button"
          onClick={() => {
            setView("forgot");
            setForgotSent(false);
            setForgotEmail("");
          }}
          className="hover:text-[#F7a3a9] transition-colors"
        >
          Khôi phục mật khẩu
        </button>
      </div>
    </>
  );

  const forgotContent = (
    <>
      {/* Tiêu đề */}
      <div className="flex flex-col items-center mb-5">
        <div className="w-12 h-12 rounded-full bg-[#fff0f1] flex items-center justify-center mb-3">
          <svg
            className="w-6 h-6 text-[#F7a3a9]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <h2 className="text-base font-bold text-gray-800 tracking-wide">
          KHÔI PHỤC MẬT KHẨU
        </h2>
        {!forgotSent && (
          <p className="text-xs text-gray-400 mt-1 text-center">
            Nhập email của bạn:
          </p>
        )}
      </div>

      {forgotSent ? (
        /* Trạng thái đã gửi */
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Đã gửi link khôi phục đến
            <br />
            <span className="font-semibold text-[#F7a3a9]">{forgotEmail}</span>
          </p>
          <p className="text-xs text-gray-400 text-center">
            Vui lòng kiểm tra hộp thư của bạn.
          </p>
        </div>
      ) : (
        /* Form nhập email */
        <>
          <input
            type="email"
            placeholder="Email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm outline-none focus:border-[#F7a3a9] focus:ring-2 focus:ring-[#F7a3a9]/20"
          />
          <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
          <button
            onClick={() => forgotEmail.trim() && setForgotSent(true)}
            className="mt-4 w-full bg-[#F7a3a9] hover:bg-[#f08a91] active:scale-[0.98] text-white text-sm font-semibold py-2.5 rounded transition-all duration-200"
          >
            Khôi phục
          </button>
        </>
      )}

      {/* Trở về */}
      <p className="text-center text-xs text-gray-400 mt-4">
        Bạn đã nhớ mật khẩu?{" "}
        <button
          type="button"
          onClick={() => setView("login")}
          className="text-[#F7a3a9] font-semibold hover:text-[#e07a82] transition-colors"
        >
          Trở về đăng nhập
        </button>
      </p>
    </>
  );

  const formContent = view === "forgot" ? forgotContent : loginContent;

  if (!open) return null;

  // Mobile: popup căn giữa màn hình
  if (isMobile) {
    return (
      <>
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
        <div
          ref={dropdownRef}
          className="fixed z-50 bg-white rounded-2xl shadow-2xl w-[calc(100vw-32px)] max-w-sm"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Đóng"
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
          <div className="px-6 py-6">{formContent}</div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Popup — bám theo icon Login trên mọi màn hình */}
      <div
        ref={dropdownRef}
        style={{ top: pos.top, left: pos.left }}
        className="fixed w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-100"
      >
        {/* Mũi tên trỏ vào icon */}
        <div
          style={{ left: pos.caretLeft }}
          className="absolute -top-2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Đóng"
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

        <div className="px-6 py-6">{formContent}</div>
      </div>
    </>
  );
};

export default LoginDrawer;
