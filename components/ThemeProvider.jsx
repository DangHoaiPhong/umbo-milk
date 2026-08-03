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
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-(--theme-background,#FFF8FB) text-(--theme-text,#2D3748)">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-(--theme-primary,#F7A3A9) border-t-transparent" />
        <p className="text-sm font-semibold uppercase tracking-[0.3em]">
          Đang tải giao diện
        </p>
      </div>
    </div>
  );
}

function applyThemeVariables(theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const values = theme?.values || {};
  const variableMap = {
    "--theme-primary": values.primary || "#F7A3A9",
    "--theme-secondary": values.secondary || "#F08A91",
    "--theme-background": values.background || "#FFF8FB",
    "--theme-section-background": values.sectionBackground || "#FFF3F4",
    "--theme-text": values.text || "#2D3748",
    "--theme-button-background": values.buttonBackground || "#F7A3A9",
    "--theme-button-text": values.buttonText || "#FFFFFF",
    "--theme-card-background": values.cardBackground || "#FFFFFF",
    "--theme-card-border": values.cardBorder || "#F7D0D3",
    "--theme-border-radius": values.borderRadius || "24px",
    "--theme-shadow": values.shadow || "0 20px 60px rgba(247, 163, 169, 0.12)",
    "--theme-font": values.fontFamily || "var(--font-koni), sans-serif",
  };

  Object.entries(variableMap).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}

function getResolvedThemeId(currentThemeId) {
  return currentThemeId || DEFAULT_THEME_ID;
}

export function ThemeProvider({ children }) {
  const [currentThemeId, setCurrentThemeId] = useState(getStoredThemeId);
  const [isThemeReady, setIsThemeReady] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const storedThemeId = window.localStorage.getItem(THEME_STORAGE_KEY);
    const resolvedThemeId = storedThemeId || DEFAULT_THEME_ID;

    setCurrentThemeId(resolvedThemeId);
    setIsThemeReady(true);
  }, []);

  const resolvedThemeId = getResolvedThemeId(currentThemeId);
  const theme = useMemo(() => getThemeById(resolvedThemeId), [resolvedThemeId]);

  useLayoutEffect(() => {
    if (!isThemeReady) return;

    applyThemeVariables(theme);
  }, [isThemeReady, theme]);

  const applyTheme = (themeId) => {
    setCurrentThemeId(themeId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
    }
  };

  const providerValue = useMemo(
    () => ({
      currentThemeId: resolvedThemeId,
      theme,
      applyTheme,
      isThemeReady,
    }),
    [resolvedThemeId, theme, isThemeReady],
  );

  if (!isThemeReady) {
    return (
      <ThemeContext.Provider value={providerValue}>
        <ThemeSplash />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
