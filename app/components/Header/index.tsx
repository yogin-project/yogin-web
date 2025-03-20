"use client";

import { useIsMobile } from "@/app/hooks/useIsMobileSize";
import React, { Fragment, useEffect } from "react";
import HeaderMobile from "./Mobile";
import HeaderDesktop from "./Desktop";
import { useProfileMutation } from "@/app/hooks/apis/useProfile";
import { useAdminList } from "@/app/hooks/apis/useAdminList";

function Header() {
  const isMobile = useIsMobile();
  const { data, isLoading, error } = useProfileMutation();
  const { data: adminList } = useAdminList();

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}

export default Header;
