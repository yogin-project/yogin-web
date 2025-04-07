import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import { BREAKPOINTS } from '@/app/libs/theme';
import useInView from '@/app/hooks/useInView';
import { useIsMobile } from '@/app/hooks/useIsMobileSize';

function CardsCard({
  title,
  content,
  imgSrc,
  gridColumnStart,
  gridRowStart,
}: {
  title: string;
  content: string;
  imgSrc: string;
  gridColumnStart: number;
  gridRowStart: number;
}) {
  const isMobile = useIsMobile();
  const { ref, inView } = useInView();

  return (
    <Card
      ref={ref}
      elevation={0}
      className={`fade-section ${inView ? 'show' : ''}`}
      sx={{
        height: isMobile ? 'auto' : '25vh',
        opacity: inView ? 1 : 0,
        bgcolor: 'action.hover',
        borderRadius: 8,
        gridColumnStart,
        gridRowStart,

        transformOrigin: `${gridRowStart == 1 ? 'bottom' : 'top'} ${
          gridColumnStart == 1 ? 'right' : 'left'
        }`,
        transition: 'opacity 0.8s ease-in-out, transform 0.2s ease-in-out',
        [`@media (min-width:${BREAKPOINTS.mobile}px)`]: {
          '&:hover': {
            background: `linear-gradient(0deg, rgba(var(--background-rgb), 0.2) 0%, rgba(var(--background-rgb), 0.8) 40%, rgba(var(--background-rgb), 0.9) 100%)`,
            backdropFilter: 'blur(20px)',
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <CardActionArea
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <CardContent
          sx={{ padding: '0 !important', width: '100%', height: '100%' }}
        >
          <Stack
            gap={1}
            padding={isMobile ? 3 : 4}
            sx={{
              backgroundImage:
                `linear-gradient(0deg, rgba(var(--background-rgb), 0) 0%, rgba(var(--background-rgb), 0.6) 40%, rgba(var(--background-rgb), 0.8) 100%), url(${imgSrc})` +
                '!important',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0 0',
              backgroundSize: 'cover',
              width: '100%',
              height: '100%',
              transition:
                'color 0.2s ease-in-out, backdrop-filter 0.8s ease-in-out',
              [`@media (min-width:${BREAKPOINTS.mobile}px)`]: {
                textAlign: gridColumnStart == 1 ? 'right' : 'left',
                '& h6': {
                  transition:
                    'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
                  transformOrigin:
                    gridColumnStart == 1 ? 'top right' : 'top left',
                  opacity: 0.6,
                },
                '&:hover': {
                  background: `linear-gradient(0deg, rgba(var(--background-rgb), 0.2) 0%, rgba(var(--background-rgb), 0.8) 40%, rgba(var(--background-rgb), 0.9) 100%)`,
                  backdropFilter: 'blur(20px)',
                },
                '&:hover h6': {
                  transform: 'scale(1.05)',
                  opacity: 1,
                },
              },
              [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                '&:active': {
                  background: `linear-gradient(0deg, rgba(var(--background-rgb), 0.2) 0%, rgba(var(--background-rgb), 0.8) 40%, rgba(var(--background-rgb), 0.9) 100%)`,
                  backdropFilter: 'blur(20px)',
                },
              },
            }}
          >
            <Typography variant={isMobile ? 'h4' : 'h3'}>{title}</Typography>
            <Typography variant="h6">{content}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardsCard;
