"use client";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useManagement } from "@/app/hooks/apis/useManagement";

function SubmitManaging() {
  const [applyType, setApplyType] = useState("R&D");
  const [message, setMessage] = useState("");
  const { mutate } = useManagement();
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [showAppliedDialog, setShowAppliedDialog] = useState(false);

  const handleApplyRequest = () => {
    mutate(
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          mgrType: applyType,
          description: message,
        },
      },
      {
        onSuccess: () => {
          setShowApplyDialog(false);
          setShowAppliedDialog(true);
        },
        onError: (error) => {
          console.error("매니저 신청 실패:", error);
          alert("매니저 신청에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  const handleApplyComplete = () => {
    setShowAppliedDialog(false);
    setApplyType("R&D");
    setMessage("");
  };

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

          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowApplyDialog(true)}
          >
            매니지 신청하기
          </Button>

          <Dialog open={showApplyDialog} fullWidth>
            <DialogTitle>매니저 신청</DialogTitle>
            <DialogContent>매니징을 신청하시겠습니까?</DialogContent>
            <DialogActions>
              <Button onClick={() => setShowApplyDialog(false)}>닫기</Button>
              <Button variant="contained" onClick={handleApplyRequest}>
                확인
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={showAppliedDialog} fullWidth>
            <DialogTitle>매니저 신청 완료</DialogTitle>
            <DialogContent>매니저 신청이 완료되었습니다.</DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleApplyComplete}>
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </Box>
  );
}

export default SubmitManaging;
