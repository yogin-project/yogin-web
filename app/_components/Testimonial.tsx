'use client';

import { Stack, Typography } from '@mui/material';

import { BREAKPOINTS } from '@/app/libs/theme';
import { FormatQuoteRounded } from '@mui/icons-material';
import useInView from '@/app/hooks/useInView';

function Testimonial() {
  const { ref, inView } = useInView();

  return (
    <Stack
      id="testimonial"
      mx="auto"
      width="100%"
      zIndex={-1}
      height="50vh"
      alignItems="center"
      justifyContent="center"
      maxWidth={BREAKPOINTS.tablet}
      textAlign="center"
      sx={{
        marginTop: '-80px',
        paddingTop: '80px',
        [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
          marginTop: '-60px',
          paddingTop: '60px',
        },
      }}
    >
      <FormatQuoteRounded
        sx={{
          position: 'absolute',
          transform: 'translateY(-82px) scale(-1, -1)',
          color: 'action.active',
        }}
      />
      <Typography
        ref={ref}
        variant="h5"
        className={`fade-section ${inView ? 'show' : ''}`}
      >
        기업 여신은
        <br />
        기업의 재무제표를 가지고 결정됩니다.
        <br />
        브로커의 능력이 아닙니다.
      </Typography>
    </Stack>
  );
}

export default Testimonial;
