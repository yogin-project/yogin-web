"use client";

import React, { useState } from "react";
import MobileWrapper from "../layout/MobileWrapper";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useRouteSignInPage } from "./index.hooks";
import { useSignInMutation } from "../hooks/apis/useSignIn";

function SignIn() {
  const handleRouting = useRouteSignInPage();
  const { mutate: signIn, isPending } = useSignInMutation();

  // 이메일 및 비밀번호 상태 관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(true); // 로그인 유지 체크박스
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 오류 상태
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 저장

  // 입력 필드 값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 입력이 변경되면 비밀번호 오류 메시지 초기화
    if (name === "password") {
      setPasswordError(false);
      setErrorMessage("");
    }
  };

  // 로그인 요청
  const handleSignIn = () => {
    if (!formData.email || !formData.password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    signIn(
      {
        body: formData,
      },
      {
        onSuccess: (response) => {
          console.log("로그인 성공:", response);

          const token = response?.data?.token; // 응답에서 토큰 추출
          if (token) {
            if (rememberMe) {
              localStorage.setItem("authToken", token); // 자동 로그인 → localStorage
            } else {
              sessionStorage.setItem("authToken", token); // 일반 로그인 → sessionStorage
            }
            alert("로그인 성공!");
            // TODO: 로그인 성공 후 대시보드 또는 홈으로 이동 (예: router.push("/dashboard"))
          }
        },
        onError: (error) => {
          console.error("로그인 실패:", error);
          if (error?.details.errorCode === "BAD_PASSWORD") {
            setPasswordError(true);
            setErrorMessage("비밀번호가 틀렸습니다. 다시 시도해주세요.");
          } else if (error?.details.errorCode === "NO_EXISTS_USER") {
            setPasswordError(true);
            setErrorMessage("등록되지 않은 이메일 정보입니다.");
          } else {
            setErrorMessage("잠시 후 시도해주세요.");
          }
        },
      }
    );
  };

  return (
    <MobileWrapper>
      <Typography variant="h6" mb={1}>
        로그인
      </Typography>
      <Divider />
      <Box height={32} />
      <TextField
        name="email"
        variant="standard"
        label="이메일"
        fullWidth
        onChange={handleInputChange}
      />
      <Box height={16} />
      <TextField
        name="password"
        variant="standard"
        label="비밀번호"
        type="password"
        fullWidth
        onChange={handleInputChange}
        error={passwordError} // 비밀번호 오류 시 빨간 테두리
        helperText={passwordError ? errorMessage : ""} // 오류 메시지 표시
      />
      <Stack direction="row" alignItems="center" mt={4} mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
            />
          }
          label="로그인 유지"
        />
      </Stack>
      <Button
        fullWidth
        variant="contained"
        onClick={handleSignIn}
        disabled={isPending}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
      <Box height={16} />
      <Button
        fullWidth
        variant="outlined"
        endIcon={<ChevronRight />}
        onClick={() => handleRouting("password-reset")}
      >
        비밀번호를 잊으셨다면
      </Button>
      <Box mt={5} mb={2}>
        <Typography variant="body2" textAlign={"center"} color="textSecondary">
          계정이 없으신가요?
        </Typography>
      </Box>
      <Button onClick={() => handleRouting("sign-up")}>회원가입</Button>
    </MobileWrapper>
  );
}

export default SignIn;
