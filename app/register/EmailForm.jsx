"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#F7a3a9] focus:ring-2 focus:ring-[#F7a3a9]/20 transition-all placeholder-gray-300";

export default function EmailForm({ onBack }) {
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);

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
        <input {...register("name")} placeholder="Họ và tên" className={inputClass} />
        {errors.name && <p className="text-xs text-red-400 mt-1 ml-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <input {...register("email")} type="email" placeholder="Email" className={inputClass} />
        {errors.email && <p className="text-xs text-red-400 mt-1 ml-1">{errors.email.message}</p>}
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
