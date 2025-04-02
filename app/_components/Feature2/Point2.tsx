'use client';

import { Stack, Typography } from '@mui/material';

import { BREAKPOINTS } from '@/app/libs/theme';
import { Send } from '@mui/icons-material';
import useInView from '@/app/hooks/useInView';
import { useIsMobile } from '@/app/hooks/useIsMobileSize';

function Point2() {
  const isMobile = useIsMobile();
  const { ref, inView } = useInView();

  return (
    <Stack ref={ref} mx="auto" width="100%">
      <Stack
        height="100%"
        className={`fade-section ${inView ? 'show' : ''}`}
        flexDirection="row"
      >
        <Stack
          width="100%"
          height="100%"
          gap={isMobile ? 4 : 8}
          bgcolor="action.hover"
          borderRadius={8}
          p={isMobile ? 3 : 4}
        >
          <Stack gap={2}>
            <Send />
            <Typography sx={{ opacity: 0.75, fontWeight: 800 }}>
              포인트 둘
            </Typography>
            <Typography variant={isMobile ? 'h3' : 'h1'} whiteSpace="pre">
              대학 연구 인력
            </Typography>
          </Stack>

          <Stack width="100%">
            <Typography variant={isMobile ? 'h6' : 'h5'}>
              기업의 R&D에 참여하면서{' '}
              <span className={`fade-text ${inView ? 'show' : ''}`}>
                실무를 경험
              </span>
              할 수 있습니다.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Point2;
