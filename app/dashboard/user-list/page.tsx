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
import { useAdminList } from "@/app/hooks/apis/useAdminList";

function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useAdminList({
    type: "PROFESSOR",
    state: "PENDING",
    page: page + 1,
    limit: rowsPerPage,
    sort: "ASC",
    orderBy: "createdAt",
  });

  const users = data?.data?.users || [];
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
        교수 회원 목록 (승인 대기)
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>이메일</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>전화번호</TableCell>
                <TableCell>지역</TableCell>
                <TableCell>상태</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.region || "-"}</TableCell>
                  <TableCell>{user.state}</TableCell>
                </TableRow>
              ))}
              {users.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    등록된 사용자가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={isLast ? page * rowsPerPage + users.length : -1}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          labelDisplayedRows={({ from, to }) =>
            isLast ? `${from}-${to} / ${to}` : `${from}-${to} / ...`
          }
        />
      </Paper>
    </Box>
  );
}

export default UserList;
