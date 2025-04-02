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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { profileAtom } from "../store/profileAtom";
import { isLoginAtom } from "../store/authAtom";

const drawerWidth = 240;

const routeMap = {
  CORPORATE: [
    { label: "회원 정보", path: "/dashboard/member-info" },
    { label: "비밀번호 변경", path: "/dashboard/password-change" },
    { label: "자금 신청 현황", path: "/dashboard/fund-status" },
    { label: "매니징 신청", path: "/dashboard/submit-managing" },
    { label: "재무 진단 요약", path: "/dashboard/finance-summary" },
  ],
  MANAGER: [
    { label: "회원 정보", path: "/dashboard/member-info" },
    { label: "비밀번호 변경", path: "/dashboard/password-change" },
  ],
  PROFESSOR: [
    { label: "전체 신청내역", path: "/dashboard/admin-list" },
    { label: "비밀번호 변경", path: "/dashboard/password-change" },
    { label: "통계 요약", path: "/dashboard/analytics" },
  ],
  ADMIN: [
    { label: "가입 관리", path: "/dashboard/member-list" },
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
  const [, setIsLogin] = useAtom(isLoginAtom);
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const role = profile?.type || "CORPORATE";
  const routes = useMemo(() => routeMap[role] || [], [role]);

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  useEffect(() => {
    if (pathname === "/dashboard" && routes[0]) {
      router.replace(routes[0].path);
    }
  }, [pathname, routes, router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setIsLogin(false);
    router.push("/");
  };

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
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemText primary={route.label} />
          </ListItemButton>
        ))}
        <ListItemButton onClick={() => setOpenLogoutDialog(true)}>
          <ListItemText primary="로그아웃" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
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

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar menu"
      >
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: isMobile ? 8 : 0,
        }}
      >
        {children}
      </Box>

      <Dialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            minWidth: 320,
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={700} textAlign="center">
            로그아웃 하시겠어요?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            mt={1}
          >
            다시 로그인하지 않으면 <br /> 서비스를 이용하실 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 1.5, pb: 2 }}>
          <Button
            onClick={() => setOpenLogoutDialog(false)}
            variant="outlined"
            sx={{ minWidth: 100 }}
          >
            취소
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{ minWidth: 100 }}
          >
            로그아웃
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
