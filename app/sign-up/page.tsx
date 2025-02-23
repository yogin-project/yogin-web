"use client";

import React from "react";
import MobileWrapper from "../layout/MobileWrapper";
import { Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../hooks/useIsMobileSize";
import { fullVhWithoutHeader } from "../utils";
import { useRouteSignUp } from "./index.hooks";
import { MemberType } from "../types/common";

function SignUp() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const handleRouteSignUp = useRouteSignUp();

  // 버튼 리스트를 배열로 관리하여 코드 간결화
  const signupOptions: { key: MemberType; label: string }[] = [
    { key: "corporate", label: t("corporate") },
    { key: "professor", label: t("professor") },
    { key: "banker", label: t("banker") },
  ];

  return (
    <MobileWrapper>
      <Stack
        height={isMobile ? fullVhWithoutHeader : ""}
        justifyContent={isMobile ? "center" : "unset"}
      >
        <Typography variant="h6" mb={1}>
          {t("select_signup_type")}
        </Typography>
        <Divider />
        <Grid2 container spacing={2} minWidth="100%" mt={4}>
          {signupOptions.map(({ key, label }) => (
            <Grid2 size={isMobile ? 12 : 4}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => handleRouteSignUp(key)}
              >
                {label}
              </Button>
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </MobileWrapper>
  );
}

export default SignUp;
