"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { usePostPush } from "@/app/hooks/apis/usePostPush";
import { locations } from "@/app/utils";

const types = ["LOCATION", "LOAN", "FUND", "RND", "CORP"] as const;

const typeLabels: Record<(typeof types)[number], string> = {
  LOCATION: "지역별 발송",
  LOAN: "기업(자금 신청 신청 유무)",
  FUND: "기업(대출 신청 유무)",
  RND: "기업(R&D 신청 유무)",
  CORP: "기업(매니저 신청 유무)",
};

const subTypeMap: Record<(typeof types)[number], string[]> = {
  LOCATION: ["ALL", "CORP", "MANAGER", "PROFESSOR"],
  LOAN: ["APPROVED", "REJECT"],
  FUND: ["APPROVED", "REJECT"],
  RND: ["APPROVED", "REJECT"],
  CORP: ["APPLY", "NOT_APPLY"],
};

const subTypeLabels: Record<string, string> = {
  ALL: "전체 사용자",
  CORP: "기업 회원",
  MANAGER: "지점 매니저",
  PROFESSOR: "교수 회원",
  APPROVED: "승인 대상자",
  REJECT: "반려 대상자",
  APPLY: "매니저 신청한 기업",
  NOT_APPLY: "매니저 미신청한 기업",
};

export default function PushMessagePage() {
  const [type, setType] = useState("LOCATION");
  const [subType, setSubType] = useState("");
  const [target, setTarget] = useState("전체");
  const [description, setDescription] = useState("");
  const [toast, setToast] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const { mutate: postPush } = usePostPush();

  const handleSubmit = () => {
    const body: any = {
      type,
      subType,
      description,
    };

    if (type === "LOCATION" && target !== "전체") {
      body.target = target;
    }

    postPush(
      { body },
      {
        onSuccess: () => {
          setToast({ open: true, message: "메시지 전송 완료" });
        },
        onError: () => {
          setToast({ open: true, message: "메시지 전송 실패" });
        },
      }
    );
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h5" mb={3}>
        메시지 전송
      </Typography>

      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>대상 분류</InputLabel>
          <Select
            value={type}
            label="대상 분류"
            onChange={(e: SelectChangeEvent) => {
              setType(e.target.value);
              setSubType("");
              setTarget("전체");
            }}
          >
            {types.map((t) => (
              <MenuItem key={t} value={t}>
                {typeLabels[t]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>세부 분류</InputLabel>
          <Select
            value={subType}
            label="세부 분류"
            onChange={(e: SelectChangeEvent) => setSubType(e.target.value)}
          >
            {subTypeMap[type]?.map((s) => (
              <MenuItem key={s} value={s}>
                {subTypeLabels[s]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "LOCATION" && (
          <FormControl fullWidth>
            <InputLabel>지역</InputLabel>
            <Select
              value={target}
              label="지역"
              onChange={(e: SelectChangeEvent) => setTarget(e.target.value)}
            >
              <MenuItem value="전체">전체</MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <TextField
          label="내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          minRows={4}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!type || !subType || !description}
        >
          전송하기
        </Button>
      </Stack>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
