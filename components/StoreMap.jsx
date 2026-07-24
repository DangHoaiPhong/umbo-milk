"use client";
import { useState } from "react";

const BRANCHES = [
  {
    id: 1,
    name: "Chi nhánh 1",
    address: "111 Tôn Đản, Quận 4, TP.HCM",
  },
  {
    id: 2,
    name: "Chi nhánh 2",
    address: "120 Hoàng Diệu 2, Quận Thủ Đức, TP.HCM",
  },
  {
    id: 3,
    name: "Chi nhánh 3",
    address: "261 Tô Hiến Thành, Quận 10, TP.HCM",
  },
  {
    id: 4,
    name: "Chi nhánh 4",
    address: "130 Vạn Kiếp, Quận Bình Thạnh, TP.HCM",
  },
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
  const store = BRANCHES.find((b) => b.id === selectedId) ?? BRANCHES[0];
  const embedUrl = getEmbedUrl(store);

  return (
    <div className="flex flex-col sm:flex-row h-full min-h-[400px]">
      {/* Map */}
      <div className="relative sm:w-[60%] w-full h-64 sm:h-auto">
        <a
          href={getOpenUrl(store)}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 left-2 z-10 bg-white text-[#F7a3a9] text-xs font-bold px-3 py-1 rounded-full shadow hover:bg-pink-50 transition"
        >
          Open in Maps ↗
        </a>
        {embedUrl ? (
          <iframe
            key={store.id}
            src={embedUrl}
            className="w-full h-full min-h-[260px] rounded-l-xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={store.name}
          />
        ) : (
          <div className="w-full h-full min-h-[260px] bg-pink-50 flex items-center justify-center rounded-l-xl">
            <p className="text-sm text-[#F7a3a9]">Không có thông tin địa chỉ</p>
          </div>
        )}
      </div>

      {/* Branch list */}
      <div className="sm:w-[40%] w-full flex flex-col p-3 gap-2 overflow-y-auto max-h-[420px]">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
          Chọn chi nhánh
        </p>
        {BRANCHES.map((b) => {
          const active = selectedId === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedId(b.id)}
              className={`text-left rounded-xl p-3 border transition cursor-pointer ${
                active
                  ? "border-[#F7a3a9] bg-pink-50"
                  : "border-gray-100 bg-white hover:border-pink-200"
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    active ? "border-[#F7a3a9]" : "border-gray-300"
                  }`}
                >
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-[#F7a3a9] block" />
                  )}
                </span>
                <div>
                  <p className="font-bold text-sm text-gray-800">{b.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 flex gap-1">
                    <span>📍</span>
                    <span>{b.address}</span>
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
