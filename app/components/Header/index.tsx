"use client";

import { useIsMobile } from "@/app/hooks/useIsMobileSize";
import React from "react";
import HeaderMobile from "./Mobile";
import HeaderDesktop from "./Desktop";

function Header() {
  // TODO: 로고 추가 필요
  const isMobile = useIsMobile();

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}

export default Header;
