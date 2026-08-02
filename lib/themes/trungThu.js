import midAutumnHeaderTheme from "./mid-autumn/headerTheme";
import midAutumnSectionTheme from "./mid-autumn/sectionTheme";

const trungThu = {
  id: "trung-thu",
  name: "Trung Thu",
  headerTheme: midAutumnHeaderTheme,
  sectionTheme: midAutumnSectionTheme,
  preview: {
    background: "#8B0000",
    accent: "#FFE4A0",
    secondary: "#c0392b",
    text: "#FFFFFF",
  },
  values: {
    primary: "#FFE4A0",
    secondary: "#c0392b",
    background: "#8B0000",
    sectionBackground: "#7B0000",
    cardBackground: "#4a0808",
    cardBorder: "rgba(255,228,160,0.25)",
    text: "#FFFFFF",
    textSecondary: "#FFE4A0",
    textMuted: "#FFDDC0",
    borderRadius: "24px",
    shadow: "0 20px 60px rgba(0,0,0,0.45)",
    fontFamily: "var(--font-koni), sans-serif",
  },
  buttonStyle: {
    background: "#FFE4A0",
    text: "#7B0000",
    border: "none",
  },
  cardStyle: {
    background: "#4a0808",
    border: "1px solid rgba(255,228,160,0.25)",
    shadow: "0 12px 40px rgba(0,0,0,0.4)",
  },
};

export default trungThu;
