"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_THEME_ID, getThemeById, themes } from "@/lib/themes";

const THEME_STORAGE_KEY = "umbo_theme_selected";
const ThemeContext = createContext({
  currentThemeId: DEFAULT_THEME_ID,
  theme: themes[0],
  applyTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [currentThemeId, setCurrentThemeId] = useState(DEFAULT_THEME_ID);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      setCurrentThemeId(stored);
    }
  }, []);

  const theme = useMemo(() => getThemeById(currentThemeId), [currentThemeId]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const values = theme?.values || {};
    root.style.setProperty("--theme-primary", values.primary || "#F7A3A9");
    root.style.setProperty("--theme-secondary", values.secondary || "#F08A91");
    root.style.setProperty(
      "--theme-background",
      values.background || "#FFF8FB",
    );
    root.style.setProperty(
      "--theme-section-background",
      values.sectionBackground || "#FFF3F4",
    );
    root.style.setProperty("--theme-text", values.text || "#2D3748");
    root.style.setProperty(
      "--theme-button-background",
      values.buttonBackground || "#F7A3A9",
    );
    root.style.setProperty(
      "--theme-button-text",
      values.buttonText || "#FFFFFF",
    );
    root.style.setProperty(
      "--theme-card-background",
      values.cardBackground || "#FFFFFF",
    );
    root.style.setProperty(
      "--theme-card-border",
      values.cardBorder || "#F7D0D3",
    );
    root.style.setProperty(
      "--theme-border-radius",
      values.borderRadius || "24px",
    );
    root.style.setProperty(
      "--theme-shadow",
      values.shadow || "0 20px 60px rgba(247, 163, 169, 0.12)",
    );
    root.style.setProperty(
      "--theme-font",
      values.fontFamily || "var(--font-koni), sans-serif",
    );
  }, [theme]);

  const applyTheme = (themeId) => {
    setCurrentThemeId(themeId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentThemeId, theme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
