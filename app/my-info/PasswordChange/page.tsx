import React from "react";
import { Typography, TextField, Button, Alert, Box } from "@mui/material";

function PasswordChange() {
  return (
    <Box>
      <Typography variant="h6">비밀번호 변경</Typography>
      <Alert severity="info" sx={{ mt: 2 }}>
        <strong>비밀번호 확인 안내</strong>
        <br />
        계정 보호를 위해 이메일과 비밀번호를 입력해 주세요.
      </Alert>
      <TextField
        fullWidth
        label="이메일"
        variant="outlined"
        margin="normal"
        defaultValue="email@email.com"
      />
      <TextField
        fullWidth
        label="비밀번호"
        type="password"
        variant="outlined"
        margin="normal"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled
      >
        확인
      </Button>
    </Box>
  );
}

export default PasswordChange;
