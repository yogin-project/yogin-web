"use client";

import { Box, Typography, Paper, Chip, Divider, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function ManagementDetail() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "-";
  const mgrType = searchParams.get("mgrType") || "-";
  const description = searchParams.get("description") || "-";
  const location = searchParams.get("location") || "-";
  const state = searchParams.get("state") || "-";

  const getTypeColor = (type: string) => {
    switch (type) {
      case "R&D":
        return "primary";
      case "대출신청":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Box maxWidth="800px" mx="auto" mt={6}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        매니징 신청 상세 정보
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              신청 ID
            </Typography>
            <Typography variant="body1">{id}</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              유형
            </Typography>
            <Chip label={mgrType} color={getTypeColor(mgrType)} size="small" />
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              상태
            </Typography>
            <Typography variant="body1">{state}</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              지역
            </Typography>
            <Typography variant="body1">{location}</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              보낸 글
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {description}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
