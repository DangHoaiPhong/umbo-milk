export const defaultHeaderTheme = {
  id: "pink-classic",
  container: "bg-white sticky top-0 z-30 transition-all duration-300",
  inner: "flex items-center justify-between px-4",
  nav: "hidden lg:flex gap-6 transition-opacity duration-300",
  navLink:
    "text-sm text-[#F7a3a9] hover:text-[#00000052] transition-colors duration-200",
  navLinkActive: "text-[#F08A91] font-semibold",
  iconButton:
    "relative flex items-center justify-center rounded-full p-2 text-[#F7a3a9] hover:text-[#00000052] transition-all duration-200",
  searchInput:
    "w-full pl-9 pr-4 py-2 text-sm border border-[#F7a3a9] rounded-full outline-none focus:ring-2 focus:ring-[#F7a3a9]/40 text-gray-700 placeholder-gray-400 bg-white",
  searchDropdown:
    "absolute top-full right-0 mt-2 w-full bg-white rounded-2xl shadow-lg overflow-hidden z-50",
  dropdownItem:
    "flex items-center justify-between px-4 py-3 hover:bg-[#fff0f1] transition-colors duration-200 group",
  dropdownPrice: "text-sm text-[#F7a3a9] font-semibold mt-0.5",
  dropdownThumb:
    "ml-3 w-10 h-10 shrink-0 overflow-hidden rounded-lg bg-[#fff0f1]",
  badge: "bg-[#F7a3a9] text-white",
  accountPanel:
    "rounded-3xl border border-[#f7d0d3] bg-white p-4 shadow-[0_20px_45px_rgba(247,163,169,0.16)]",
  mobileMenu:
    "fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col px-6 py-8 gap-6 shadow-xl transition-transform duration-300 lg:hidden",
  mobileMenuLink:
    "text-sm text-[#F7a3a9] hover:text-[#00000052] transition-colors",
};

export default defaultHeaderTheme;
