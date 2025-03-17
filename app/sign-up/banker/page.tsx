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
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AgreementSection from "../_components/AgreementSection";
import { useRouter } from "next/navigation";
import { bankList } from "@/app/utils";
import AddressSearch from "@/app/components/AddSearch";

function SignUpBank() {
  const [agreements, setAgreements] = useState({
    personalInfo: false,
    terms: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [address, setAddress] = useState(""); // 주소 상태 추가
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // 주소 검색 모달 상태

  const [selectedBank, setSelectedBank] = useState("");
  const router = useRouter();

  const handleAgreementChange = (updatedAgreements) => {
    setAgreements(updatedAgreements);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileDelete = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAddressSearch = () => {
    setIsAddressModalOpen(true);
  };

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const handleAddressSelect = (data) => {
    setAddress(data.address); // 선택된 주소를 저장
    setIsAddressModalOpen(false); // 모달 닫기
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
        은행정보
      </Typography>
      <Divider />
      <Box height={32} />
      <Select
        variant="standard"
        displayEmpty
        fullWidth
        value={selectedBank}
        onChange={handleBankChange}
      >
        <MenuItem value="" disabled>
          은행 선택
        </MenuItem>
        {bankList.map((bank) => (
          <MenuItem key={bank} value={bank}>
            {bank}
          </MenuItem>
        ))}
      </Select>

      <Box height={8} />
      <TextField variant="standard" label="지점명" />
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

      <Box height={8} />
      <Typography variant="body2" mt={2}>
        증빙서류 (명함)
      </Typography>

      <Box width="100%" display="flex" justifyContent="center" mt={1}>
        <label
          htmlFor="file-upload"
          style={{ cursor: "pointer", width: "100%" }}
        >
          <Image
            src="/images/common/select-file.png"
            height={172}
            width={408}
            style={{ minWidth: "100%", height: "auto" }}
            alt=""
          />
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          hidden
          onChange={handleFileUpload}
        />
      </Box>
      {uploadedFiles.length > 0 && (
        <Box mt={2}>
          {uploadedFiles.map((file, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={1}
              border={1}
              borderRadius={1}
              borderColor="grey.300"
              mt={1}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <InsertDriveFileIcon color="primary" />
                <Typography variant="body2">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB) • Complete
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                <IconButton onClick={() => handleFileDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </Box>
      )}
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
      <Button variant="outlined" fullWidth onClick={() => router.back()}>
        이전으로
      </Button>
      <Box height={32} />
    </MobileWrapper>
  );
}

export default SignUpBank;
