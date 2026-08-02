"use client";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const defaultTokens = {
  openMapBg: "white",
  openMapColor: "#F7a3a9",
  openMapHoverBg: "#fff0f3",
  emptyBg: "#fff0f3",
  emptyTextColor: "#F7a3a9",
  listLabelColor: "#6b7280",
  branchActiveBorder: "#F7a3a9",
  branchActiveBg: "#fff0f3",
  branchInactiveBorder: "#f3f4f6",
  branchInactiveBg: "white",
  branchInactiveHoverBorder: "#fbc8d0",
  radioActiveBorder: "#F7a3a9",
  radioInactiveBorder: "#d1d5db",
  radioDotBg: "#F7a3a9",
  branchNameColor: "#1f2937",
  branchAddressColor: "#6b7280",
};

const BRANCHES = [
  { id: 1, name: "Chi nhánh 1", address: "111 Tôn Đản, Quận 4, TP.HCM" },
  { id: 2, name: "Chi nhánh 2", address: "120 Hoàng Diệu 2, Quận Thủ Đức, TP.HCM" },
  { id: 3, name: "Chi nhánh 3", address: "261 Tô Hiến Thành, Quận 10, TP.HCM" },
  { id: 4, name: "Chi nhánh 4", address: "130 Vạn Kiếp, Quận Bình Thạnh, TP.HCM" },
];

function getEmbedUrl(branch) {
  if (branch.lat && branch.lng)
    return `https://www.google.com/maps?q=${branch.lat},${branch.lng}&output=embed`;
  if (branch.address)
    return `https://www.google.com/maps?q=${encodeURIComponent(branch.address)}&output=embed`;
  return null;
}

function getOpenUrl(branch) {
  if (branch.lat && branch.lng)
    return `https://www.google.com/maps?q=${branch.lat},${branch.lng}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(branch.address)}`;
}

export default function StoreMap() {
  const [selectedId, setSelectedId] = useState(BRANCHES[0].id);
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.storeMap ?? defaultTokens;

  const store = BRANCHES.find((b) => b.id === selectedId) ?? BRANCHES[0];
  const embedUrl = getEmbedUrl(store);

  return (
    <div className="flex flex-col sm:flex-row h-full min-h-[400px]">
      {/* Map */}
      <div className="relative sm:w-[60%] w-full h-64 sm:h-auto">
        <a href={getOpenUrl(store)} target="_blank" rel="noopener noreferrer"
          className="absolute top-2 left-2 z-10 text-xs font-bold px-3 py-1 rounded-full shadow transition"
          style={{ background: t.openMapBg, color: t.openMapColor }}
          onMouseEnter={(e) => { e.currentTarget.style.background = t.openMapHoverBg; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = t.openMapBg; }}>
          Open in Maps ↗
        </a>
        {embedUrl ? (
          <iframe key={store.id} src={embedUrl}
            className="w-full h-full min-h-[260px] rounded-l-xl border-0"
            loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={store.name} />
        ) : (
          <div className="w-full h-full min-h-[260px] flex items-center justify-center rounded-l-xl"
            style={{ background: t.emptyBg }}>
            <p className="text-sm" style={{ color: t.emptyTextColor }}>Không có thông tin địa chỉ</p>
          </div>
        )}
      </div>

      {/* Branch list */}
      <div className="sm:w-[40%] w-full flex flex-col p-3 gap-2 overflow-y-auto max-h-[420px]">
        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: t.listLabelColor }}>
          Chọn chi nhánh
        </p>
        {BRANCHES.map((b) => {
          const active = selectedId === b.id;
          return (
            <button key={b.id} onClick={() => setSelectedId(b.id)}
              className="text-left rounded-xl p-3 border transition cursor-pointer"
              style={{
                borderColor: active ? t.branchActiveBorder : t.branchInactiveBorder,
                background: active ? t.branchActiveBg : t.branchInactiveBg,
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = t.branchInactiveHoverBorder; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = t.branchInactiveBorder; }}>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                  style={{ borderColor: active ? t.radioActiveBorder : t.radioInactiveBorder }}>
                  {active && <span className="w-2 h-2 rounded-full block" style={{ background: t.radioDotBg }} />}
                </span>
                <div>
                  <p className="font-bold text-sm" style={{ color: t.branchNameColor }}>{b.name}</p>
                  <p className="text-xs mt-0.5 flex gap-1" style={{ color: t.branchAddressColor }}>
                    <span>📍</span><span>{b.address}</span>
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
