import { BREAKPOINTS } from "../libs/theme";
import { Box } from "@mui/material";

export default function NextSlideButton({
  href,
  color = "common.white",
}: {
  href: string;
  color?: string;
}) {
  return (
    <Box
      component="a"
      href={href}
      color={color}
      sx={{
        cursor: "pointer",
        position: "absolute",
        fill: "currentcolor",
        webkitAnimation: "arrow 0.5s linear 0s infinite alternate",
        animation: "arrow 0.5s linear 0s infinite alternate",
      }}
    >
      <svg
        fill="currentColor"
        width="50px"
        height="50px"
        viewBox="-2.4 -2.4 28.80 28.80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="M8.46967 9.03033C8.17678 8.73744 8.17678 8.26256 8.46967 7.96967C8.76256 7.67678 9.23744 7.67678 9.53033 7.96967L12 10.4393L14.4697 7.96967C14.7626 7.67678 15.2374 7.67678 15.5303 7.96967C15.8232 8.26256 15.8232 8.73744 15.5303 9.03033L12.5303 12.0303C12.2374 12.3232 11.7626 12.3232 11.4697 12.0303L8.46967 9.03033Z"></path>
          <path d="M8.46967 13.0303C8.17678 12.7374 8.17678 12.2626 8.46967 11.9697C8.76256 11.6768 9.23744 11.6768 9.53033 11.9697L12 14.4393L14.4697 11.9697C14.7626 11.6768 15.2374 11.6768 15.5303 11.9697C15.8232 12.2626 15.8232 12.7374 15.5303 13.0303L12.5303 16.0303C12.2374 16.3232 11.7626 16.3232 11.4697 16.0303L8.46967 13.0303Z"></path>
        </g>
      </svg>
    </Box>
  );
}
