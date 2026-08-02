"use client";
import StoreMap from "@/components/StoreMap";
import { useTheme } from "@/components/ThemeProvider";

const defaultTokens = {
  pageBg: "#FFF1F5",
  cardBg: "white",
  cardBorder: "none",
  storeHeadingColor: "#1f2937",
  dividerColor: "#f472b6",
  formHeadingColor: "#F7a3a9",
  formSubColor: "#F7a3a9",
  inputBg: "white",
  inputBorder: "#F7a3a9",
  inputText: "#1f2937",
  inputPlaceholder: "#9ca3af",
  inputFocusBorder: "#f472b6",
  captchaColor: "#9ca3af",
  captchaLink: "#3b82f6",
  btnBg: "#F7a3a9",
  btnHoverBg: "#9ca3af",
  btnShadow: "none",
};

export default function ContactPage() {
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.contactPage ?? defaultTokens;

  return (
    <main className="flex-1 py-12 px-4" style={{ background: t.pageBg }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
        {/* LEFT: Store System */}
        <div className="rounded-2xl shadow-md overflow-hidden flex flex-col"
          style={{ background: t.cardBg, border: t.cardBorder }}>
          <div className="px-6 pt-6 pb-4">
            <h2 className="text-lg font-black uppercase tracking-wide" style={{ color: t.storeHeadingColor }}>
              Hệ thống cửa hàng
            </h2>
            <div className="mt-1 w-10 h-1 rounded-full" style={{ background: t.dividerColor }} />
          </div>
          <div className="flex-1 pl-3 pb-3">
            <StoreMap />
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="rounded-2xl p-6 flex flex-col shadow-md" style={{ background: t.cardBg, border: t.cardBorder }}>
          <h2 className="text-xl font-black text-center" style={{ color: t.formHeadingColor }}>
            Gửi thắc mắc cho chúng tôi
          </h2>
          <p className="text-sm text-center mt-1 mb-5" style={{ color: t.formSubColor }}>
            Hãy để lại thắc mắc của bạn, chúng tôi sẽ liên hệ lại sớm nhất có thể 💌
          </p>

          <form className="flex flex-col gap-3 flex-1">
            <input type="text" placeholder="Tên của bạn"
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition"
              style={{
                background: t.inputBg,
                border: `1px solid ${t.inputBorder}`,
                color: t.inputText,
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = t.inputFocusBorder; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = t.inputBorder; }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="email" placeholder="Email của bạn"
                className="rounded-xl px-4 py-2.5 text-sm outline-none transition"
                style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.inputText }}
                onFocus={(e) => { e.currentTarget.style.borderColor = t.inputFocusBorder; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = t.inputBorder; }}
              />
              <input type="tel" placeholder="Số điện thoại của bạn"
                className="rounded-xl px-4 py-2.5 text-sm outline-none transition"
                style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.inputText }}
                onFocus={(e) => { e.currentTarget.style.borderColor = t.inputFocusBorder; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = t.inputBorder; }}
              />
            </div>
            <textarea placeholder="Nội dung" rows={5}
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition resize-none"
              style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.inputText }}
              onFocus={(e) => { e.currentTarget.style.borderColor = t.inputFocusBorder; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = t.inputBorder; }}
            />

            <p className="text-[11px] leading-relaxed" style={{ color: t.captchaColor }}>
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                style={{ color: t.captchaLink }} className="hover:underline">Privacy Policy</a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer"
                style={{ color: t.captchaLink }} className="hover:underline">Terms of Service</a>{" "}
              apply.
            </p>

            <button type="submit"
              className="mt-auto w-full text-white font-bold rounded-xl py-3 text-sm transition"
              style={{ background: t.btnBg, boxShadow: t.btnShadow }}
              onMouseEnter={(e) => { e.currentTarget.style.background = t.btnHoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = t.btnBg; }}>
              Gửi cho chúng tôi
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
