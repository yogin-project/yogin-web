"use client";

import MobileWrapper from "@/app/layout/MobileWrapper";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AgreementSection from "../_components/AgreementSection";

function SignUpCorporate() {
  const [agreements, setAgreements] = useState({
    personalInfo: false,
    terms: false,
  });

  const handleAgreementChange = (updatedAgreements) => {
    setAgreements(updatedAgreements);
  };

  const isSignupEnabled = agreements.personalInfo && agreements.terms;

  return (
    <MobileWrapper>
      <Typography variant="h6" mb={6}>
        기업 회원가입
      </Typography>
      <Typography variant="body1" mb={1}>
        계정정보
      </Typography>
      <Divider />
      <Box height={32} />
      <TextField variant="standard" label="이메일" />
      <Box height={8} />
      <TextField variant="standard" label="비밀번호" type="password" />
      <Box height={8} />
      <TextField variant="standard" label="비밀번호 확인" type="password" />
      <Box height={8} />
      <TextField variant="standard" label="휴대폰 번호" />
      <Box height={32} />
      <Typography variant="body1" mt={4} mb={1}>
        기업정보
      </Typography>
      <Divider />
      <Box height={32} />
      <TextField variant="standard" label="기업명" />
      <Stack flexDirection={"row"} gap={2} mt={2}>
        <TextField variant="standard" label="사업자 번호" sx={{ flex: 1 }} />
        <Button variant="contained" size="large" sx={{ maxWidth: 73 }}>
          확인
        </Button>
      </Stack>
      <Box height={32} />

      <AgreementSection
        agreements={agreements}
        onAgreementChange={handleAgreementChange}
      />

      <Box height={32} />
      <Button variant="contained" fullWidth disabled={!isSignupEnabled}>
        회원가입
      </Button>
      <Box height={8} />
      <Button variant="outlined" fullWidth>
        이전으로
      </Button>
      <Box height={32} />
    </MobileWrapper>
  );
}

export default SignUpCorporate;
