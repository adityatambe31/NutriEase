import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Header } from "@/components/layout/header-section";
import { Footer } from "@/components/home/Footer";
import { header } from "@/config/planner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Nutriease by Team404",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { headerBrandName, headerItems } = header[0];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header items={headerItems} brandName={headerBrandName} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
