"use client";

import { ArrowForward, MoneyOffRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

import { isLoginAtom } from "@/app/store/authAtom";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

function Mobile() {
  const isLogin = useAtomValue(isLoginAtom);
  const router = useRouter();

  const handleClickCTAButton = () => {
    if (isLogin) {
      router.push("/submit-type");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Stack mx="auto" width="100%" height="fit-content">
      <Stack
        m="auto"
        width="100%"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        py={3}
        gap={2}
        sx={{
          transition: "width 0.2s ease-out, height 0.2s ease-out",
          overflow: "hidden",
          scrollSnapAlign: "center",
        }}
      >
        <Typography variant="h4">
          요긴은 기업에 필요한 서비스를 <br />
          계속 발전 시켜 나가겠습니다.
        </Typography>
        <Typography fontSize="0.9rem" lineHeight={1.4} fontWeight={400}>
          지금 바로 가입하여
          <br />
          요긴의 모든 기능을 <strong>무료</strong>로 이용해보세요!
        </Typography>

        <Button
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          onClick={handleClickCTAButton}
          startIcon={<MoneyOffRounded />}
          endIcon={<ArrowForward />}
        >
          무료로 {isLogin ? "신청하기" : "시작하기"}
        </Button>
      </Stack>
    </Stack>
  );
}

export default Mobile;
