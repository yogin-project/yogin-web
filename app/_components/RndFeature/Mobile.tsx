"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";

import { ArrowForward } from "@mui/icons-material";
import Image from "next/image";
import NextSlideButton from "../NextSlideButton";
import { isLoginAtom } from "@/app/store/authAtom";
import { profileAtom } from "@/app/store/profileAtom";
import { useRouter } from "next/navigation";

function Mobile() {
  const router = useRouter();

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
      mx="auto"
      width="100%"
      bgcolor="#f7f5f5"
      minHeight="100vh"
      position="relative"
      alignItems="center"
      sx={{
        scrollSnapAlign: "start",
      }}
    >
      <Stack
        width="100%"
        mt="auto"
        alignItems="center"
        height="calc(100vh - 60px)"
      >
        <Stack
          flexShrink="0"
          width="100%"
          minHeight="180px"
          maxHeight="33%"
          position="relative"
          overflow="hidden"
          sx={{
            aspectRatio: "1 / 1",
          }}
        >
          <Image
            fill
            alt="main image2"
            src="/images/landing/landing-rnd.svg"
            style={{ minWidth: "100%", objectFit: "cover" }}
          />
        </Stack>

        <Stack
          width="100%"
          flexGrow="1"
          height="100%"
          justifyContent="center"
          alignItems="center"
          pb="60px"
          gap={2}
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

          <Typography mt={-1} variant="h4" textAlign="center" fontWeight={400}>
            <strong>
              요긴과 제휴한
              <br />
              대학 연구인력
            </strong>
            이
            <br />
            <strong>직접 검토</strong>합니다.
          </Typography>

          <Button
            variant="contained"
            size="large"
            color="primary"
            disableElevation
            endIcon={<ArrowForward />}
            onClick={handleClickApplication}
            sx={{
              paddingX: 6,
            }}
          >
            R&D 신청하기
          </Button>

          <Stack
            gap={1}
            p={1}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Typography fontSize="0.9rem" lineHeight={1.4}>
              R&D(정부지원금) 중요하지만,
              <br />
              어려운 연구 계획서 작성.
            </Typography>

            <Typography
              fontSize="0.9rem"
              lineHeight={1.4}
              whiteSpace="pre-wrap"
              sx={{ wordBreak: "keep-all" }}
            >
              기업은 대학의 <strong>우수한 연구 인력</strong>을 통해
              <br />
              연구 계획서 작성과 기술애로를 해결할 수 있습니다.
            </Typography>

            <Typography
              fontSize="0.9rem"
              lineHeight={1.4}
              whiteSpace="pre-wrap"
              sx={{ wordBreak: "keep-all" }}
            >
              대학은 기업의 R&D에 참여하면서
              <br />
              실무를 경험할 수 있습니다.
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <NextSlideButton href="#feature-service" />
    </Stack>
  );
}

export default Mobile;
