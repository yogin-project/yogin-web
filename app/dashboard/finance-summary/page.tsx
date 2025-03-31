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
import React, { useEffect, useState } from "react";
import { useFinancialSummary } from "@/app/hooks/apis/useFinancialSummary";

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
      (revenue / averageAssets) * 100,
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
  const [results, setResults] = useState<number[]>([0, 0, 0, 0]);
  const { get, post, put } = useFinancialSummary();

  useEffect(() => {
    if (get.data) {
      const {
        growthPercentage,
        profitPercentage,
        financialHealthPercentage,
        debtRepaymentAbilityPercentage,
      } = get.data;

      // 예시: 초기값 설정
      setResults([
        Number(growthPercentage),
        Number(profitPercentage),
        Number(financialHealthPercentage),
        Number(debtRepaymentAbilityPercentage),
      ]);
    }
  }, [get.data]);

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

  const handleSave = () => {
    post.mutate({
      body: {
        growthPercentage: results[0].toFixed(2),
        profitPercentage: results[1].toFixed(2),
        financialHealthPercentage: results[2].toFixed(2),
        debtRepaymentAbilityPercentage: "0", // 없음
        activityPercentage: results[3].toFixed(2),
      },
    });
  };

  const handleUpdate = () => {
    put.mutate({
      body: {
        growthPercentage: results[0].toFixed(2),
        profitPercentage: results[1].toFixed(2),
        financialHealthPercentage: results[2].toFixed(2),
        debtRepaymentAbilityPercentage: "0", // 없음
        activityPercentage: results[3].toFixed(2),
      },
    });
  };

  function DonutChart({ value, color }: { value: number; color: string }) {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = Math.min(value, 100);
      const duration = 1000;
      const stepTime = 10;
      const steps = duration / stepTime;
      const increment = (end - start) / steps;

      const animate = () => {
        setAnimatedValue((prev) => {
          const next = prev + increment;
          if (next >= end) return end;
          requestAnimationFrame(animate);
          return next;
        });
      };

      setAnimatedValue(0);
      requestAnimationFrame(animate);
    }, [value]);

    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={80}
          thickness={5}
          sx={{ color: "#e0e0e0", position: "absolute" }}
        />
        <CircularProgress
          variant="determinate"
          value={animatedValue}
          size={80}
          thickness={5}
          sx={{ color }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div">
            {`${value.toFixed(1)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

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
              <DonutChart value={results[index] || 0} color={item.color} />
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
          {Object.entries(inputs).map(([key, value]) => (
            <Grid2 size={12} key={key}>
              <TextField
                label={key}
                name={key}
                fullWidth
                value={value}
                onChange={handleInputChange}
              />
            </Grid2>
          ))}
        </Grid2>

        <Box mt={3} display="flex" gap={2}>
          <Button variant="contained" onClick={handleCalculate}>
            진단 결과 계산하기
          </Button>
          <Button variant="outlined" color="success" onClick={handleSave}>
            저장
          </Button>
          <Button variant="outlined" color="primary" onClick={handleUpdate}>
            수정
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
