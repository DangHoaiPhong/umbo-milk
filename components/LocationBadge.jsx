"use client";

/**
 * LocationBadge — hiển thị tồn kho theo chi nhánh.
 *
 * Props:
 *   locations : Array<{id, name, quantity}>  — từ product.locations
 *   mode      : "card" | "detail"            — card = compact, detail = đầy đủ
 *   textColor : string (optional)
 *   accentColor: string (optional)
 */
export default function LocationBadge({
  locations = [],
  mode = "card",
  textColor = "#6b7280",
  accentColor = "#F7a3a9",
}) {
  if (!locations.length) return null;

  const inStock = locations.filter((l) => l.quantity > 0);
  const outOfStock = locations.filter((l) => l.quantity === 0);

  // ── CARD mode: compact badge ──────────────────────────────────────────────
  if (mode === "card") {
    if (!inStock.length) {
      return (
        <p className="text-xs font-semibold mt-1" style={{ color: "#ef4444" }}>
          Hết hàng tại tất cả chi nhánh
        </p>
      );
    }

    return (
      <div className="mt-1.5 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: accentColor }}>
          Có tại:
        </p>
        {inStock.map((loc) => (
          <p key={loc.id} className="text-[11px] leading-snug" style={{ color: textColor }}>
            • {loc.name}{" "}
            <span className="font-semibold" style={{ color: accentColor }}>
              ({loc.quantity})
            </span>
          </p>
        ))}
      </div>
    );
  }

  // ── DETAIL mode: đầy đủ ───────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-bold" style={{ color: textColor }}>
        Tồn kho theo chi nhánh
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[...inStock, ...outOfStock].map((loc) => (
          <div
            key={loc.id}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm"
            style={{
              background: loc.quantity > 0 ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)",
              border: `1px solid ${loc.quantity > 0 ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.15)"}`,
            }}
          >
            <span style={{ color: textColor }}>{loc.name}</span>
            {loc.quantity > 0 ? (
              <span className="font-bold text-xs" style={{ color: "#16a34a" }}>
                {loc.quantity} sản phẩm
              </span>
            ) : (
              <span className="font-semibold text-xs" style={{ color: "#ef4444" }}>
                Hết hàng
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
