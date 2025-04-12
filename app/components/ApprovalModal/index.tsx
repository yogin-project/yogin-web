import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";

interface ApprovalModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string | null) => void;
  type: "approve" | "reject" | "require";
  title?: string;
  confirmText?: string;
}

const getModalConfig = (type: ApprovalModalProps["type"]) => {
  switch (type) {
    case "approve":
      return {
        icon: <CheckCircleOutlineIcon color="success" sx={{ fontSize: 56 }} />,
        label: "승인 가능한 금액(억 단위)을 입력해주세요.",
        placeholder: "예: 20",
        buttonLabel: "승인",
      };
    case "reject":
      return {
        icon: <CancelOutlinedIcon color="error" sx={{ fontSize: 56 }} />,
        label: "해당 신청을 반려하시겠습니까?",
        placeholder: null,
        buttonLabel: "반려",
      };
    case "require":
    default:
      return {
        icon: <HelpOutlineOutlinedIcon color="info" sx={{ fontSize: 56 }} />,
        label: "요청할 추가 자료 내용을 입력해주세요.",
        placeholder: "예: 최근 3개월 거래내역서",
        buttonLabel: "요청",
      };
  }
};

export default function ApprovalModal({
  open,
  onClose,
  onSubmit,
  type,
  title = "확인",
  confirmText,
}: ApprovalModalProps) {
  const [inputValue, setInputValue] = useState("");

  const config = getModalConfig(type);

  useEffect(() => {
    if (!open) setInputValue("");
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          px: 4,
          py: 3,
          width: "100%",
          maxWidth: 440,
          textAlign: "center",
        },
      }}
    >
      <Box position="absolute" top={12} right={12}>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={2} alignItems="center" mt={1}>
        {config.icon}
        <Typography variant="h6" whiteSpace="pre-line">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {config.label}
        </Typography>

        {config.placeholder && (
          <TextField
            fullWidth
            multiline={type === "require"}
            minRows={type === "require" ? 3 : 1}
            variant="outlined"
            placeholder={config.placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ mt: 2 }}
          />
        )}
      </Stack>

      <DialogActions sx={{ justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          onClick={() => onSubmit(config.placeholder ? inputValue : null)}
        >
          {confirmText || config.buttonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
