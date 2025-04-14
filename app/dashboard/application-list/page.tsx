"use client";

import {
  APPLICATION_STATES,
  APPLICATION_STATES_OBJ,
  APPLICATION_TYPES,
  APPLICATION_TYPES_OBJ,
  FUND_REQUIREMENTS_OBJ,
  LOCATIONS,
  SORT_OPTIONS,
} from "@/app/libs/contstant";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
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
  };
  if (status !== "전체") {
    queryParams.status = status;
  }
  if (location !== "전체") {
    queryParams.location = location;
  }
  const { data, isLoading } = useAdminApplicationListMutation(queryParams);

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
            {APPLICATION_STATES.map((item) => (
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
                  {
                    APPLICATION_STATES_OBJ[
                      row.state as keyof typeof APPLICATION_STATES_OBJ
                    ]
                  }
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

      {!!item && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="paper"
          fullWidth
          maxWidth="md"
        >
          <Stack component={DialogTitle} flexDirection="row">
            <Stack flexDirection="row" width="100%" gap={1}>
              <Chip
                label={
                  APPLICATION_TYPES_OBJ[
                    item.type as keyof typeof APPLICATION_TYPES_OBJ
                  ]
                }
                color={item.type === "RND" ? "primary" : "secondary"}
                size="small"
              />

              <Typography variant="h6">{item.corpName}</Typography>
            </Stack>
            <Typography whiteSpace="pre">
              {
                APPLICATION_STATES_OBJ[
                  item.state as keyof typeof APPLICATION_STATES_OBJ
                ]
              }
            </Typography>
          </Stack>

          <DialogContent dividers sx={{ p: 0 }}>
            <Stack
              component={List}
              gap={1}
              subheader
              sx={{
                ".MuiListSubheader-root": {
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  lineHeight: "1.5",
                  px: 2,
                  py: 1,
                },
              }}
            >
              <ListSubheader color="primary">신청 정보</ListSubheader>
              <ListItem sx={{ p: 0 }}>
                <Stack
                  component={List}
                  width="100%"
                  sx={{
                    p: 0,
                    ul: { p: 0 },
                    li: { p: 0 },
                    ".MuiListItem-root": { px: 2 },
                  }}
                >
                  <ListSubheader>신청일</ListSubheader>
                  <ListItem>
                    <ListItemText
                      primary={new Date(item.createdAt).toLocaleString("ko-KR")}
                    />
                  </ListItem>

                  <ListSubheader>신청분류</ListSubheader>
                  <ListItem>
                    <ListItemText
                      primary={
                        APPLICATION_TYPES_OBJ[
                          item.type as keyof typeof APPLICATION_TYPES_OBJ
                        ]
                      }
                    />
                  </ListItem>

                  <ListSubheader>
                    {
                      APPLICATION_TYPES_OBJ[
                        item.type as keyof typeof APPLICATION_TYPES_OBJ
                      ]
                    }{" "}
                    유형
                  </ListSubheader>
                  <ListItem>
                    <ListItemText
                      primary={item.fundRequirements?.map(
                        (value: string, index: number) =>
                          FUND_REQUIREMENTS_OBJ[
                            value as keyof typeof FUND_REQUIREMENTS_OBJ
                          ] +
                          (index == item.fundRequirements.length - 1
                            ? ""
                            : ", ")
                      )}
                    />
                  </ListItem>
                </Stack>
              </ListItem>

              <Divider />

              <ListSubheader color="primary">기업 정보</ListSubheader>
              <ListItem sx={{ p: 0 }}>
                <Stack
                  component={List}
                  width="100%"
                  sx={{
                    p: 0,
                    ul: { p: 0 },
                    li: { p: 0 },
                    ".MuiListItem-root": { px: 2 },
                  }}
                >
                  <ListSubheader>기업명</ListSubheader>
                  <ListItem>
                    <ListItemText primary={item.corpName} />
                  </ListItem>

                  <ListSubheader>사업자번호</ListSubheader>
                  <ListItem>
                    <ListItemText primary={item.businessNo} />
                  </ListItem>

                  <ListSubheader>사업자등록번호</ListSubheader>
                  <ListItem>
                    <ListItemText primary={item.businessRegistrationNo} />
                  </ListItem>

                  <ListSubheader>설립일</ListSubheader>
                  <ListItem>
                    <ListItemText
                      primary={
                        item.foundDate
                          ? new Date(item.foundDate).toLocaleString("ko-KR")
                          : "-"
                      }
                    />
                  </ListItem>

                  <ListSubheader>사업 분류</ListSubheader>
                  <ListItem>
                    <ListItemText primary={item.businessCategory} />
                  </ListItem>

                  <ListSubheader>특허 보유</ListSubheader>
                  <ListItem>
                    <ListItemText primary={item.isPatentOwned} />
                  </ListItem>

                  <ListSubheader>증명</ListSubheader>
                  <ListItem>
                    {item.businessRegistrationCert?.map((url: string) => (
                      <Stack>
                        {/* <Box
                          component="img"
                          key={url}
                          src={url}
                          sx={{ width: '100%', objectFit: 'contain' }}
                        /> */}
                        <Button
                          LinkComponent="a"
                          href={url}
                          target="_blank"
                          size="small"
                          variant="contained"
                          color="secondary"
                          disableElevation
                        >
                          새 창 보기
                        </Button>
                      </Stack>
                    ))}
                  </ListItem>
                </Stack>
              </ListItem>

              <Divider />

              <ListSubheader color="primary">대표 정보</ListSubheader>
              <ListItem sx={{ p: 0 }}>
                <Stack
                  component={List}
                  width="100%"
                  sx={{
                    p: 0,
                    ul: { p: 0 },
                    li: { p: 0 },
                    ".MuiListItem-root": { px: 2 },
                  }}
                >
                  <ListSubheader>이름</ListSubheader>
                  <ListItem>
                    <ListItemText primary={item.name} />
                  </ListItem>

                  <ListSubheader>소재지</ListSubheader>
                  <ListItem>
                    <ListItemText primary={item.ownerLocation} />
                  </ListItem>
                </Stack>
              </ListItem>

              <Divider />

              <ListSubheader color="primary">자산/부채 정보</ListSubheader>
              <ListItem sx={{ p: 0 }}>
                <Stack
                  component={List}
                  width="100%"
                  sx={{
                    p: 0,
                    ul: { p: 0 },
                    li: { p: 0 },
                    ".MuiListItem-root": { px: 2 },
                  }}
                >
                  <ListSubheader>3개년 수익</ListSubheader>
                  <Stack component={ListItem} alignItems="start">
                    {item.threeYearRevenue?.map((row: any) => (
                      <Stack component={ListItemText} id={row.year}>
                        {row.year} : {row.revenue} (억)
                      </Stack>
                    ))}
                  </Stack>

                  <ListSubheader>부채 상태</ListSubheader>
                  <Stack component={ListItem} alignItems="start">
                    {item.debtStatus?.map((row: any) => (
                      <Stack component={ListItemText} id={row.bankName}>
                        {row.bankName} : {row.debtAmount} (억)
                      </Stack>
                    ))}
                  </Stack>

                  <ListSubheader>재무제표</ListSubheader>
                  <ListItem>
                    {item.financialReports?.map((url: string) => (
                      <Stack>
                        <Button
                          LinkComponent="a"
                          href={url}
                          target="_blank"
                          size="small"
                          variant="contained"
                          color="secondary"
                          disableElevation
                        >
                          새 창 보기
                        </Button>
                      </Stack>
                    ))}
                  </ListItem>
                </Stack>
              </ListItem>

              <Divider />

              <ListSubheader color="primary">검토 정보</ListSubheader>
              <ListItem sx={{ p: 0 }}>
                <Stack
                  component={List}
                  width="100%"
                  sx={{
                    p: 0,
                    ul: { p: 0 },
                    li: { p: 0 },
                    ".MuiListItem-root": { px: 2 },
                  }}
                >
                  <ListSubheader>추가 자료 요청</ListSubheader>
                  <ListItem>
                    <ListItemText
                      primary={
                        item.additionalInfoSubmittedAt
                          ? `제출 완료 (${new Date(
                              item.additionalInfoSubmittedAt
                            ).toLocaleString("ko-KR")})`
                          : item.isAdditionalInfoRequired == "Y"
                          ? "추가 자료 필요"
                          : "-"
                      }
                    />
                  </ListItem>

                  <ListSubheader>대출 가능 금액</ListSubheader>
                  <ListItem>
                    <ListItemText primary={item.availableFundAmount} />
                  </ListItem>

                  <ListSubheader>검토 상태</ListSubheader>
                  <ListItem>
                    <ListItemText
                      primary={
                        APPLICATION_STATES_OBJ[
                          item.state as keyof typeof APPLICATION_STATES_OBJ
                        ]
                      }
                    />
                    {item.state == "APPROVED" && (
                      <ListItemText
                        primary={new Date(item.approveRejectAt).toLocaleString(
                          "ko-KR"
                        )}
                      />
                    )}
                  </ListItem>

                  <ListSubheader>증명</ListSubheader>
                  <ListItem>
                    {item.businessRegistrationCert?.map((url: string) => (
                      <Stack>
                        {/* <Box
                          component="img"
                          key={url}
                          src={url}
                          sx={{ width: '100%', objectFit: 'contain' }}
                        /> */}
                        <Button
                          LinkComponent="a"
                          href={url}
                          target="_blank"
                          size="small"
                          variant="contained"
                          color="secondary"
                          disableElevation
                        >
                          새 창 보기
                        </Button>
                      </Stack>
                    ))}
                  </ListItem>
                </Stack>
              </ListItem>

              <Divider />

              <ListSubheader color="primary">컨설팅 신청 정보</ListSubheader>
              <ListItem>
                <ListItemText
                  primary={
                    item.isManagementApplied ? <b>신청</b> : "신청하지 않음"
                  }
                />
              </ListItem>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default ApplicationList;
