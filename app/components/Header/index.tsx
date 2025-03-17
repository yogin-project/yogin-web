"use client";

import { useIsMobile } from "@/app/hooks/useIsMobileSize";
import React from "react";
import HeaderMobile from "./Mobile";
import HeaderDesktop from "./Desktop";

function Header() {
  const isMobile = useIsMobile();

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}

export default Header;
