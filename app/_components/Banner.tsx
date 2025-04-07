'use client';

import { Box, Stack, Typography } from '@mui/material';

import { BREAKPOINTS } from '@/app/libs/theme';
import React from 'react';
import { useIsMobile } from '../hooks/useIsMobileSize';
import useScrollDirection from '@/app/hooks/useScrollDirection';

const Banner = () => {
  const isMobile = useIsMobile();
  const direction = useScrollDirection(isMobile ? 100 : 80);
  const isVisible = direction !== 'down';

  return (
    <Stack
      component="nav"
      width="100%"
      height={isMobile ? 100 : 80}
      display="flex"
      justifyContent="center"
      sx={{
        position: 'fixed',
        top: 0,
        zIndex: 1000,
        webkitBackdropFilter: 'blur(15px)',
        backdropFilter: 'blur(15px)',
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: 'rgba(var(--background), 0.2)',
        },
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <Stack
        width="100%"
        height="100%"
        px={3}
        display="flex"
        className="animated-gradient"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          color="common.white"
          width="100%"
          maxWidth={BREAKPOINTS.desktop}
          sx={{ ...(isMobile && { h6: { fontSize: '0.8rem' } }) }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            비즈니스 네트워크 플랫폼 ‘요긴’에 오신 것을 환영합니다.
          </Typography>
          <Typography variant="subtitle2">
            요긴 플랫폼은 2025년 4월 출시되었습니다. 현재 베타 버전으로 사용중
            불편 또는 개선 사항이 있는 경우{' '}
            <a href="aranya78@naver.com">aranya78@naver.com</a>
            으로 의견을 보내주시면 적극 반영하겠습니다.
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Banner;
