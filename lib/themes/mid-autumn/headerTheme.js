// ─── Palette chữ Trung Thu ───────────────────────────────────────────────────
// #FFFFFF   → tiêu đề, nav chính          (tương phản cao nhất trên nền đỏ)
// #FFE4A0   → accent nhẹ, giá, label phụ  (vàng nhạt, không chói)
// #FFDDC0   → mô tả, placeholder, text thứ cấp (kem ấm, dễ đọc)
// ─────────────────────────────────────────────────────────────────────────────

export const midAutumnHeaderTheme = {
  id: "trung-thu",

  // Layout & background — giữ nguyên
  container:
    "sticky top-0 z-30 transition-all duration-300 border-b border-[#c0392b]/40 bg-[linear-gradient(135deg,#8B0000_0%,#c0392b_40%,#a93226_70%,#7B0000_100%)] shadow-[0_8px_32px_rgba(139,0,0,0.45)]",
  inner: "flex items-center justify-between px-4 lg:px-6 relative",
  nav: "hidden lg:flex gap-6 transition-opacity duration-300 items-center",

  // Nav — trắng tinh trên đỏ, bỏ drop-shadow gây rung
  navLink:
    "relative px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 rounded-full",
  navLinkActive:
    "text-white font-semibold bg-white/15 border border-white/20",

  // Icon buttons — giữ hình dạng, đổi màu icon sang trắng
  iconButton:
    "relative flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 text-white/90 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200",

  // Search input — text trắng, placeholder kem nhạt
  searchInput:
    "w-full pl-9 pr-4 py-2.5 text-sm border border-white/20 rounded-full outline-none text-white placeholder:text-[#FFDDC0]/70 bg-white/10 focus:bg-white/15 focus:border-white/35 transition-all duration-200",

  // Search dropdown — nền tối, text rõ
  searchDropdown:
    "absolute top-full right-0 mt-2 w-full bg-[#4a0808] rounded-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.55)] overflow-hidden z-50",
  dropdownItem:
    "flex items-center justify-between px-4 py-3 hover:bg-white/8 transition-colors duration-200 group",

  // Tên sản phẩm trong dropdown dùng class riêng trong Header nên để đây làm giá
  dropdownPrice: "text-sm text-[#FFE4A0] font-semibold mt-0.5",
  dropdownThumb:
    "ml-3 w-10 h-10 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-white/10",

  // Badge giỏ hàng — vàng nhạt nền, đỏ đậm chữ (tương phản tốt)
  badge: "bg-[#FFE4A0] text-[#7B0000] font-bold",

  // Account panel dropdown
  accountPanel:
    "rounded-[24px] border border-white/15 bg-[#4a0808] p-4 shadow-[0_20px_48px_rgba(0,0,0,0.55)]",

  // Mobile menu
  mobileMenu:
    "fixed top-0 right-0 h-full w-80 bg-[linear-gradient(180deg,#8B0000_0%,#4a0808_100%)] z-50 flex flex-col px-6 py-8 gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-300 lg:hidden border-l border-white/10",
  mobileMenuLink:
    "text-sm font-medium text-white/90 hover:text-white transition-colors rounded-full px-3 py-2 hover:bg-white/10",

  // Logo wrap
  logoWrap:
    "relative flex items-center rounded-full border border-white/20 bg-white/10 p-1.5",

  // Trăng nhỏ trên logo
  moon: "absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#FFE4A0] shadow-[0_0_14px_rgba(255,228,160,0.8)]",

  // Decorative
  lantern: "absolute top-1/2 -translate-y-1/2 hidden sm:block",
  lanternLeft: "-left-5",
  lanternRight: "-right-5",
  accentLine:
    "absolute inset-x-0 top-full h-[2px] bg-gradient-to-r from-transparent via-[#FFE4A0]/50 to-transparent",
  searchGlow: "absolute inset-0 rounded-full border border-white/20",
};

export default midAutumnHeaderTheme;
