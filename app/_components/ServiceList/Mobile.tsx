"use client";

import * as muiIcons from "@mui/icons-material";

import { Card, CardContent, Stack, Typography } from "@mui/material";

import { SvgIconComponent } from "@mui/icons-material";
import { cards } from "./cards";

const icons = muiIcons as Record<string, SvgIconComponent>;

function Mobile() {
  return (
    <Stack
      id="feature-service"
      mx="auto"
      width="100%"
      position="relative"
      alignItems="center"
      sx={{
        scrollSnapAlign: "start",
      }}
    >
      <Stack width="100%" mt="auto" justifyContent="center" gap={2}>
        <Stack gap="1px">
          {cards.map((card, i) => (
            <CardItem
              key={i}
              title={card.title}
              content={card.content}
              gridColumnStart={(i + 1) % 2 == 1 ? 1 : 2}
              gridRowStart={(i + 1) / 2}
              Icon={card.Icon}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Mobile;

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
  const DefaultIcon = icons.HelpOutline;
  const Icon = icons?.[IconKey] || DefaultIcon;

  return (
    <Card
      elevation={0}
      className="feature-item"
      sx={{
        bgcolor: "action.hover",

        cursor: "default",

        gridColumnStart,
        gridRowStart,
      }}
    >
      <CardContent sx={{ padding: "0 !important" }}>
        <Stack px={3} py={2} flexDirection="row" alignItems="center" gap={3}>
          <Icon />

          <Stack gap={0.5} flexDirection="column" justifyContent="center">
            <Typography variant="h6">{title}</Typography>
            <Typography
              fontSize="0.9rem"
              lineHeight={1.4}
              whiteSpace="balance"
              sx={{ wordBreak: "keep-all" }}
            >
              {content}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
