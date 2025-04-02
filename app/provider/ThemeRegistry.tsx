// ThemeRegistry.tsx
'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from '../libs/theme';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
