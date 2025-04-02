'use client';

import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { BREAKPOINTS } from '@/app/libs/theme';
import Image from 'next/image';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { isAuthenticated } from '@/app/utils';
import { isLoginAtom } from '@/app/store/authAtom';
import { useRouteInHeader } from './index.hooks';
import useScrollDirection from '@/app/hooks/useScrollDirection';
import { useTranslation } from 'react-i18next';

const HeaderDesktop = () => {
  const { t } = useTranslation();
  const handleRouteHeader = useRouteInHeader();

  const direction = useScrollDirection(80);
  const isVisible = direction !== 'down';

  const isLogin = useAtomValue(isLoginAtom);
  const setIsLogin = useSetAtom(isLoginAtom);

  useEffect(() => {
    // 앱 시작 시 localStorage/sessionStorage 확인 → 로그인 상태 세팅
    if (isAuthenticated()) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Stack
      component="nav"
      width="100%"
      minHeight={80}
      height="fit-content"
      display="flex"
      justifyContent="center"
      px={3}
      sx={{
        position: 'fixed',
        top: 80,
        zIndex: 1000,
        webkitBackdropFilter: 'blur(15px)',
        backdropFilter: 'blur(15px)',
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: 'rgba(var(--background), 0.2)',
        },
        transform: isVisible ? 'translateY(0)' : 'translateY(-80px)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <Stack
        maxWidth={BREAKPOINTS.desktop}
        height={80}
        width="100%"
        margin="0 auto"
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack direction={'row'} gap={4}>
          <Stack direction={'row'} gap={2} alignItems="center">
            <Image
              onClick={() => handleRouteHeader('')}
              src={'/images/common/logo.png'}
              width={85}
              height={23}
              style={{
                cursor: 'pointer',
              }}
              alt=""
            />
            <Typography
              fontSize="0.9rem"
              fontWeight={800}
              letterSpacing={-0.25}
              lineHeight={1}
              color="primary.dark"
              sx={{
                cursor: 'default',
              }}
            >
              요긴하게 이용하세요
            </Typography>
          </Stack>

          <Box
            sx={{
              cursor: 'pointer',
            }}
          >
            <Typography>신청하기 (기업용)</Typography>
          </Box>

          <Box
            sx={{
              cursor: 'pointer',
            }}
          >
            <Typography>대출찾기 (정책자금)</Typography>
          </Box>
          <Box
            sx={{
              cursor: 'pointer',
            }}
          >
            <Typography>R&D 매칭</Typography>
          </Box>
        </Stack>
        <Stack direction={'row'} gap={1} alignItems={'center'}>
          {isLogin ? (
            <>
              <NotificationsIcon
                sx={{
                  cursor: 'pointer',
                  width: 28,
                  height: 28,
                }}
              />
              <Avatar
                sx={{
                  cursor: 'pointer',
                  width: 32,
                  height: 32,
                }}
              />
            </>
          ) : (
            <>
              <Button
                size="small"
                color="primary"
                onClick={() => handleRouteHeader('sign-in')}
              >
                {t('login')}
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleRouteHeader('sign-up')}
              >
                {t('sign_up')}
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HeaderDesktop;
