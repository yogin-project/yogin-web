"use client";

import { BREAKPOINTS } from "@/app/libs/theme";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Footer from "../Footer";

function Mobile() {
  return (
    <Stack width="100%" display="flex" justifyContent="center">
      {/* section1 */}
      <Stack
        maxWidth={BREAKPOINTS.mobile}
        width="100%"
        margin="0 auto"
        direction={"column"}
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
      >
        {/* 왼쪽 텍스트 영역 */}
        <Stack direction={"column"} alignItems={"center"}>
          <Typography
            variant="h3"
            fontWeight="bold"
            mb={2}
            textAlign={"center"}
          >
            정책 자금은 <br />
            요긴에서
            <br />
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
          <Typography variant="h6" color="textSecondary" textAlign={"center"}>
            불필요한 컨설팅 수수료, 이제 그만-
          </Typography>
          <Typography
            variant="h6"
            color="textPrimary"
            fontWeight={"bold"}
            textAlign={"center"}
          >
            기업의 자금 조달 가능성을 높여드립니다.
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
            src="/images/landing/section1-mobile.png"
            width={386}
            height={646}
            alt="무료 정책 자금 신청"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Stack>
      <Stack
        maxWidth={BREAKPOINTS.mobile}
        width="100%"
        margin="0 auto"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <Image
          src={"/images/landing/section1-banner-mobile.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", marginTop: -10 }}
          alt=""
        />
      </Stack>
      {/* section2 */}
      <Stack
        maxWidth={BREAKPOINTS.mobile}
        width="100%"
        margin="0 auto"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <Image
          src={"/images/landing/section2-mobile.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", marginTop: 84 }}
          alt=""
        />
      </Stack>
      {/* section3 */}
      <Stack
        maxWidth={BREAKPOINTS.mobile}
        width="100%"
        margin="0 auto"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <Image
          src={"/images/landing/section3-mobile.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", marginTop: 84 }}
          alt=""
        />
      </Stack>
      {/* section4 */}
      <Stack
        maxWidth={BREAKPOINTS.mobile}
        width="100%"
        margin="0 auto"
        alignItems="center"
        justifyContent="center"
        spacing={4}
      >
        <Image
          src={"/images/landing/section4-mobile.png"}
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

export default Mobile;
