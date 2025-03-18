"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { BREAKPOINTS } from "./libs/theme";

function Home() {
  return (
    <Stack width="100%" display="flex" justifyContent="center" sx={{ py: 8 }}>
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
          <Typography variant="h6" color="textSecondary" fontWeight={"bold"}>
            기업의 자금 조달 가능성을 극대화할 수 있도록 지원합니다.
          </Typography>

          {/* 버튼 그룹 */}
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": { backgroundColor: "primary.dark" },
              }}
            >
              0원으로 시작하기
            </Button>
            <Button variant="outlined" size="large">
              앱으로 보기
            </Button>
          </Stack>
        </Stack>

        {/* 오른쪽 이미지 영역 */}
        <Box>
          <Image
            src="/images/free_policy_funding.png" // 실제 이미지 경로로 변경
            width={300} // 원하는 크기 설정
            height={300}
            alt="무료 정책 자금 신청"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

export default Home;
