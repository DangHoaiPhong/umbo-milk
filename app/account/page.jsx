"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  User,
} from "lucide-react";

const ACCOUNT_STORAGE_KEY = "umbo_account_profile";

const initialProfile = {
  name: "Khách hàng Umbo",
  email: "demo@umbo.vn",
  phone: "0909123456",
  dateOfBirth: "",
  gender: "Khác",
  password: "123456",
  isVip: true,
};

const menuItems = [
  {
    id: "profile",
    label: "Thông tin tài khoản",
    icon: User,
  },
  {
    id: "orders",
    label: "Lịch sử đơn hàng",
    icon: Package,
  },
  {
    id: "addresses",
    label: "Địa chỉ đã lưu",
    icon: MapPin,
  },
  {
    id: "reviews",
    label: "Đánh giá đơn hàng",
    icon: Star,
  },
];

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [editor, setEditor] = useState({ field: null, value: "", error: "" });

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
    const currentValue =
      field === "name" ? profile?.name || "" : profile?.[field] || "";
    setEditor({ field, value: currentValue, error: "" });
  };

  const saveEditor = (e) => {
    e.preventDefault();

    if (!profile) return;

    if (editor.field === "name") {
      const nextName = editor.value.trim();
      if (nextName.length < 2) {
        setEditor((prev) => ({
          ...prev,
          error: "Họ tên phải có ít nhất 2 ký tự.",
        }));
        return;
      }
    }

    if (editor.field === "dateOfBirth") {
      const selectedDate = editor.value;
      if (!selectedDate) {
        setEditor((prev) => ({ ...prev, error: "Vui lòng chọn ngày sinh." }));
        return;
      }
      const picked = new Date(selectedDate);
      const today = new Date();
      if (picked > today) {
        setEditor((prev) => ({
          ...prev,
          error: "Ngày sinh không được lớn hơn ngày hôm nay.",
        }));
        return;
      }
    }

    if (editor.field === "gender") {
      const allowed = ["Nam", "Nữ", "Khác"];
      if (!allowed.includes(editor.value)) {
        setEditor((prev) => ({
          ...prev,
          error: "Vui lòng chọn giới tính hợp lệ.",
        }));
        return;
      }
    }

    const nextProfile = {
      ...profile,
      [editor.field]:
        editor.field === "name" ? editor.value.trim() : editor.value,
    };

    setProfile(nextProfile);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        ACCOUNT_STORAGE_KEY,
        JSON.stringify(nextProfile),
      );
    }
    setEditor({ field: null, value: "", error: "" });
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?",
    );
    if (!confirmed) return;

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
    }
    router.push("/");
  };

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#fffafc] px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-[#f7d0d3] bg-white p-8 text-center shadow-[0_20px_60px_rgba(247,163,169,0.1)]">
          <h1 className="text-2xl font-bold text-[#2d3748]">
            Bạn chưa đăng nhập
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Vui lòng đăng nhập để xem thông tin tài khoản.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F7a3a9] px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} /> Quay về trang chủ
          </Link>
        </div>
      </main>
    );
  }

  const renderContent = () => {
    if (activeSection === "orders") {
      return (
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#f7d0d3] bg-[#fffdfd] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F7a3a9]">
                  Lịch sử đơn hàng
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#2d3748]">
                  Đơn hàng gần nhất
                </h2>
              </div>
              <div className="rounded-full bg-[#fff3f4] p-2 text-[#F7a3a9]">
                <Package size={18} />
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-[#f7d0d3] bg-[#fff8f9] p-4 text-sm text-gray-600">
              <p className="font-semibold text-[#2d3748]">#UMBO-1024</p>
              <p className="mt-2">Trạng thái: Đã giao hàng</p>
              <p className="mt-1">Tổng tiền: 560.000đ</p>
            </div>
          </div>
        </div>
      );
    }

    if (activeSection === "addresses") {
      return (
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#f7d0d3] bg-[#fffdfd] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F7a3a9]">
                  Địa chỉ đã lưu
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#2d3748]">
                  Sổ địa chỉ của bạn
                </h2>
              </div>
              <div className="rounded-full bg-[#fff3f4] p-2 text-[#F7a3a9]">
                <MapPin size={18} />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-[20px] border border-[#f7d0d3] bg-white p-4 text-sm text-gray-600">
                <p className="font-semibold text-[#2d3748]">Nhà riêng</p>
                <p className="mt-1">
                  123 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM
                </p>
              </div>
              <div className="rounded-[20px] border border-[#f7d0d3] bg-white p-4 text-sm text-gray-600">
                <p className="font-semibold text-[#2d3748]">Công ty</p>
                <p className="mt-1">
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
          <div className="rounded-3xl border border-[#f7d0d3] bg-[#fffdfd] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F7a3a9]">
                  Đánh giá đơn hàng
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#2d3748]">
                  Những đánh giá gần đây
                </h2>
              </div>
              <div className="rounded-full bg-[#fff3f4] p-2 text-[#F7a3a9]">
                <Star size={18} />
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-[#f7d0d3] bg-[#fff8f9] p-4 text-sm text-gray-600">
              <p className="font-semibold text-[#2d3748]">Sữa hạt dinh dưỡng</p>
              <p className="mt-2">
                Đánh giá: 5/5 sao • “Sản phẩm thơm, giao hàng nhanh.”
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-3xl border border-[#f7d0d3] bg-[#fffdfd] p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F7a3a9]">
              Thông tin cá nhân
            </p>
            <h2 className="mt-1 text-xl font-semibold text-[#2d3748]">
              Cập nhật thông tin của bạn
            </h2>
          </div>
          <div className="rounded-full bg-[#fff3f4] p-2 text-[#F7a3a9]">
            <ShieldCheck size={18} />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between rounded-[18px] border border-[#f7d0d3] bg-white px-4 py-4">
            <div>
              <p className="text-sm text-gray-500">Họ và tên</p>
              <p className="mt-1 font-semibold text-[#2d3748]">
                {profile.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEditor("name")}
              className="flex items-center gap-2 text-sm font-medium text-[#F7a3a9]"
            >
              Chỉnh sửa <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-[18px] border border-[#f7d0d3] bg-white px-4 py-4">
            <div>
              <p className="text-sm text-gray-500">Ngày sinh</p>
              <p className="mt-1 font-semibold text-[#2d3748]">
                {profile.dateOfBirth || "Chưa cập nhật"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEditor("dateOfBirth")}
              className="flex items-center gap-2 text-sm font-medium text-[#F7a3a9]"
            >
              Chỉnh sửa <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-[18px] border border-[#f7d0d3] bg-white px-4 py-4">
            <div>
              <p className="text-sm text-gray-500">Giới tính</p>
              <p className="mt-1 font-semibold text-[#2d3748]">
                {profile.gender}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEditor("gender")}
              className="flex items-center gap-2 text-sm font-medium text-[#F7a3a9]"
            >
              Chỉnh sửa <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-[18px] border border-[#f7d0d3] bg-white px-4 py-4">
            <div>
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="mt-1 font-semibold text-[#2d3748]">
                {profile.phone}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#a35a62]">
              <Lock size={16} /> Bảo mật
            </div>
          </div>

          <div className="flex items-center justify-between rounded-[18px] border border-[#f7d0d3] bg-white px-4 py-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 font-semibold text-[#2d3748]">
                {profile.email}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#a35a62]">
              <Lock size={16} /> Bảo mật
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#f7d0d3] bg-[#fff3f4] px-4 py-2 text-sm font-semibold text-[#a35a62]"
        >
          <LogOut size={16} /> Đăng xuất
        </button>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#fffafc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-4xl border border-[#f7d0d3] bg-white p-4 shadow-[0_20px_60px_rgba(247,163,169,0.12)] sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F7a3a9]">
              Tài khoản của tôi
            </p>
            <h1 className="mt-1 text-2xl font-bold text-[#2d3748]">
              Quản lý tài khoản
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#fff3f4] px-3 py-2 text-sm text-[#a35a62]">
            <Sparkles size={16} />
            <span>Ưu tiên trải nghiệm cá nhân hóa</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-[#f7d0d3] bg-[#fffdfd] p-4 sm:p-5">
            <div className="rounded-3xl bg-linear-to-br from-[#fff3f4] to-[#ffffff] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7a3a9] text-lg font-semibold text-white">
                  {avatarLabel}
                </div>
                <div>
                  <p className="font-semibold text-[#2d3748]">{profile.name}</p>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-[#f7d0d3] bg-white px-3 py-2 text-sm text-gray-600">
                {profile.email} | {profile.phone}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 lg:flex-col">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${
                      active
                        ? "bg-[#F7a3a9] text-white shadow-sm"
                        : "bg-white text-[#2d3748] hover:bg-[#fff3f4]"
                    }`}
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

            <div className="mt-6 rounded-3xl border border-[#f7d0d3] bg-[#fff8f9] p-4 text-sm text-gray-600">
              <p className="font-semibold text-[#2d3748]">Hỗ trợ khách hàng</p>
              <a
                href="mailto:support@umbo.vn"
                className="mt-2 flex items-center gap-2 text-[#F7a3a9]"
              >
                <Mail size={15} /> support@umbo.vn
              </a>
              <a
                href="https://umbo-milk.vn"
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center gap-2 text-[#F7a3a9]"
              >
                <ShieldCheck size={15} /> umbo-milk.vn
              </a>
            </div>
          </aside>

          <section className="min-w-0">{renderContent()}</section>
        </div>
      </div>

      {editor.field ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#2d3748]">
                {editor.field === "name"
                  ? "Chỉnh sửa họ tên"
                  : editor.field === "dateOfBirth"
                    ? "Chỉnh sửa ngày sinh"
                    : "Chỉnh sửa giới tính"}
              </h3>
              <button
                type="button"
                onClick={() => setEditor({ field: null, value: "", error: "" })}
                className="text-sm text-gray-400"
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
                    setEditor((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#f7d0d3] px-3 py-3 text-sm outline-none focus:border-[#F7a3a9]"
                  placeholder="Nhập họ tên"
                />
              ) : null}

              {editor.field === "dateOfBirth" ? (
                <input
                  type="date"
                  value={editor.value}
                  onChange={(e) =>
                    setEditor((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#f7d0d3] px-3 py-3 text-sm outline-none focus:border-[#F7a3a9]"
                />
              ) : null}

              {editor.field === "gender" ? (
                <select
                  value={editor.value}
                  onChange={(e) =>
                    setEditor((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#f7d0d3] px-3 py-3 text-sm outline-none focus:border-[#F7a3a9]"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              ) : null}

              {editor.error ? (
                <p className="text-sm text-red-500">{editor.error}</p>
              ) : null}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setEditor({ field: null, value: "", error: "" })
                  }
                  className="rounded-full border border-[#f7d0d3] px-4 py-2 text-sm font-medium text-gray-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#F7a3a9] px-4 py-2 text-sm font-semibold text-white"
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
