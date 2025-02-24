"use client";

import MobileWrapper from "@/app/layout/MobileWrapper";
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
import React, { useState } from "react";

function SignUpCorporate() {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({
    personalInfo: false,
    terms: false,
  });

  const handleAgreementChange = (key) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAgreeAllChange = () => {
    const newAgreeState = !agreeAll;
    setAgreeAll(newAgreeState);
    setAgreements({
      personalInfo: newAgreeState,
      terms: newAgreeState,
    });
  };

  const isSignupEnabled = agreements.personalInfo && agreements.terms;

  return (
    <MobileWrapper>
      <Typography variant="h6" mb={1}>
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

      {/* 약관 동의 섹션 */}
      <Stack border={1} borderColor="grey.300" p={2} borderRadius={1}>
        <FormControlLabel
          control={
            <Checkbox checked={agreeAll} onChange={handleAgreeAllChange} />
          }
          label="전체 동의"
        />
        <Divider sx={{ my: 1 }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={agreements.personalInfo}
                onChange={() => handleAgreementChange("personalInfo")}
              />
            }
            label="개인 정보 수집 및 이용 동의 (필수)"
          />
          <Button variant="outlined" size="small">
            보기
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={agreements.terms}
                onChange={() => handleAgreementChange("terms")}
              />
            }
            label="이용 약관 동의 (필수)"
          />
          <Button variant="outlined" size="small">
            보기
          </Button>
        </Stack>
      </Stack>

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
