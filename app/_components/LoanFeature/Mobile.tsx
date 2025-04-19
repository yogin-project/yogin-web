"use client";

import * as muiIcons from "@mui/icons-material";

import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";

import { ArrowForward } from "@mui/icons-material";
import NextSlideButton from "../NextSlideButton";
import { cards } from "./cards";
import { isLoginAtom } from "@/app/store/authAtom";
import { profileAtom } from "@/app/store/profileAtom";
import { useRouter } from "next/navigation";

const icons = muiIcons as Record<string, muiIcons.SvgIconComponent>;

function Mobile() {
  const router = useRouter();

  const isLogin = useAtomValue(isLoginAtom);
  const [profile] = useAtom(profileAtom);
  const role = profile?.type || "CORPORATE";

  const handleClickApplication = () => {
    if (isLogin) {
      if (role === "CORPORATE" || role === "ADMIN") {
        router.push("/submit-type/loan");
      } else {
        alert("기업 회원만 이용할 수 있습니다.");
      }
    } else {
      router.push("/sign-in");
    }
  };
  return (
    <Stack
      id="feature-loan"
      mx="auto"
      width="100%"
      minHeight="100vh"
      position="relative"
      alignItems="center"
      bgcolor="action.hover"
      sx={{
        scrollSnapAlign: "start",
      }}
    >
      <Stack
        width="100%"
        mt="auto"
        height="calc(100vh - 60px)"
        justifyContent="center"
        pb="60px"
        gap={2}
      >
        <Stack
          mx="auto"
          width="100%"
          justifyContent="center"
          alignItems="center"
          gap={2}
          zIndex={1}
          px={2}
        >
          <Typography
            variant="subtitle1"
            fontSize="0.9rem"
            textAlign="center"
            color="primary.main"
            fontWeight={800}
          >
            대출
          </Typography>

          <Typography variant="h4" textAlign="center" fontWeight={400}>
            <strong>요긴과 제휴한 은행</strong>이<br />
            <strong>직접 검토</strong>합니다
          </Typography>

          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleClickApplication}
            disableElevation
            endIcon={<ArrowForward />}
            sx={{
              paddingX: 6,
            }}
          >
            대출 신청하기
          </Button>
        </Stack>

        <Stack width="100%" gap="1px" display="grid" gridTemplateColumns="1fr">
          {cards.map((card, i) => (
            <CardItem
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

      <NextSlideButton href="#feature-rnd" />
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
      sx={{
        cursor: "default",
        height: "auto",
        bgcolor: "action.hover",
        gridColumnStart,
        gridRowStart,
      }}
    >
      <CardContent
        sx={{ padding: "0 !important", width: "100%", height: "100%" }}
      >
        <Stack px={3} py={2} flexDirection="row" alignItems="center" gap={3}>
          <Icon />

          <Stack gap={0.5}>
            <Typography variant="h6">{title}</Typography>
            <Typography
              fontSize="0.9rem"
              lineHeight={1.4}
              whiteSpace="pre-wrap"
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
