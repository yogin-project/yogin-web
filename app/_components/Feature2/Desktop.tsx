'use client';

import { Stack, Typography } from '@mui/material';

import { BREAKPOINTS } from '@/app/libs/theme';
import Point1 from './Point1';
import Point2 from './Point2';
import useInView from '@/app/hooks/useInView';

function Desktop() {
  const { ref, inView } = useInView();
  return (
    <Stack
      width="100%"
      minHeight="100vh"
      justifyContent="center"
      bgcolor="action.hover"
      gap={9}
    >
      <Stack
        ref={ref}
        mx="auto"
        width="100%"
        maxWidth={BREAKPOINTS.tablet}
        className={`fade-section ${inView ? 'show' : ''}`}
        gap={2}
        px={3}
      >
        <Typography variant="h1">비싼 수수료 내지마세요</Typography>
        <Typography variant="h4">
          수수료 없이도
          <br />
          유수의 인력과 함께 합니다.
        </Typography>
      </Stack>

      <Stack
        mx="auto"
        flexDirection="row"
        maxWidth={BREAKPOINTS.tablet}
        gap={2}
      >
        <Point1 />
        <Point2 />
      </Stack>
    </Stack>
  );
}

export default Desktop;
