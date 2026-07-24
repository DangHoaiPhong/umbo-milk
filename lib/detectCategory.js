function normalize(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
}

const CATEGORY_RULES = [
  {
    category: "combo",
    match: (t) => t.includes("COMBO"),
  },
  {
    category: "vang-sua",
    match: (t) => t.includes("VANG SUA"),
  },
  {
    category: "do-an-vat",
    keywords: ["THANH BO", "CHOCO NOLA"],
    match(t) { return this.keywords.some((k) => t.includes(k)); },
  },
  {
    category: "sua",
    match: (t) => t.includes("SUA BO") || /^BO /.test(t),
  },
  {
    category: "phu-kien",
    keywords: ["TUI", "THUNG", "BANG KEO"],
    match(t) { return this.keywords.some((k) => t.includes(k)); },
  },
];

export function detectCategory(title) {
  const normalized = normalize(title);
  const rule = CATEGORY_RULES.find((r) => r.match(normalized));
  return rule?.category ?? "khac";
}
