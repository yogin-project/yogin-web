// app/dashboard/finance-summary/page.tsx
"use client";

import {
  Box,
  Typography,
  Paper,
  Grid2,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";

// 각 항목에 대한 라벨과 계산 함수 매핑
const financialMetrics = [
  {
    label: "성장성",
    color: "#8BC34A",
    description: "총자산 증가율 = (당기말 총자산 / 전기말 총자산) × 100 - 1",
    calculate: (currentTotal: number, previousTotal: number) =>
      (currentTotal / previousTotal) * 100 - 1,
  },
  {
    label: "수익성",
    color: "#BDBDBD",
    description: "매출액 영업이익률 = (영업이익 / 매출액) × 100",
    calculate: (operatingProfit: number, revenue: number) =>
      (operatingProfit / revenue) * 100,
  },
  {
    label: "재무구조",
    color: "#FFCA28",
    description: "자기자본비율 = (자기자본 / 총자본) × 100",
    calculate: (equity: number, totalAssets: number) =>
      (equity / totalAssets) * 100,
  },
  {
    label: "활동성",
    color: "#F44336",
    description: "총자산회전율 = 매출액 / 총자산(평균)",
    calculate: (revenue: number, averageAssets: number) =>
      revenue / averageAssets,
  },
];

export default function FinanceSummaryPage() {
  const [inputs, setInputs] = useState({
    currentTotalAssets: "",
    previousTotalAssets: "",
    operatingProfit: "",
    revenue: "",
    equity: "",
    totalAssets: "",
    averageAssets: "",
  });

  const [results, setResults] = useState<number[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    const {
      currentTotalAssets,
      previousTotalAssets,
      operatingProfit,
      revenue,
      equity,
      totalAssets,
      averageAssets,
    } = inputs;

    const values = [
      financialMetrics[0].calculate(
        Number(currentTotalAssets),
        Number(previousTotalAssets)
      ),
      financialMetrics[1].calculate(Number(operatingProfit), Number(revenue)),
      financialMetrics[2].calculate(Number(equity), Number(totalAssets)),
      financialMetrics[3].calculate(Number(revenue), Number(averageAssets)),
    ];

    setResults(values);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        재무 진단 요약
      </Typography>

      <Grid2 container spacing={4} minWidth="100%">
        {financialMetrics.map((item, index) => (
          <Grid2 size={12} key={item.label}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="subtitle1" gutterBottom>
                {item.label}
              </Typography>
              <CircularProgress
                variant="determinate"
                value={results[index] || 0}
                size={80}
                thickness={5}
                sx={{ color: item.color }}
              />
              <Typography variant="body2" mt={1}>
                {results[index]?.toFixed(2) || "-"}%
              </Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>

      <Box mt={5}>
        <Typography variant="subtitle1" gutterBottom>
          입력값 (모든 항목 숫자만 입력)
        </Typography>
        <Grid2 container spacing={2} minWidth="100%">
          <Grid2 size={12}>
            <TextField
              label="당기말 총자산"
              name="currentTotalAssets"
              fullWidth
              value={inputs.currentTotalAssets}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="전기말 총자산"
              name="previousTotalAssets"
              fullWidth
              value={inputs.previousTotalAssets}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="영업이익"
              name="operatingProfit"
              fullWidth
              value={inputs.operatingProfit}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="매출액"
              name="revenue"
              fullWidth
              value={inputs.revenue}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="자기자본"
              name="equity"
              fullWidth
              value={inputs.equity}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="총자본"
              name="totalAssets"
              fullWidth
              value={inputs.totalAssets}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              label="총자산(평균)"
              name="averageAssets"
              fullWidth
              value={inputs.averageAssets}
              onChange={handleInputChange}
            />
          </Grid2>
        </Grid2>

        <Box mt={3}>
          <Button variant="contained" onClick={handleCalculate}>
            진단 결과 계산하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
