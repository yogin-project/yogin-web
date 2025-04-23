"use client";

import {
  Box,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import DaumPostcode from "react-daum-postcode";
import { locations } from "@/app/utils";

interface AddressSearchProps {
  label?: string;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
}

function AddressSearch({
  label,
  selectedLocation,
  setSelectedLocation,
  address,
  setAddress,
}: AddressSearchProps) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [baseAddress, setBaseAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
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
      <FormControl>
        {label && (
          <InputLabel variant="standard" htmlFor="location-select">
            {label}
          </InputLabel>
        )}
        <Select
          variant="standard"
          displayEmpty
          fullWidth
          value={selectedLocation}
          onChange={handleLocationChange}
          inputProps={{
            id: "location-select",
          }}
        >
          {locations.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack flexDirection="row" gap={2}>
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
