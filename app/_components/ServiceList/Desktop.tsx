"use client";

import * as muiIcons from "@mui/icons-material";

import { Card, CardContent, Stack, Typography } from "@mui/material";

import { BREAKPOINTS } from "@/app/libs/theme";
import { cards } from "./cards";
import useInView from "@/app/hooks/useInView";
import { useIsMobile } from "@/app/hooks/useIsMobileSize";

function Desktop() {
  const { ref, inView } = useInView();
  return (
    <Stack
      ref={ref}
      className={`fade-section ${inView ? "show" : ""}`}
      mx="auto"
      width="100%"
      maxWidth={BREAKPOINTS.tablet}
      // flexGrow="1"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={2}
      px={3}
      zIndex={1}
    >
      <Stack
        width="100%"
        maxWidth={BREAKPOINTS.tablet}
        gap="1px"
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {cards.map((card, i) => (
          <CardItem
            key={i}
            title={card.title}
            content={card.content}
            gridColumnStart={(i % 2) + 1}
            gridRowStart={Math.floor(i / 2) + 1}
            Icon={card.Icon}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Desktop;

const icons = muiIcons as Record<string, muiIcons.SvgIconComponent>;

function CardItem({
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
          p={isMobile ? 2 : 3}
          gap={isMobile ? 2 : 3}
          height="100%"
          flexDirection="row"
          alignItems="center"
        >
          {!isMobile && (
            <Stack
              p={2}
              border={2}
              borderColor="action.hover"
              borderRadius={8}
              bgcolor="rgba(var(--background-rgb), 0.75)"
            >
              <Icon />
            </Stack>
          )}
          <Stack
            gap={0.5}
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
            <Typography variant={isMobile ? "h6" : "h5"}>{title}</Typography>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              whiteSpace="pre-wrap"
            >
              {content}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
