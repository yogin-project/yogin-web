"use client";

import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WarningIcon from "@mui/icons-material/Warning";
import PasswordChange from "./PasswordChange/page";

function MyInfo() {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box display="flex" height="100vh" p={4}>
      {/* 왼쪽 탭 메뉴 */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider", minWidth: 180 }}
      >
        <Tab icon={<InfoIcon />} iconPosition="start" label="회원정보 변경" />
        <Tab icon={<LockIcon />} iconPosition="start" label="비밀번호 변경" />
        <Tab
          icon={<NotificationsIcon />}
          iconPosition="start"
          label="알림 설정"
        />
        <Tab icon={<WarningIcon />} iconPosition="start" label="회원 탈퇴" />
      </Tabs>

      {/* 오른쪽 컨텐츠 영역 */}
      <Box flex={1} p={4} component={Paper} elevation={3}>
        {selectedTab === 0 && (
          <Typography variant="h6">회원정보 변경</Typography>
        )}
        {selectedTab === 1 && <PasswordChange />}
        {selectedTab === 2 && <Typography variant="h6">알림 설정</Typography>}
        {selectedTab === 3 && <Typography variant="h6">회원 탈퇴</Typography>}
      </Box>
    </Box>
  );
}

export default MyInfo;
