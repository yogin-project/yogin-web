"use client";

import {
  Button,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import MobileWrapper from "../layout/MobileWrapper";
import React from "react";
import { fullVhWithoutHeader } from "../utils";
import { useIsMobile } from "../hooks/useIsMobileSize";
import { useRouter } from "next/navigation";

function SubmitType() {
  const isMobile = useIsMobile();
  const router = useRouter();

  const typeOptions = [
    { key: "loan", label: "대출" },
    { key: "rnd", label: "R&D" },
  ];

  return (
    <MobileWrapper>
      <Stack
        height={isMobile ? fullVhWithoutHeader : ""}
        justifyContent={isMobile ? "center" : "unset"}
        alignItems="center"
        px={2}
        py={4}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",

            p: 4,
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h6" mb={1}>
            신청 유형을 선택해주세요
          </Typography>
          <Divider />
          <Grid2
            container
            spacing={2}
            minWidth="100%"
            mt={4}
            key={"submit-type"}
          >
            {typeOptions.map(({ key, label }) => (
              <Grid2 size={12} key={key}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => router.push(`/submit-type/${key}`)}
                >
                  {label}
                </Button>
              </Grid2>
            ))}
          </Grid2>
        </Paper>
      </Stack>
    </MobileWrapper>
  );
}

export default SubmitType;
