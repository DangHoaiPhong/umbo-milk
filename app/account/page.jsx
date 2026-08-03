"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import {
  ArrowLeft,
  ChevronRight,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import ThemeSettings from "@/components/ThemeSettings";

const ACCOUNT_STORAGE_KEY = "umbo_account_profile";

const initialProfile = {
  name: "Khách hàng Umbo",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "Khác",
  password: "",
  isVip: true,
  isOwner: false,
};

const menuItems = [
  { id: "profile", label: "Thông tin tài khoản", icon: User },
  { id: "orders", label: "Lịch sử đơn hàng", icon: Package },
  { id: "addresses", label: "Địa chỉ đã lưu", icon: MapPin },
  { id: "reviews", label: "Đánh giá đơn hàng", icon: Star },
];

const defaultTokens = {
  bg: "#fffafc",
  pageBg: "#fffafc",
  containerBg: "#ffffff",
  containerBorder: "#f7d0d3",
  containerShadow: "0 20px 60px rgba(247,163,169,0.12)",
  sectionBg: "#fffdfd",
  sectionBorder: "#f7d0d3",
  cardBg: "#ffffff",
  cardBorder: "#f7d0d3",
  cardShadow: "0 20px 60px rgba(247,163,169,0.08)",
  sidebarBg: "#fffdfd",
  sidebarItemBg: "#ffffff",
  sidebarItemBorder: "#f7d0d3",
  sidebarItemActiveBg: "#F7a3a9",
  sidebarItemActiveText: "#ffffff",
  accentColor: "#F7a3a9",
  accentBg: "#fff3f4",
  textPrimary: "#2d3748",
  textSecondary: "#6b7280",
  textMuted: "#6b7280",
  iconColor: "#F7a3a9",
  inputBg: "#ffffff",
  inputBorder: "#f7d0d3",
  inputText: "#2d3748",
  inputFocusBorder: "#F7a3a9",
  buttonBg: "#F7a3a9",
  buttonText: "#ffffff",
  buttonHoverBg: "#f08a91",
  dangerText: "#b91c1c",
  modalBg: "#ffffff",
  modalOverlay: "rgba(0,0,0,0.4)",
};

