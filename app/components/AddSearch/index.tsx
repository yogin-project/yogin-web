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
import DaumPostcode from "react-daum-postcode";
import { locations } from "@/app/utils";

interface AddressSearchProps {
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
}

function AddressSearch({
  selectedLocation,
  setSelectedLocation,
  address,
  setAddress,
}: AddressSearchProps) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [baseAddress, setBaseAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");

  const handleLocationChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedLocation(event.target.value as string);
  };

  const handleAddressSearch = () => {
    setIsAddressModalOpen(true);
  };

  const handleAddressSelect = (data: any) => {
    const selected = data.address;
    setBaseAddress(selected);
    setDetailedAddress("");
    setAddress(selected); // 기본 주소 선택 시 바로 setAddress 호출
    setIsAddressModalOpen(false);
  };

  const handleDetailedAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const detail = e.target.value;
    setDetailedAddress(detail);
    const combined = `${baseAddress} ${detail}`.trim();
    setAddress(combined); // 상세 주소 입력 시마다 setAddress 호출
  };

  return (
    <>
      <Select
        variant="standard"
        displayEmpty
        fullWidth
        value={selectedLocation}
        onChange={handleLocationChange}
      >
        {locations.map((location) => (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>

      <Box height={8} />
      <Stack flexDirection="row" gap={2} mt={2}>
        <TextField
          variant="standard"
          label="주소 검색"
          sx={{ flex: 1 }}
          value={baseAddress}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button variant="contained" size="small" onClick={handleAddressSearch}>
          주소 찾기
        </Button>
      </Stack>

      <TextField
        variant="standard"
        label="상세 주소 입력"
        sx={{ flex: 1 }}
        value={detailedAddress}
        onChange={handleDetailedAddressChange}
      />

      <Box height={8} />

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
