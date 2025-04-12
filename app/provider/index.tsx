"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Provider } from "jotai";
import React from "react";
import { ScrollProvider } from "./ScrollProvider";
import ThemeRegistry from "./ThemeRegistry";
import createEmotionCache from "../libs/createEmotionCache";
import "dayjs/locale/ko";

const emotionCache = createEmotionCache();

function MultiProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <Provider>
      <CacheProvider value={emotionCache}>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <QueryClientProvider client={queryClient}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ko"
              >
                <ScrollProvider>{children}</ScrollProvider>
              </LocalizationProvider>
            </QueryClientProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MultiProvider;
