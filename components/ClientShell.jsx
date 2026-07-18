"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const HIDE_CHROME = ["/register"];

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const hideChrome = HIDE_CHROME.includes(pathname);

  if (hideChrome) return <>{children}</>;

  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
      <FloatingContact />
    </>
  );
}
