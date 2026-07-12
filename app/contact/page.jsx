"use client";
import StoreMap from "@/components/StoreMap";

export default function ContactPage() {
  return (
    <main className="flex-1 bg-[#FFF1F5] py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
        {/* LEFT: Store System */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
          <div className="px-6 pt-6 pb-4">
            <h2 className="text-lg font-black uppercase tracking-wide text-gray-800">
              Hệ thống cửa hàng
            </h2>
            <div className="mt-1 w-10 h-1 rounded-full bg-pink-400" />
          </div>
          <div className="flex-1 pl-3 pb-3">
            <StoreMap />
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="bg-white rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-black text-[#F7a3a9] text-center">
            Gửi thắc mắc cho chúng tôi
          </h2>
          <p className="text-sm text-[#F7a3a9] text-center mt-1 mb-5">
            Hãy để lại thắc mắc của bạn, chúng tôi sẽ liên hệ lại sớm nhất có
            thể 💌
          </p>

          <form className="flex flex-col gap-3 flex-1">
            <input
              type="text"
              placeholder="Tên của bạn"
              className="w-full rounded-xl border border-[#F7a3a9] bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-400 transition"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className="rounded-xl border border-[#F7a3a9] bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-400 transition"
              />
              <input
                type="tel"
                placeholder="Số điện thoại của bạn"
                className="rounded-xl border border-[#F7a3a9] bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-400 transition"
              />
            </div>

            <textarea
              placeholder="Nội dung"
              rows={5}
              className="w-full rounded-xl border border-[#F7a3a9] bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-400 transition resize-none"
            />

            <p className="text-[11px] text-gray-400 leading-relaxed">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>

            <button
              type="submit"
              className="mt-auto w-full bg-[#F7a3a9] hover:bg-gray-400 text-white font-bold rounded-xl py-3 text-sm transition"
            >
              Gửi cho chúng tôi
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
