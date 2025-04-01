'use client';

import Desktop from './Desktop';
import Mobile from './Mobile';
import React from 'react';
import { useIsMobile } from '@/app/hooks/useIsMobileSize';

function Feature3() {
  const isMobile = useIsMobile();

  return isMobile ? <Mobile /> : <Desktop />;
}

export default Feature3;
