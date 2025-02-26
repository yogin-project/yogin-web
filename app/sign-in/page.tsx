"use client";

import React from "react";
import MobileWrapper from "../layout/MobileWrapper";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useRouteSignInPage } from "./index.hooks";

function SignIn() {
  const handleRouting = useRouteSignInPage();

  return (
    <MobileWrapper>
      <Typography variant="h6" mb={1}>
        로그인
      </Typography>
      <Divider />
      <Box height={32} />
      <TextField variant="standard" label="이메일" />
      <Box height={16} />
      <TextField variant="standard" label="비밀번호" />
      <Stack direction="row" alignItems="center" mt={4} mb={2}>
        <FormControlLabel
          control={<Checkbox checked={true} onChange={() => {}} />}
          label="로그인 유지"
        />
      </Stack>
      <Button fullWidth variant="contained">
        로그인
      </Button>
      <Box height={16} />
      <Button
        fullWidth
        variant="outlined"
        endIcon={<ChevronRight />}
        onClick={() => handleRouting("password-reset")}
      >
        비밀번호를 잊으셨다면
      </Button>
      <Box mt={5} mb={2}>
        <Typography variant="body2" textAlign={"center"} color="textSecondary">
          계정이 없으신가요?
        </Typography>
      </Box>
      <Button onClick={() => handleRouting("sign-up")}>회원가입</Button>
    </MobileWrapper>
  );
}

export default SignIn;
