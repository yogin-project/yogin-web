"use client";

import { useExportApllicationList } from "@/app/hooks/apis/useExpertAppplicationList";
import {
  Box,
  Typography,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TablePagination,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function MyListRND() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");

  const queryParams: Record<string, any> = {
    page: page + 1,
    limit: rowsPerPage,
    sort,
    orderBy: "createdAt",
  };

  const { data, isLoading } = useExportApllicationList(queryParams);

  const applications = data?.data?.applications || [];
  const isLast = data?.data?.isLast;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (
    _: React.MouseEvent<HTMLElement>,
    newSort: "ASC" | "DESC" | null
  ) => {
    if (newSort) {
      setSort(newSort);
      setPage(0);
    }
  };

  return (
    <Box maxWidth="1000px" mx="auto" mt={4}>
      <Typography variant="h5" mb={2} fontWeight={600}>
        자금 신청 리스트
      </Typography>

      {/* 🔹 정렬 필터 */}
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <ToggleButtonGroup
          value={sort}
          exclusive
          size="small"
          onChange={handleSortChange}
          aria-label="정렬"
        >
          <ToggleButton value="ASC" aria-label="과거순">
            과거순
          </ToggleButton>
          <ToggleButton value="DESC" aria-label="최신순">
            최신순
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>신청일</TableCell>
                <TableCell>기업명</TableCell>
                <TableCell>24년 수출</TableCell>
                <TableCell>24년 매출</TableCell>
                <TableCell>상세 조회</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((item: any) => {
                const debt2024 = item.debtStatus?.[0]?.debtAmount ?? "-";

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString("ko-KR")}
                    </TableCell>
                    <TableCell>{item.corpName}</TableCell>
                    <TableCell>
                      {item.lastYearExport.export
                        ? Number(item.lastYearExport.export).toLocaleString() +
                          "억"
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {item.lastYearRevenue.revenue
                        ? Number(
                            item.lastYearRevenue.revenue
                          ).toLocaleString() + "억"
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          router.push(`/rnd/rnd-detail?id=${item.id}`);
                        }}
                      >
                        조회
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {!isLoading && applications.length === 0 && (
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
      <Box height={60} />
    </Box>
  );
}

export default MyListRND;
