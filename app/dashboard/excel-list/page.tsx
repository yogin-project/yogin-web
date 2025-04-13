"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Typography,
  Alert,
} from "@mui/material";
import { locations } from "@/app/utils";

const ExcelDownloadPage = () => {
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [region, setRegion] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (type === "CORPORATE") {
      setState(""); // 기업 유형일 경우 상태 초기화
    }
  }, [type]);

  const handleDownload = async () => {
    const params: Record<string, string> = {};
    if (type) params.type = type;
    if (type !== "CORPORATE" && state) params.state = state; // 조건부 추가
    if (region) params.region = region;

    const queryString = new URLSearchParams(params).toString();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(
        `${baseUrl}/admin/user/list/excel?${queryString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("baseUrl: ", baseUrl);

      if (!response.ok) throw new Error("엑셀 다운로드 실패");

      const blob = await response.blob();
      const contentDisposition =
        response.headers.get("Content-Disposition") || "";
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      const fileName = fileNameMatch
        ? decodeURIComponent(fileNameMatch[1])
        : "회원정보.xlsx";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      alert("엑셀 다운로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          회원 정보 엑셀 다운로드
        </Typography>
        <Divider sx={{ my: 2 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>회원 유형</InputLabel>
          <Select
            value={type}
            label="회원 유형"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="CORPORATE">사업자</MenuItem>
            <MenuItem value="MANAGER">지점장</MenuItem>
            <MenuItem value="PROFESSOR">교수</MenuItem>
          </Select>
        </FormControl>

        {type !== "CORPORATE" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>회원 상태</InputLabel>
            <Select
              value={state}
              label="회원 상태"
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="PENDING">승인 대기중</MenuItem>
              <MenuItem value="APPROVED">승인</MenuItem>
              <MenuItem value="REJECTED">반려</MenuItem>
            </Select>
          </FormControl>
        )}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>지역</InputLabel>
          <Select
            value={region}
            label="지역"
            onChange={(e) => setRegion(e.target.value)}
          >
            <MenuItem value="">전체</MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" fullWidth onClick={handleDownload}>
          엑셀 다운로드
        </Button>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          엑셀 다운로드가 완료되었습니다.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExcelDownloadPage;
