"use client";

import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Input,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { profileAtom } from "@/app/store/profileAtom";
import { useAtom, useAtomValue } from "jotai";
import { useTheme } from "@mui/material/styles";
import { usePatchUser } from "@/app/hooks/apis/usePatchUser";
import { useDeleteUser } from "@/app/hooks/apis/useDeleteUser";
import { useRouter } from "next/navigation";
import { isLoginAtom } from "@/app/store/authAtom";

export default function MemberInfo() {
  const profile = useAtomValue(profileAtom);
  const { mutate: patchUser } = usePatchUser();
  const { mutate: deleteUser } = useDeleteUser();
  const router = useRouter();
  const [, setIsLogin] = useAtom(isLoginAtom);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [form, setForm] = useState({
    email: profile?.email || "",
    phoneNumber: profile?.phoneNumber || "",
    branchName: profile?.branchName || "",
    region: profile?.region || "",
    verificationPhoto: null as File | null,
  });

  const handleWithdraw = () => {
    if (confirmEmail !== form.email) {
      setEmailError(true);
      return;
    }

    deleteUser(
      { body: { email: form.email } },
      {
        onSuccess: () => {
          alert("회원 탈퇴가 완료되었습니다.");
          localStorage.removeItem("authToken");
          sessionStorage.removeItem("authToken");
          setIsLogin(false);
          router.push("/");
        },
        onError: () => {
          alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, verificationPhoto: file }));
  };

  const handleSubmit = () => {
    if (!profile) return;

    const isCorporate = profile.type === "CORPORATE";
    const payload: any = {
      type: profile.type.toLowerCase(),
      email: form.email,
      phoneNumber: form.phoneNumber,
    };

    if (!isCorporate) {
      payload.branchName = form.branchName;
      payload.region = form.region;
      if (form.verificationPhoto) {
        payload.verificationPhoto = form.verificationPhoto;
      }
    }

    patchUser({ body: payload });
  };

  if (!profile) return null;

  const {
    name,
    location,
    type,
    branchName,
    organization,
    region,
    verificationPhoto,
    additionalInfo,
  } = profile;

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "CORPORATE":
        return "기업 회원";
      case "MANAGER":
        return "은행 매니저";
      case "PROFESSOR":
        return "교수 회원";
      case "ADMIN":
        return "관리자";
      default:
        return "일반 회원";
    }
  };

  console.log("additionalInfo: ");

  return (
    <Box mt={4} maxWidth={600} mx="auto">
      <Typography variant="h6" gutterBottom>
        회원 정보
      </Typography>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="이름" fullWidth value={name} disabled />
              <TextField
                label="이메일"
                name="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
              />
              <TextField label="소재지" fullWidth value={location} disabled />
              <TextField
                label="전화번호"
                name="phoneNumber"
                fullWidth
                value={form.phoneNumber}
                onChange={handleChange}
              />
              <TextField
                label="회원유형"
                fullWidth
                value={getUserTypeLabel(type)}
                disabled
              />
              {type === "MANAGER" && (
                <TextField
                  label="지점명"
                  name="branchName"
                  fullWidth
                  value={form.branchName}
                  onChange={handleChange}
                />
              )}
              {(type === "MANAGER" || type === "PROFESSOR") && (
                <TextField
                  label="지역"
                  name="region"
                  fullWidth
                  value={form.region}
                  onChange={handleChange}
                />
              )}

              {(type === "MANAGER" || type === "PROFESSOR") && (
                <>
                  {additionalInfo.expertInfoVerifyData && (
                    <Grid item xs={12}>
                      <Box mb={2} textAlign="center">
                        <img
                          src={additionalInfo.expertInfoVerifyData}
                          alt="제출한 증명서 사진"
                          style={{
                            maxWidth: "100%",
                            maxHeight: 200,
                            borderRadius: 8,
                          }}
                        />
                        <Typography variant="caption" display="block" mt={1}>
                          제출한 증명서 사진
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                  <Input
                    type="file"
                    name="verificationPhoto"
                    onChange={handleFileChange}
                  />
                </>
              )}
              <Button variant="contained" onClick={handleSubmit}>
                회원정보 변경
              </Button>
              {/* 회원 탈퇴 버튼 (눈에 띄지 않게) */}
              <Box textAlign="right">
                <Button
                  size="small"
                  variant="text"
                  color="error"
                  onClick={() => setWithdrawOpen(true)}
                >
                  회원 탈퇴
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {/* 탈퇴 확인 모달 */}
      <Dialog open={withdrawOpen} onClose={() => setWithdrawOpen(false)}>
        <DialogTitle>회원 탈퇴</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            정말로 회원 탈퇴를 진행하시겠습니까?
            <br />
            탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
          </Typography>
          <TextField
            fullWidth
            label="이메일을 입력해 탈퇴를 확인해주세요."
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "이메일이 일치하지 않습니다." : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWithdrawOpen(false)}>취소</Button>
          <Button onClick={handleWithdraw} color="error" variant="contained">
            탈퇴하기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
