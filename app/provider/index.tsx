"use client";

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import theme from "../libs/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
            </LocalizationProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  );
}

export default MultiProvider;
