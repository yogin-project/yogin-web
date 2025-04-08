"use client";

import React, { useEffect, useState } from "react";
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

function AddressSearch({
  selectedLocation,
  setSelectedLocation,
  address,
  setAddress,
}) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [baseAddress, setBaseAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");

  // address 값은 base + detailedAddress 조합으로 유지
  useEffect(() => {
    if (baseAddress || detailedAddress) {
      const combined = `${baseAddress} ${detailedAddress}`.trim();
      setAddress(combined);
    }
  }, [baseAddress, detailedAddress, setAddress]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAddressSearch = () => {
    setIsAddressModalOpen(true);
  };

  const handleAddressSelect = (data) => {
    setBaseAddress(data.address);
    setDetailedAddress(""); // 상세주소는 리셋
    setIsAddressModalOpen(false);
  };

  const handleDetailedAddressChange = (e) => {
    const newDetail = e.target.value;
    setDetailedAddress(newDetail);
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
      <Stack flexDirection={"row"} gap={2} mt={2}>
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
