"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { QuickViewProvider } from "@/components/QuickViewContext";
import QuickViewModal from "@/components/QuickViewModal";
import { CartProvider } from "@/components/CartContext";
import CartToast from "@/components/CartToast";
import CartDrawer from "@/components/CartDrawer";
import { ThemeProvider } from "@/components/ThemeProvider";

const HIDE_CHROME = ["/register"];

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const hideChrome = HIDE_CHROME.includes(pathname);

  if (hideChrome) return <>{children}</>;

  return (
    <CartProvider>
      <QuickViewProvider>
        <ThemeProvider>
          <Header />
          <Content>{children}</Content>
          <Footer />
          <FloatingContact />
          <QuickViewModal />
          <CartToast />
          <CartDrawer />
        </ThemeProvider>
      </QuickViewProvider>
    </CartProvider>
  );
}
