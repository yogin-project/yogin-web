"use client";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  handleAgreementChangeFactory,
  handleInputChangeFactory,
  initialAgreements,
  initialFormData,
  isSignupEnabled,
  useCheckBusinessNoHandler,
} from "./index.utils";

import AddressSearch from "@/app/components/AddSearch";
import AgreementSection from "../_components/AgreementSection";
import { DatePicker } from "@mui/x-date-pickers";
import MobileWrapper from "@/app/layout/MobileWrapper";
import SuccessModal from "../_components/SuccessModal";
import { isValidPassword } from "@/app/utils";
import { useCheckMailHandler } from "@/app/hooks/utils/useCheckMailHandler";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/app/hooks/apis/useSignUp";

function SignUpCorporate() {
  const router = useRouter();
  const { mutate, isPending } = useSignUpMutation();

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const { handleCheckEmail } = useCheckMailHandler(setIsEmailChecked);

  const [businessStartDate, setBusinessStartDate] = useState<null | Dayjs>(
    null
  );
  const handleChangeDate = (date: null | Dayjs) => {
    if (!date) return;
    setBusinessStartDate(date);
  };
  const [ceoName, setCeoName] = useState("");
  const handleChangeOwnerName = (e: ChangeEvent<HTMLInputElement>) => {
    setCeoName(e.target.value);
    handleInputChange(e);
  };
  const [isBusinessNoChecked, setIsBusinessNoChecked] = useState(false);
  const { handleCheckBusinessNo } = useCheckBusinessNoHandler(
    setIsBusinessNoChecked
  );

  const [formData, setFormData] = useState(initialFormData);
  const [agreements, setAgreements] = useState(initialAgreements);
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 불일치 상태
  const [openModal, setOpenModal] = useState(false);

  // 입력 필드 값 변경 핸들러
  const handleInputChange = handleInputChangeFactory(
    setFormData,
    setPasswordError,
    setIsEmailChecked
  );

  // 약관 동의 변경 핸들러
  const handleAgreementChange = handleAgreementChangeFactory(setAgreements);

  // 회원가입 요청
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPassword(formData.password)) {
      setPasswordError(true);
      alert("비밀번호는 영문자를 포함한 8자리 이상이어야 합니다.");
      return;
    }

    // 비밀번호 확인 체크
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }

    // API 요청 시 confirmPassword 제외
    const { confirmPassword, ...requestData } = formData;

    mutate(
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: requestData,
      },
      {
        onSuccess: () => {
          setOpenModal(true);
        },
        onError: (error) => {
          console.error("회원가입 실패:", error);
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  // 회원가입 버튼 활성화 여부
  const signupEnabled = isSignupEnabled({
    agreements,
    formData,
    isEmailChecked: true,
  });

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
        <Typography variant="h6" mb={3}>
          기업 회원가입
        </Typography>

        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <Stack gap={1}>
            <TextField
              name="ceoName"
              variant="standard"
              label="대표자명"
              fullWidth
              sx={{ flex: 1 }}
              onChange={handleChangeOwnerName}
              disabled={isBusinessNoChecked}
            />
            <TextField
              name="businessNo"
              variant="standard"
              label="사업자 번호"
              placeholder="- 없이 입력해주세요"
              helperText="사업자 번호는 추후 ID로 사용됩니다."
              fullWidth
              sx={{ flex: 1 }}
              onChange={handleInputChange}
              disabled={isBusinessNoChecked}
            />
            <Stack flexDirection={"row"} gap={2}>
              <DatePicker
                label="개업일자"
                value={businessStartDate}
                onChange={handleChangeDate}
                maxDate={dayjs()}
                disabled={isBusinessNoChecked}
              />
              <Button
                variant="contained"
                size="medium"
                disabled={
                  formData.businessNo === "" ||
                  ceoName === "" ||
                  businessStartDate === null ||
                  isBusinessNoChecked
                }
                onClick={(e) =>
                  handleCheckBusinessNo(
                    formData.businessNo,
                    ceoName,
                    businessStartDate
                  )
                }
              >
                사업자번호 검증
              </Button>
            </Stack>
          </Stack>

          <Stack gap={1}>
            <TextField
              name="password"
              variant="standard"
              label="비밀번호"
              type="password"
              fullWidth
              onChange={handleInputChange}
              error={passwordError}
              helperText={
                passwordError
                  ? "비밀번호가 일치하지 않습니다."
                  : "비밀번호는 영문자 포함 8자리 이상 입력해주세요."
              }
            />
            <TextField
              name="confirmPassword"
              variant="standard"
              label="비밀번호 확인"
              type="password"
              fullWidth
              onChange={handleInputChange}
              error={passwordError}
              helperText={
                passwordError
                  ? "비밀번호가 일치하지 않습니다."
                  : "비밀번호를 한 번 더 입력해주세요."
              }
            />
          </Stack>

          <Stack gap={1}>
            <TextField
              name="corpName"
              variant="standard"
              label="기업명"
              fullWidth
              onChange={handleInputChange}
            />

            <TextField
              name="email"
              variant="standard"
              label="이메일"
              fullWidth
              sx={{ flex: 1 }}
              onChange={handleInputChange}
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

            <AddressSearch
              label="소재지"
              selectedLocation={formData.location}
              setSelectedLocation={(location) =>
                setFormData((prev) => ({ ...prev, location }))
              }
              address={formData.address}
              setAddress={(address) =>
                setFormData((prev) => ({ ...prev, address }))
              }
            />
          </Stack>

          <AgreementSection
            agreements={agreements}
            onAgreementChange={handleAgreementChange}
          />

          <Stack spacing={1}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!signupEnabled || isPending}
            >
              {isPending ? "가입 중..." : "회원가입"}
            </Button>
            <Button variant="outlined" fullWidth onClick={() => router.back()}>
              이전으로
            </Button>
          </Stack>
        </Box>
      </Paper>
      <SuccessModal
        open={openModal}
        onClose={() => router.push("/")}
        message={`회원가입이 완료되었습니다.\n 다시 로그인해주세요.`}
      />
    </MobileWrapper>
  );
}

export default SignUpCorporate;
