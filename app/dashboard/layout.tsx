"use client";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { profileAtom } from "../store/profileAtom";

const drawerWidth = 240;

const routeMap = {
  INDIVIDUAL: [
    { label: "가입 관리", path: "/dashboard/member-list" },
    { label: "회원 정보", path: "/dashboard/member-info" },
    { label: "알림", path: "/dashboard/notifications" },
    { label: "자금 신청 현황", path: "/dashboard/fund-status" },
    { label: "매니징 신청", path: "/dashboard/managing" },
  ],
  CORPORATE: [
    { label: "가입 관리", path: "/dashboard/member-list" },
    { label: "회원 정보", path: "/dashboard/member-info" },
  ],
  ADMIN: [
    { label: "전체 신청내역", path: "/dashboard/admin-list" },
    { label: "통계 요약", path: "/dashboard/analytics" },
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [profile] = useAtom(profileAtom);
  const role = profile?.role || "INDIVIDUAL";

  const routes = useMemo(() => routeMap[role] || [], [role]);

  // 리디렉션: /dashboard 접속 시 첫 탭으로 이동
  useEffect(() => {
    if (pathname === "/dashboard" && routes[0]) {
      router.replace(routes[0].path);
    }
  }, [pathname, routes, router]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {routes.map((route) => (
              <ListItemButton
                key={route.path}
                selected={pathname === route.path}
                onClick={() => router.push(route.path)}
              >
                <ListItemText primary={route.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
