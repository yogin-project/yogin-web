'use client';

import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ArrowForward } from '@mui/icons-material';
import useInView from '../hooks/useInView';
import { useIsMobile } from '../hooks/useIsMobileSize';
import { useScrollInfo } from '../provider/ScrollProvider';

function CTA() {
  const isMobile = useIsMobile();
  const { scrollY, innerHeight } = useScrollInfo();
  const { ref, inView } = useInView();
  const [widthPercent, setWidthPercent] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const start = ref.current.offsetTop - innerHeight; // 스크롤 시작 지점
    if (scrollY < start) return;

    const progress = (scrollY + 100 - start) / 600;
    const clamped = Math.max(0, Math.min(progress, 1)); // 0~1로 clamp
    setWidthPercent(clamped * 100); // 0~100%
  }, [scrollY, innerHeight]);

  return (
    <Stack
      ref={ref}
      mx="auto"
      width="100%"
      height={isMobile ? 'fit-content' : '30vh'}
    >
      <Stack
        m="auto"
        width="100%"
        bgcolor="action.hover"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        px={2}
        py={9}
        gap={3}
        sx={{
          transition: 'width 0.2s ease-out, height 0.2s ease-out',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h3">
          기업에 필요한 서비스를{' '}
          <br style={{ display: isMobile ? 'block' : 'none' }} />
          계속 발전 시켜 나가겠습니다.
        </Typography>
        <Typography variant="h5">
          지금 바로 가입하여
          <br />
          요긴의 모든 기능을{' '}
          <Typography component="span" variant="h5" color="primary.main">
            무료
          </Typography>
          로 이용해보세요!
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          endIcon={<ArrowForward />}
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
          무료로 시작하기
        </Button>
      </Stack>
    </Stack>
  );
}

export default CTA;
