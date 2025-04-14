import * as muiIcons from "@mui/icons-material";

import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import { BREAKPOINTS } from "@/app/libs/theme";
import { SvgIconComponent } from "@mui/icons-material";
import useInView from "@/app/hooks/useInView";
import { useIsMobile } from "@/app/hooks/useIsMobileSize";

const icons = muiIcons as Record<string, SvgIconComponent>;

function CardsCard({
  title,
  content,
  gridColumnStart,
  gridRowStart,
  Icon: IconKey,
}: {
  title: string;
  content: string;
  gridColumnStart: number;
  gridRowStart: number;
  Icon: string;
}) {
  const isMobile = useIsMobile();
  const { ref, inView } = useInView();

  const DefaultIcon = icons.HelpOutline;
  const Icon = icons?.[IconKey] || DefaultIcon;

  return (
    <Card
      ref={ref}
      elevation={0}
      sx={{
        bgcolor: "action.hover",
        height: "100%",

        cursor: "default",

        borderRadius: `${
          gridColumnStart == 1 || gridRowStart == 1 ? "1rem" : "0"
        } ${gridColumnStart == 2 || gridRowStart == 1 ? "1rem" : "0"} ${
          gridColumnStart == 2 || gridRowStart == 3 ? "1rem" : "0"
        } ${gridColumnStart == 1 || gridRowStart == 3 ? "1rem" : "0"}`,
        gridColumnStart,
        gridRowStart,

        filter: inView ? "blur(0px)" : "blur(5px)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(80px)",
        transition:
          "opacity 0.8s ease-in-out 0.5s, transform 0.8s ease-in-out 0.5s, filter 0.2s ease-in-out 0.5s",
      }}
    >
      <CardContent
        sx={{ padding: "0 !important", width: "100%", height: "100%" }}
      >
        <Stack
          p={3}
          gap={isMobile ? 2 : 3}
          height="100%"
          flexDirection="row"
          alignItems="center"
        >
          <Stack
            p={isMobile ? 1.5 : 2}
            border={2}
            borderColor="action.hover"
            borderRadius={8}
            bgcolor="rgba(var(--background-rgb), 0.75)"
          >
            <Icon />
          </Stack>
          <Stack
            gap={1}
            flexDirection="column"
            justifyContent="center"
            sx={{
              width: "100%",
              height: "100%",
              transition:
                "color 0.2s ease-in-out, backdrop-filter 0.8s ease-in-out",
              [`@media (min-width:${BREAKPOINTS.mobile}px)`]: {
                "& h6": {
                  transition:
                    "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                  transformOrigin: "top left",
                  opacity: 0.6,
                },
                "&:hover h6": {
                  transform: "scale(1.05)",
                  opacity: 1,
                },
              },
            }}
          >
            <Typography variant={isMobile ? "h5" : "h4"}>{title}</Typography>
            <Typography variant="h6" whiteSpace="pre-wrap">
              {content}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CardsCard;
