"use client";

import { useIsMobile } from "@/app/hooks/useIsMobileSize";
import React, { useEffect } from "react";
import HeaderMobile from "./Mobile";
import HeaderDesktop from "./Desktop";
import { useProfileMutation } from "@/app/hooks/apis/useProfile";
import { useAtom } from "jotai";
import { profileAtom } from "@/app/store/profileAtom";

function Header() {
  const isMobile = useIsMobile();
  const [profile, setProfile] = useAtom(profileAtom);

  // ✅ profileAtom에 값이 없을 때만 API 호출
  const { data, isLoading } = useProfileMutation(!profile);

  useEffect(() => {
    if (!profile && data?.data) {
      setProfile(data.data);
      console.log("✅ 프로필 저장 완료:", data.data);
    } else {
      console.log("📦 캐시된 프로필:", profile);
    }
  }, [data, profile, setProfile]);

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}

export default Header;
