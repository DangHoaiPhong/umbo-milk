"use client";

import Link from "next/link";
import { Home, Plus, Trash2 } from "lucide-react";

export default function AddressesPage() {
  return (
    <main className="min-h-screen bg-[#fffafc] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-4xl border border-[#f7d0d3] bg-white p-6 shadow-[0_20px_60px_rgba(247,163,169,0.12)] sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F7a3a9]">
              Danh sách địa chỉ
            </p>
            <h1 className="text-2xl font-bold text-[#2d3748]">
              Quản lý địa chỉ giao hàng
            </h1>
          </div>
          <button className="flex items-center gap-2 rounded-full bg-[#F7a3a9] px-4 py-2.5 text-sm font-semibold text-white">
            <Plus size={16} /> Thêm địa chỉ
          </button>
        </div>

        <div className="rounded-3xl border border-[#f7d0d3] bg-[#fffdfd] p-5">
          <div className="flex items-start gap-3 rounded-2xl border border-[#f7d0d3] bg-white p-4">
            <div className="rounded-2xl bg-[#fff3f4] p-2 text-[#F7a3a9]">
              <Home size={18} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#2d3748]">Địa chỉ mặc định</p>
              <p className="mt-1 text-sm text-gray-500">
                123 Nguyễn Văn A, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
              </p>
            </div>
            <button className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <Link
          href="/checkout"
          className="mt-6 inline-flex items-center text-sm font-semibold text-[#F7a3a9]"
        >
          Quay lại thanh toán
        </Link>
      </div>
    </main>
  );
}
