"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import umboMilk from "../assets/images/umboMilk.jpg";
import LoginDrawer from "./LoginDrawer";
import { products } from "../data/products";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Sản phẩm nổi bật", href: "/featured" },
  { label: "Feedback khách hàng", href: "/feedback" },
  { label: "Liên hệ", href: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const loginBtnRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const LIMIT = 5;
  const filtered = searchQuery.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];
  const shown = filtered.slice(0, LIMIT);
  const extra = filtered.length - LIMIT;
  const dropdownOpen = searchOpen && searchQuery.trim().length > 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header
      className={`bg-white sticky top-0 z-30 transition-all duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
    >
      <div className="flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Um Bo Milk">
          <Image src={umboMilk} alt="Um Bo Milk" width={100} height={100} />
        </Link>

        {/* Nav - desktop */}
        <nav className="hidden lg:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#F7a3a9] hover:text-[#00000052]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons + Hamburger */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <div
            ref={searchContainerRef}
            className="relative flex items-center justify-center"
          >
            {/* Icon Search — ẩn khi mở (chỉ trên desktop sm+) */}
            <button
              aria-label="Tìm kiếm"
              onClick={() => setSearchOpen((v) => !v)}
              className={`flex items-center justify-center rounded-full p-2 text-[#F7a3a9] hover:text-[#00000052] transition-opacity duration-300 sm:${searchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 sm:w-7 sm:h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </button>

            {/* Input desktop — absolute, mở rộng sang trái, chỉ hiện sm+ */}
            <div
              className="absolute right-0 hidden sm:block"
              style={{
                width: searchOpen ? "260px" : "0px",
                opacity: searchOpen ? 1 : 0,
                transition:
                  "width 350ms ease-in-out, opacity 350ms ease-in-out",
                pointerEvents: searchOpen ? "auto" : "none",
              }}
            >
              <div className="relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 w-4 h-4 text-[#F7a3a9] pointer-events-none z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-[#F7a3a9] rounded-full outline-none focus:ring-2 focus:ring-[#F7a3a9]/40 text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Dropdown */}
              <div
                style={{
                  opacity: dropdownOpen ? 1 : 0,
                  transform: dropdownOpen
                    ? "translateY(0)"
                    : "translateY(-10px)",
                  transition:
                    "opacity 280ms ease-out, transform 280ms ease-out",
                  pointerEvents: dropdownOpen ? "auto" : "none",
                }}
                className="absolute top-full right-0 mt-2 w-full bg-white rounded-2xl shadow-lg overflow-hidden z-50"
              >
                <div className="max-h-[400px] overflow-y-auto">
                  {shown.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm py-10">
                      Không có sản phẩm nào...
                    </p>
                  ) : (
                    shown.map((p, i) => (
                      <div key={p.id}>
                        <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#fff0f1] transition-colors duration-200 group">
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {p.name}
                            </p>
                            <p className="text-sm text-[#F7a3a9] font-semibold mt-0.5">
                              {p.price.toLocaleString("vi-VN")}đ
                            </p>
                          </div>
                          <div className="ml-3 w-12 h-12 flex-shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={p.image}
                              alt={p.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                            />
                          </div>
                        </div>
                        {i < shown.length - 1 && (
                          <div className="mx-4 h-px bg-gray-100" />
                        )}
                      </div>
                    ))
                  )}
                  {extra > 0 && (
                    <button className="w-full text-center text-sm text-[#F7a3a9] hover:text-[#e07a82] py-3 font-medium transition-colors duration-200">
                      Xem thêm {extra} sản phẩm
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cart */}
          <button
            aria-label="Giỏ hàng"
            className="relative flex items-center justify-center rounded-full p-2 text-[#F7a3a9] hover:text-[#00000052]"
          >
            <span className="box-icon flex items-center justify-center text-[#F7a3a9] hover:text-[#00000052]">
              <svg
                className="svg-ico-cart w-6 h-6 sm:w-7 sm:h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -13 456.75885 456"
                fill="currentColor"
              >
                <path d="m150.355469 322.332031c-30.046875 0-54.402344 24.355469-54.402344 54.402344 0 30.042969 24.355469 54.398437 54.402344 54.398437 30.042969 0 54.398437-24.355468 54.398437-54.398437-.03125-30.03125-24.367187-54.371094-54.398437-54.402344zm0 88.800781c-19 0-34.402344-15.402343-34.402344-34.398437 0-19 15.402344-34.402344 34.402344-34.402344 18.996093 0 34.398437 15.402344 34.398437 34.402344 0 18.996094-15.402344 34.398437-34.398437 34.398437zm0 0"></path>
                <path d="m446.855469 94.035156h-353.101563l-7.199218-40.300781c-4.4375-24.808594-23.882813-44.214844-48.699219-48.601563l-26.101563-4.597656c-5.441406-.96875-10.632812 2.660156-11.601562 8.097656-.964844 5.441407 2.660156 10.632813 8.101562 11.601563l26.199219 4.597656c16.53125 2.929688 29.472656 15.871094 32.402344 32.402344l35.398437 199.699219c4.179688 23.894531 24.941406 41.324218 49.199219 41.300781h210c22.0625.066406 41.546875-14.375 47.902344-35.5l47-155.800781c.871093-3.039063.320312-6.3125-1.5-8.898438-1.902344-2.503906-4.859375-3.980468-8-4zm-56.601563 162.796875c-3.773437 12.6875-15.464844 21.367188-28.699218 21.300781h-210c-14.566407.039063-27.035157-10.441406-29.5-24.800781l-24.699219-139.398437h336.097656zm0 0"></path>
                <path d="m360.355469 322.332031c-30.046875 0-54.402344 24.355469-54.402344 54.402344 0 30.042969 24.355469 54.398437 54.402344 54.398437 30.042969 0 54.398437-24.355468 54.398437-54.398437-.03125-30.03125-24.367187-54.371094-54.398437-54.402344zm0 88.800781c-19 0-34.402344-15.402343-34.402344-34.398437 0-19 15.402344-34.402344 34.402344-34.402344 18.996093 0 34.398437 15.402344 34.398437 34.402344 0 18.996094-15.402344 34.398437-34.398437 34.398437zm0 0"></path>
              </svg>
            </span>
            <span className="absolute -top-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#F7a3a9] text-[10px] sm:text-[11px] font-semibold text-white">
              {cartCount}
            </span>
          </button>

          {/* Login */}
          <button
            ref={loginBtnRef}
            aria-label="Đăng nhập"
            onClick={() => setLoginOpen(!loginOpen)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full text-[#F7a3a9] hover:text-[#00000052] transition-colors"
          >
            <svg
              className="svg-ico-account w-6 h-6 sm:w-7 sm:h-7"
              viewBox="0 0 1024 1024"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="path1"
                d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"
              />
              <path
                className="path2"
                d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"
              />
            </svg>
          </button>

          {/* Hamburger - chỉ hiện trên mobile */}
          <button
            aria-label="Menu"
            className="lg:hidden flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block w-6 h-0.5 bg-[#F7a3a9] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#F7a3a9] transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#F7a3a9] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      <LoginDrawer
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        triggerRef={loginBtnRef}
      />

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Nav - mobile slide from right */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col px-6 py-8 gap-6 shadow-xl transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          className="self-end text-[#F7a3a9]"
          onClick={() => setMenuOpen(false)}
          aria-label="Đóng menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-[#F7a3a9] hover:text-[#00000052] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
