"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { BREAKPOINTS } from "./libs/theme";
import Section1 from "./_components/Section1";

function Home() {
  return (
    <Stack width="100%" display="flex" flexDirection={"column"}>
      <Section1 />
    </Stack>
  );
}

export default Home;
