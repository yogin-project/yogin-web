"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

function MobileMenu() {
  const router = useRouter();

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.6)", // 반투명 배경
      }}
    >
      <Stack
        width="80%"
        maxWidth={400}
        bgcolor="white"
        p={4}
        borderRadius={2}
        boxShadow={3}
        spacing={3}
      >
        <Typography variant="h6" textAlign="center" fontWeight="bold">
          메뉴
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={() => router.push("/sign-up")}
        >
          회원가입
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => router.push("/sign-in")}
        >
          로그인
        </Button>
        <Button
          variant="text"
          fullWidth
          onClick={() => router.back()} // 뒤로 가기
        >
          닫기
        </Button>
      </Stack>
    </Box>
  );
}

export default MobileMenu;
