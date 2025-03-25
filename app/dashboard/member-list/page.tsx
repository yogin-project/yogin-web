"use client";

import { Paper, Typography, Box, Button } from "@mui/material";

export default function MemberListPage() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        가입 관리
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>📌 필터 영역</Box>
        <Box>
          <Button variant="contained" sx={{ mr: 1 }}>
            가입 승인
          </Button>
          <Button variant="outlined">반려</Button>
        </Box>
      </Box>
      <Box>📄 테이블 자리</Box>
    </Paper>
  );
}
