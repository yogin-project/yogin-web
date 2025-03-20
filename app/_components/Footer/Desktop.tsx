import { BREAKPOINTS } from "@/app/libs/theme";
import { Stack, Divider, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function Desktop() {
  return (
    <Stack
      maxWidth={BREAKPOINTS.desktop}
      width="100%"
      margin="0 auto"
      marginTop={23}
      justifyContent="center"
      spacing={2}
    >
      {/* Navigation Links */}
      <Stack direction="row" spacing={3} justifyContent={"flex-start"}>
        <Link href="#" underline="none" color="inherit">
          회사소개
        </Link>
        <Link href="#" underline="none" color="inherit">
          제휴제안
        </Link>
        <Link href="#" underline="none" color="inherit">
          이용약관
        </Link>
        <Link href="#" underline="none" color="inherit">
          개인정보취급방침
        </Link>
      </Stack>

      <Divider sx={{ width: "100%", maxWidth: BREAKPOINTS.desktop }} />

      {/* Company Info */}
      <Stack spacing={1}>
        <Typography variant="body2">(주)요긴</Typography>
        <Typography variant="body2">사업자등록번호 : 519-86-01415</Typography>
        <Typography variant="body2">대표 : 천재균</Typography>
        <Typography variant="body2">전화번호 : 0505-380-5507</Typography>
        <Typography variant="body2">이메일 : help@yogin.co.kr</Typography>
        <Typography variant="body2">
          소재지 : 서울특별시 강남구 영동대로 602, 6층 피56
        </Typography>
      </Stack>

      <Typography variant="caption" color="textSecondary">
        Copyright © YOGIN All rights reserved.
      </Typography>
    </Stack>
  );
}

export default Desktop;
