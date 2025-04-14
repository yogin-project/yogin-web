"use client";

import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MobileWrapper from "@/app/layout/MobileWrapper";

function NotificationListPage() {
  return (
    <MobileWrapper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        textAlign="center"
      >
        <NotificationsNoneIcon
          sx={{ fontSize: 60, color: "grey.400", mb: 2 }}
        />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          아직 받은 알림이 없습니다.
        </Typography>
        <Typography variant="body2" color="text.disabled">
          새로운 알림이 도착하면 이곳에서 확인하실 수 있어요.
        </Typography>
      </Box>
    </MobileWrapper>
  );
}

export default NotificationListPage;
