"use client";

import { Divider, Stack } from "@mui/material";

import { BREAKPOINTS } from "../libs/theme";
import Link from "next/link";
import React from "react";
import { useIsMobile } from "../hooks/useIsMobileSize";

function Footer() {
  const isMobile = useIsMobile();
  return (
    <Stack
      component="footer"
      width="100%"
      p={2}
      fontSize={14}
      justifyContent="center"
      sx={{
        scrollSnapAlign: isMobile ? "start" : "inherit",
      }}
    >
      <Stack
        width="100%"
        maxWidth={isMobile ? BREAKPOINTS.mobile : BREAKPOINTS.tablet}
        mx="auto"
        spacing={1}
      >
        {/* Navigation Links */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent={isMobile ? "space-around" : "flex-start"}
        >
          <Link href="#">회사소개</Link>
          <Link href="#">제휴제안</Link>
          <Link
            href="https://docs.google.com/document/d/e/2PACX-1vTxhWN6az8yEoXwWgoO4fO0UgpjVHSEp4_UNDudvsNMvK_32sEy9RDkj5WNNgpL8oQKTUU7Q9DGC3HH/pub"
            target="_blank"
          >
            이용약관
          </Link>
          <Link
            href="https://docs.google.com/document/d/e/2PACX-1vR2MrP40iS-__0nj5xPGKi2s1C6wDK4OPHQF08OnbBaNxHvR3lR5LwXsn0n5wWbKalGM8-3U5xooolc/pub"
            target="_blank"
          >
            개인정보취급방침
          </Link>
        </Stack>

        <Divider sx={{ width: "100%" }} />

        <Stack
          gap={0.5}
          direction="row"
          flexWrap="wrap"
          fontSize={12}
          sx={{
            "& p": { display: "inline-flex", px: 0.5 },
            "& p > b": {
              color: "text.secondary",
              mr: 0.5,
            },
          }}
        >
          <p>
            <b>(주)요긴</b>
          </p>
          <p>
            <b>사업자등록번호</b>
            <span>519-86-01415</span>
          </p>
          <p>
            <b>대표</b> <span>천재균</span>
          </p>
          <p>
            <b>전화번호</b> <span>0505-380-5507</span>
          </p>
          <p>
            <b>이메일</b>{" "}
            <Link href="mailto:help@yogin.co.kr">help@yogin.co.kr</Link>
          </p>
          <p>
            <b>소재지</b> <span>서울특별시 강남구 영동대로 602, 6층 피56</span>
          </p>
        </Stack>

        <Stack fontSize={12} color="text.disabled">
          <p>Copyright © YOGIN All rights reserved.</p>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Footer;
