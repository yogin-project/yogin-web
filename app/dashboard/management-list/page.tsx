"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { useManagementList } from "@/app/hooks/apis/useManagementList";

const mgrTypeOptions = [
  { label: "전체", value: "" },
  { label: "대출신청", value: "FUND" },
  { label: "R&D", value: "RND" },
];

function ManagementList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [mgrType, setMgrType] = useState("");

  const queryParams = {
    page: page + 1,
    take: rowsPerPage,
    mgrType,
  };

  const { data, isLoading } = useManagementList(queryParams);

  const items = data?.data?.items || [];
  const total = data?.data?.total || 0;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMgrType(event.target.value as string);
    setPage(0);
  };

  return (
    <Box maxWidth="1000px" mx="auto" mt={4}>
      <Typography variant="h5" mb={2} fontWeight={600}>
        매니지먼트 리스트
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>유형 필터</InputLabel>
          <Select
            value={mgrType}
            onChange={handleFilterChange}
            label="유형 필터"
          >
            {mgrTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>유형</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>설명</TableCell>
                <TableCell>생성일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.mgrType === "FUND" ? "대출신청" : "R&D"}
                      color={row.mgrType === "FUND" ? "primary" : "secondary"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {new Date(row.createdAt).toLocaleString("ko-KR")}
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    조회된 데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </Box>
  );
}

export default ManagementList;
