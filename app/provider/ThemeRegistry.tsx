// ThemeRegistry.tsx
"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";

import ClientObserver from "../hooks/ClientObserver";
import theme from "../libs/theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientObserver attributes={["native-dark-active"]} />
      {children}
    </ThemeProvider>
  );
}
