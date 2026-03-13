"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { useStore } from "zustand";
import { proposalStore } from "@/stores/proposal/proposalStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const proposal = useStore(proposalStore, (state) => state.proposal);
  useEffect(() => {
    const font = proposal?.settings?.theme?.headingFont;
    if (!font) return;

    document.fonts.load(`1rem ${font}`).then(() => {});
  }, [proposal?.settings?.theme?.headingFont]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
