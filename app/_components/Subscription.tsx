"use client";

import { Button, Stack, Typography } from "@mui/material";

import { BREAKPOINTS } from "../libs/theme";
import React from "react";
import { SubscriptionsRounded } from "@mui/icons-material";
import { isLoginAtom } from "../store/authAtom";
import { useAtomValue } from "jotai";
import { useIsMobile } from "../hooks/useIsMobileSize";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

function Subscription() {
  const router = useRouter();
  const isLogin = useAtomValue(isLoginAtom);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const handleSubscribeButton = () => {
    if (isLogin) {
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Stack
      mx="auto"
      width="100%"
      maxWidth={BREAKPOINTS.mobile}
      height="100%"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="action.hover"
      gap={4}
      marginY={4}
      padding={2}
      borderRadius={4}
      sx={{
        scrollSnapAlign: "center",
      }}
    >
      <Stack flexDirection="row" gap={2} alignItems="center">
        {!isMobile && <SubscriptionsRounded sx={{ fontSize: "1rem" }} />}
        <Typography variant="body1">
          기업에 필요한 자료를 구독하세요.
        </Typography>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSubscribeButton}
        disableElevation
      >
        {t("subscribe")}
      </Button>
    </Stack>
  );
}

export default Subscription;
