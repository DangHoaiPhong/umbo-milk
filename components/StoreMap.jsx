"use client";
import { useState } from "react";

const BRANCHES = [
  {
    id: 1,
    name: "Chi nhánh Quận 1",
    address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    lat: 10.7769,
    lng: 106.7009,
  },
  {
    id: 2,
    name: "Chi nhánh Quận 3",
    address: "45 Võ Văn Tần, Phường 6, Quận 3, TP.HCM",
    lat: 10.7756,
    lng: 106.6877,
  },
  {
    id: 3,
    name: "Chi nhánh Bình Thạnh",
    address: "78 Đinh Bộ Lĩnh, Phường 26, Bình Thạnh, TP.HCM",
    lat: 10.8031,
    lng: 106.7143,
  },
  {
    id: 4,
    name: "Chi nhánh Gò Vấp",
    address: "210 Quang Trung, Phường 10, Gò Vấp, TP.HCM",
    lat: 10.8384,
    lng: 106.6652,
  },
];

export default function StoreMap() {
  const [selected, setSelected] = useState(BRANCHES[0].id);
  const activeBranch = BRANCHES.find((b) => b.id === selected);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${activeBranch.lat},${activeBranch.lng}`;

  return (
    <div className="flex flex-col sm:flex-row h-full min-h-[400px]">
      {/* Map placeholder */}
      <div className="relative sm:w-[60%] w-full h-64 sm:h-auto">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 left-2 z-10 bg-white text-[#F7a3a9] text-xs font-bold px-3 py-1 rounded-full shadow hover:bg-pink-50 transition"
        >
          Open in Maps ↗
        </a>
        <div className="w-full h-full min-h-[260px] bg-gradient-to-br from-pink-50 to-rose-100 flex flex-col items-center justify-center gap-3 rounded-l-xl">
          <span className="text-5xl">🗺️</span>
          <p className="text-sm font-bold text-[#F7a3a9]">Google Maps</p>
          <div className="text-center px-6">
            <p className="text-xs text-[#F7a3a9] font-bold">
              {activeBranch.name}
            </p>
            <p className="text-[11px] text-[#F7a3a9] mt-1">
              {activeBranch.address}
            </p>
            <p className="text-[10px] text-[#F7a3a9] mt-2">
              {activeBranch.lat}, {activeBranch.lng}
            </p>
          </div>
          <p className="text-[10px] text-[#F7a3a9] text-center px-4">
            Bản đồ sẽ hiển thị sau khi cấu hình API key
          </p>
        </div>
      </div>

      {/* Branch list */}
      <div className="sm:w-[40%] w-full flex flex-col p-3 gap-2 overflow-y-auto max-h-[420px]">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
          Chọn chi nhánh
        </p>
        {BRANCHES.map((b) => {
          const active = selected === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setSelected(b.id)}
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
