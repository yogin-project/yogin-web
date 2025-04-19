"use client";

import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DESKTOP_NAV_HEIGHT, DRAWER_WIDTH } from "../libs/contstant";
import { JSX, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// 아이콘 import
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MessageIcon from "@mui/icons-material/Message";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { isLoginAtom } from "../store/authAtom";
import { profileAtom } from "../store/profileAtom";
import { useAtom } from "jotai";
import { useTheme } from "@mui/material/styles";

const routeMap = {
  CORPORATE: [
    { label: "회원 정보", path: "/dashboard/member-info" },
    { label: "비밀번호 변경", path: "/dashboard/password-change" },
    { label: "자금 신청 현황", path: "/dashboard/submit-list" },
    { label: "매니징 신청", path: "/dashboard/submit-managing" },
    { label: "재무 진단 요약", path: "/dashboard/finance-summary" },
    { label: "매니지먼트 신청 목록 조회", path: "/dashboard/management-list" },
  ],
  MANAGER: [
    { label: "회원 정보", path: "/dashboard/member-info" },
    { label: "비밀번호 변경", path: "/dashboard/password-change" },
    { label: "담당 기업 조회", path: "/dashboard/mylist-loan" },
  ],
  PROFESSOR: [
    { label: "회원 정보", path: "/dashboard/member-info" },
    { label: "비밀번호 변경", path: "/dashboard/password-change" },
    { label: "담당 기업 조회", path: "/dashboard/mylist-rnd" },
  ],
  ADMIN: [
    { label: "회원 목록 조회", path: "/dashboard/user-list" },
    { label: "자금 신청 목록 조회", path: "/dashboard/application-list" },
    { label: "회원 정보 다운로드", path: "/dashboard/excel-list" },
    { label: "메시지 전송", path: "/dashboard/message-send" },
    {
      label: "자금 신청 현황 다운로드",
      path: "/dashboard/application-excel-list",
    },
  ],
};

// 아이콘 매핑
const iconMap: Record<string, JSX.Element> = {
  "회원 정보": <AccountCircleIcon />,
  "비밀번호 변경": <LockIcon />,
  "자금 신청 현황": <RequestQuoteIcon />,
  "매니징 신청": <HowToRegIcon />,
  "재무 진단 요약": <AssessmentIcon />,
  "매니지먼트 신청 목록 조회": <ListAltIcon />,
  "담당 기업 조회": <BusinessIcon />,
  "회원 목록 조회": <PeopleAltIcon />,
  "자금 신청 목록 조회": <AssignmentIcon />,
  "회원 정보 다운로드": <FileDownloadIcon />,
  "자금 신청 현황 다운로드": <DownloadDoneIcon />,
  "메시지 전송": <MessageIcon />,
  로그아웃: <LogoutIcon />,
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
  const routes = useMemo(
    () => routeMap[role as keyof typeof routeMap] || [],
    [role]
  );

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
      <Toolbar sx={{ height: DESKTOP_NAV_HEIGHT }}>
        <Typography variant="h6">메뉴</Typography>
      </Toolbar>
      <List sx={{ py: 0 }}>
        {routes.map((route) => (
          <ListItemButton
            key={route.path}
            selected={pathname === route.path}
            onClick={() => {
              router.push(route.path);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              "&:hover": {
                color: theme.palette.primary.main,
              },
              ...(pathname === route.path && {
                backgroundColor: theme.palette.action.selected,
                color: theme.palette.primary.main,
                fontWeight: "bold",
              }),
            }}
          >
            <Box mr={1} display="flex" alignItems="center">
              {iconMap[route.label]}
            </Box>
            <ListItemText primary={route.label} />
          </ListItemButton>
        ))}

        <ListItemButton
          onClick={() => setOpenLogoutDialog(true)}
          sx={{
            "&:hover": {
              color: theme.palette.error.main,
            },
          }}
        >
          <Box mr={1} display="flex" alignItems="center">
            {iconMap["로그아웃"]}
          </Box>
          <ListItemText primary="로그아웃" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box position="relative" sx={{ display: "flex" }}>
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
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="sidebar menu"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
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
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: isMobile ? 8 : 0,
        }}
      >
        {children}
      </Box>

      <Dialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        sx={{
          borderRadius: 3,
          p: 2,
          minWidth: 320,
        }}
      >
        <DialogTitle variant="h6" fontWeight={700} textAlign="center">
          로그아웃 하시겠어요?
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
