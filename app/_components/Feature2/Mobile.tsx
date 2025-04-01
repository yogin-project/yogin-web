'use client';

import { Stack, Typography } from '@mui/material';

import { BREAKPOINTS } from '@/app/libs/theme';
import Point1 from './Point1';
import Point2 from './Point2';
import useInView from '@/app/hooks/useInView';

function Mobile() {
  const { ref, inView } = useInView();

  return (
    <Stack
      width="100%"
      justifyContent="center"
      bgcolor="action.hover"
      gap={6}
      py={12}
    >
      <Stack
        ref={ref}
        mx="auto"
        width="100%"
        maxWidth={BREAKPOINTS.mobile}
        className={`fade-section ${inView ? 'show' : ''}`}
        gap={2}
        px={3}
      >
        <Typography variant="h3">비싼 수수료 내지마세요</Typography>
        <Typography variant="h5">
          수수료 없이도
          <br />
          유수의 인력과 함께 합니다.
        </Typography>
      </Stack>

      <Stack mx="auto" maxWidth={BREAKPOINTS.mobile} gap={2}>
        <Point1 />
        <Point2 />
      </Stack>
    </Stack>
  );
}

export default Mobile;
