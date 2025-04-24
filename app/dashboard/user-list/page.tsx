"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { LOCATIONS, SORT_OPTIONS } from "@/app/libs/contstant";
import React, { useState } from "react";

import { useAdminList } from "@/app/hooks/apis/useAdminList";
import { useRouter } from "next/navigation";

const userTypes = [
  { value: "CORPORATE", label: "기업" },
  { value: "MANAGER", label: "은행" },
  { value: "PROFESSOR", label: "전문가" },
];

const states = [
  { value: "PENDING", label: "대기" },
  { value: "APPROVED", label: "승인" },
  { value: "REJECTED", label: "반려" },
];

function UserList() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [type, setType] = useState("PROFESSOR");
  const [state, setState] = useState("PENDING");
  const [sort, setSort] = useState("DESC");
  const [location, setLocation] = useState("전체");

  const queryParams: Record<string, any> = {
    type,
    page: page + 1,
    limit: rowsPerPage,
    sort,
    orderBy: "createdAt",
  };

  if (type !== "CORPORATE") {
    queryParams.state = state;
  }

  if (location !== "전체") {
    queryParams.location = location;
  }

  const { data, isLoading } = useAdminList(queryParams);

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

  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value);
    setPage(0);
  };

  const handleStateChange = (e: SelectChangeEvent) => {
    setState(e.target.value);
    setPage(0);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    setSort(e.target.value);
    setPage(0);
  };

  const handleLocationChange = (e: SelectChangeEvent) => {
    setLocation(e.target.value);
    setPage(0);
  };

  const handleViewDetail = (user: any) => {
    router.push(
      `/admin/users/${user.id}?user=${encodeURIComponent(JSON.stringify(user))}`
    );
  };

  return (
    <Box mt={4} maxWidth="1000px" mx="auto">
      <Typography variant="h6" gutterBottom>
        회원 목록 조회
      </Typography>

      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>회원 타입</InputLabel>
          <Select value={type} label="회원 타입" onChange={handleTypeChange}>
            {userTypes.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type !== "CORPORATE" && (
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>상태</InputLabel>
            <Select value={state} label="상태" onChange={handleStateChange}>
              {states.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>정렬</InputLabel>
          <Select value={sort} label="정렬" onChange={handleSortChange}>
            {SORT_OPTIONS.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>지역</InputLabel>
          <Select value={location} label="지역" onChange={handleLocationChange}>
            <MenuItem value="전체">전체</MenuItem>
            {LOCATIONS.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

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
                {type !== "CORPORATE" && <TableCell>상태</TableCell>}
                <TableCell>회원 정보</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.location || "-"}</TableCell>
                  {type !== "CORPORATE" && (
                    <TableCell>{user.state || "-"}</TableCell>
                  )}
                  <TableCell>
                    <Button size="small" onClick={() => handleViewDetail(user)}>
                      상세 보기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
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
