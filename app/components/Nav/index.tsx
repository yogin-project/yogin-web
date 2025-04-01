'use client';

import React, { useEffect } from 'react';

import HeaderDesktop from './Desktop';
import HeaderMobile from './Mobile';
import { profileAtom } from '@/app/store/profileAtom';
import { useAtom } from 'jotai';
import { useIsMobile } from '@/app/hooks/useIsMobileSize';
import { useProfileMutation } from '@/app/hooks/apis/useProfile';

function Header() {
  const isMobile = useIsMobile();
  const [profile, setProfile] = useAtom(profileAtom);

  // console.log(isVisible);

  // ✅ profileAtom에 값이 없을 때만 API 호출
  const { data, isLoading } = useProfileMutation(!profile);

  useEffect(() => {
    if (!profile && data?.data) {
      setProfile(data.data);
      console.log('✅ 프로필 저장 완료:', data.data);
    } else {
      console.log('📦 캐시된 프로필:', profile);
    }
  }, [data, profile, setProfile]);

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}

export default Header;
