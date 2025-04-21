"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";

import CommonModal from "@/app/components/CommonModal";
import { isLoginAtom } from "@/app/store/authAtom";
import { profileAtom } from "@/app/store/profileAtom";
import { useDeleteUser } from "@/app/hooks/apis/useDeleteUser";
import { usePatchUser } from "@/app/hooks/apis/usePatchUser";
import { useProfileLazyQuery } from "@/app/hooks/apis/useProfile";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";

export default function MemberInfo() {
  const [profile, setProfile] = useAtom(profileAtom);

  const { mutate: patchUser } = usePatchUser();
  const { mutate: deleteUser } = useDeleteUser();
  const router = useRouter();
  const [, setIsLogin] = useAtom(isLoginAtom);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [isMoalOpen, setIsMoalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const fetchProfile = useProfileLazyQuery();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
    address: "",
    branchName: "",
    organization: "",
    verificationPhoto: null as File | null,
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        location: profile.location || "",
        address: profile.address || "",
        branchName: profile.branchName || "",
        organization: profile.additionalInfo.expertInfoOrganization || "",
        verificationPhoto: null,
      });
    }
  }, [profile]);

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

  const handleModalClose = () => {
    fetchProfile().then((data) => {
      setProfile(data.data);
    });
    setIsMoalOpen(false);
  };

  const handleSubmit = () => {
    if (!profile) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("location", form.location);
    formData.append("address", form.address);

    if (profile.type === "MANAGER") {
      formData.append("branchName", form.branchName);
    } else if (profile.type === "PROFESSOR") {
      formData.append("organization", form.organization);
    }

    if (form.verificationPhoto) {
      formData.append("image", form.verificationPhoto);
    }

    patchUser(
      { body: formData },
      {
        onSuccess: () => {
          setIsMoalOpen(true);

          if (profile.type === "MANAGER" || profile.type === "PROFESSOR") {
            setModalText(
              "관리자의 승인 절차 이후, 회원 정보 수정이 반영됩니다."
            );
          } else {
            setModalText("회원 정보가 변경되었습니다.");
          }
        },
        onError: (e) => {
          console.log("error: ", e.details.error);
          if (e.details.error === "User not approved") {
            setIsMoalOpen(true);
            setModalText(
              "이미 관리자가 검토 중인 회원 정보 수정 사항이 있습니다."
            );

            return;
          } else {
            setIsMoalOpen(true);
            setModalText("정보를 올바르게 입력해주세요.");

            return;
          }
        },
      }
    );
  };

  if (!profile) return null;

  const {
    name,
    location,
    type,
    branchName,
    organization,
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
        return "전문가";
      default:
        return "회원";
    }
  };

  return (
    <Box mt={4} maxWidth={600} mx="auto">
      <Typography variant="h6" gutterBottom>
        회원 정보
      </Typography>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="이름"
                name="name"
                fullWidth
                value={form.name}
                onChange={handleChange}
              />
              <TextField
                label="이메일"
                name="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                label="소재지"
                name="location"
                fullWidth
                value={form.location}
                onChange={handleChange}
              />
              <TextField
                label="주소"
                name="address"
                fullWidth
                value={form.address}
                onChange={handleChange}
              />
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
              {type === "PROFESSOR" && (
                <TextField
                  label="소속 기관"
                  name="organization"
                  fullWidth
                  value={form.organization}
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
      <CommonModal
        message={modalText}
        open={isMoalOpen}
        onClose={handleModalClose}
      />
    </Box>
  );
}
