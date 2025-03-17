"use client";

import MobileWrapper from "@/app/layout/MobileWrapper";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AgreementSection from "../_components/AgreementSection";
import { useRouter } from "next/navigation";
import AddressSearch from "@/app/components/AddSearch";
import { useSignUpMutation } from "@/app/hooks/apis/useSignUp";

function SignUpCorporate() {
  const router = useRouter();
  const { mutate, isPending } = useSignUpMutation();

  // 회원가입 폼 상태
  const [formData, setFormData] = useState({
    type: "CORPORATE",
    email: "",
    password: "",
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

  // 입력 필드 값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 약관 동의 변경 핸들러
  const handleAgreementChange = (updatedAgreements: any) => {
    setAgreements(updatedAgreements);
  };

  // 회원가입 요청
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 확인 체크
    // if (formData.password !== formData.confirmPassword) {
    //   alert("비밀번호가 일치하지 않습니다.");
    //   return;
    // }

    // API 요청 (JSON 방식)
    mutate(
      {
        body: {
          ...formData,
        },
      },
      {
        onSuccess: () => {
          alert("회원가입이 완료되었습니다!");
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
    formData.phoneNumber &&
    formData.name &&
    formData.corpName &&
    formData.businessNo &&
    formData.location &&
    formData.address;

  return (
    <MobileWrapper>
      <Typography variant="h6" mb={6}>
        기업 회원가입
      </Typography>

      <form onSubmit={handleSignUp}>
        <Typography variant="body1" mb={1}>
          계정정보
        </Typography>
        <Divider />
        <Box height={32} />
        <TextField
          name="name"
          variant="standard"
          label="이름"
          onChange={handleInputChange}
        />
        <Box height={8} />
        <TextField
          name="email"
          variant="standard"
          label="이메일"
          onChange={handleInputChange}
        />
        <Box height={8} />
        <TextField
          name="password"
          variant="standard"
          label="비밀번호"
          type="password"
          onChange={handleInputChange}
        />
        <Box height={8} />
        <TextField
          name="confirmPassword"
          variant="standard"
          label="비밀번호 확인"
          type="password"
          onChange={handleInputChange}
        />
        <Box height={8} />
        <TextField
          name="phoneNumber"
          variant="standard"
          label="휴대폰 번호"
          onChange={handleInputChange}
        />
        <Box height={32} />

        <Typography variant="body1" mt={4} mb={1}>
          기업정보
        </Typography>
        <Divider />
        <Box height={32} />
        <TextField
          name="corpName"
          variant="standard"
          label="기업명"
          onChange={handleInputChange}
        />
        <Box height={8} />
        <TextField
          name="businessNo"
          variant="standard"
          label="사업자 번호"
          onChange={handleInputChange}
        />
        <Box height={8} />

        <Typography variant="body1" mt={2} mb={1}>
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

        <Box height={32} />
        <AgreementSection
          agreements={agreements}
          onAgreementChange={handleAgreementChange}
        />

        <Box height={32} />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!isSignupEnabled || isPending}
        >
          {isPending ? "가입 중..." : "회원가입"}
        </Button>
        <Box height={8} />
        <Button variant="outlined" fullWidth onClick={() => router.back()}>
          이전으로
        </Button>
        <Box height={32} />
      </form>
    </MobileWrapper>
  );
}

export default SignUpCorporate;
