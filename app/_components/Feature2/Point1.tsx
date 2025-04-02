'use client';

import { Stack, Typography } from '@mui/material';

import { BREAKPOINTS } from '@/app/libs/theme';
import { Send } from '@mui/icons-material';
import useInView from '@/app/hooks/useInView';
import { useIsMobile } from '../../hooks/useIsMobileSize';

function Point1() {
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
          borderRadius={8}
          bgcolor="action.hover"
          p={isMobile ? 3 : 4}
        >
          <Stack gap={2}>
            <Send />
            <Typography sx={{ opacity: 0.75, fontWeight: 800 }}>
              포인트 하나
            </Typography>
            <Typography variant={isMobile ? 'h3' : 'h1'} whiteSpace="pre">
              기업
            </Typography>
          </Stack>

          <Stack width="100%">
            <Typography variant={isMobile ? 'h6' : 'h5'}>
              대학의{' '}
              <span className={`fade-text ${inView ? 'show' : ''}`}>
                우수한 석 · 박사 과정 연구인력
              </span>
              을 통해
              <br />
              기술 애로사항을 해결할 수 있으며
              <br />
              사업계획서 작성에 도움을 받을 수 있습니다.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Point1;
