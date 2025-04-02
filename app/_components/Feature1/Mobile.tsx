'use client';

import { Button, Stack, Typography } from '@mui/material';

import { ArrowForward } from '@mui/icons-material';
import { BREAKPOINTS } from '@/app/libs/theme';
import Card from './Card';
import { cards } from './cards';
import useInView from '@/app/hooks/useInView';

function Mobile() {
  const { ref, inView } = useInView();
  return (
    <Stack
      width="100%"
      maxWidth={BREAKPOINTS.mobile}
      justifyContent="center"
      position="relative"
      mx="auto"
      gap={6}
      py={12}
    >
      <Stack
        ref={ref}
        className={`fade-section ${inView ? 'show' : ''}`}
        mx="auto"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={2}
        px={3}
        zIndex={1}
      >
        <Typography variant="h3">
          정책 자금은 요긴에서
          <br />
          <strong>무료</strong>로 신청하세요!
        </Typography>
        <Typography variant="h5">
          AI 기술을 기반으로 <br />
          요긴이 기업에 맞는 대출을 <br />
          무료로 찾아드립니다.
        </Typography>

        <Stack>
          <Button
            variant="contained"
            size="large"
            color="primary"
            disableElevation
            endIcon={<ArrowForward />}
            sx={{
              paddingX: 6,
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
            대출 신청하기
          </Button>
        </Stack>
      </Stack>

      <Stack
        width="100%"
        gap={2}
        px={2}
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
        }}
      >
        {cards.map((card, i) => (
          <Card
            key={i}
            title={card.title}
            content={card.content}
            imgSrc={card.imgSrc}
            gridColumnStart={1}
            gridRowStart={i + 1}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Mobile;
