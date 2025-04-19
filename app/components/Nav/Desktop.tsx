"use client";

import { Avatar, Button, ButtonBase, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  handleCorporateSubmit,
  handleRNDSearch,
  handleRendSearch,
} from "./index.utils";
import { useAtomValue, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";

import { BREAKPOINTS } from "@/app/libs/theme";
import { DRAWER_WIDTH } from "@/app/libs/contstant";
import Image from "next/image";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { isAuthenticated } from "@/app/utils";
import { isLoginAtom } from "@/app/store/authAtom";
import { profileAtom } from "@/app/store/profileAtom";
import { useRouteInHeader } from "./index.hooks";
import useScrollDirection from "@/app/hooks/useScrollDirection";
import { useTranslation } from "react-i18next";

const HeaderDesktop = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleRouteHeader = useRouteInHeader();
  const profileInfo = useAtomValue(profileAtom);
  const pathname = usePathname();

  const direction = useScrollDirection(80);

  const [type, setType] = useState("");

  const isVisible = direction !== "down";

  const isLogin = useAtomValue(isLoginAtom);
  const setIsLogin = useSetAtom(isLoginAtom);

  useEffect(() => {
    // 앱 시작 시 localStorage/sessionStorage 확인 → 로그인 상태 세팅
    if (isAuthenticated()) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    if (profileInfo?.type) {
      setType(profileInfo?.type);
    } else {
      setType("");
    }
    return () => {
      setType("");
    };
  }, [profileInfo?.type]);

  return (
    <Stack
      component="nav"
      width="100%"
      minHeight={80}
      height="fit-content"
      display="flex"
      justifyContent="center"
      px={3}
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 1000,
        webkitBackdropFilter: "blur(15px)",
        backdropFilter: "blur(15px)",
        "@media (prefers-color-scheme: dark)": {
          // backgroundColor: 'rgba(var(--background), 0.2)',
        },
        transform: isVisible ? "translateY(0)" : "translateY(-80px)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Stack
        ml="auto"
        width={{
          xs: "100%",
          md: pathname.startsWith("/dashboard")
            ? `calc(100% - ${DRAWER_WIDTH}px)`
            : "100%",
        }}
        maxWidth={BREAKPOINTS.desktop}
        height={80}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          sx={{
            gap: 4,
            [`@media (max-width:${BREAKPOINTS.tablet}px)`]: {
              gap: 2,
            },
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Stack
              component="figure"
              position="relative"
              minWidth={90.5}
              minHeight={30}
              width="100%"
              height="100%"
              sx={{ cursor: "pointer" }}
            >
              <Stack
                component={Image}
                onClick={() => handleRouteHeader("")}
                src="/images/common/logo-full_landscape.png"
                fill
                objectFit="contain"
                alt="yogin logo"
              />
            </Stack>
            <Typography
              onClick={() => handleRouteHeader("")}
              fontSize="0.9rem"
              fontWeight={800}
              letterSpacing={-0.25}
              lineHeight={1}
              whiteSpace="nowrap"
              color="tertiary.light"
              sx={{
                cursor: "pointer",
              }}
            >
              요긴하게 이용하세요
            </Typography>
          </Stack>
          {(type == "CORPORATE" || type == "ADMIN") && (
            <ButtonBase
              onClick={() => handleCorporateSubmit(profileInfo?.type, router)}
              sx={{ verticalAlign: "baseline" }}
            >
              <Typography whiteSpace="nowrap">자금신청</Typography>
              <Typography
                component="span"
                color="primary.main"
                fontSize="0.75rem"
                fontWeight={600}
                whiteSpace="nowrap"
                lineHeight={1}
                sx={{
                  marginLeft: "0.5rem",
                  [`@media (max-width:${BREAKPOINTS.tablet}px)`]: {
                    marginLeft: 0,
                    position: "absolute",
                    top: "calc(50% + 0.9rem)",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
              >
                정책자금 / R&D
              </Typography>
            </ButtonBase>
          )}

          {(type == "PROFESSOR" || type == "ADMIN") && (
            <ButtonBase
              onClick={() => handleRNDSearch(profileInfo?.type, router)}
              sx={{
                cursor: "pointer",
              }}
            >
              <Typography whiteSpace="nowrap">전문가 신청</Typography>
            </ButtonBase>
          )}
        </Stack>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          {isLogin ? (
            <>
              {profileInfo?.type !== "ADMIN" ? (
                <ButtonBase onClick={() => router.push("/noti-list")}>
                  <NotificationsIcon
                    sx={{
                      cursor: "pointer",
                      width: 28,
                      height: 28,
                    }}
                  />
                </ButtonBase>
              ) : null}

              <ButtonBase onClick={() => router.push("/dashboard")}>
                <Avatar
                  sx={{
                    cursor: "pointer",
                    width: 32,
                    height: 32,
                  }}
                />
              </ButtonBase>
            </>
          ) : (
            <>
              <Button
                size="small"
                color="primary"
                onClick={() => handleRouteHeader("sign-in")}
                sx={{ whiteSpace: "nowrap" }}
              >
                {t("login")}
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleRouteHeader("sign-up")}
                sx={{ whiteSpace: "nowrap" }}
              >
                {t("sign_up")}
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HeaderDesktop;
