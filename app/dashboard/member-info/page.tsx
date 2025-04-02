"use client";

import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { profileAtom } from "@/app/store/profileAtom";
import { useAtomValue } from "jotai";
import { useTheme } from "@mui/material/styles";
import { usePatchUser } from "@/app/hooks/apis/usePatchUser";

export default function MemberInfo() {
  const profile = useAtomValue(profileAtom);
  const { mutate: patchUser } = usePatchUser();

  if (!profile) return null;

  const {
    email,
    name,
    phoneNumber,
    location,
    type,
    branchName,
    organization,
    region,
    verificationPhoto,
    notification,
    state,
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

  return (
    <Box mt={4} maxWidth={600} mx="auto">
      <Typography variant="h6" gutterBottom>
        회원 정보
      </Typography>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Grid container spacing={2} alignItems="center">
          {verificationPhoto && (
            <Grid item xs={12}>
              <Box mb={2} textAlign="center">
                <img
                  src={verificationPhoto}
                  alt="제출한 증명서 사진"
                  style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
                />
                <Typography variant="caption" display="block" mt={1}>
                  제출한 증명서 사진
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="이름" fullWidth value={name} />
              <TextField label="이메일" fullWidth value={email} />
              <TextField label="소재지" fullWidth value={location} />
              <TextField label="전화번호" fullWidth value={phoneNumber} />
              <TextField
                label="회원유형"
                fullWidth
                value={getUserTypeLabel(type)}
              />
              {type === "manager" && branchName && (
                <TextField label="지점명" fullWidth value={branchName} />
              )}
              {type === "professor" && organization && (
                <TextField label="소속" fullWidth value={organization} />
              )}
              {(type === "manager" || type === "professor") && region && (
                <TextField label="지역" fullWidth value={region} />
              )}
              <TextField
                label="알림 수신 여부"
                fullWidth
                value={notification ? "예" : "아니오"}
              />
              <TextField
                label="승인 상태"
                fullWidth
                value={
                  state === "APPROVED"
                    ? "승인됨"
                    : state === "PENDING"
                    ? "승인 대기중"
                    : "거절됨"
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
