"use client";

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import theme from "../lib/theme";

function MultiProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <Provider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  );
}

export default MultiProvider;
