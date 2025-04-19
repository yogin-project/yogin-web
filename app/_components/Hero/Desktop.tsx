"use client";

import { AndroidRounded, ArrowForward } from "@mui/icons-material";
import { Button, Divider, Stack, Typography } from "@mui/material";

import { BREAKPOINTS } from "@/app/libs/theme";
import Image from "next/image";
import NextSlideButton from "../NextSlideButton";
import React from "react";

function Desktop() {
  return (
    <Stack
      mt="-80px"
      width="100%"
      minHeight="100vh"
      alignItems="center"
      position="relative"
      sx={{
        scrollSnapAlign: "start",
      }}
    >
      <Stack
        maxWidth={BREAKPOINTS.desktop}
        mx="auto"
        mt="auto"
        height="calc(100vh - 80px)"
        sx={{
          display: "grid",
          gridColumn: 2,
          gridTemplateColumns: "3fr 2fr",
        }}
      >
        <Stack position="relative">
          <Image
            fill
            alt="main image"
            src="/images/landing/flat-hand-drawn-people-starting-business-project.png"
            style={{ minWidth: "100%", objectFit: "contain" }}
          />
        </Stack>

        <Stack
          justifyContent="center"
          px={2}
          gap={2}
          sx={{
            zIndex: 1,
            gridColumnStart: 2,
          }}
        >
          <Typography variant="h2" lineHeight={1.3} fontWeight={500}>
            아직도
            <br />
            <strong>비싼 수수료</strong>를 지불하면서
            <br />
            대출받으세요?
          </Typography>

          <Typography variant="h5">
            기업 여신은 기업의 재무제표를 가지고 결정됩니다.
            <br />
            브로커의 능력이 아닙니다.
          </Typography>

          <Typography variant="h5">
            요긴에서 수수료 없이 무료로 진행하세요.
          </Typography>

          <Stack
            width="100%"
            maxWidth="300px"
            display="grid"
            gridColumn={1}
            gridTemplateColumns="repeat(1, 1fr)"
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
                "&:hover .MuiButton-endIcon": {
                  transform: "translateX(0)",
                  opacity: 1,
                  marginLeft: "8px", // 기본 spacing
                },
              }}
            >
              Android
            </Button>
            {/* <Button
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
                "&:hover .MuiButton-endIcon": {
                  transform: "translateX(0)",
                  opacity: 1,
                  marginLeft: "8px", // 기본 spacing
                },
              }}
            >
              IOS
            </Button> */}
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

          <Stack color="action.active">
            <Typography variant="subtitle1" fontWeight={800}>
              비즈니스 네트워크 플랫폼 ‘요긴’에 오신 것을 환영합니다.
            </Typography>
            <Typography variant="subtitle2">
              요긴 플랫폼은 2025년 4월 출시되었습니다. 현재 베타 버전으로 사용중
              불편 또는 개선 사항이 있는 경우
              <a href="mailto:aranya78@naver.com">aranya78@naver.com</a>
              으로 의견을 보내주시면 적극 반영하겠습니다.
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <NextSlideButton href="#feature-loan" />
    </Stack>
  );
}

export default Desktop;
