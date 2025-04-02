'use client';

import { IconButton, Stack } from '@mui/material';

import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useRouter } from 'next/navigation';
import useScrollDirection from '@/app/hooks/useScrollDirection';

const HeaderMobile = () => {
  const router = useRouter();

  const direction = useScrollDirection(100);
  const isVisible = direction !== 'down';

  return (
    <Stack
      component="nav"
      width="100%"
      height={60}
      display="flex"
      justifyContent="center"
      px={2}
      sx={{
        position: 'fixed',
        top: 100,
        zIndex: 1000,
        webkitBackdropFilter: 'blur(15px)',
        backdropFilter: 'blur(15px)',
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: 'rgba(var(--background), 0.2)',
        },
        transform: isVisible ? 'translateY(0)' : 'translateY(-100px)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <Stack
        height={60}
        width="100%"
        margin="0 auto"
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <IconButton onClick={() => router.push('/')}>
          <Image
            src={'/images/common/logo.png'}
            width={85}
            height={23}
            alt=""
          />
        </IconButton>
        <IconButton onClick={() => router.push('/mobile-menu')}>
          <MenuIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default HeaderMobile;
