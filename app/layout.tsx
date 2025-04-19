"use client";

import "./globals.css";

import { Box } from "@mui/material";
import MultiProvider from "./provider";
import Nav from "./components/Nav";
import Script from "next/script";
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
    <html lang="ko">
      <head>
        {/* 초기 native-dark-active 제거 */}
        <Script strategy="beforeInteractive">
          {`
            document.documentElement.removeAttribute('native-dark-active');
          `}
        </Script>
        <meta
          name="google-site-verification"
          content="BJUqKge_eLtpQsGImlCxGtMkE_8umyc8uUaPZTqDlqQ"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>요긴</title>
        <meta
          name="description"
          content="아직도 비싼 수수료를 지불하면서 대출받으세요? 기업 여신은 기업의 재무제표를 가지고 결정됩니다. 브로커의 능력이 아닙니다. 요긴에서 수수료 없이 무료로 진행하세요."
        />
        <meta name="keywords" content="기업여신, 정책자금, 무료, 재무제표" />

        <meta name="robots" content="index, follow" />
        {/* <meta name="googlebot" content="notranslate" /> */}

        <link
          rel="icon"
          type="image/x-icon"
          href="/images/common/favicon.ico"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/common/favicon-16x16.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/common/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/common/android-chrome-192x192.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/images/common/android-chrome-512x512.png"
        ></link>
        <link
          rel="apple-touch-icon"
          href="/images/common/apple-touch-icon.png"
          sizes="180x180"
        ></link>
        <link
          rel="mask-icon"
          href="/images/common/safari-mask-icon.svg"
          color="#2979ff"
        ></link>

        <link rel="manifest" href="/site.webmanifest"></link>

        <meta property="og:title" content="요긴" />
        <meta
          property="og:description"
          content="아직도 비싼 수수료를 지불하면서 대출받으세요? 기업 여신은 기업의 재무제표를 가지고 결정됩니다. 브로커의 능력이 아닙니다. 요긴에서 수수료 없이 무료로 진행하세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yogin.co.kr" />
        <meta
          property="og:image"
          content="/images/common/opengraph-image.png"
        />
        <meta property="og:site_name" content="요긴" />
        <meta property="og:locale" content="ko_KR" />

        <meta
          name="twitter:card"
          content="/images/common/opengraph-image.png"
        />
        <meta name="twitter:title" content="요긴" />
        <meta
          name="twitter:description"
          content="아직도 비싼 수수료를 지불하면서 대출받으세요? 기업 여신은 기업의 재무제표를 가지고 결정됩니다. 브로커의 능력이 아닙니다. 요긴에서 수수료 없이 무료로 진행하세요."
        />
        <meta
          name="twitter:image"
          content="/images/common/opengraph-image.png"
        />

        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#2979ff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="copyright" content="ⓒ 2025 요긴" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>

      <MultiProvider>
        <body>
          <Nav />
          {children}
        </body>
      </MultiProvider>
    </html>
  );
}
