import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dispatch Dashboard - Cash Rides ATL",
  description: "Internal dispatch dashboard for Cash Rides ATL",
  robots: "noindex, nofollow",
};

export default function DispatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#0a0a0a] text-white`}>
      {children}
    </div>
  );
}
