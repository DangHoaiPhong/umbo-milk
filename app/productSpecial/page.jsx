"use client";
import MenuSuggested from "@/components/MenuSuggested";
import PopularSection from "@/components/PopularSection";
import { useTheme } from "@/components/ThemeProvider";

export default function ProductSpecialPage() {
  const { theme } = useTheme();
  const pageBg = theme?.sectionTheme?.productSpecialPage?.pageBg ?? "#fffafc";
  const pageStyle = { background: pageBg };

  return (
    <main style={pageStyle} className="min-h-screen">
      <MenuSuggested />
      <PopularSection />
    </main>
  );
}
