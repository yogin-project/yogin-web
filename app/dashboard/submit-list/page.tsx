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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Button,
} from "@mui/material";
import { useCompanyFundList } from "@/app/hooks/apis/useCompanyFundList";
import { useCompanyApplicationCancel } from "@/app/hooks/apis/useCompanyApplicationCancel";
import CommonModal from "@/app/components/CommonModal";

const applicationStates = [
  { label: "임시저장", value: "TEMP" },
  { label: "등록완료", value: "REGISTERED" },
  { label: "전문가 확인중", value: "REVIEWING" },
  { label: "추가 자료 요청됨", value: "ADDITIONAL_INFO_REQUIRED" },
  { label: "전문가 승인", value: "APPROVED" },
  { label: "전문가 부결", value: "REJECTED" },
  { label: "삭제됨", value: "DELETED" },
];

const types = [
  { label: "대출", value: "FUND" },
  { label: "R&D", value: "RND" },
];

const sortOptions = [
  { label: "최신순", value: "ASC" },
  { label: "과거순", value: "DESC" },
];

function SubmitList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState("ASC");
  const [type, setType] = useState("FUND");
  const [state, setState] = useState("TEMP");

  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteApplication, isPending: isDeletePending } =
    useCompanyApplicationCancel();

  const { data, isLoading, refetch } = useCompanyFundList({
    page: page + 1,
    limit: rowsPerPage,
    sort,
    orderBy: "createdAt",
    type,
    state,
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

  const handleDeleteApplication = (applicationId: number) => {
    deleteApplication(
      {
        body: {
          applicationId: String(applicationId),
        },
      },
      {
        onSuccess: () => {
          setIsModalOpen(true);
          setModalText("자금 신청이 취소되었습니다.");

          refetch();
        },
        onError: (e) => {
          console.log("error: ", e);

          setIsModalOpen(true);
          setModalText("일시적인 오류입니다. 잠시 후 시도해주세요.");
        },
      }
    );
  };

  return (
    <Box mt={4} maxWidth="1000px" mx="auto">
      <Typography variant="h6" gutterBottom>
        자금 신청 내역
      </Typography>

      {/* 필터 영역 */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>정렬</InputLabel>
            <Select
              value={sort}
              label="정렬"
              onChange={(e) => {
                setSort(e.target.value);
                setPage(0);
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>신청 타입</InputLabel>
            <Select
              value={type}
              label="신청 타입"
              onChange={(e) => {
                setType(e.target.value);
                setPage(0);
              }}
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>신청 상태</InputLabel>
            <Select
              value={state}
              label="신청 상태"
              onChange={(e) => {
                setState(e.target.value);
                setPage(0);
              }}
            >
              {applicationStates.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

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
                <TableCell>삭제</TableCell>
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
                  <TableCell>
                    {app.state === "REGISTERED" && (
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => handleDeleteApplication(app.id)}
                      >
                        삭제
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {applications.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
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
      <CommonModal
        message={modalText}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </Box>
  );
}

export default SubmitList;
