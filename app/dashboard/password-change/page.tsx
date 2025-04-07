"use client";

import React, { ChangeEvent, useState } from "react";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import { useChangePassword } from "@/app/hooks/apis/useChangePassword";
import { useRouter } from "next/navigation";
import { isValidPassword } from "@/app/utils";

export default function PasswordChange() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate } = useChangePassword();
  const router = useRouter();
  const handleSubmit = () => {
    if (!isValidPassword(form.newPassword)) {
      alert("비밀번호는 영문자를 포함한 8자리 이상이어야 합니다.");
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    mutate(
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          originPwd: form.currentPassword,
          newPwd: form.newPassword,
        },
      },
      {
        onSuccess: () => {
          alert("비밀번호가 변경되었습니다.");
          // 로그아웃 로직 필요
          router.replace("/sign-in");
        },
        onError: (error) => {
          console.error("비밀번호 변경 실패:", error);
          alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  return (
    <Box mt={4} maxWidth={600} mx="auto">
      <Typography variant="h6" gutterBottom>
        비밀번호 변경
      </Typography>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="기존 비밀번호"
              name="currentPassword"
              type="password"
              fullWidth
              value={form.currentPassword}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="새 비밀번호"
              name="newPassword"
              type="password"
              fullWidth
              value={form.newPassword}
              onChange={handleChange}
              helperText={"비밀번호는 영문자 포함 8자리 이상 입력해주세요."}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="새 비밀번호 확인"
              name="confirmNewPassword"
              type="password"
              fullWidth
              value={form.confirmNewPassword}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              비밀번호 변경
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
