"use client";

import React, { useState } from "react";
import {
  Stack,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
} from "@mui/material";

function AgreementSection({ agreements, onAgreementChange }) {
  const [agreeAll, setAgreeAll] = useState(false);

  const handleAgreementChange = (key) => {
    const updatedAgreements = {
      ...agreements,
      [key]: !agreements[key],
    };
    onAgreementChange(updatedAgreements);
  };

  const handleAgreeAllChange = () => {
    const newAgreeState = !agreeAll;
    setAgreeAll(newAgreeState);
    const updatedAgreements = {
      personalInfo: newAgreeState,
      terms: newAgreeState,
    };
    onAgreementChange(updatedAgreements);
  };

  return (
    <Stack border={1} borderColor="grey.300" p={2} borderRadius={1}>
      <FormControlLabel
        control={
          <Checkbox checked={agreeAll} onChange={handleAgreeAllChange} />
        }
        label="전체 동의"
      />
      <Divider sx={{ my: 1 }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
  );
}

export default AgreementSection;
