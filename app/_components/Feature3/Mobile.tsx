'use client';

import { Stack, Typography } from '@mui/material';

import { BREAKPOINTS } from '@/app/libs/theme';
import Card from './Card';
import { cards } from './cards';
import useInView from '@/app/hooks/useInView';

function Desktop() {
  const { ref, inView } = useInView();
  return (
    <Stack
      mx="auto"
      width="100%"
      maxWidth={BREAKPOINTS.tablet}
      minHeight="100vh"
      justifyContent="center"
      position="relative"
      gap={6}
      py={12}
    >
      <Stack
        ref={ref}
        className={`fade-section ${inView ? 'show' : ''}`}
        mx="auto"
        width="100%"
        maxWidth={BREAKPOINTS.tablet}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={2}
        px={3}
        zIndex={1}
      >
        <Typography variant="h3">
          기업에 필요한 서비스를
          <br />
          계속해서 발전시켜 나가겠습니다.
        </Typography>
        <Typography variant="h5">
          보이지 않는 리스크부터,
          <br />
          놓치기 쉬운 기회까지.
          <br />
          기업을 위한 전략을 함께합니다.
        </Typography>
      </Stack>

      <Stack
        width="100%"
        gap="1px"
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridAutoRows: '1fr',
        }}
      >
        {cards.map((card, i) => (
          <Card
            key={i}
            title={card.title}
            content={card.content}
            gridColumnStart={1}
            gridRowStart={i + 1}
            Icon={card.Icon}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Desktop;
