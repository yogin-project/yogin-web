"use client";

import { BREAKPOINTS } from "@/app/libs/theme";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

function HeaderDesktop() {
  const { t } = useTranslation();

  return (
    <Stack width="100%" height={80} display="flex" justifyContent="center">
      <Stack
        maxWidth={BREAKPOINTS.desktop}
        height="100%"
        width="100%"
        margin="0 auto"
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} gap={4}>
          <Box
            sx={{
              cursor: "pointer",
            }}
          >
            <Typography>{t("home")}</Typography>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
            }}
          >
            <Typography>{t("policy_funding")}</Typography>
          </Box>
        </Stack>
        <Stack direction={"row"} gap={1.5}>
          <Button size="small" variant="contained">
            {t("login")}
          </Button>
          <Button size="small" variant="contained">
            {t("sign_up")}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default HeaderDesktop;
