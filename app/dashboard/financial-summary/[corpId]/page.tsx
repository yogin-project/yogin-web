"use client";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAdminFinancialSummaryMutation } from "@/app/hooks/apis/useAdminFinancialSummary";
import { useIsMobile } from "@/app/hooks/useIsMobileSize";
import { useParams } from "next/navigation";

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
  const param = useParams();
  const { corpId } = param || {};

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
  const [hasSaved, setHasSaved] = useState(false);

  const { data, isLoading } = useAdminFinancialSummaryMutation({ corpId });
  const isMobile = useIsMobile();

  useEffect(() => {
    const summary = data?.data;

    if (Array.isArray(summary) && summary.length > 0) {
      const data = summary[0];
      const {
        growthPercentage,
        profitPercentage,
        financialHealthPercentage,
        activityPercentage,
      } = data;

      setHasSaved(true);
      setResults([
        Number(growthPercentage),
        Number(profitPercentage),
        Number(financialHealthPercentage),
        Number(activityPercentage),
      ]);
    } else {
      setHasSaved(false);
      setResults([0, 0, 0, 0]);
    }
  }, [corpId]);

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

  const refetchSummary = () => {
    // refetch();
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

  const inputLabels: Record<string, string> = {
    currentTotalAssets: "당기말 총자산",
    previousTotalAssets: "전기말 총자산",
    operatingProfit: "영업이익",
    revenue: "매출액",
    equity: "자기자본",
    totalAssets: "총자본",
    averageAssets: "총자산(평균)",
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        재무 진단 요약
      </Typography>

      <Grid2 container>
        {financialMetrics.map((item, index) => (
          <Grid2 key={item.label}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="subtitle1" gutterBottom>
                {item.label}
              </Typography>
              <DonutChart value={results[index] || 0} color={item.color} />
            </Paper>
          </Grid2>
        ))}
      </Grid2>

      <Box mt={5}>
        <Typography variant="subtitle1" gutterBottom textAlign="center">
          모든 항목에 숫자(억 단위)만 입력하세요
        </Typography>

        <Grid2 container>
          {Object.entries(inputs).map(([key, value]) => (
            <Grid2 key={key}>
              <Box maxWidth={400} mx="auto">
                <TextField
                  label={inputLabels[key] || key}
                  name={key}
                  fullWidth
                  value={value}
                  onChange={handleInputChange}
                />
              </Box>
            </Grid2>
          ))}
        </Grid2>

        <Box mt={4} display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" onClick={handleCalculate}>
            진단 결과 계산하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
