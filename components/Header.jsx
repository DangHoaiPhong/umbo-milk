"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import umboMilk from "../assets/images/umboMilk.jpg";
import umboAutumn from "../assets/images/umboAutumn.png";
import LoginDrawer from "./LoginDrawer";
import { useCart } from "./CartContext";
import { useTheme } from "@/components/ThemeProvider";
import { MidAutumnDecorations } from "@/lib/themes/mid-autumn/decorations";

const ACCOUNT_STORAGE_KEY = "umbo_account_profile";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Sản phẩm nổi bật", href: "/productSpecial" },
  { label: "Feedback khách hàng", href: "/feedback" },
  { label: "Liên hệ", href: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { totalCount, setDrawerOpen } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const headerRef = useRef(null);
  const loginBtnRef = useRef(null);
  const accountMenuRef = useRef(null);
  const desktopInputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  const headerTheme = theme?.headerTheme || {};
  const isMidAutumn = theme?.id === "trung-thu";

  const LIMIT = 5;
  const filtered = searchQuery.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];
  const shown = filtered.slice(0, LIMIT);
  const extra = filtered.length - LIMIT;
  const dropdownOpen = searchQuery.trim().length > 0;

  useEffect(() => {
    fetch("/api/haravan/products")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setAllProducts(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const closeDesktopSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedProfile = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setUserProfile(parsed);
        setIsLoggedIn(true);
      } catch {
        window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isLoggedIn && userProfile) {
      window.localStorage.setItem(
        ACCOUNT_STORAGE_KEY,
        JSON.stringify(userProfile),
      );
    } else {
      window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
    }
  }, [isLoggedIn, userProfile]);

  // Auto-focus desktop input khi mở
  useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => desktopInputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [searchOpen]);

  // Click outside đóng desktop search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        closeDesktopSearch();
      }
      if (
        accountMenuOpen &&
        accountMenuRef.current &&
        !accountMenuRef.current.contains(e.target) &&
        !loginBtnRef.current?.contains(e.target)
      ) {
        setAccountMenuOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeDesktopSearch();
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [accountMenuOpen]);

  const SearchSVG = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
  );

  const CloseSVG = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
  );

  const handleLogin = (profile) => {
    const safeProfile = {
      name: profile?.name || "Khách hàng Umbo",
      email: profile?.email || "",
      phone: profile?.phone || "",
      password: profile?.password || "",
      isVip: Boolean(profile?.isVip),
      isOwner: Boolean(
        profile?.isOwner || profile?.email?.toLowerCase() === "admin@umbo.vn",
      ),
    };
    setUserProfile(safeProfile);
    setIsLoggedIn(true);
    setLoginOpen(false);
    setAccountMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setAccountMenuOpen(false);
    setLoginOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
    }
    router.push("/");
  };

  const handleAccountToggle = () => {
    if (isLoggedIn) {
      setAccountMenuOpen((prev) => !prev);
      setLoginOpen(false);
    } else {
      setLoginOpen(true);
      setAccountMenuOpen(false);
    }
  };

  const SearchDropdown = ({ maxHeight }) => (
    <div className="overflow-y-auto" style={{ maxHeight }}>
      {shown.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-6">
          Không có sản phẩm nào...
        </p>
      ) : (
        shown.map((p, i) => (
          <div key={p.id}>
            <Link
              href={`/products/${p.id}`}
              onClick={closeDesktopSearch}
              className={`${headerTheme.dropdownItem || "flex items-center justify-between px-4 py-3 hover:bg-[#fff0f1] transition-colors duration-200 group"}`}
            >
              <div>
                <p className="text-sm font-medium0">{p.name}</p>
                <p
                  className={`${headerTheme.dropdownPrice || "text-sm text-[#F7a3a9] font-semibold mt-0.5"}`}
                >
                  {p.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <div
                className={`${headerTheme.dropdownThumb || "ml-3 w-10 h-10 shrink-0 overflow-hidden rounded-lg bg-[#fff0f1]"}`}
              >
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={40}
                    height={40}
                    unoptimized
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                  />
                )}
              </div>
            </Link>
            {i < shown.length - 1 && <div className="mx-4 h-px bg-gray-100" />}
          </div>
        ))
      )}
      {extra > 0 && (
        <Link
          href={`/products?q=${encodeURIComponent(searchQuery)}`}
          onClick={closeDesktopSearch}
          className="block w-full text-center text-sm py-3 font-medium transition-colors duration-200"
          style={{ color: theme?.values?.primary || "#F7A3A9" }}
        >
          Xem thêm {extra} sản phẩm
        </Link>
      )}
    </div>
  );

  return (
    <header
      ref={headerRef}
      className={`${headerTheme.container || "bg-white sticky top-0 z-30 transition-all duration-300"} ${scrolled ? "shadow-md" : "shadow-sm"}`}
      style={{
        fontFamily: theme?.values?.fontFamily || "var(--font-koni), sans-serif",
      }}
    >
      {isMidAutumn ? <MidAutumnDecorations className="opacity-70" /> : null}
      {isMidAutumn ? (
        <div
          className={
            headerTheme.accentLine ||
            "absolute inset-x-4 top-full h-px bg-linear-to-r from-transparent via-[#e7c08d] to-transparent"
          }
        />
      ) : null}
      {/* ── Header row ── */}
      <div
        className={`${headerTheme.inner || "flex items-center justify-between px-4"}`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`${headerTheme.logoWrap || "flex items-center"} relative`}
          aria-label="Um Bo Milk"
        >
          {isMidAutumn ? (
            <span
              className={
                headerTheme.moon ||
                "absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[#f8e8a8] shadow-[0_0_16px_rgba(248,232,168,0.8)]"
              }
            />
          ) : null}
          <Image
            src={isMidAutumn ? umboAutumn : umboMilk}
            alt="Um Bo Milk"
            width={70}
            height={70}
          />
        </Link>

        {/* Nav — desktop lg+, ẩn khi search mở */}
        <nav
          className={`${headerTheme.nav || "hidden lg:flex gap-6 transition-opacity duration-300"}`}
          style={searchOpen ? { opacity: 0, pointerEvents: "none" } : {}}
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${headerTheme.navLink || "text-sm text-[#F7a3a9] hover:text-[#00000052] transition-colors duration-200"} ${active ? headerTheme.navLinkActive || "font-semibold" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2">
          {/* Search icon — chỉ desktop lg+ */}
          <div className="relative hidden lg:flex items-center justify-center">
            <button
              aria-label="Tìm kiếm"
              onClick={() => setSearchOpen(true)}
              className={`${headerTheme.iconButton || "flex items-center justify-center rounded-full p-2 text-[#F7a3a9] hover:text-[#00000052] transition-opacity duration-300"}`}
              style={
                searchOpen
                  ? { opacity: 0, pointerEvents: "none", visibility: "hidden" }
                  : {}
              }
            >
              <SearchSVG className="w-7 h-7" />
            </button>

            {/* Input desktop — slide từ phải sang trái */}
            <div
              className="absolute right-0"
              style={{
                width: searchOpen ? "260px" : "0px",
                opacity: searchOpen ? 1 : 0,
                transition:
                  "width 300ms ease-in-out, opacity 300ms ease-in-out",
                pointerEvents: searchOpen ? "auto" : "none",
              }}
            >
              <div className="relative flex items-center">
                <SearchSVG className="absolute left-3 w-4 h-4 text-[#F7a3a9] pointer-events-none z-10" />
                <input
                  ref={desktopInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className={`${headerTheme.searchInput || "w-full pl-9 pr-4 py-2 text-sm border border-[#F7a3a9] rounded-full outline-none focus:ring-2 focus:ring-[#F7a3a9]/40 text-gray-700 placeholder-gray-400 bg-white"}`}
                />
              </div>

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
                className={`${headerTheme.searchDropdown || "absolute top-full right-0 mt-2 w-full bg-white rounded-2xl shadow-lg overflow-hidden z-50"}`}
              >
                <SearchDropdown maxHeight="400px" />
              </div>
            </div>
          </div>

          {/* Cart */}
          <button
            aria-label="Giỏ hàng"
            onClick={() => setDrawerOpen(true)}
            className={`${headerTheme.iconButton || "relative flex items-center justify-center rounded-full p-2 text-[#F7a3a9] hover:text-[#00000052]"} relative`}
          >
            <span className="box-icon flex items-center justify-center">
              <svg
                className="svg-ico-cart w-6 h-6 lg:w-7 lg:h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -13 456.75885 456"
                fill="currentColor"
              >
                <path d="m150.355469 322.332031c-30.046875 0-54.402344 24.355469-54.402344 54.402344 0 30.042969 24.355469 54.398437 54.402344 54.398437 30.042969 0 54.398437-24.355468 54.398437-54.398437-.03125-30.03125-24.367187-54.371094-54.398437-54.402344zm0 88.800781c-19 0-34.402344-15.402343-34.402344-34.398437 0-19 15.402344-34.402344 34.402344-34.402344 18.996093 0 34.398437 15.402344 34.398437 34.402344 0 18.996094-15.402344 34.398437-34.398437 34.398437zm0 0"></path>
                <path d="m446.855469 94.035156h-353.101563l-7.199218-40.300781c-4.4375-24.808594-23.882813-44.214844-48.699219-48.601563l-26.101563-4.597656c-5.441406-.96875-10.632812 2.660156-11.601562 8.097656-.964844 5.441407 2.660156 10.632813 8.101562 11.601563l26.199219 4.597656c16.53125 2.929688 29.472656 15.871094 32.402344 32.402344l35.398437 199.699219c4.179688 23.894531 24.941406 41.324218 49.199219 41.300781h210c22.0625.066406 41.546875-14.375 47.902344-35.5l47-155.800781c.871093-3.039063.320312-6.3125-1.5-8.898438-1.902344-2.503906-4.859375-3.980468-8-4zm-56.601563 162.796875c-3.773437 12.6875-15.464844 21.367188-28.699218 21.300781h-210c-14.566407.039063-27.035157-10.441406-29.5-24.800781l-24.699219-139.398437h336.097656zm0 0"></path>
                <path d="m360.355469 322.332031c-30.046875 0-54.402344 24.355469-54.402344 54.402344 0 30.042969 24.355469 54.398437 54.402344 54.398437 30.042969 0 54.398437-24.355468 54.398437-54.398437-.03125-30.03125-24.367187-54.371094-54.398437-54.402344zm0 88.800781c-19 0-34.402344-15.402343-34.402344-34.402344 18.996093 0 34.398437 15.402344 34.398437 34.402344 0 18.996094-15.402344 34.398437-34.398437 34.398437zm0 0"></path>
              </svg>
            </span>
            <span
              key={totalCount}
              className={`absolute -top-1 -right-1 flex h-5 w-5 lg:h-6 lg:w-6 items-center justify-center rounded-full ${headerTheme.badge || "bg-[#F7a3a9] text-white"} text-[10px] lg:text-[11px] font-semibold`}
              style={{
                animation: "badgePop 300ms cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              {totalCount}
            </span>
          </button>

          {/* Login / Account */}
          <div className="relative">
            <button
              ref={loginBtnRef}
              aria-label={isLoggedIn ? "Tài khoản" : "Đăng nhập"}
              onClick={handleAccountToggle}
              className={`${headerTheme.iconButton || "relative flex items-center justify-center h-10 w-10 rounded-full text-[#F7a3a9] hover:text-[#00000052]"} h-10 w-10 rounded-full relative`}
            >
              {isLoggedIn ? (
                <>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-sm"
                    style={{
                      backgroundColor: isMidAutumn
                        ? "rgba(255,228,160,0.15)"
                        : "white",
                      color: isMidAutumn ? "#FFE4A0" : "#F7a3a9",
                      border: isMidAutumn
                        ? "1px solid rgba(255,228,160,0.3)"
                        : "none",
                    }}
                  >
                    {userProfile?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  {userProfile?.isVip ? (
                    <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#f5c542] text-[10px] text-white shadow-sm">
                      👑
                    </span>
                  ) : null}
                </>
              ) : (
                <svg
                  className="svg-ico-account w-6 h-6 lg:w-7 lg:h-7"
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
              )}
            </button>

            {accountMenuOpen && isLoggedIn && (
              <div
                ref={accountMenuRef}
                className={`absolute right-0 z-50 ${isMobile ? "fixed inset-0" : "top-full mt-3 w-72"}`}
              >
                {isMobile ? (
                  <div
                    className="fixed inset-0 bg-black/50"
                    onClick={() => setAccountMenuOpen(false)}
                  />
                ) : null}
                <div
                  className={`${
                    isMobile
                      ? "fixed right-0 top-0 h-full w-[85vw] max-w-sm shadow-2xl"
                      : headerTheme.accountPanel ||
                        "rounded-3xl border border-[#f7d0d3] bg-white p-4 shadow-[0_20px_45px_rgba(247,163,169,0.16)]"
                  }`}
                  style={
                    isMobile
                      ? {
                          backgroundColor:
                            theme?.values?.cardBackground || "#FFFFFF",
                        }
                      : {}
                  }
                >
                  {/* ── Mobile header bar ── */}
                  {isMobile ? (
                    <div
                      className="flex items-center justify-between px-4 py-4"
                      style={{
                        borderBottom: isMidAutumn
                          ? "1px solid rgba(255,228,160,0.2)"
                          : "1px solid #f7d0d3",
                      }}
                    >
                      <p
                        className="text-sm font-semibold uppercase tracking-[0.2em]"
                        style={{
                          color: isMidAutumn
                            ? "#E8B547"
                            : theme?.values?.primary || "#F7A3A9",
                        }}
                      >
                        Tài khoản
                      </p>
                      <button
                        onClick={() => setAccountMenuOpen(false)}
                        style={{ color: isMidAutumn ? "#FFF6E5" : "#6b7280" }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : null}

                  <div className={`${isMobile ? "px-4 py-4" : ""}`}>
                    {/* ── Card thông tin tài khoản ── */}
                    <div
                      className="mb-4 rounded-2xl p-3"
                      style={{
                        backgroundColor: isMidAutumn
                          ? "rgba(255,228,160,0.08)"
                          : "#fff3f4",
                        border: isMidAutumn
                          ? "1px solid rgba(255,228,160,0.15)"
                          : "none",
                      }}
                    >
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                        style={{
                          color: isMidAutumn
                            ? "#E8B547"
                            : theme?.values?.primary || "#F7A3A9",
                        }}
                      >
                        THÔNG TIN TÀI KHOẢN
                      </p>
                      <p
                        className="mt-2 text-sm font-semibold"
                        style={{ color: isMidAutumn ? "#FFF6E5" : "#2d3748" }}
                      >
                        {userProfile?.name || "Khách hàng Umbo"}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: isMidAutumn ? "#FFDDC0" : "#6b7280" }}
                      >
                        {userProfile?.email || "Chưa có email"}
                      </p>
                    </div>

                    {/* ── Menu links ── */}
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/account"
                        onClick={() => setAccountMenuOpen(false)}
                        className="group rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors duration-150"
                        style={{ color: isMidAutumn ? "#FFF6E5" : "#2d3748" }}
                        onMouseEnter={(e) => {
                          if (isMidAutumn)
                            e.currentTarget.style.color = "#F9D897";
                        }}
                        onMouseLeave={(e) => {
                          if (isMidAutumn)
                            e.currentTarget.style.color = "#FFF6E5";
                        }}
                      >
                        Tài khoản của tôi
                      </Link>
                      <Link
                        href="/addresses"
                        onClick={() => setAccountMenuOpen(false)}
                        className="group rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors duration-150"
                        style={{ color: isMidAutumn ? "#FFF6E5" : "#2d3748" }}
                        onMouseEnter={(e) => {
                          if (isMidAutumn)
                            e.currentTarget.style.color = "#F9D897";
                        }}
                        onMouseLeave={(e) => {
                          if (isMidAutumn)
                            e.currentTarget.style.color = "#FFF6E5";
                        }}
                      >
                        Danh sách địa chỉ
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150"
                        style={{ color: isMidAutumn ? "#FF6B6B" : "#ef4444" }}
                        onMouseEnter={(e) => {
                          if (isMidAutumn)
                            e.currentTarget.style.color = "#FF4F4F";
                        }}
                        onMouseLeave={(e) => {
                          if (isMidAutumn)
                            e.currentTarget.style.color = "#FF6B6B";
                        }}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger — chỉ hiện dưới lg */}
          <button
            aria-label="Menu"
            className={`lg:hidden flex flex-col gap-1.5 rounded-full p-2 ${isMidAutumn ? "border border-[#e0a85e]/40 bg-white/70" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block w-6 h-0.5 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              style={{ backgroundColor: theme?.values?.primary || "#F7A3A9" }}
            />
            <span
              className={`block w-6 h-0.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
              style={{ backgroundColor: theme?.values?.primary || "#F7A3A9" }}
            />
            <span
              className={`block w-6 h-0.5 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              style={{ backgroundColor: theme?.values?.primary || "#F7A3A9" }}
            />
          </button>
        </div>
      </div>

      {/* ── Search bar cố định mobile/tablet — luôn hiện, ẩn từ lg+ ── */}
      <div className="lg:hidden px-3 pb-2 pt-1">
        <div className="relative flex items-center">
          <SearchSVG
            className="absolute left-3 w-4 h-4 pointer-events-none z-10"
            style={{ color: theme?.values?.primary || "#F7A3A9" }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className={`${headerTheme.searchInput || "w-full pl-9 pr-4 py-2 text-sm border border-[#F7a3a9] rounded-full outline-none focus:ring-2 focus:ring-[#F7a3a9]/40 text-gray-700 placeholder-gray-400 bg-white"}`}
          />
        </div>

        {dropdownOpen && (
          <div
            className={`${headerTheme.searchDropdown || "mt-2 w-full bg-white rounded-2xl shadow-lg overflow-hidden"}`}
          >
            <SearchDropdown maxHeight="280px" />
          </div>
        )}
      </div>

      <LoginDrawer
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        triggerRef={loginBtnRef}
        onLogin={handleLogin}
      />

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        className={`${headerTheme.mobileMenu || "fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col px-6 py-8 gap-6 shadow-xl transition-transform duration-300 lg:hidden"} ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="self-end"
          style={{ color: theme?.values?.primary || "#F7A3A9" }}
          onClick={() => setMenuOpen(false)}
          aria-label="Đóng menu"
        >
          <CloseSVG className="w-6 h-6" />
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${headerTheme.mobileMenuLink || "text-sm text-[#F7a3a9] hover:text-[#00000052] transition-colors"}`}
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
