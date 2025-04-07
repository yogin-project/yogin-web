'use client';

import {
  AndroidRounded,
  Apple,
  ArrowForward,
  ArrowForwardRounded,
} from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

import React from 'react';

function Desktop() {
  return (
    <Stack height="calc(100vh - 160px)">
      <Stack
        height="100%"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src="/videos/landing-bg.webm" type="video/webm" />
          <source src="/videos/landing-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Box>

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            // background: `radial-gradient(
            //   circle,
            //   rgba(255, 255, 255, 0.3) 0%,
            //   rgba(255, 255, 255, 0.4) 40%,
            //   rgba(255, 255, 255, 0.6) 70%,
            //   rgba(255, 255, 255, 0.7) 100%
            // )`,
            // '@media (prefers-color-scheme: dark)': {
            background: `radial-gradient(
                circle,
                rgba(0, 0, 0, 0.3) 0%,
                rgba(0, 0, 0, 0.4) 40%,
                rgba(0, 0, 0, 0.6) 70%,
                rgba(0, 0, 0, 0.7) 100%
              )`,
            // },
          }}
        />

        <Stack
          color="common.white"
          alignItems="center"
          gap={4}
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" fontSize={48} lineHeight={1.3}>
            아직도
            <br />
            <strong>비싼 수수료</strong>를 지불하면서
            <br />
            대출받으세요?
          </Typography>

          <Typography variant="h5">
            기업 여신은 기업의 재무제표를 가지고 결정됩니다.
            <br />
            브로커의 능력이 아닙니다.
          </Typography>

          <Typography variant="h5" marginTop={-3}>
            요긴에서 수수료 없이 무료로 진행하세요.
          </Typography>

          <Stack
            width="100%"
            maxWidth="300px"
            display="grid"
            gridColumn={2}
            gridTemplateColumns="repeat(2, 1fr)"
            gap={1}
          >
            <Button
              component="a"
              href=""
              variant="contained"
              size="large"
              color="tertiary"
              disableElevation
              endIcon={<ArrowForward />}
              startIcon={<AndroidRounded />}
              sx={{
                position: 'relative',
                gridColumnStart: 1,
                '& .MuiButton-endIcon': {
                  marginLeft: '-16px',
                  transform: 'translateX(-4px)',
                  opacity: 0,
                  transition: 'all 0.2s ease-in-out',
                },
                '&:hover .MuiButton-endIcon': {
                  transform: 'translateX(0)',
                  opacity: 1,
                  marginLeft: '8px', // 기본 spacing
                },
              }}
            >
              Android
            </Button>
            <Button
              component="a"
              href=""
              variant="contained"
              size="large"
              color="tertiary"
              disableElevation
              endIcon={<ArrowForward />}
              startIcon={<Apple />}
              sx={{
                gridColumnStart: 2,
                '& .MuiButton-endIcon': {
                  marginLeft: '-16px',
                  transform: 'translateX(-4px)',
                  opacity: 0,
                  transition: 'all 0.2s ease-in-out',
                },
                '&:hover .MuiButton-endIcon': {
                  transform: 'translateX(0)',
                  opacity: 1,
                  marginLeft: '8px', // 기본 spacing
                },
              }}
            >
              IOS
            </Button>
          </Stack>
        </Stack>

        <Box
          component="a"
          href="#testimonial"
          color="common.white"
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            bottom: '16px',
            fill: 'common.white',
            webkitAnimation: 'arrow 0.5s linear 0s infinite alternate',
            animation: 'arrow 0.5s linear 0s infinite alternate',
          }}
        >
          <svg
            fill="currentColor"
            width="50px"
            height="50px"
            viewBox="-2.4 -2.4 28.80 28.80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M8.46967 9.03033C8.17678 8.73744 8.17678 8.26256 8.46967 7.96967C8.76256 7.67678 9.23744 7.67678 9.53033 7.96967L12 10.4393L14.4697 7.96967C14.7626 7.67678 15.2374 7.67678 15.5303 7.96967C15.8232 8.26256 15.8232 8.73744 15.5303 9.03033L12.5303 12.0303C12.2374 12.3232 11.7626 12.3232 11.4697 12.0303L8.46967 9.03033Z"></path>
              <path d="M8.46967 13.0303C8.17678 12.7374 8.17678 12.2626 8.46967 11.9697C8.76256 11.6768 9.23744 11.6768 9.53033 11.9697L12 14.4393L14.4697 11.9697C14.7626 11.6768 15.2374 11.6768 15.5303 11.9697C15.8232 12.2626 15.8232 12.7374 15.5303 13.0303L12.5303 16.0303C12.2374 16.3232 11.7626 16.3232 11.4697 16.0303L8.46967 13.0303Z"></path>
            </g>
          </svg>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Desktop;
