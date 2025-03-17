"use client";

import MobileWrapper from "@/app/layout/MobileWrapper";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AgreementSection from "../_components/AgreementSection";
import { useRouter } from "next/navigation";

import AddressSearch from "@/app/components/AddSearch";

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
      <AddressSearch
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        address={address}
        setAddress={setAddress}
      />

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
    </MobileWrapper>
  );
}

export default SignUpCorporate;
