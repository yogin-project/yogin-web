"use client";

import { AndroidRounded, Apple, ArrowForward } from "@mui/icons-material";
import { Button, Divider, Stack, Typography } from "@mui/material";

import Image from "next/image";
import NextSlideButton from "../NextSlideButton";
import React from "react";

function Mobile() {
  return (
    <Stack
      width="100%"
      alignItems="center"
      position="relative"
      sx={{
        scrollSnapAlign: "start",
      }}
    >
      <Stack
        mt="auto"
        mx="auto"
        height="calc(100vh - 60px)"
        justifyContent="center"
        pb="60px"
        alignItems="center"
        textAlign="center"
        px={2}
        gap={2}
      >
        <Stack position="relative" width="100%" height={200}>
          <Image
            fill
            alt="main image"
            src="/images/landing/flat-hand-drawn-people-starting-business-project.png"
            style={{
              minWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Stack>

        <Typography variant="h4" lineHeight={1.3} fontWeight={500}>
          아직 <strong>비싼 수수료</strong>를 지불하면서
          <br />
          대출받으세요?
        </Typography>

        <Typography variant="h6" lineHeight={1.2} fontWeight={500}>
          기업 여신은 <strong>기업의 재무제표</strong>를 가지고 결정됩니다.
          <br />
          브로커의 능력이 아닙니다.
        </Typography>

        <Typography variant="h6" fontWeight={500}>
          요긴에서 수수료 없이 <strong>무료</strong>로 진행하세요.
        </Typography>

        <Stack
          width="100%"
          maxWidth="300px"
          display="grid"
          gridColumn={2}
          gridTemplateColumns="1fr 1fr"
          gap={1}
        >
          <Button
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps/details?id=com.yoginapp&pli=1",
                "_blank"
              )
            }
            component="a"
            href="#"
            variant="contained"
            size="large"
            color="tertiary"
            disableElevation
            endIcon={<ArrowForward />}
            startIcon={<AndroidRounded />}
            sx={{
              position: "relative",
              gridColumnStart: 1,
              "& .MuiButton-endIcon": {
                marginLeft: "-16px",
                transform: "translateX(-4px)",
                opacity: 0,
                transition: "all 0.2s ease-in-out",
              },
              "&:active .MuiButton-endIcon": {
                transform: "translateX(0)",
                opacity: 1,
                marginLeft: "8px", // 기본 spacing
              },
            }}
          >
            Android
          </Button>
          <Button
            component="a"
            href="#"
            variant="contained"
            size="large"
            color="tertiary"
            disableElevation
            endIcon={<ArrowForward />}
            startIcon={<Apple />}
            sx={{
              gridColumnStart: 2,
              "& .MuiButton-endIcon": {
                marginLeft: "-16px",
                transform: "translateX(-4px)",
                opacity: 0,
                transition: "all 0.2s ease-in-out",
              },
              "&:active .MuiButton-endIcon": {
                transform: "translateX(0)",
                opacity: 1,
                marginLeft: "8px", // 기본 spacing
              },
            }}
          >
            IOS
          </Button>
        </Stack>
        {/* 앱 배포 후, 링크 달고 지우기 */}
        {/* <Stack mt={-3}>
            <Typography variant="caption" fontWeight={800}>
              현재 앱 준비중입니다.
            </Typography>
          </Stack> */}

        <Divider
          sx={{
            width: "100%",
            bgcolor: "action.hover",
          }}
        />

        <Stack gap={0.5}>
          <Typography variant="subtitle2" fontSize={12} fontWeight={800}>
            비즈니스 네트워크 플랫폼 ‘요긴’에 오신 것을 환영합니다.
          </Typography>
          <Typography variant="subtitle2" fontSize={10}>
            요긴 플랫폼은 2025년 4월 출시되었습니다.
            <br />
            현재 베타 버전으로 사용중 불편 또는 개선 사항이 있는 경우
            <br />
            <a href="mailto:aranya78@naver.com">aranya78@naver.com</a>
            으로 의견을 보내주시면 적극 반영하겠습니다.
          </Typography>
        </Stack>
      </Stack>

      <NextSlideButton href="#feature-loan" />
    </Stack>
  );
}

export default Mobile;