export default function AccountPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.accountPage ?? defaultTokens;

  const [profile, setProfile] = useState(initialProfile);
  const [activeSection, setActiveSection] = useState("profile");
  const [editor, setEditor] = useState({ field: null, value: "", error: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile({ ...initialProfile, ...parsed });
      } catch {
        setProfile(initialProfile);
      }
    } else {
      setProfile(initialProfile);
    }
  }, []);

  const avatarLabel = useMemo(() => {
    if (!profile?.name) return "U";
    const parts = profile.name.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }, [profile?.name]);

  const openEditor = (field) => {
    const current =
      field === "name" ? profile?.name || "" : profile?.[field] || "";
    setEditor({ field, value: current, error: "" });
  };

  const saveEditor = (e) => {
    e.preventDefault();
    if (!profile) return;
    if (editor.field === "name") {
      const next = editor.value.trim();
      if (next.length < 2) {
        setEditor((p) => ({ ...p, error: "Họ tên phải có ít nhất 2 ký tự." }));
        return;
      }
    }
    if (editor.field === "dateOfBirth") {
      if (!editor.value) {
        setEditor((p) => ({ ...p, error: "Vui lòng chọn ngày sinh." }));
        return;
      }
      const picked = new Date(editor.value);
      if (picked > new Date()) {
        setEditor((p) => ({
          ...p,
          error: "Ngày sinh không được lớn hơn ngày hôm nay.",
        }));
        return;
      }
    }
    if (editor.field === "gender") {
      const allowed = ["Nam", "Nữ", "Khác"];
      if (!allowed.includes(editor.value)) {
        setEditor((p) => ({ ...p, error: "Vui lòng chọn giới tính hợp lệ." }));
        return;
      }
    }

    const nextProfile = {
      ...profile,
      [editor.field]:
        editor.field === "name" ? editor.value.trim() : editor.value,
    };
    setProfile(nextProfile);
    if (typeof window !== "undefined")
      window.localStorage.setItem(
        ACCOUNT_STORAGE_KEY,
        JSON.stringify(nextProfile),
      );
    setEditor({ field: null, value: "", error: "" });
  };

  const handleLogout = () => {
    if (!confirm("Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?")) return;
    if (typeof window !== "undefined")
      window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
    router.push("/");
  };

  const pageStyle = { background: t.pageBg };
  const containerStyle = {
    background: t.containerBg,
    borderColor: t.containerBorder,
    borderStyle: "solid",
    boxShadow: t.containerShadow,
  };
  const sectionStyle = {
    background: t.sectionBg,
    borderColor: t.sectionBorder,
    boxShadow: t.cardShadow,
  };
  const cardStyle = { background: t.cardBg, borderColor: t.cardBorder };
  const badgeStyle = { background: t.accentBg, color: t.accentColor };
  const sidebarStyle = {
    background: t.sidebarBg,
    borderColor: t.sidebarItemBorder,
    borderStyle: "solid",
  };
  const sidebarCardStyle = {
    background: t.cardBg,
    borderColor: t.sidebarItemBorder,
    borderStyle: "solid",
    color: t.textSecondary,
  };
  const sidebarButtonActive = {
    background: t.sidebarItemActiveBg,
    color: t.sidebarItemActiveText,
  };
  const sidebarButtonInactive = {
    background: t.sidebarItemBg,
    color: t.textPrimary,
  };
  const inputStyle = {
    background: t.inputBg,
    borderColor: t.inputBorder,
    color: t.inputText,
  };
  const modalStyle = { background: t.modalBg, color: t.textPrimary };
  const modalOverlayStyle = { background: t.modalOverlay };

  const sidebarItems =
    mounted && profile?.isOwner
      ? [...menuItems, { id: "theme", label: "Theme website", icon: Sparkles }]
      : menuItems;

  const renderContent = () => {
    if (activeSection === "theme") return <ThemeSettings />;

    if (activeSection === "orders") {
      return (
        <div className="space-y-4">
          <div className="rounded-3xl p-5" style={sectionStyle}>
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-semibold uppercase tracking-[0.25em]"
                  style={{ color: t.accentColor }}
                >
                  Lịch sử đơn hàng
                </p>
                <h2
                  className="mt-1 text-xl font-semibold"
                  style={{ color: t.textPrimary }}
                >
                  Đơn hàng gần nhất
                </h2>
              </div>
              <div className="rounded-full p-2" style={badgeStyle}>
                <Package size={18} />
              </div>
            </div>
            <div
              className="mt-4 rounded-2xl border-dashed p-4 text-sm"
              style={{
                ...cardStyle,
                borderStyle: "dashed",
                color: t.textSecondary,
              }}
            >
              <p className="font-semibold" style={{ color: t.textPrimary }}>
                #UMBO-1024
              </p>
              <p className="mt-2" style={{ color: t.textSecondary }}>
                Trạng thái: Đã giao hàng
              </p>
              <p className="mt-1" style={{ color: t.textSecondary }}>
                Tổng tiền: 560.000đ
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === "addresses") {
      return (
        <div className="space-y-4">
          <div className="rounded-3xl p-5" style={sectionStyle}>
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-semibold uppercase tracking-[0.25em]"
                  style={{ color: t.accentColor }}
                >
                  Địa chỉ đã lưu
                </p>
                <h2
                  className="mt-1 text-xl font-semibold"
                  style={{ color: t.textPrimary }}
                >
                  Sổ địa chỉ của bạn
                </h2>
              </div>
              <div className="rounded-full p-2" style={badgeStyle}>
                <MapPin size={18} />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-[20px] p-4 text-sm" style={cardStyle}>
                <p className="font-semibold" style={{ color: t.textPrimary }}>
                  Nhà riêng
                </p>
                <p className="mt-1" style={{ color: t.textSecondary }}>
                  123 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM
                </p>
              </div>
              <div className="rounded-[20px] p-4 text-sm" style={cardStyle}>
                <p className="font-semibold" style={{ color: t.textPrimary }}>
                  Công ty
                </p>
                <p className="mt-1" style={{ color: t.textSecondary }}>
                  88 Lê Văn Việt, Phường Tăng Nhơn Phú A, Quận 9, TP.HCM
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === "reviews") {
      return (
        <div className="space-y-4">
          <div className="rounded-3xl p-5" style={sectionStyle}>
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-semibold uppercase tracking-[0.25em]"
                  style={{ color: t.accentColor }}
                >
                  Đánh giá đơn hàng
                </p>
                <h2
                  className="mt-1 text-xl font-semibold"
                  style={{ color: t.textPrimary }}
                >
                  Những đánh giá gần đây
                </h2>
              </div>
              <div className="rounded-full p-2" style={badgeStyle}>
                <Star size={18} />
              </div>
            </div>
            <div
              className="mt-4 rounded-2xl p-4 text-sm"
              style={{ ...cardStyle, color: t.textSecondary }}
            >
              <p className="font-semibold" style={{ color: t.textPrimary }}>
                Sữa hạt dinh dưỡng
              </p>
              <p className="mt-2" style={{ color: t.textSecondary }}>
                Đánh giá: 5/5 sao • “Sản phẩm thơm, giao hàng nhanh.”
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-3xl p-5 sm:p-6" style={sectionStyle}>
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: t.accentColor }}
            >
              Thông tin cá nhân
            </p>
            <h2
              className="mt-1 text-xl font-semibold"
              style={{ color: t.textPrimary }}
            >
              Cập nhật thông tin của bạn
            </h2>
          </div>
          <div className="rounded-full p-2" style={badgeStyle}>
            <ShieldCheck size={18} />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div
            className="flex items-center justify-between rounded-[18px] px-4 py-4"
            style={cardStyle}
          >
            <div>
              <p className="text-sm" style={{ color: t.textSecondary }}>
                Họ và tên
              </p>
              <p
                className="mt-1 font-semibold"
                style={{ color: t.textPrimary }}
              >
                {profile.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEditor("name")}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: t.accentColor }}
            >
              Chỉnh sửa <ChevronRight size={16} />
            </button>
          </div>

          <div
            className="flex items-center justify-between rounded-[18px] px-4 py-4"
            style={cardStyle}
          >
            <div>
              <p className="text-sm" style={{ color: t.textSecondary }}>
                Ngày sinh
              </p>
              <p
                className="mt-1 font-semibold"
                style={{ color: t.textPrimary }}
              >
                {profile.dateOfBirth || "Chưa cập nhật"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEditor("dateOfBirth")}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: t.accentColor }}
            >
              Chỉnh sửa <ChevronRight size={16} />
            </button>
          </div>

          <div
            className="flex items-center justify-between rounded-[18px] px-4 py-4"
            style={cardStyle}
          >
            <div>
              <p className="text-sm" style={{ color: t.textSecondary }}>
                Giới tính
              </p>
              <p
                className="mt-1 font-semibold"
                style={{ color: t.textPrimary }}
              >
                {profile.gender}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEditor("gender")}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: t.accentColor }}
            >
              Chỉnh sửa <ChevronRight size={16} />
            </button>
          </div>

          <div
            className="flex items-center justify-between rounded-[18px] px-4 py-4"
            style={cardStyle}
          >
            <div>
              <p className="text-sm" style={{ color: t.textSecondary }}>
                Số điện thoại
              </p>
              <p
                className="mt-1 font-semibold"
                style={{ color: t.textPrimary }}
              >
                {profile.phone}
              </p>
            </div>
            <div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: t.accentColor }}
            >
              <Lock size={16} /> Bảo mật
            </div>
          </div>

          <div
            className="flex items-center justify-between rounded-[18px] px-4 py-4"
            style={cardStyle}
          >
            <div>
              <p className="text-sm" style={{ color: t.textSecondary }}>
                Email
              </p>
              <p
                className="mt-1 font-semibold"
                style={{ color: t.textPrimary }}
              >
                {profile.email}
              </p>
            </div>
            <div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: t.accentColor }}
            >
              <Lock size={16} /> Bảo mật
            </div>
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={handleLogout}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: t.accentBg,
                borderColor: t.sidebarItemBorder,
                borderStyle: "solid",
                color: t.accentColor,
              }}
            >
              <LogOut size={16} /> Đăng xuất
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8" style={pageStyle}>
      <div
        className="mx-auto max-w-6xl rounded-4xl p-4 sm:p-6 lg:p-8"
        style={containerStyle}
      >
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: t.accentColor }}
            >
              Tài khoản của tôi
            </p>
            <h1
              className="mt-1 text-2xl font-bold"
              style={{ color: t.textPrimary }}
            >
              Quản lý tài khoản
            </h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {mounted && profile?.isOwner ? (
              <button
                type="button"
                onClick={() => setActiveSection("theme")}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition"
                style={{ background: t.accentColor, color: t.buttonText }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = t.buttonHoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = t.accentColor)
                }
              >
                <Sparkles size={16} /> Đổi giao diện
              </button>
            ) : null}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm"
              style={badgeStyle}
            >
              <Sparkles size={16} />
              <span>Ưu tiên trải nghiệm cá nhân hóa</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside
            className="rounded-[28px] border border-[#f7d0d3] p-4 sm:p-5"
            style={sidebarStyle}
          >
            <div
              className="rounded-3xl p-4"
              style={{ background: t.sectionBg }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white"
                  style={{ background: t.accentColor }}
                >
                  {avatarLabel}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: t.textPrimary }}>
                    {profile.name}
                  </p>
                  <p className="text-sm" style={{ color: t.textSecondary }}>
                    {profile.email}
                  </p>
                </div>
              </div>
              <div
                className="mt-4 rounded-2xl px-3 py-2 text-sm"
                style={sidebarCardStyle}
              >
                {profile.email} | {profile.phone}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 lg:flex-col">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className="flex items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-medium transition"
                    style={{
                      ...(active ? sidebarButtonActive : sidebarButtonInactive),
                      boxShadow: active
                        ? "0 8px 24px rgba(0,0,0,0.12)"
                        : undefined,
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={16} />
                      {item.label}
                    </span>
                    <ChevronRight size={16} />
                  </button>
                );
              })}
            </div>

            <div
              className="mt-6 rounded-3xl p-4 text-sm"
              style={sidebarCardStyle}
            >
              <p className="font-semibold" style={{ color: t.textPrimary }}>
                Hỗ trợ khách hàng
              </p>
              <a
                href="mailto:support@umbo.vn"
                className="mt-2 flex items-center gap-2"
                style={{ color: t.accentColor }}
              >
                <Mail size={15} /> support@umbo.vn
              </a>
              <a
                href="https://umbo-milk.vn"
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center gap-2"
                style={{ color: t.accentColor }}
              >
                <ShieldCheck size={15} /> umbo-milk.vn
              </a>
            </div>
          </aside>

          <section className="min-w-0">{renderContent()}</section>
        </div>
      </div>

      {editor.field ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={modalOverlayStyle}
        >
          <div
            className="w-full max-w-md rounded-3xl p-5 shadow-2xl"
            style={modalStyle}
          >
            <div className="flex items-center justify-between">
              <h3
                className="text-lg font-semibold"
                style={{ color: t.textPrimary }}
              >
                {editor.field === "name"
                  ? "Chỉnh sửa họ tên"
                  : editor.field === "dateOfBirth"
                    ? "Chỉnh sửa ngày sinh"
                    : "Chỉnh sửa giới tính"}
              </h3>
              <button
                type="button"
                onClick={() => setEditor({ field: null, value: "", error: "" })}
                className="text-sm"
                style={{ color: t.textSecondary }}
              >
                Đóng
              </button>
            </div>

            <form onSubmit={saveEditor} className="mt-4 space-y-4">
              {editor.field === "name" ? (
                <input
                  type="text"
                  value={editor.value}
                  onChange={(e) =>
                    setEditor((p) => ({ ...p, value: e.target.value }))
                  }
                  className="w-full rounded-2xl px-3 py-3 text-sm outline-none"
                  style={inputStyle}
                  placeholder="Nhập họ tên"
                />
              ) : null}

              {editor.field === "dateOfBirth" ? (
                <input
                  type="date"
                  value={editor.value}
                  onChange={(e) =>
                    setEditor((p) => ({ ...p, value: e.target.value }))
                  }
                  className="w-full rounded-2xl px-3 py-3 text-sm outline-none"
                  style={inputStyle}
                />
              ) : null}

              {editor.field === "gender" ? (
                <select
                  value={editor.value}
                  onChange={(e) =>
                    setEditor((p) => ({ ...p, value: e.target.value }))
                  }
                  className="w-full rounded-2xl px-3 py-3 text-sm outline-none"
                  style={inputStyle}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              ) : null}

              {editor.error ? (
                <p className="text-sm" style={{ color: t.dangerText }}>
                  {editor.error}
                </p>
              ) : null}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setEditor({ field: null, value: "", error: "" })
                  }
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: t.inputBorder,
                    color: t.textSecondary,
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-full px-4 py-2 text-sm font-semibold"
                  style={{ background: t.buttonBg, color: t.buttonText }}
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
