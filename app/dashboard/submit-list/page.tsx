"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useCompanyFundList } from "@/app/hooks/apis/useCompanyFundList";

function SubmitList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useCompanyFundList({
    page: page + 1,
    limit: 10,
    sort: "DESC",
    orderBy: "createdAt",
    state: "TEMP",
    type: "FUND",
  });

  const applications = data?.data?.applications || [];
  const isLast = data?.data?.isLast;

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box mt={4} maxWidth="1000px" mx="auto">
      <Typography variant="h6" gutterBottom>
        자금 신청 내역
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>신청 타입</TableCell>
                <TableCell>신청일</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>추가정보 요청</TableCell>
                <TableCell>추가정보 제출</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app: any) => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.type}</TableCell>
                  <TableCell>
                    {new Date(app.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{app.state}</TableCell>
                  <TableCell>
                    {app.isAdditionalInfoRequired === "Y" ? "예" : "아니오"}
                  </TableCell>
                  <TableCell>
                    {app.isAdditionalInfoSubmitted === "Y" ? "예" : "아니오"}
                  </TableCell>
                </TableRow>
              ))}
              {applications.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    신청 내역이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={isLast ? page * rowsPerPage + applications.length : -1}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          labelDisplayedRows={({ from, to, count }) =>
            isLast ? `${from}-${to} / ${to}` : `${from}-${to} / ...`
          }
        />
      </Paper>
    </Box>
  );
}

export default SubmitList;
