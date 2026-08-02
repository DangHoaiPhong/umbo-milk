"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/components/ThemeProvider";

const schema = z
  .object({
    name: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm"],
  });

const defaultRegisterTokens = {
  inputBg: "rgba(255,228,160,0.06)",
  inputBorder: "rgba(255,228,160,0.25)",
  inputText: "#FFF6E5",
  inputPlaceholder: "rgba(255,220,192,0.6)",
  buttonBg: "#FFE4A0",
  buttonText: "#7B0000",
  buttonHoverBg: "#ffd060",
  errorText: "#FF6B6B",
};

export default function EmailForm({ onBack }) {
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.registerPage ?? defaultRegisterTokens;
  const inputStyle = {
    width: "100%",
    borderRadius: "1rem",
    padding: "0.75rem 1rem",
    border: `1px solid ${t.inputBorder}`,
    background: t.inputBg,
    color: t.inputText,
  };
  const buttonStyle = {
    background: t.buttonBg,
    color: t.buttonText,
  };
  const backButtonStyle = {
    color: t.inputText,
  };
  const errorStyle = {
    color: t.errorText,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {/* Họ và tên */}
      <div>
        <input
          {...register("name")}
          placeholder="Họ và tên"
          style={inputStyle}
        />
        {errors.name && (
          <p className="text-xs mt-1 ml-1" style={errorStyle}>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          style={inputStyle}
        />
        {errors.email && (
          <p className="text-xs mt-1 ml-1" style={errorStyle}>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Mật khẩu */}
      <div>
        <div className="relative">
          <input
            {...register("password")}
            type={showPw ? "text" : "password"}
            placeholder="Mật khẩu"
            style={{ ...inputStyle, paddingRight: "4rem" }}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs transition-colors"
            style={{ color: t.mutedText }}
          >
            {showPw ? "Ẩn" : "Hiện"}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs mt-1 ml-1" style={errorStyle}>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Xác nhận mật khẩu */}
      <div>
        <div className="relative">
          <input
            {...register("confirm")}
            type={showCf ? "text" : "password"}
            placeholder="Xác nhận mật khẩu"
            style={{ ...inputStyle, paddingRight: "4rem" }}
          />
          <button
            type="button"
            onClick={() => setShowCf((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs transition-colors"
            style={{ color: t.mutedText }}
          >
            {showCf ? "Ẩn" : "Hiện"}
          </button>
        </div>
        {errors.confirm && (
          <p className="text-xs mt-1 ml-1" style={errorStyle}>
            {errors.confirm.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 w-full h-[52px] text-sm font-semibold rounded-full transition-all duration-300 hover:brightness-110 disabled:opacity-60"
        style={buttonStyle}
      >
        {isSubmitting ? "Đang tạo..." : "Tạo tài khoản"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="text-xs transition-colors text-center mt-1"
        style={backButtonStyle}
      >
        ← Quay lại
      </button>
    </form>
  );
}
