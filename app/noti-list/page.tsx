"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Pagination,
  CircularProgress,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MobileWrapper from "@/app/layout/MobileWrapper";
import { useGetPush } from "@/app/hooks/apis/useGetPush";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function NotificationListPage() {
  const [page, setPage] = useState(1);
  const take = 5;

  const { data, isLoading } = useGetPush({ page, take });
  const items = data?.data?.items || [];
  const total = data?.data?.total || 0;

  const totalPages = Math.ceil(total / take);

  return (
    <MobileWrapper>
      <Box p={2}>
        <Typography variant="h6" mb={2}>
          받은 알림
        </Typography>

        {isLoading ? (
          <Stack alignItems="center" mt={10}>
            <CircularProgress />
          </Stack>
        ) : items.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="70vh"
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
        ) : (
          <Stack spacing={2}>
            {items.map((item: any) => (
              <Box
                key={item.id}
                p={2}
                borderRadius={2}
                bgcolor="background.paper"
                boxShadow={1}
              >
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.message}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  display="block"
                  mt={1}
                >
                  {formatDate(item.createdAt)}
                </Typography>
              </Box>
            ))}

            {totalPages > 1 && (
              <Stack alignItems="center" mt={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                />
              </Stack>
            )}
          </Stack>
        )}
      </Box>
    </MobileWrapper>
  );
}
