"use client";

import * as muiIcons from "@mui/icons-material";

import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";

import { ArrowForward } from "@mui/icons-material";
import { BREAKPOINTS } from "@/app/libs/theme";
import NextSlideButton from "../NextSlideButton";
import { cards } from "./cards";
import { isLoginAtom } from "@/app/store/authAtom";
import { profileAtom } from "@/app/store/profileAtom";
import useInView from "@/app/hooks/useInView";
import { useRouter } from "next/navigation";

const icons = muiIcons as Record<string, muiIcons.SvgIconComponent>;

function Desktop() {
  const router = useRouter();
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: textRef, inView: textInView } = useInView();

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
      width="100%"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      position="relative"
      bgcolor="action.hover"
      sx={{
        scrollSnapAlign: "start",
      }}
    >
      <Stack
        mx="auto"
        width="100%"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        gap={3}
        position="relative"
        maxWidth={BREAKPOINTS.tablet}
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

        <Typography
          ref={titleRef}
          className={`fade-section ${titleInView ? "show" : ""}`}
          variant="h1"
          textAlign="center"
        >
          <strong>요긴과 제휴한 은행</strong>이<br />
          직접 검토합니다
        </Typography>

        <Button
          className={`fade-section ${titleInView ? "show" : ""}`}
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          endIcon={<ArrowForward />}
          onClick={handleClickApplication}
          sx={{
            paddingX: 6,
            position: "relative",
            gridColumnStart: 1,
            "& .MuiButton-endIcon": {
              marginLeft: "-16px",
              transform: "translateX(-4px)",
              opacity: 0,
              transition: "all 0.2s ease-in-out",
            },
            "&:hover .MuiButton-endIcon": {
              transform: "translateX(0)",
              opacity: 1,
              marginLeft: "8px", // 기본 spacing
            },
          }}
        >
          대출 신청하기
        </Button>

        <Stack
          mx="auto"
          display="grid"
          gridColumn={2}
          gridTemplateColumns="1fr 1.2fr"
          gap={3}
          className={`fade-section ${titleInView ? "show" : ""}`}
        >
          <Stack ref={textRef} gap={2} p={2} justifyContent="center">
            <Typography variant="h4" fontWeight={400}>
              기업대출은 요긴에서{" "}
              <strong className={`fade-text ${textInView ? "show" : ""}`}>
                무료
              </strong>
              로 신청하세요
            </Typography>

            <Typography
              fontSize="1.4rem"
              fontWeight={400}
              whiteSpace="pre-wrap"
              sx={{ wordBreak: "keep-all" }}
            >
              AI 기술을 기반으로 기업에 맞는 대출을{" "}
              <strong className={`fade-text ${textInView ? "show" : ""}`}>
                무료
              </strong>
              로 찾아드립니다.
            </Typography>
          </Stack>

          <Stack
            width="100%"
            maxWidth={BREAKPOINTS.tablet}
            gap="1px"
            px={3}
            display="grid"
            gridTemplateColumns="1fr 1fr"
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
      </Stack>

      <NextSlideButton href="#feature-rnd" />
    </Stack>
  );
}

export default Desktop;

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
  const { ref, inView } = useInView();

  const DefaultIcon = icons.HelpOutline;
  const Icon = icons?.[IconKey] || DefaultIcon;

  return (
    <Card
      ref={ref}
      elevation={0}
      className={`fade-section ${inView ? "show" : ""}`}
      sx={{
        cursor: "default",

        opacity: inView ? 1 : 0,
        bgcolor: "action.hover",
        borderRadius: 8,
        gridColumnStart,
        gridRowStart,

        transformOrigin: `${gridRowStart == 1 ? "bottom" : "top"} ${
          gridColumnStart == 1 ? "right" : "left"
        }`,
        transition: "opacity 0.8s ease-in-out, transform 0.2s ease-in-out",
        "&:hover": {
          background: `linear-gradient(0deg, rgba(var(--background-rgb), 0.2) 0%, rgba(var(--background-rgb), 0.8) 40%, rgba(var(--background-rgb), 0.9) 100%)`,
          backdropFilter: "blur(20px)",
          transform: "scale(1.05)",
        },
        "&:hover .MuiSvgIcon-root": {
          color: "primary.main",
        },
      }}
    >
      <CardContent
        sx={{ padding: "0 !important", width: "100%", height: "100%" }}
      >
        <Stack
          gap={1}
          padding={4}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Icon fontSize="large" />
          <Typography variant="h5">{title}</Typography>
          <Typography
            mt="auto"
            variant="body1"
            lineHeight={1.3}
            whiteSpace="wrap"
            sx={{ wordBreak: "keep-all" }}
          >
            {content}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
