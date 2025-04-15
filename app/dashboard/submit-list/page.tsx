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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useCompanyFundList } from "@/app/hooks/apis/useCompanyFundList";
import { useCompanyApplicationCancel } from "@/app/hooks/apis/useCompanyApplicationCancel";
import { useAddRequire } from "@/app/hooks/apis/useAddRequire";
import CommonModal from "@/app/components/CommonModal";
import { useAddSubmit } from "@/app/hooks/apis/useAddSubmit";
import { useApproveFinal } from "@/app/hooks/apis/useApproveFinal";

const applicationStates = [
  { label: "등록완료", value: "REGISTERED" },

  { label: "전문가 확인중", value: "REVIEWING" },
  { label: "추가 자료 요청됨", value: "ADDITIONAL_INFO_REQUIRED" },
  { label: "전문가 승인", value: "APPROVED" },
  { label: "전문가 부결", value: "REJECTED" },
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
  const [state, setState] = useState("REGISTERED");

  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [requireDialogOpen, setRequireDialogOpen] = useState(false);
  const [requirementText, setRequirementText] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { mutate: AddRequireApplication } = useAddSubmit(); // 추가자료 완료 api
  const { mutate: deleteApplication } = useCompanyApplicationCancel(); // 자금신청 삭제 api

  const { mutate: approveFinal } = useApproveFinal(); // 최종승인 api

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

  const handleChangePage = (_: any, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // TODO: 스펙 확인하고 마무리작업해야함
  const handleApproveFinal = (selectedId: number) => {
    approveFinal(
      {
        body: {
          id: Number(selectedId),
          isApproved: true,
          // applicationExpertId: String(selectedId),
        },
      },
      {
        onSuccess: () => {
          setModalText(
            "해당 전문가와의 매칭이 완료되었습니다\n전문가와 회신을 기다려주세요."
          );
          setIsModalOpen(true);
          setRequireDialogOpen(false);
          setRequirementText("");
          refetch();
        },
        onError: () => {
          setModalText("제출에 실패했습니다. 잠시 후, 시도해주세요.");
          setIsModalOpen(true);
        },
      }
    );
  };

  const handleAddRequireSubmit = (selectedId: number) => {
    if (!selectedId) return;

    AddRequireApplication(
      {
        // TODO: 스펙 확인하고 추가 작업해야함
        body: {
          applicationExpertId: String(selectedId),
        },
      },
      {
        onSuccess: () => {
          setModalText("추가 자료가 제출되었습니다.");
          setIsModalOpen(true);
          setRequireDialogOpen(false);
          setRequirementText("");
          refetch();
        },
        onError: () => {
          setModalText("제출에 실패했습니다. 다시 시도해주세요.");
          setIsModalOpen(true);
        },
      }
    );
  };

  const handleDeleteApplication = (applicationId: number) => {
    deleteApplication(
      {
        body: { applicationId: String(applicationId) },
      },
      {
        onSuccess: () => {
          setIsModalOpen(true);
          setModalText("자금 신청이 취소되었습니다.");
          refetch();
        },
        onError: () => {
          setIsModalOpen(true);
          setModalText("일시적인 오류입니다. 잠시 후 시도해주세요.");
        },
      }
    );
  };

  return (
    <Box
      mt={4}
      maxWidth="1000px"
      mx="auto"
      component={Paper}
      sx={{ overflowX: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        자금 신청 내역
      </Typography>

      {/* 필터 */}
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
          <Table key={state}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell>신청일</TableCell>
                <TableCell>담당자 성함</TableCell>
                <TableCell>담당자 연락처</TableCell>

                <TableCell>추가자료요청</TableCell>

                <TableCell>최종승인</TableCell>
                <TableCell>승인 금액</TableCell>
                <TableCell>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app: any) => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>

                  <TableCell>
                    {new Date(app.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{app.expertName ?? "미지정"}</TableCell>
                  <TableCell>{app.expertEamil ?? "미지정"}</TableCell>
                  <TableCell>
                    {app.isAdditionalInfoRequired === "Y" ? (
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => handleAddRequireSubmit(app.id)}
                      >
                        제출완료
                      </Button>
                    ) : (
                      "없음"
                    )}
                  </TableCell>

                  {/* 최종승인 버튼 추가해서 동작시켜야함 */}
                  <TableCell>
                    {app.state === "APPROVED" ? (
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => handleApproveFinal(app.id)}
                      >
                        승인하기
                      </Button>
                    ) : null}
                  </TableCell>

                  <TableCell>
                    {app.availableFundAmount
                      ? Number(app.availableFundAmount).toLocaleString() + "억"
                      : "-"}
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
                  <TableCell colSpan={8} align="center">
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
          labelDisplayedRows={({ from, to }) =>
            isLast ? `${from}-${to} / ${to}` : `${from}-${to} / ...`
          }
        />
      </Paper>

      {/* ✅ 안내용 결과 모달 */}
      <CommonModal
        message={modalText}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* ✅ 사용자 입력 받는 Dialog */}
      <Dialog
        open={requireDialogOpen}
        onClose={() => {
          setRequireDialogOpen(false);
          setRequirementText("");
          setSelectedId(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>추가 자료 제출</DialogTitle>
        <DialogContent
          style={{
            padding: 8,
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={4}
            label="전문가에게 전달할 내용을 입력해주세요."
            value={requirementText}
            onChange={(e) => setRequirementText(e.target.value)}
            placeholder="예: 추가 사업계획서 첨부하였습니다."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequireDialogOpen(false)}>취소</Button>
          <Button variant="contained" onClick={handleAddRequireSubmit}>
            제출
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SubmitList;
