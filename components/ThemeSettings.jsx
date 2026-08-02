"use client";
import { useState } from "react";
import { themes } from "@/lib/themes";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeSettings() {
  const { currentThemeId, applyTheme } = useTheme();
  const [previewTheme, setPreviewTheme] = useState(null);
  const [confirmTheme, setConfirmTheme] = useState(null);

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-theme bg-theme-section p-6 shadow-theme">
        <div className="flex items-start gap-4 sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-theme-primary">
              Theme Presets
            </p>
            <h2 className="mt-2 text-2xl font-bold text-theme">
              Chọn giao diện cho toàn bộ website
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-theme-secondary">
              Mỗi Theme là cấu hình sẵn, lưu vào localStorage và được áp dụng ngay khi bạn bấm Áp dụng.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {themes.map((theme) => {
          const selected = theme.id === currentThemeId;
          return (
            <article
              key={theme.id}
              className={`rounded-4xl border border-theme bg-theme-card p-5 shadow-theme transition duration-300 ${
                selected ? "ring-2 ring-theme-primary/30" : "hover:-translate-y-1"
              }`}
            >
              <div className="overflow-hidden rounded-3xl border border-theme shadow-inner">
                <div
                  className="h-32"
                  style={{
                    background: `linear-gradient(135deg, ${theme.preview.background} 0%, ${theme.preview.accent} 40%, ${theme.preview.secondary} 100%)`,
                  }}
                />
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-theme">{theme.name}</h3>
                  <p className="mt-1 text-sm text-theme-secondary">
                    Theme preset đã được cấu hình sẵn.
                  </p>
                </div>
                {selected ? (
                  <span className="rounded-full bg-theme-primary px-3 py-1 text-xs font-semibold text-theme-button-text">
                    Đang sử dụng
                  </span>
                ) : null}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewTheme(theme)}
                  className="inline-flex items-center justify-center rounded-full border border-theme px-4 py-2 text-sm font-semibold text-theme transition hover:bg-theme-primary/10"
                >
                  Xem chi tiết
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmTheme(theme)}
                  disabled={selected}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
                    selected
                      ? "bg-theme-primary/15 text-theme-primary border border-theme-primary cursor-default"
                      : "bg-theme-primary text-theme-button"
                  }`}
                >
                  Áp dụng
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {confirmTheme ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-theme">Đổi giao diện?</h3>
            <p className="mt-2 text-sm text-theme-secondary">
              Bạn sắp chuyển sang theme <span className="font-semibold text-theme">{confirmTheme.name}</span>. Toàn bộ website sẽ được cập nhật ngay lập tức.
            </p>
            <div
              className="mt-4 h-20 w-full rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${confirmTheme.preview.background} 0%, ${confirmTheme.preview.accent} 40%, ${confirmTheme.preview.secondary} 100%)`,
              }}
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmTheme(null)}
                className="rounded-full border border-theme px-4 py-2 text-sm font-semibold text-theme"
              >
                Huỷ
              </button>
              <button
                type="button"
                onClick={() => { applyTheme(confirmTheme.id); setConfirmTheme(null); }}
                className="rounded-full bg-theme-primary px-4 py-2 text-sm font-semibold text-theme-button"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {previewTheme ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-theme">{previewTheme.name}</h3>
                <p className="mt-2 text-sm text-theme-secondary">
                  Xem nhanh cấu hình chi tiết của theme.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTheme(null)}
                className="rounded-full bg-theme-section px-3 py-2 text-sm font-semibold text-theme"
              >
                Đóng
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-theme bg-theme-section p-4 sm:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-theme-secondary">
                  Bảng màu
                </p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[
                    { label: "Secondary", value: previewTheme.values.secondary },
                    { label: "Background", value: previewTheme.values.background },
                    { label: "Text", value: previewTheme.values.text },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-3xl border border-theme p-3 bg-white">
                      <div className="h-12 w-full rounded-2xl" style={{ background: value }} />
                      <p className="mt-2 text-xs font-semibold text-theme">{label}</p>
                      <p className="text-[11px] text-theme-secondary">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-theme bg-theme-section p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-theme-secondary">
                  Kiểu nút
                </p>
                <div className="mt-3 rounded-3xl border border-theme bg-white p-4">
                  <p className="text-xs text-theme-secondary">Button</p>
                  <div className="mt-3 inline-flex items-center gap-3">
                    <span className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold text-white" style={{ background: previewTheme.buttonStyle.background }}>
                      Example
                    </span>
                    <span className="text-xs text-theme-secondary">Text: {previewTheme.buttonStyle.text}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-theme bg-theme-section p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-theme-secondary">
                  Kiểu card
                </p>
                <div className="mt-3 rounded-3xl bg-white p-4 shadow-sm" style={{ boxShadow: previewTheme.cardStyle.shadow, border: previewTheme.cardStyle.border }}>
                  <p className="text-sm font-semibold text-theme">Card</p>
                  <p className="mt-2 text-xs text-theme-secondary">Radius: {previewTheme.values.borderRadius}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
