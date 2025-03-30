"use client";

import React from "react";
import MobileWrapper from "../layout/MobileWrapper";
import {
  Button,
  Divider,
  Grid2,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import { useIsMobile } from "../hooks/useIsMobileSize";
import { fullVhWithoutHeader } from "../utils";

function SignUp() {
  const isMobile = useIsMobile();

  const typeOptions = [
    { key: "professor", label: "R&D 신청" },
    { key: "banker", label: "대출신청" },
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
                  //   onClick={() => handleRouteSignUp(key)}
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

export default SignUp;
