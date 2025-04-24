"use client";

import {
  APPLICATION_TYPES,
  APPLICATION_TYPES_OBJ,
  LOCATIONS,
  SORT_OPTIONS,
} from "@/app/libs/contstant";
import {
  Box,
  Button,
  Chip,
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
import React, { useState } from "react";
import { stateLabelDetailMap, stateLabelMap } from "@/app/utils";

import ApplicationDetailDialog from "./ApplicationDetailDialog";
import { useAdminApplicationListMutation } from "@/app/hooks/apis/useAdminApplicationList";

function ApplicationList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [type, setType] = useState("FUND");
  const [status, setStatus] = useState("전체");
  const [sort, setSort] = useState("DESC");
  const [location, setLocation] = useState("전체");

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<any>();

  const queryParams: Record<string, any> = {
    type,
    page: page + 1,
    limit: rowsPerPage,
    sort,
    orderBy: "createdAt",
    subData: "CORPORATE",
  };
  if (status !== "전체") {
    queryParams.status = status;
  }
  if (location !== "전체") {
    queryParams.location = location;
  }
  const { data, isLoading } = useAdminApplicationListMutation(queryParams);
  console.log(data);

  const applications = data?.data?.applications || [];
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

  const handleTypeChange = (e: SelectChangeEvent) => {
    setType(e.target.value);
    setPage(0);
  };

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
    setPage(0);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
    setPage(0);
  };

  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    setLocation(event.target.value);
    setPage(0);
  };

  const handleClickOpen = (item: any) => () => {
    setOpen(true);
    setItem(item);
  };

  const handleClose = () => {
    setOpen(false);
    setItem(null);
  };

  return (
    <Box maxWidth="1000px" mx="auto" mt={4}>
      <Typography variant="h5" mb={2}>
        자금 신청 목록 조회
      </Typography>

      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>신청분류</InputLabel>
          <Select value={type} label="신청분류" onChange={handleTypeChange}>
            {APPLICATION_TYPES.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>상태</InputLabel>
          <Select value={status} label="상태" onChange={handleStateChange}>
            <MenuItem value="전체">전체</MenuItem>
            {Object.values(stateLabelDetailMap).map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

      <TableContainer component={Paper} sx={{ "*": { whiteSpace: "pre" } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>신청분류</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>기업명</TableCell>
              <TableCell>사업분류</TableCell>
              <TableCell>대표명</TableCell>
              <TableCell>추가정보 요청</TableCell>
              <TableCell>추가정보 제출</TableCell>
              <TableCell>신청일</TableCell>
              <TableCell>상세보기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody key={type}>
            {applications.map((row: any) => (
              <TableRow key={row.id + row.state}>
                <TableCell>
                  <Chip
                    label={
                      APPLICATION_TYPES_OBJ[
                        row.type as keyof typeof APPLICATION_TYPES_OBJ
                      ]
                    }
                    color={row.type === "RND" ? "primary" : "secondary"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {stateLabelMap[row.state as keyof typeof stateLabelMap]}
                </TableCell>
                <TableCell>{row.corpName}</TableCell>
                <TableCell>{row.businessCategory}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.isAdditionalInfoRequired === "Y" ? "예" : "아니오"}
                </TableCell>
                <TableCell>
                  {row.isAdditionalInfoSubmitted === "Y" ? "예" : "아니오"}
                </TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleString("ko-KR")}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="text"
                    color="primary"
                    onClick={handleClickOpen(row)}
                  >
                    상세 보기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && applications.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
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

      <ApplicationDetailDialog open={open} onClose={handleClose} item={item} />
    </Box>
  );
}

export default ApplicationList;
