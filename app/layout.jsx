import localFont from "next/font/local";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const koniBlack = localFont({
  src: "../assets/fonts/iCiel Koni Black.otf",
  variable: "--font-koni",
});

export const metadata = {
  title: "UmboMilk",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${koniBlack.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
