"use client";

import { BREAKPOINTS } from "@/app/libs/theme";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Footer from "../Footer";

function Desktop() {
  return (
    <Stack width="100%" display="flex" justifyContent="center" sx={{ py: 8 }}>
      {/* section1 */}
      <Stack
        maxWidth={BREAKPOINTS.desktop}
        width="100%"
        margin="0 auto"
        direction={{ xs: "column", md: "row" }} // 모바일: 세로 / 데스크탑: 가로
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
      >
        {/* 왼쪽 텍스트 영역 */}
        <Stack maxWidth={655}>
          <Typography variant="h3" fontWeight="bold" mb={2}>
            정책 자금은 <br />
            요긴에서{" "}
            <Typography
              component="span"
              color="primary"
              fontWeight="bold"
              sx={{ fontSize: "inherit", display: "inline" }}
            >
              무료
            </Typography>
            로 신청하세요!
          </Typography>
          <Typography variant="h6" color="textSecondary">
            더 이상 불필요한 컨설팅 수수료를 지불하지 마세요.
          </Typography>
          <Typography variant="h6" color="textPrimary" fontWeight={"bold"}>
            기업의 자금 조달 가능성을 극대화할 수 있도록 지원합니다.
          </Typography>

          <Image
            style={{
              marginTop: 40,
              cursor: "pointer",
            }}
            src={"/images/landing/section1-btn.png"}
            width={243}
            height={63}
            alt=""
          />
        </Stack>

        {/* 오른쪽 이미지 영역 */}
        <Box>
          <Image
            src="/images/landing/section1-desktop.png"
            width={386}
            height={646}
            alt="무료 정책 자금 신청"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Stack>
      <Stack
        maxWidth={BREAKPOINTS.desktop}
        width="100%"
        margin="0 auto"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <Image
          src={"/images/landing/section1-banner.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "105%", height: "auto", marginTop: -10 }}
          alt=""
        />
      </Stack>
      {/* section2 */}
      <Stack
        maxWidth={BREAKPOINTS.desktop}
        width="100%"
        margin="0 auto"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <Image
          src={"/images/landing/section2-desktop.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", marginTop: 84 }}
          alt=""
        />
      </Stack>
      {/* section3 */}
      <Stack
        maxWidth={BREAKPOINTS.desktop}
        width="100%"
        margin="0 auto"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <Image
          src={"/images/landing/section3-desktop.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", marginTop: 84 }}
          alt=""
        />
      </Stack>
      {/* section4 */}
      <Stack
        maxWidth={BREAKPOINTS.desktop}
        width="100%"
        margin="0 auto"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <Image
          src={"/images/landing/section4-desktop.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", marginTop: 84 }}
          alt=""
        />
      </Stack>
      <Footer />
    </Stack>
  );
}

export default Desktop;
