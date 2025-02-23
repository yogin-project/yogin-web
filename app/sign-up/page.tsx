"use client";

import React from "react";
import MobileWrapper from "../layout/MobileWrapper";
import { Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../hooks/useIsMobileSize";
import { fullVhWithoutHeader } from "../utils";
import { useRouteSignUp } from "./index.hooks";

function SignUp() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const handleRouteSignUp = useRouteSignUp();

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
        <Grid2 container spacing={2} minWidth={"100%"} mt={4}>
          <Grid2 size={isMobile ? 12 : 4}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleRouteSignUp}
            >
              {t("corporate")}
            </Button>
          </Grid2>
          <Grid2 size={isMobile ? 12 : 4}>
            <Button fullWidth variant="contained" size="large">
              {t("professor")}
            </Button>
          </Grid2>
          <Grid2 size={isMobile ? 12 : 4}>
            <Button fullWidth variant="contained" size="large">
              {t("banker")}
            </Button>
          </Grid2>
        </Grid2>
      </Stack>
    </MobileWrapper>
  );
}

export default SignUp;
