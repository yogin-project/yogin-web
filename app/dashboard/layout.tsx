"use client";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  useMediaQuery,
  Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [profile] = useAtom(profileAtom);
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const role = profile?.role || "INDIVIDUAL";
  const routes = useMemo(() => routeMap[role] || [], [role]);

  useEffect(() => {
    if (pathname === "/dashboard" && routes[0]) {
      router.replace(routes[0].path);
    }
  }, [pathname, routes, router]);

  const drawerContent = (
    <Box>
      <Toolbar>
        <Typography variant="h6">메뉴</Typography>
      </Toolbar>
      <List>
        {routes.map((route) => (
          <ListItemButton
            key={route.path}
            selected={pathname === route.path}
            onClick={() => {
              router.push(route.path);
              if (isMobile) setMobileOpen(false); // 모바일 Drawer 닫기
            }}
          >
            <ListItemText primary={route.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar for mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              대시보드
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar - mobile vs desktop */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar menu"
      >
        {/* 모바일 Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* 데스크탑 Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: isMobile ? 8 : 0, // 모바일에서는 AppBar 공간 확보
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
