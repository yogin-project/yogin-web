'use client';

import Desktop from './Desktop';
import Mobile from './Mobile';
import React from 'react';
import { useIsMobile } from '@/app/hooks/useIsMobileSize';

function Hero() {
  const isMobile = useIsMobile();

  return isMobile ? <Mobile /> : <Desktop />;
}

export default Hero;
