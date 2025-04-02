"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";

function SubmitManaging() {
  const [applyType, setApplyType] = useState("R&D");
  const [message, setMessage] = useState("");

  return (
    <Box mt={4} maxWidth={600} mx="auto">
      <Typography variant="h5" gutterBottom fontWeight={600}>
        매니지 신청
      </Typography>

      <Alert
        severity="info"
        sx={{ mb: 3, fontSize: 15, lineHeight: 1.8, borderRadius: 2 }}
      >
        자금조달 신청 후 어떤 전문가에게도 승인이 나지 않고 계속 부결될 경우,
        <strong>
          {" "}
          매니저에게 직접 자금조달 관련 상담을 요청할 수 있습니다.
        </strong>{" "}
        <br />
        해당 기능을 통해 매니저에게 메시지를 전달하면 빠르게 검토 후 연락을
        드립니다.
      </Alert>

      <Paper sx={{ p: 4 }} elevation={3}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            select
            label="분류 선택"
            value={applyType}
            onChange={(e) => setApplyType(e.target.value)}
            fullWidth
          >
            <MenuItem value="R&D">R&D</MenuItem>
            <MenuItem value="대출신청">대출신청</MenuItem>
          </TextField>

          <TextField
            label="매니저에게 보낼 메시지 (100자 이내)"
            multiline
            rows={3}
            inputProps={{ maxLength: 100 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
          />

          <Button variant="contained" color="primary">
            매니지 신청하기
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default SubmitManaging;
