"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Dialog,
} from "@mui/material";
import DaumPostcode from "react-daum-postcode"; // 카카오 주소 검색 라이브러리
import { locations } from "@/app/utils"; // 지역 리스트 가져오기

function AddressSearch({
  selectedLocation,
  setSelectedLocation,
  address,
  setAddress,
}) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAddressSearch = () => {
    setIsAddressModalOpen(true);
  };

  const handleAddressSelect = (data) => {
    setAddress(data.address); // 선택된 주소 저장
    setIsAddressModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <Box height={8} />
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
          value={address}
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
    </>
  );
}

export default AddressSearch;
