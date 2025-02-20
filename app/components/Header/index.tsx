"use client";

import { Stack } from "@mui/material";
import React from "react";

function Header() {
  return (
    <Stack
      width="100%"
      height={80}
      display="flex"
      justifyContent="center" // 가로축 센터 정렬
    >
      <Stack
        maxWidth={1200}
        height="100%" // 부모 높이(80px)에 맞게 설정
        width="100%"
        margin="0 auto" // 가로 정렬
      >
        {/* 여기에 콘텐츠 추가 */}
      </Stack>
    </Stack>
  );
}

export default Header;
