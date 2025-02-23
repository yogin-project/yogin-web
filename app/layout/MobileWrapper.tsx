"use client";

import { Stack } from "@mui/material";
import React from "react";
import { BREAKPOINTS } from "../libs/theme";

function MobileWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack width="100%" alignItems={"center"} px={3}>
      <Stack width={"100%"} direction={"column"} maxWidth={BREAKPOINTS?.mobile}>
        {children}
      </Stack>
    </Stack>
  );
}

export default MobileWrapper;
