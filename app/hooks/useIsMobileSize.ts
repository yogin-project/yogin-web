import useMediaQuery from "@mui/material/useMediaQuery";
import { BREAKPOINTS } from "../libs/theme";

export const useIsMobile = (): boolean => {
  return useMediaQuery(`(max-width:${BREAKPOINTS.mobile}px)`);
};
