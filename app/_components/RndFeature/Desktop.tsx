"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";

import { ArrowForward } from "@mui/icons-material";
import { BREAKPOINTS } from "@/app/libs/theme";
import Image from "next/image";
import NextSlideButton from "../NextSlideButton";
import { isLoginAtom } from "@/app/store/authAtom";
import { profileAtom } from "@/app/store/profileAtom";
import useInView from "@/app/hooks/useInView";
import { useRouter } from "next/navigation";

function Desktop() {
  const router = useRouter();
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: textRef, inView: textInView } = useInView();

  const isLogin = useAtomValue(isLoginAtom);
  const [profile] = useAtom(profileAtom);
  const role = profile?.type || "CORPORATE";

  const handleClickApplication = () => {
    if (isLogin) {
      if (role === "CORPORATE" || role === "ADMIN") {
        router.push("/submit-type/rnd");
      } else {
        alert("기업 회원만 이용할 수 있습니다.");
      }
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Stack
      id="feature-rnd"
      width="100%"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      position="relative"
      bgcolor="#f7f5f5"
      sx={{
        scrollSnapAlign: "start",
      }}
    >
      <Stack
        mx="auto"
        width="100%"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        gap={3}
        position="relative"
        maxWidth={BREAKPOINTS.tablet}
      >
        <Typography
          variant="subtitle1"
          fontSize="0.9rem"
          textAlign="center"
          color="primary.main"
          fontWeight={800}
        >
          R&D
        </Typography>

        <Typography
          ref={titleRef}
          className={`fade-section ${titleInView ? "show" : ""}`}
          variant="h1"
          textAlign="center"
        >
          <strong>요긴과 제휴한 대학 연구인력</strong>이<br />
          직접 검토합니다
        </Typography>

        <Button
          className={`fade-section ${titleInView ? "show" : ""}`}
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          endIcon={<ArrowForward />}
          onClick={handleClickApplication}
          sx={{
            paddingX: 6,
            position: "relative",
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
          R&D 신청하기
        </Button>

        <Stack
          mx="auto"
          display="grid"
          gridColumn={2}
          gridTemplateColumns="1fr 1.2fr"
          gridAutoRows="30rem"
          className={`fade-section ${titleInView ? "show" : ""}`}
        >
          <Stack ref={textRef} gap={2} p={2} justifyContent="center">
            <Typography fontSize="1.4rem" fontWeight={400}>
              R&D(정부지원금) 중요하지만,
              <br />
              어려운 연구 계획서 작성.
            </Typography>

            <Typography
              fontSize="1.4rem"
              fontWeight={400}
              whiteSpace="pre-wrap"
              sx={{ wordBreak: "keep-all" }}
            >
              기업은 대학의{" "}
              <strong className={`fade-text ${textInView ? "show" : ""}`}>
                우수한 연구 인력
              </strong>
              을 통해
              <br />
              연구 계획서 작성과 기술애로를 해결할 수 있습니다.
            </Typography>

            <Typography
              fontSize="1.4rem"
              fontWeight={400}
              whiteSpace="pre-wrap"
              sx={{ wordBreak: "keep-all" }}
            >
              대학은 기업의 R&D에 참여하면서
              <br />
              실무를 경험할 수 있습니다.
            </Typography>
          </Stack>

          <Stack
            className={`fade-section ${textInView ? "show" : ""}`}
            minWidth="300px"
            width="100%"
            position="relative"
            sx={{
              aspectRatio: "1 / 1",
            }}
          >
            <Image
              fill
              alt="main image2"
              src="/images/landing/landing-rnd.svg"
              style={{ objectFit: "contain" }}
            />
          </Stack>
        </Stack>
      </Stack>

      <NextSlideButton href="#feature-service" />
    </Stack>
  );
}

export default Desktop;
