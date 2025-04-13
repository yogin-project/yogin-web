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
  TextField,
} from "@mui/material";

const ApplicationExcelDownloadPage = () => {
  const [type, setType] = useState("");
  const [subData, setSubData] = useState("");
  const [state, setState] = useState("");
  const [corpId, setCorpId] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDownload = async () => {
    const params: Record<string, string> = {
      page: "1",
      limit: "10",
      sort: "ASC",
      OrderBy: "regDate",
    };

    if (type) params.type = type;
    if (subData) params.subData = subData;
    if (state) params.state = state;
    if (corpId) params.corpId = corpId;
    if (location) params.location = location;
    if (category) params.category = category;

    const queryString = new URLSearchParams(params).toString();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(
        `${baseUrl}/admin/application/list/excel?${queryString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) throw new Error("엑셀 다운로드 실패");

      const blob = await response.blob();
      const contentDisposition =
        response.headers.get("Content-Disposition") || "";
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      const fileName = fileNameMatch
        ? decodeURIComponent(fileNameMatch[1])
        : "자금신청현황.xlsx";

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
          자금 신청 현황 엑셀 다운로드
        </Typography>
        <Divider sx={{ my: 2 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>[필수] 신청 분류</InputLabel>
          <Select
            value={type}
            label="신청 분류 (필수 기입하세요.)"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="FUND">대출</MenuItem>
            <MenuItem value="RND">R&D</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>
            [선택] 회원 종류 (기입하지 않으면 구분없이 전체 조회됩니다.)
          </InputLabel>
          <Select
            value={subData}
            label="회원 종류 (기입하지 않으면 구분없이 전체 조회됩니다.)"
            onChange={(e) => setSubData(e.target.value)}
          >
            <MenuItem value="">없음</MenuItem>
            <MenuItem value="CORPORATE">기업</MenuItem>
            <MenuItem value="EXPERT">전문가</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>
            [선택] 신청 상태 (기입하지 않으면 구분없이 전체 조회됩니다.)
          </InputLabel>
          <Select
            value={state}
            label="신청 상태 (기입하지 않으면 구분없이 전체 조회됩니다.)"
            onChange={(e) => setState(e.target.value)}
          >
            <MenuItem value="">전체</MenuItem>
            <MenuItem value="registered">신청완료</MenuItem>
            <MenuItem value="approved">승인</MenuItem>
            <MenuItem value="rejected">반려</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="[선택] 회원 ID(ex: 17) - 특정 유저 검색 시, 입력하세요"
          value={corpId}
          onChange={(e) => setCorpId(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="[선택] 소재지 (location) - (기입하지 않으면 구분없이 전체 조회됩니다.)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="[선택] 업태 (category) - (기입하지 않으면 구분없이 전체 조회됩니다.)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ mb: 2 }}
        />

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

export default ApplicationExcelDownloadPage;
