"use client";

import MobileWrapper from "@/app/layout/MobileWrapper";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Dialog,
} from "@mui/material";
import React, { useState } from "react";
import AgreementSection from "../_components/AgreementSection";
import { useRouter } from "next/navigation";
import { locations } from "@/app/utils";
import DaumPostcode from "react-daum-postcode"; // 카카오 주소 검색 라이브러리

function SignUpCorporate() {
  const router = useRouter();

  const [agreements, setAgreements] = useState({
    personalInfo: false,
    terms: false,
  });

  const [selectedLocation, setSelectedLocation] = useState("");
  const [address, setAddress] = useState(""); // 주소 상태 추가
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // 주소 검색 모달 상태

  const handleAgreementChange = (updatedAgreements) => {
    setAgreements(updatedAgreements);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAddressSearch = () => {
    setIsAddressModalOpen(true);
  };

  const handleAddressSelect = (data) => {
    setAddress(data.address); // 선택된 주소를 저장
    setIsAddressModalOpen(false); // 모달 닫기
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
      <TextField variant="standard" label="이름" />
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
        기업정보
      </Typography>
      <Divider />
      <Box height={32} />
      <TextField variant="standard" label="기업명" />
      <Box height={8} />
      <TextField variant="standard" label="사업자 번호" />

      <Box height={8} />
      <Typography variant="body1" mt={2} mb={1}>
        소재지
      </Typography>
      <Select
        variant="standard"
        displayEmpty
        fullWidth
        value={selectedLocation}
        onChange={handleLocationChange}
      >
        <MenuItem value="" disabled>
          소재지 선택
        </MenuItem>
        {locations.map((location) => (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
      <Box height={8} />
      <Stack flexDirection={"row"} gap={2} mt={2}>
        <TextField
          variant="standard"
          label="주소 검색"
          sx={{ flex: 1 }}
          value={address} // 주소 입력 필드 값
          InputProps={{
            readOnly: true, // 직접 입력 방지
          }}
        />
        <Button
          variant="contained"
          size="large"
          sx={{ maxWidth: 120 }}
          onClick={handleAddressSearch}
        >
          주소 찾기
        </Button>
      </Stack>
      <Box height={8} />

      <TextField variant="standard" label="상세 주소 입력" sx={{ flex: 1 }} />
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
      <Button variant="outlined" fullWidth onClick={() => router.back()}>
        이전으로
      </Button>
      <Box height={32} />

      {/* 주소 검색 모달 */}
      <Dialog
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        fullWidth
      >
        <Box p={2}>
          <DaumPostcode onComplete={handleAddressSelect} />
        </Box>
      </Dialog>
    </MobileWrapper>
  );
}

export default SignUpCorporate;
