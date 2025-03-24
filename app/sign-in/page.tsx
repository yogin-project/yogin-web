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
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useRouteSignInPage } from "./index.hooks";
import { useSignInMutation } from "../hooks/apis/useSignIn";
import { useSignInCorpMutation } from "../hooks/apis/useSignInCorp";
import { useRouter } from "next/navigation";
import { isLoginAtom } from "../store/authAtom";
import { useSetAtom } from "jotai";

function SignIn() {
  const handleRouting = useRouteSignInPage();
  const setIsLogin = useSetAtom(isLoginAtom);
  const { mutate: signIn, isPending } = useSignInMutation();
  const { mutate: signInCorp, isPending: isCorpPending } =
    useSignInCorpMutation();
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "기업",
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const id =
    formData.userType === "기업"
      ? "사업자번호 ( - 없이 입력하세요 )"
      : "이메일";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordError(false);
      setErrorMessage("");
    }
  };

  const handleUserTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    if (newType !== null) {
      setFormData((prev) => ({ ...prev, userType: newType }));
    }
  };

  // 로그인 api 동작
  const handleSignIn = () => {
    if (!formData.email || !formData.password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const mutationFn = formData.userType === "기업" ? signInCorp : signIn;

    // userType에 따라 request body 키 조정
    const requestData =
      formData.userType === "기업"
        ? {
            businessNo: formData.email, // email 대신 businessNo로 보냄
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

    mutationFn(
      { body: requestData },
      {
        onSuccess: (response) => {
          const token = response?.data?.token;
          if (token) {
            if (rememberMe) {
              localStorage.setItem("authToken", token);
            } else {
              sessionStorage.setItem("authToken", token);
            }
            setOpenSnackbar(true);
            setTimeout(() => {
              setIsLogin(true);
              router.push("/");
            }, 1000); // 메시지 잠깐 보여주고 이동
          }
        },
        onError: (error) => {
          console.error("로그인 실패:", error);
          if (error?.details?.errorCode === "BAD_PASSWORD") {
            setPasswordError(true);
            setErrorMessage("비밀번호가 틀렸습니다. 다시 시도해주세요.");
          } else if (
            error?.details?.errorCode === "NO_EXISTS_USER" ||
            error?.details?.errorCode === "NOT_CORPORATE_USER"
          ) {
            setPasswordError(true);
            setErrorMessage("등록되지 않은 이메일 정보입니다.");
          } else {
            setErrorMessage("잠시 후 다시 시도해주세요.");
          }
        },
      }
    );
  };

  return (
    <MobileWrapper>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" mb={2}>
          로그인
        </Typography>
        <Divider />
        <Box mt={3} />

        <ToggleButtonGroup
          value={formData.userType}
          exclusive
          onChange={handleUserTypeChange}
          fullWidth
          color="primary"
          sx={{
            mb: 3,
            backgroundColor: "#f5f5f5",
            borderRadius: 1,
            p: 0.5,
          }}
        >
          <ToggleButton value="기업" sx={{ flex: 1 }}>
            기업
          </ToggleButton>
          <ToggleButton value="전문가" sx={{ flex: 1 }}>
            전문가
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          name="email"
          variant="standard"
          label={id}
          fullWidth
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          variant="standard"
          label="비밀번호"
          type="password"
          fullWidth
          onChange={handleInputChange}
          error={passwordError}
          helperText={passwordError ? errorMessage : ""}
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
          disabled={isPending || isCorpPending}
          sx={{ py: 1.5 }}
        >
          {isPending || isCorpPending ? "로그인 중..." : "로그인"}
        </Button>

        <Box height={16} />
        <Button
          fullWidth
          variant="outlined"
          endIcon={<ChevronRight />}
          onClick={() => handleRouting("password-reset")}
          sx={{ py: 1.5 }}
        >
          비밀번호를 잊으셨다면
        </Button>
      </Paper>

      <Box mt={5} mb={2}>
        <Typography variant="body2" textAlign="center" color="textSecondary">
          계정이 없으신가요?
        </Typography>
      </Box>
      <Button fullWidth onClick={() => handleRouting("sign-up")}>
        회원가입
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          로그인 성공!
        </Alert>
      </Snackbar>
    </MobileWrapper>
  );
}

export default SignIn;
