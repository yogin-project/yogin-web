"use client";

import { IconButton, Stack } from "@mui/material";

import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import React, { Fragment } from "react";
import { useRouter, usePathname } from "next/navigation";
import useScrollDirection from "@/app/hooks/useScrollDirection";
import { useAtomValue } from "jotai";
import { isLoginAtom } from "@/app/store/authAtom";
import { profileAtom } from "@/app/store/profileAtom";

const HeaderMobile = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = useAtomValue(isLoginAtom);
  const profile = useAtomValue(profileAtom);

  const direction = useScrollDirection(100);
  const isVisible = direction !== "down";

  const isDashboardPage = pathname.startsWith("/dashboard");

  if (isDashboardPage) {
    return <Fragment />;
  }

  return (
    <Stack
      component="nav"
      width="100%"
      height={60}
      display="flex"
      justifyContent="center"
      px={2}
      sx={{
        position: "fixed",
        top: 100,
        zIndex: 1000,
        webkitBackdropFilter: "blur(15px)",
        backdropFilter: "blur(15px)",
        "@media (prefers-color-scheme: dark)": {
          // backgroundColor: 'rgba(var(--background), 0.2)',
        },
        transform: isVisible ? "translateY(0)" : "translateY(-100px)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Stack
        height={60}
        width="100%"
        margin="0 auto"
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <IconButton
          onClick={() => router.push("/")}
          sx={{ position: "relative", minWidth: 90.5, height: "100%" }}
        >
          <Stack
            component={Image}
            src="/images/common/logo-full_landscape.png"
            fill
            objectFit="contain"
            alt="yogin logo"
          />
        </IconButton>
        <IconButton
          onClick={() =>
            isLogin ? router.push("/dashboard") : router.push("/mobile-menu")
          }
        >
          <MenuIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default HeaderMobile;
