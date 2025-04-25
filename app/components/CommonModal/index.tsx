// app/components/SuccessModal.tsx

"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export default function CommonModal({
  open,
  onClose,
  message,
}: CommonModalProps) {
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
          maxWidth: 400,
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
          sx={{ whiteSpace: "pre-line" }}
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
