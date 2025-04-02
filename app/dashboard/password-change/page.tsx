"use client";

import React, { useState } from "react";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";

export default function PasswordChange() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (form.newPassword !== form.confirmNewPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 변경 API 호출 로직 삽입 예정
    console.log("비밀번호 변경 요청:", form);
    alert("비밀번호가 변경되었습니다.");
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
