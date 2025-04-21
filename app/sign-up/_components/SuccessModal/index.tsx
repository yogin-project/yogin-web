// app/components/SuccessModal.tsx

"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { BREAKPOINTS } from "@/app/libs/theme";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessModal({
  open,
  onClose,
  message,
}: SuccessModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 3,
          textAlign: "center",
          width: "100%",
          maxWidth: BREAKPOINTS.mobile,
        },
      }}
    >
      <Box position="absolute" top={8} right={8}>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={2} alignItems="center" mt={1}>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ whiteSpace: "pre-wrap", wordBreak: "keep-all" }}
        >
          {message}
        </Typography>
      </Stack>

      <DialogActions sx={{ justifyContent: "center", mt: 3 }}>
        <Button variant="contained" onClick={onClose}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
