"use client";

import React from "react";
import MobileWrapper from "../layout/MobileWrapper";
import {
  Button,
  Divider,
  Grid2,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../hooks/useIsMobileSize";
import { fullVhWithoutHeader } from "../utils";
import { useRouteSignUp } from "./index.hooks";
import { MemberType } from "../types/common";

function SignUp() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const handleRouteSignUp = useRouteSignUp();

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
        alignItems="center"
        px={2}
        py={4}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",

            p: 4,
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h6" mb={1}>
            {t("select_signup_type")}
          </Typography>
          <Divider />
          <Grid2 container spacing={2} minWidth="100%" mt={4} key={"sign-up"}>
            {signupOptions.map(({ key, label }) => (
              <Grid2 size={12} key={key}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => handleRouteSignUp(key)}
                >
                  {label}
                </Button>
              </Grid2>
            ))}
          </Grid2>
        </Paper>
      </Stack>
    </MobileWrapper>
  );
}

export default SignUp;
