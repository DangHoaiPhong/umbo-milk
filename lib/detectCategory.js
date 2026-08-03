function normalizeTitle(title) {
  return String(title ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
}

const CATEGORY_RULES = [
  { category: "combo", match: (value) => value.includes("COMBO") },
  { category: "vang-sua", match: (value) => value.includes("VANG SUA") },
  {
    category: "do-an-vat",
    keywords: ["THANH BO", "CHOCO NOLA"],
    match(value) {
      return this.keywords.some((keyword) => value.includes(keyword));
    },
  },
  {
    category: "sua",
    match: (value) => value.includes("SUA BO") || /^BO /.test(value),
  },
  {
    category: "phu-kien",
    keywords: ["TUI", "THUNG", "BANG KEO"],
    match(value) {
      return this.keywords.some((keyword) => value.includes(keyword));
    },
  },
];

export function detectCategory(title) {
  const normalizedTitle = normalizeTitle(title);
  const matchedRule = CATEGORY_RULES.find((rule) =>
    rule.match(normalizedTitle),
  );

  return matchedRule?.category ?? "khac";
}
