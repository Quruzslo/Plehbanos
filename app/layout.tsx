import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ScrollToTop from "@/lib/ui/ScrollToTop";
import Footer from "@/components/Footer";
import { CartProvider } from "@/src/context/cartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pléhbánós - Bádogos munkák",
  description:
    "Megbízható bádogos munka kivitelezése, 30 év tapasztalattal. Somogy megye, Kaposvár",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header></Header>
          {children}
          <ScrollToTop></ScrollToTop>
          <Footer></Footer>
        </CartProvider>
      </body>
    </html>
  );
}
