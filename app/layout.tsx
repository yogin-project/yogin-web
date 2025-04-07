"use client";

import "./globals.css";

import Banner from "./_components/Banner";
import { Box } from "@mui/material";
import MultiProvider from "./provider";
import Nav from "./components/Nav";
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
      <head>
        <meta
          name="google-site-verification"
          content="BJUqKge_eLtpQsGImlCxGtMkE_8umyc8uUaPZTqDlqQ"
        />
      </head>
      <MultiProvider>
        <body>
          <Banner />
          <Nav />
          <Box height="160px" />
          {children}
        </body>
      </MultiProvider>
    </html>
  );
}
