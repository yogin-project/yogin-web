"use client";

import { BREAKPOINTS } from "@/app/libs/theme";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { headerToFixed } from "./index.styles";
import { useRouteInHeader } from "./index.hooks";
import Image from "next/image";
import { isAuthenticated } from "@/app/utils";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { isLoginAtom } from "@/app/store/authAtom";
import { useAtomValue, useSetAtom } from "jotai";

function HeaderDesktop() {
  const { t } = useTranslation();
  const handleRouteHeader = useRouteInHeader();

  const isLogin = useAtomValue(isLoginAtom);
  const setIsLogin = useSetAtom(isLoginAtom);

  useEffect(() => {
    // 앱 시작 시 localStorage/sessionStorage 확인 → 로그인 상태 세팅
    if (isAuthenticated()) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Stack
      width="100%"
      height={80}
      display="flex"
      justifyContent="center"
      sx={headerToFixed}
    >
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
          <Image
            onClick={() => handleRouteHeader("")}
            src={"/images/common/logo.png"}
            width={85}
            height={23}
            style={{
              cursor: "pointer",
            }}
            alt=""
          />

          <Box
            sx={{
              cursor: "pointer",
            }}
          >
            <Typography>{t("policy_funding")}</Typography>
          </Box>
        </Stack>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          {isLogin ? (
            <>
              <NotificationsIcon
                sx={{
                  cursor: "pointer",
                  width: 28,
                  height: 28,
                }}
              />
              <Avatar
                sx={{
                  cursor: "pointer",
                  width: 32,
                  height: 32,
                }}
              />
            </>
          ) : (
            <>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  color: (theme) => theme.palette.grey[600], // 글자색
                  borderColor: (theme) => theme.palette.grey[400], // 테두리 색
                  "&:hover": {
                    borderColor: (theme) => theme.palette.grey[500],
                    backgroundColor: "rgba(0, 0, 0, 0.04)", // 살짝 밝아지는 효과
                  },
                }}
                onClick={() => handleRouteHeader("sign-in")}
              >
                {t("login")}
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: (theme) => theme.palette.grey[600], // 배경색
                  color: (theme) => theme.palette.common.white, // 글자색
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.grey[700], // hover 시 더 어두운 회색
                  },
                }}
                onClick={() => handleRouteHeader("sign-up")}
              >
                {t("sign_up")}
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default HeaderDesktop;
