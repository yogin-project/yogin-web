"use client";

import type { Palette, PaletteOptions } from "@mui/material/styles";

import { extendTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary?: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

export const BREAKPOINTS = {
  mobile: 456,
  tablet: 900,
  desktop: 1200,
};

export const BREAKPOINTS_PX = {
  mobile: `${BREAKPOINTS.mobile}px`,
  tablet: `${BREAKPOINTS.tablet}px`,
  desktop: `${BREAKPOINTS.desktop}px`,
};

const tertiary = {
  main: "#171717",
  light: "#242424",
  dark: "#000",
  contrastText: "#ffffff",
};

const darkTertiary = {
  main: "#ffffff",
  light: "#fff",
  dark: "#f0f0f0",
  contrastText: "#171717",
};

const lightPalette = {
  primary: {
    main: "#2979ff",
    light: "#2962ff",
    dark: "#1b50e0",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#90a4ae", // blueGrey.400
    light: "#cfd8dc", // blueGrey.300
    dark: "#546e7a", // blueGrey.600
    contrastText: "#ffffff",
  },
  tertiary,
  error: {
    main: "#d32f2f",
    light: "#ef5350",
    dark: "#c62828",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#ef6c00",
    light: "#ff9800",
    dark: "#e65100",
    contrastText: "#ffffff",
  },
  info: {
    main: "#1fabe2",
    light: "#35c2fa",
    dark: "#0a8ec3",
    contrastText: "#ffffff",
  },
  success: {
    main: "#2c9452",
    light: "#01cc4b",
    dark: "#1b6e39",
    contrastText: "#ffffff",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.60)",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  action: {
    active: "rgba(0, 0, 0, 0.56)",
    hover: "rgba(0, 0, 0, 0.04)",
    selected: "rgba(0, 0, 0, 0.08)",
    disabled: "rgba(0, 0, 0, 0.38)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    focus: "rgba(0, 0, 0, 0.12)",
  },
  common: {
    black: "#000000",
    white: "#ffffff",
  },
};

const darkPalette = {
  primary: {
    main: "#2979ff",
    light: "#2962ff",
    dark: "#1b50e0",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#90a4ae", // blueGrey.400
    light: "#cfd8dc", // blueGrey.300
    dark: "#546e7a", // blueGrey.600
    contrastText: "#ffffff",
  },
  tertiary: darkTertiary,
  error: {
    main: "#d32f2f",
    light: "#ef5350",
    dark: "#c62828",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#ef6c00",
    light: "#ff9800",
    dark: "#e65100",
    contrastText: "#ffffff",
  },
  info: {
    main: "#1fabe2",
    light: "#35c2fa",
    dark: "#0a8ec3",
    contrastText: "#ffffff",
  },
  success: {
    main: "#2c9452",
    light: "#01cc4b",
    dark: "#1b6e39",
    contrastText: "#ffffff",
  },
  // background: {
  //   default: '#121212',
  //   paper: '#1e1e1e', // elevation-1 기준
  // },
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.70)",
    disabled: "rgba(255, 255, 255, 0.38)",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  action: {
    active: "rgba(255, 255, 255, 0.56)",
    hover: "rgba(255, 255, 255, 0.08)",
    selected: "rgba(255, 255, 255, 0.16)",
    disabled: "rgba(255, 255, 255, 0.38)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    focus: "rgba(255, 255, 255, 0.12)",
  },
  common: {
    black: "#000000",
    white: "#ffffff",
  },
};

const theme = extendTheme({
  defaultColorScheme: "light",
  colorSchemes: {
    light: {
      palette: lightPalette,
    },
    dark: {
      palette: lightPalette,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: BREAKPOINTS.mobile,
      md: BREAKPOINTS.tablet,
      lg: BREAKPOINTS.desktop,
      xl: 1536, // default value
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: `"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: { fontSize: "2rem", fontWeight: 700, lineHeight: 1.4 },
    h2: { fontSize: "1.8rem", fontWeight: 700, lineHeight: 1.4 },
    h3: { fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.4 },
    h4: { fontSize: "1.4rem", fontWeight: 700, lineHeight: 1.4 },
    h5: { fontSize: "1.2rem", fontWeight: 600, lineHeight: 1.4 },
    h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.4 },
    subtitle1: { fontSize: "1rem" },
    subtitle2: { fontSize: "0.85rem", lineHeight: 1.25 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.85rem", lineHeight: 1.25 },
    button: { fontSize: "1rem", textTransform: "none", fontWeight: 700 },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { color: "tertiary", variant: "contained" },
          style: {
            backgroundColor: "var(--mui-palette-tertiary-main)",
            color: "var(--mui-palette-tertiary-contrastText)",
            "&:hover": {
              backgroundColor: "var(--mui-palette-tertiary-dark)",
            },
            "&:active": {
              backgroundColor: "var(--mui-palette-tertiary-light)",
            },
          },
        },
        {
          props: { color: "tertiary", variant: "outlined" },
          style: {
            borderColor: "var(--mui-palette-tertiary-main)",
            color: "var(--mui-palette-tertiary-main)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderColor: "var(--mui-palette-tertiary-dark)",
            },
            "&:active": {
              backgroundColor: "rgba(36, 36, 36, 0.04)",
              borderColor: "var(--mui-palette-tertiary-light)",
            },
          },
        },
      ],
    },
  },
});

export default theme;
