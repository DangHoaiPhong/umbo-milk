"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    name: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
    phone: z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ"),
    otp: z.string().length(6, "OTP gồm 6 chữ số"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm"],
  });

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#F7a3a9] focus:ring-2 focus:ring-[#F7a3a9]/20 transition-all placeholder-gray-300";

export default function PhoneForm({ onBack }) {
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const sendOtp = () => {
    setOtpSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((v) => {
        if (v <= 1) { clearInterval(timer); return 0; }
        return v - 1;
      });
    }, 1000);
  };

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {/* Họ và tên */}
      <div>
        <input {...register("name")} placeholder="Họ và tên" className={inputClass} />
        {errors.name && <p className="text-xs text-red-400 mt-1 ml-1">{errors.name.message}</p>}
      </div>

      {/* Số điện thoại + Gửi OTP */}
      <div>
        <div className="flex gap-2">
          <input
            {...register("phone")}
            type="tel"
            placeholder="Số điện thoại"
            className={inputClass}
          />
          <button
            type="button"
            onClick={sendOtp}
            disabled={countdown > 0}
            className="flex-shrink-0 px-4 h-[46px] bg-[#F7a3a9] hover:bg-[#f08a91] disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap"
          >
            {countdown > 0 ? `${countdown}s` : "Gửi OTP"}
          </button>
        </div>
        {errors.phone && <p className="text-xs text-red-400 mt-1 ml-1">{errors.phone.message}</p>}
      </div>

      {/* OTP */}
      <div>
        <input
          {...register("otp")}
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Nhập mã OTP (6 chữ số)"
          className={inputClass}
          disabled={!otpSent}
        />
        {errors.otp && <p className="text-xs text-red-400 mt-1 ml-1">{errors.otp.message}</p>}
      </div>

      {/* Mật khẩu */}
      <div>
        <div className="relative">
          <input
            {...register("password")}
            type={showPw ? "text" : "password"}
            placeholder="Mật khẩu"
            className={inputClass + " pr-16"}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-[#F7a3a9]"
          >
            {showPw ? "Ẩn" : "Hiện"}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-400 mt-1 ml-1">{errors.password.message}</p>}
      </div>

      {/* Xác nhận mật khẩu */}
      <div>
        <div className="relative">
          <input
            {...register("confirm")}
            type={showCf ? "text" : "password"}
            placeholder="Xác nhận mật khẩu"
            className={inputClass + " pr-16"}
          />
          <button
            type="button"
            onClick={() => setShowCf((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-[#F7a3a9]"
          >
            {showCf ? "Ẩn" : "Hiện"}
          </button>
        </div>
        {errors.confirm && <p className="text-xs text-red-400 mt-1 ml-1">{errors.confirm.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 w-full h-[52px] bg-[#F7a3a9] hover:bg-[#f08a91] text-white text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-md disabled:opacity-60"
      >
        {isSubmitting ? "Đang tạo..." : "Tạo tài khoản"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="text-xs text-gray-400 hover:text-[#F7a3a9] transition-colors text-center mt-1"
      >
        ← Quay lại
      </button>
    </form>
  );
}
