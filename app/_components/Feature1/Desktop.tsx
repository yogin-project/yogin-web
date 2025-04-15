"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";

import { ArrowForward } from "@mui/icons-material";
import { BREAKPOINTS } from "@/app/libs/theme";
import Card from "./Card";
import { cards } from "./cards";
import { isLoginAtom } from "@/app/store/authAtom";
import { profileAtom } from "@/app/store/profileAtom";
import useInView from "@/app/hooks/useInView";
import { useRouter } from "next/navigation";

function Desktop() {
  const router = useRouter();
  const { ref, inView } = useInView();

  const isLogin = useAtomValue(isLoginAtom);
  const [profile] = useAtom(profileAtom);
  const role = profile?.type || "CORPORATE";

  const handleClickApplication = () => {
    if (isLogin) {
      if (role === "CORPORATE") {
        router.push("/submit-type");
      } else {
        alert("기업 회원만 이용할 수 있습니다.");
      }
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Stack
      mx="auto"
      width="100%"
      maxWidth={BREAKPOINTS.tablet}
      minHeight="100vh"
      justifyContent="center"
      position="relative"
      gap={9}
      py={24}
    >
      <Stack
        ref={ref}
        className={`fade-section ${inView ? "show" : ""}`}
        mx="auto"
        width="100%"
        maxWidth={BREAKPOINTS.tablet}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={2}
        px={3}
        zIndex={1}
      >
        <Typography variant="h1">
          정책 자금은 요긴에서
          <br />
          <strong>무료</strong>로 신청하세요!
        </Typography>
        <Typography variant="h4">
          AI 기술을 기반으로 <br />
          요긴이 기업에 맞는 대출을 <br />
          무료로 찾아드립니다.
        </Typography>

        <Stack
          sx={{
            position: "absolute",
            transform: "translateY(-50%)",
            top: "50%",
            right: "24px",
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            disableElevation
            endIcon={<ArrowForward />}
            onClick={handleClickApplication}
            sx={{
              paddingX: 6,
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
            대출 신청하기
          </Button>
        </Stack>
      </Stack>

      <Stack
        width="100%"
        gap={2}
        px={3}
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {cards.map((card, i) => (
          <Card
            key={i}
            title={card.title}
            content={card.content}
            imgSrc={card.imgSrc}
            gridColumnStart={(i % 2) + 1}
            gridRowStart={Math.floor(i / 2) + 1}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Desktop;
