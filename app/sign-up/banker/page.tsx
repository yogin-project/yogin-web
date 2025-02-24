"use client";

import MobileWrapper from "@/app/layout/MobileWrapper";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import AgreementSection from "../_components/AgreementSection";

function SignUpBank() {
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
      <Typography variant="h6" mb={1}>
        은행사 회원가입
      </Typography>
      <Typography variant="body1" mb={1}>
        계정정보
      </Typography>
      <Divider />
      <Box height={32} />
      <TextField variant="standard" label="성명" />
      <Box height={8} />
      <TextField variant="standard" label="이메일" />
      <Box height={8} />
      <TextField variant="standard" label="비밀번호" type="password" />
      <Box height={8} />
      <TextField variant="standard" label="비밀번호 확인" type="password" />
      <Box height={8} />
      <TextField variant="standard" label="휴대폰 번호" />
      <Box height={32} />
      <Typography variant="body1" mt={4} mb={1}>
        은행사정보
      </Typography>
      <Divider />
      <Box height={32} />
      <Select variant="standard" displayEmpty fullWidth>
        <MenuItem value="" disabled>
          은행사 선택
        </MenuItem>
        <MenuItem value="은행A">은행A</MenuItem>
        <MenuItem value="은행B">은행B</MenuItem>
      </Select>
      <Box height={8} />
      <TextField variant="standard" label="지점명" />
      <Box height={8} />
      <TextField variant="standard" label="담당 지역" />
      <Box height={8} />
      <Typography variant="body2" mt={2}>
        증빙서류 (명함)
      </Typography>
      <Box width="100%" display="flex" justifyContent="center">
        <Image
          src="/images/common/select-file.png"
          height={172}
          width={408}
          style={{ minWidth: "100%", height: "auto" }}
        />
      </Box>
      <Box height={32} />

      <AgreementSection
        agreements={agreements}
        onAgreementChange={handleAgreementChange}
      />

      <Box height={32} />
      <Button variant="contained" fullWidth disabled={!isSignupEnabled}>
        가입 신청
      </Button>
      <Box height={8} />
      <Button variant="outlined" fullWidth>
        이전으로
      </Button>
      <Box height={32} />
    </MobileWrapper>
  );
}

export default SignUpBank;
