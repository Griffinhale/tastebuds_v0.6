import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/all/Header"; // Adjust the import path as needed

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tastebuds (Testing)",
  description: "Media list-maker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 p-8 sm:p-20">
          <Header />
          <main className="w-full h-full bg-slate-200">{children}</main>
          <footer className="flex flex-wrap items-center justify-center gap-6">Tastebuds</footer>
        </div>
      </body>
    </html>
  );
}
