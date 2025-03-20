"use client";

import React from "react";
import Desktop from "./Desktop";
import { useIsMobile } from "@/app/hooks/useIsMobileSize";
import Mobile from "./Mobile";

function Section1() {
  const isMobile = useIsMobile();

  return isMobile ? <Mobile /> : <Desktop />;
}

export default Section1;
