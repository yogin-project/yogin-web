"use client";

import { Stack } from "@mui/material";
import React from "react";
import Section1 from "./_components/Section1";

function Home() {
  return (
    <Stack width="100%" display="flex" flexDirection={"column"}>
      <Section1 />
    </Stack>
  );
}

export default Home;
