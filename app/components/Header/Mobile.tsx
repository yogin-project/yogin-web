"use client";

import { Icon, IconButton, Stack } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { headerToFixed } from "./index.styles";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HeaderMobile() {
  const router = useRouter();

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
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <IconButton onClick={() => router.push("/")}>
          <Image
            src={"/images/common/logo.png"}
            width={85}
            height={23}
            alt=""
          />
        </IconButton>
        <IconButton onClick={() => router.push("/mobile-menu")}>
          <MenuIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default HeaderMobile;
