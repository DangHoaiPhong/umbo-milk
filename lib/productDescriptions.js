function stripHtml(text = "") {
  return String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDescription(text) {
  const cleaned = stripHtml(text);
  if (!cleaned) return "";
  if (cleaned.length > 180) {
    return `${cleaned.slice(0, 177).trimEnd()}...`;
  }
  return cleaned;
}

function isMeaningfulDescription(text) {
  const cleaned = normalizeDescription(text);
  if (!cleaned) return false;
  if (cleaned.length < 18) return false;
  const lower = cleaned.toLowerCase();
  return !/^(sản phẩm|combo ưu đãi|mô tả|thông tin sản phẩm)/.test(lower);
}

function generateProductDescription(name = "") {
  const normalizedName = (name || "").toLowerCase();

  if (/(dâu|strawberry|dâu tây)/i.test(normalizedName)) {
    return "Hương vị chua ngọt dịu dàng, mang đến cảm giác tươi mới và dễ chịu khi thưởng thức.";
  }
  if (/(banana|chuối)/i.test(normalizedName)) {
    return "Vị ngọt thơm tự nhiên và cảm giác mềm mịn khiến mỗi ngụm đều rất dễ yêu.";
  }
  if (/(matcha|tra xanh|trà xanh|tea)/i.test(normalizedName)) {
    return "Hương trà xanh thơm nhẹ, kết hợp cùng vị sữa béo dịu để tạo nên trải nghiệm thanh và cân bằng.";
  }
  if (/(cà phê|coffee|coffee)/i.test(normalizedName)) {
    return "Hương cà phê đậm đà quyện cùng vị sữa mềm mịn, tạo nên một món uống vừa thơm vừa thư giãn.";
  }
  if (/(xoài|mango)/i.test(normalizedName)) {
    return "Vị xoài ngọt thanh và hương thơm tự nhiên mang đến cảm giác dễ chịu, phù hợp cho những lúc cần thư giãn.";
  }
  if (/(vani|vanilla)/i.test(normalizedName)) {
    return "Vị vani béo mềm, dịu nhẹ và thơm quyến rũ, giúp mỗi lần thưởng thức trở nên dễ chịu hơn.";
  }
  if (/(socola|choco|chocolate)/i.test(normalizedName)) {
    return "Hương chocolate thơm đậm kết hợp cùng vị sữa béo dịu, tạo nên một món uống ngọt ngào nhưng vẫn cân bằng.";
  }
  if (/(hạnh nhân|almond|nut)/i.test(normalizedName)) {
    return "Vị đậm đà nhẹ nhàng và độ bùi thơm từ hạnh nhân làm nên nét riêng rất cuốn hút.";
  }
  if (/(dừa|coconut)/i.test(normalizedName)) {
    return "Hương dừa thơm dịu và vị béo mịn mang lại cảm giác thư giãn, dễ uống và dễ yêu.";
  }
  if (/trà|tea/i.test(normalizedName)) {
    return "Hương trà đậm và kéo dài, kết hợp cùng lớp sữa mềm mịn tạo nên một trải nghiệm vừa cân bằng vừa dễ thưởng thức.";
  }
  if (/vang|váng/i.test(normalizedName)) {
    return "Mềm mịn và béo ngậy, mang đến cảm giác thưởng thức thư giãn và đáng yêu mỗi lần dùng.";
  }
  if (/(combo|set|hộp)/i.test(normalizedName)) {
    return "Một lựa chọn tiện lợi cho những lần thưởng thức cùng bạn bè hoặc chia sẻ trong gia đình.";
  }
  if (/(không đường|ít đường|low sugar|sugar free)/i.test(normalizedName)) {
    return "Vị thanh nhẹ và dễ uống, phù hợp cho những ai thích một món uống vừa thơm vừa cân bằng.";
  }
  if (/(tươi nguyên chất|nguyên chất)/i.test(normalizedName)) {
    return "Sữa tươi thơm dịu, giữ nguyên cảm giác tự nhiên và dễ chịu trong từng ngụm uống.";
  }
  if (/(thanh trùng)/i.test(normalizedName)) {
    return "Mùi vị dịu và dễ uống, phù hợp cho những ngày cần một món sữa vừa thơm vừa tiện lợi.";
  }

  return "Một lựa chọn dễ uống với hương vị dịu nhẹ và cảm giác thư giãn phù hợp cho nhiều nhu cầu thưởng thức.";
}

export function getProductDescription(product = {}) {
  const directDescription = normalizeDescription(product?.description || "");
  if (isMeaningfulDescription(directDescription)) {
    return directDescription;
  }

  const bodyHtmlDescription = normalizeDescription(product?.bodyHtml || "");
  if (isMeaningfulDescription(bodyHtmlDescription)) {
    return bodyHtmlDescription;
  }

  return generateProductDescription(
    product?.name || product?.title || product?.product_name || "",
  );
}
