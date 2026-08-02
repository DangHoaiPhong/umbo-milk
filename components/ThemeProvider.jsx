"use client";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_THEME_ID, getThemeById, themes } from "@/lib/themes";

const THEME_STORAGE_KEY = "umbo_theme_selected";
const ThemeContext = createContext({
  currentThemeId: DEFAULT_THEME_ID,
  theme: themes[0],
  applyTheme: () => {},
  isThemeReady: false,
});

function getStoredThemeId() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(THEME_STORAGE_KEY) || null;
}

function ThemeSplash() {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--theme-background,#FFF8FB)] text-[var(--theme-text,#2D3748)]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--theme-primary,#F7A3A9)] border-t-transparent" />
        <p className="text-sm font-semibold uppercase tracking-[0.3em]">
          Đang tải giao diện
        </p>
      </div>
    </div>
  );
}

export function ThemeProvider({ children }) {
  const [currentThemeId, setCurrentThemeId] = useState(getStoredThemeId);
  const [isThemeReady, setIsThemeReady] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const resolvedThemeId = stored || DEFAULT_THEME_ID;
    setCurrentThemeId(resolvedThemeId);
    setIsThemeReady(true);
  }, []);

  const resolvedThemeId = currentThemeId || DEFAULT_THEME_ID;
  const theme = useMemo(() => getThemeById(resolvedThemeId), [resolvedThemeId]);

  useLayoutEffect(() => {
    if (!isThemeReady || typeof document === "undefined") return;

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
  }, [isThemeReady, theme]);

  const applyTheme = (themeId) => {
    setCurrentThemeId(themeId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
    }
  };

  if (!isThemeReady) {
    return (
      <ThemeContext.Provider
        value={{
          currentThemeId: resolvedThemeId,
          theme,
          applyTheme,
          isThemeReady,
        }}
      >
        <ThemeSplash />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        currentThemeId: resolvedThemeId,
        theme,
        applyTheme,
        isThemeReady,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
