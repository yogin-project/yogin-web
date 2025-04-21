"use client";

import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { useAdminApprove } from "@/app/hooks/apis/useAdminApprove";
import { useSearchParams } from "next/navigation";

function UserDetailPage() {
  const searchParams = useSearchParams();
  const rawUser = searchParams.get("user");
  const parsedUser = rawUser ? JSON.parse(decodeURIComponent(rawUser)) : null;
  const [user, setUser] = useState(parsedUser);

  const { mutate, isPending } = useAdminApprove();

  const [open, setOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  if (!user) return <Typography>유저 정보를 불러올 수 없습니다.</Typography>;

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleImageClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApprove = () => {
    mutate(
      {
        body: {
          userId: user.id,
          isApprove: true,
        },
      },
      {
        onSuccess: () => {
          setUser((prev) => ({ ...prev, adminApproval: 1 }));
          setSnackbar({
            open: true,
            message: "승인이 완료되었습니다.",
            severity: "success",
          });
        },
      }
    );
  };

  const handleReject = () => {
    mutate(
      {
        body: {
          userId: user.id,
          isApprove: false,
          message: rejectReason,
        },
      },
      {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: "거절 처리되었습니다.",
            severity: "info",
          });
        },
      }
    );
  };

  const renderVerifyImage = () => (
    <>
      <Box mt={2}>
        <Typography gutterBottom>
          <b>증빙자료:</b>
        </Typography>
        <img
          src={user.verifyData}
          alt="증빙자료"
          onClick={handleImageClick}
          style={{
            maxWidth: "100%",
            borderRadius: 8,
            border: "1px solid #eee",
            cursor: "pointer",
          }}
        />
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent sx={{ position: "relative" }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={user.verifyData}
            alt="확대 이미지"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </DialogContent>
      </Dialog>
    </>
  );

  console.log(user);

  return (
    <Box maxWidth="700px" mx="auto" mt={6} px={3}>
      <Typography variant="h4" gutterBottom fontWeight={600} textAlign="center">
        회원 상세 정보
      </Typography>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">기본 정보</Typography>
            <Chip label={user.type} color="primary" variant="outlined" />
          </Box>
          <Divider />
          <Stack spacing={1}>
            <Typography>
              <b>ID:</b> {user.id}
            </Typography>
            <Typography>
              <b>이메일:</b> {user.email}
            </Typography>
            <Typography>
              <b>이름:</b> {user.name}
            </Typography>
            <Typography>
              <b>전화번호:</b> {user.phoneNumber}
            </Typography>
            <Typography>
              <b>소재지:</b> {user.location}
            </Typography>
            <Typography>
              <b>상세 주소:</b> {user.address}
            </Typography>
            <Typography>
              <b>가입일:</b> {formatDate(user.createdAt)}
            </Typography>
            {user.updatedAt && (
              <Typography>
                <b>수정일:</b> {formatDate(user.updatedAt)}
              </Typography>
            )}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {user.type === "CORPORATE" && (
            <>
              <Typography variant="h6">기업 정보</Typography>
              <Typography>
                <b>회사명:</b> {user.corpName}
              </Typography>
              <Typography>
                <b>사업자번호:</b> {user.businessNo}
              </Typography>
            </>
          )}

          {user.type === "MANAGER" && (
            <>
              <Typography variant="h6">지점장 정보</Typography>
              <Typography>
                <b>은행명:</b> {user.branchName}
              </Typography>
              <Typography>
                <b>관리자 승인 여부:</b>{" "}
                {user.adminApproval ? "승인" : "미승인"}
              </Typography>
              {user.adminApprovedAt && (
                <Typography>
                  <b>승인일:</b> {formatDate(user.adminApprovedAt)}
                </Typography>
              )}
              {user.verifyData && renderVerifyImage()}
            </>
          )}

          {user.type === "PROFESSOR" && (
            <>
              <Typography variant="h6">교수 정보</Typography>
              <Typography>
                <b>소속:</b> {user.organization}
              </Typography>
              <Typography>
                <b>직책:</b> {user.position}
              </Typography>
              <Typography>
                <b>관리자 승인 여부:</b>{" "}
                {user.adminApproval ? "승인" : "미승인"}
              </Typography>
              {user.adminApprovedAt && (
                <Typography>
                  <b>승인일:</b> {formatDate(user.adminApprovedAt)}
                </Typography>
              )}
              {user.verifyData && renderVerifyImage()}
            </>
          )}

          {user.type !== "CORPORATE" && (
            <Box display="flex" flexDirection="column" gap={2} mt={4}>
              <Typography variant="h6">가입 승인 처리</Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isPending}
                  onClick={handleApprove}
                >
                  승인
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={isPending || !rejectReason}
                  onClick={handleReject}
                >
                  반려
                </Button>
              </Box>
              <TextField
                label="거절 사유 (반려 시 필수)"
                multiline
                minRows={2}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </Box>
          )}
        </Stack>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity as any}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserDetailPage;
