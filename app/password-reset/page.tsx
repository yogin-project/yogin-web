import React from "react";
import MobileWrapper from "../layout/MobileWrapper";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

function PasswordReset() {
  return (
    <MobileWrapper>
      <Alert variant="standard" severity="info">
        <AlertTitle>비밀번호 초기화 안내</AlertTitle>
        <Typography variant="body2">
          가입 시 등록하신 이메일을 통해 본인 인증 후, 새로운 비밀번호를 해당
          이메일로 발송해드립니다. 안전한 서비스 이용을 위해 초기화 후 즉시
          비밀번호를 변경해주시기 바랍니다.
        </Typography>
      </Alert>
      <Box height={56} />
      <Typography variant="h6">비밀번호 초기화</Typography>
      <Box height={12} />
      <Typography variant="body1">본인 인증</Typography>
      <Box height={8} />
      <Divider />
      <Box height={32} />
      <TextField variant="standard" label="이메일" />
      <Box height={16} />
      <Button variant="contained" size="large" color="primary">
        인증번호 발송
      </Button>
      <Box height={56} />
      <Typography variant="body1">새로운 비밀번호 발송</Typography>
      <Box height={8} />
      <Divider />
      <Box height={32} />
      <TextField variant="standard" label="인증번호 확인" />
      <Box height={16} />
      <Button variant="contained" size="large" color="primary">
        새로운 비밀번호 발송
      </Button>
    </MobileWrapper>
  );
}

export default PasswordReset;
