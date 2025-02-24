import { Icon, Stack } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { headerToFixed } from "./index.styles";

function HeaderMobile() {
  return (
    <Stack
      width="100%"
      height={80}
      display="flex"
      justifyContent="center"
      px={3}
      sx={headerToFixed}
    >
      <Stack
        height="100%"
        width="100%"
        margin="0 auto"
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <MenuIcon />
      </Stack>
    </Stack>
  );
}

export default HeaderMobile;
