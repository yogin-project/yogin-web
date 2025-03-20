"use client";

import React from "react";
import Desktop from "./Desktop";
import { useIsMobile } from "@/app/hooks/useIsMobileSize";
import Mobile from "./Mobile";

function Footer() {
  const isMobile = useIsMobile();

  return isMobile ? <Mobile /> : <Desktop />;
}

export default Footer;
