"use client";

import MobileWrapper from "@/app/layout/MobileWrapper";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import AgreementSection from "../_components/AgreementSection";
import { useRouter } from "next/navigation";
import AddressSearch from "@/app/components/AddSearch";
import { useSignUpMutation } from "@/app/hooks/apis/useSignUp";
import { useCheckMailHandler } from "@/app/hooks/utils/useCheckMailHandler";

function SignUpCorporate() {
  const router = useRouter();
  const { mutate, isPending } = useSignUpMutation();

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const { handleCheckEmail } = useCheckMailHandler(setIsEmailChecked);

  const [formData, setFormData] = useState({
    type: "CORPORATE",
    email: "",
    password: "",
    confirmPassword: "", // API에 포함되지 않음
    phoneNumber: "",
    name: "",
    corpName: "",
    businessNo: "",
    location: "",
    address: "",
    isAllowedST: "1",
    isAllowedPT: "1",
  });

  const [agreements, setAgreements] = useState({
    personalInfo: false,
    terms: false,
  });

  const [passwordError, setPasswordError] = useState(false); // 비밀번호 불일치 상태

  // 입력 필드 값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 비밀번호, 비밀번호 확인 필드 변경 시 에러 초기화
    if (name === "password" || name === "confirmPassword") {
      setPasswordError(false);
    }

    if (name === "email") {
      setIsEmailChecked(false); // 이메일 변경 시 중복 확인 상태 초기화
    }
  };

  // 약관 동의 변경 핸들러
  const handleAgreementChange = (updatedAgreements: any) => {
    setAgreements(updatedAgreements);
  };

  // 회원가입 요청
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 확인 체크
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }

    // API 요청 시 confirmPassword 제외
    const { confirmPassword, ...requestData } = formData;

    mutate(
      {
        body: requestData,
      },
      {
        onSuccess: () => {
          alert("회원가입이 완료되었습니다!");
          router.push("/login");
        },
        onError: (error) => {
          console.error("회원가입 실패:", error);
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  // 회원가입 버튼 활성화 여부
  const isSignupEnabled =
    agreements.personalInfo &&
    agreements.terms &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.phoneNumber &&
    formData.name &&
    formData.corpName &&
    formData.businessNo &&
    formData.location &&
    formData.address &&
    isEmailChecked;

  return (
    <MobileWrapper>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
          mb: 4,
        }}
      >
        <Typography variant="h6" mb={6}>
          기업 회원가입
        </Typography>

        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="body1">계정정보</Typography>
          <Divider />

          <Stack flexDirection={"row"} gap={2} mt={2}>
            <TextField
              name="businessNo"
              variant="standard"
              label="사업자 번호"
              fullWidth
              sx={{ flex: 1 }}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              size="small"
              // onClick={} TODO: 사업자 번호 검증 로직 넣어야함
            >
              검증 확인
            </Button>
          </Stack>

          <Stack flexDirection={"row"} gap={2} mt={2}>
            <TextField
              name="email"
              variant="standard"
              label="이메일"
              fullWidth
              sx={{ flex: 1 }}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => handleCheckEmail(formData.email)}
            >
              중복 확인
            </Button>
          </Stack>

          <TextField
            name="password"
            variant="standard"
            label="비밀번호"
            type="password"
            fullWidth
            onChange={handleInputChange}
            error={passwordError}
            helperText={passwordError ? "비밀번호가 일치하지 않습니다." : ""}
          />
          <TextField
            name="confirmPassword"
            variant="standard"
            label="비밀번호 확인"
            type="password"
            fullWidth
            onChange={handleInputChange}
            error={passwordError}
            helperText={passwordError ? "비밀번호가 일치하지 않습니다." : ""}
          />
          <TextField
            name="name"
            variant="standard"
            label="이름"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            name="phoneNumber"
            variant="standard"
            label="휴대폰 번호 ( - 없이 입력하세요)"
            fullWidth
            onChange={handleInputChange}
          />

          <Typography variant="body1" mt={2}>
            기업정보
          </Typography>
          <Divider />
          <TextField
            name="corpName"
            variant="standard"
            label="기업명"
            fullWidth
            onChange={handleInputChange}
          />

          <Typography variant="body1" mt={4}>
            소재지
          </Typography>
          <AddressSearch
            selectedLocation={formData.location}
            setSelectedLocation={(location) =>
              setFormData((prev) => ({ ...prev, location }))
            }
            address={formData.address}
            setAddress={(address) =>
              setFormData((prev) => ({ ...prev, address }))
            }
          />

          <AgreementSection
            agreements={agreements}
            onAgreementChange={handleAgreementChange}
          />

          <Stack spacing={1}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isSignupEnabled || isPending}
            >
              {isPending ? "가입 중..." : "회원가입"}
            </Button>
            <Button variant="outlined" fullWidth onClick={() => router.back()}>
              이전으로
            </Button>
          </Stack>
        </Box>
      </Paper>
    </MobileWrapper>
  );
}

export default SignUpCorporate;
