"use client";
import { createTheme } from "@mui/material/styles";

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

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: BREAKPOINTS.mobile,
      md: BREAKPOINTS.tablet,
      lg: BREAKPOINTS.desktop,
      xl: 1536, // default value
    },
  },
});

export default theme;
