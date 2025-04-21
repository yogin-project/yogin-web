"use client";

import { ArrowForward, MoneyOffRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { isLoginAtom } from "@/app/store/authAtom";
import { useAtomValue } from "jotai";
import useInView from "@/app/hooks/useInView";
import { useRouter } from "next/navigation";
import { useScrollInfo } from "@/app/provider/ScrollProvider";

function Desktop() {
  const isLogin = useAtomValue(isLoginAtom);
  const router = useRouter();
  const { scrollY, innerHeight } = useScrollInfo();
  const { ref, inView } = useInView();
  const [widthPercent, setWidthPercent] = useState(0);

  const handleClickCTAButton = () => {
    if (isLogin) {
      router.push("/submit-type");
    } else {
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    if (!ref.current) return;

    const start = ref.current.offsetTop - innerHeight; // 스크롤 시작 지점
    if (scrollY < start) return;

    const progress = (scrollY + 100 - start) / 600;
    const clamped = Math.max(0, Math.min(progress, 1)); // 0~1로 clamp
    setWidthPercent(clamped * 100); // 0~100%
  }, [scrollY, innerHeight]);

  return (
    <Stack
      mx="auto"
      width="100%"
      height="25vh"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      px={2}
      py={4}
      gap={2}
    >
      <Stack
        ref={ref}
        className={`fade-section ${inView ? "show" : ""}`}
        gap={1}
      >
        <Typography variant="h2" fontWeight={800}>
          요긴은 기업에 필요한 서비스를 <br />
          계속 발전 시켜 나가겠습니다
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          지금 바로 가입하여 요긴의 모든 기능을{" "}
          <Typography component="span" variant="h6">
            <Typography component="strong" fontWeight={800}>
              무료
            </Typography>
          </Typography>
          로 이용해보세요!
        </Typography>
      </Stack>

      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={handleClickCTAButton}
        startIcon={<MoneyOffRounded />}
        endIcon={<ArrowForward />}
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
        무료로 {isLogin ? "신청하기" : "시작하기"}
      </Button>
    </Stack>
  );
}

export default Desktop;
