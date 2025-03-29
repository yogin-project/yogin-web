"use client";

import React, { ChangeEvent, useState } from "react";
import MobileWrapper from "../layout/MobileWrapper";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useVerifyEmailMutation } from "../hooks/apis/useVerifyEmail";
import { useResetPasswordMutation } from "../hooks/apis/useResetPassword";
import { useRouter } from "next/navigation";

function PasswordReset() {
  const router = useRouter();
  const {mutate: verifyEmailMutate} = useVerifyEmailMutation();
  const {mutate: resetPasswordMutate} = useResetPasswordMutation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (emailError !== '') {
      setEmailError('');
    }

    setEmail(e.target.value);
  }

  const [isVerifyCodeSent, setIsVerifyCodeSent] = useState(false);

  const handleVerifyEmail = () => {
    if(email === '') {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    verifyEmailMutate({
      body: { email }
    }, {
      onSuccess: () => {
        setIsVerifyCodeSent(true);
      },
      onError: (error: any) => {
        switch(error.details.errorCode) {
          case 'NO_EXISTS_EMAIL_USER':
            setEmailError("해당 이메일의 계정이 존재하지 않습니다");
            return;
          default:
            alert(`이메일 인증번호 전송이 실패하였습니다.: ${JSON.stringify(error)}`);
        }
      }
    })
  }

  const [verifyCode, setVerifyCode] = useState('');
  const [verifyCodeError, setVerifyCodeError] = useState('');
  const [verifySuccess, setVerifySuccess] = useState(false);
  const handleChangeVerifyCode = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length > 6) {
      return;
    }

    setVerifyCode(e.target.value);
  }

  const handleResetPassword = () => {
    resetPasswordMutate({
      body: {
        email,
        verifyCode
      }
    }, {
      onSuccess: () => {
        setVerifySuccess(true);
      },
      onError: () => {
        setVerifyCodeError('인증번호를 다시 확인해주세요')
      }
    })
  }

  const handleVerifySuccessDialogClose = () => {
    router.replace('/sign-in');
  }

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

      <Box height={32} />

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
          mb: 4,
        }}
      >
        <Typography variant="h6">비밀번호 초기화</Typography>
        <Box height={12} />
        <Typography variant="body1">본인 인증</Typography>
        <Box height={8} />
        <Divider />
        <Box height={32} />
        <TextField fullWidth variant="standard" label="이메일" onChange={handleChangeEmail} disabled={isVerifyCodeSent} error={emailError !== ''} helperText={emailError} />
        <Box height={16} />
        <Button fullWidth variant="contained" size="large" color="primary" onClick={handleVerifyEmail} disabled={isVerifyCodeSent || emailError !== ''}>
          인증번호 발송
        </Button>
        <Box height={12} />
        {isVerifyCodeSent && <Button fullWidth variant="outlined" size="large" color="primary" onClick={() => setIsVerifyCodeSent(false)}>
          인증번호 재발송
        </Button>}
        <Box height={12} />
        {isVerifyCodeSent && <Alert variant="standard">
          <AlertTitle>인증번호 발송 성공</AlertTitle>
          <Typography variant="body2">
            메일함에서 인증번호를 확인하여 아래에 입력해주세요.
          </Typography>
        </Alert>}

        <Box height={56} />

        <Typography variant="body1">새로운 비밀번호 발송</Typography>
        <Box height={8} />
        <Divider />
        <Box height={32} />
        <TextField fullWidth variant="standard" label="인증번호 확인" onChange={handleChangeVerifyCode} error={verifyCodeError !== ''} helperText={verifyCodeError}/>
        <Box height={16} />
        <Button fullWidth variant="contained" size="large" color="primary" onClick={handleResetPassword} disabled={email === '' || !isVerifyCodeSent || verifyCode === ''}>
          새로운 비밀번호 발송
        </Button>
      </Paper>

      <Dialog open={verifySuccess} fullWidth>
      <DialogTitle>새로운 비밀번호 발송 완료</DialogTitle>
      <DialogContent>새로운 비밀번호가 발송되었습니다.<br/>메일함에서 비밀번호를 확인하여 로그인해주세요.</DialogContent>
      <DialogActions>
        <Button onClick={handleVerifySuccessDialogClose}>확인</Button>
      </DialogActions>
    </Dialog>
    </MobileWrapper>
  );
}

export default PasswordReset;
