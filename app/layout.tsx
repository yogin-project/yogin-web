"use client";

import "./globals.css";
import MultiProvider from "./provider";
import i18n from "../i18n";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // 클라이언트에서 i18n 초기화
    i18n.changeLanguage(i18n.language || "ko");
  }, []);

  return (
    <html lang="en">
      <MultiProvider>
        <body>{children}</body>
      </MultiProvider>
    </html>
  );
}
