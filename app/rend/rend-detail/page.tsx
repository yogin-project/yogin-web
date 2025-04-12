// TODO: 추가자료 요청, 승인 기능 구현해야함

"use client";

import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { BREAKPOINTS } from "@/app/libs/theme";
import { ChevronRightRounded } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CommonModal from "@/app/components/CommonModal";
import { useCorpDetailSearch } from "@/app/hooks/apis/useCorpDetailSearch";
import { useApplicationApprove } from "@/app/hooks/apis/useApplicationApprove";
import { useAddRequire } from "@/app/hooks/apis/useAddRequire";
import ApprovalModal from "@/app/components/ApprovalModal";

export default function Loan() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, refetch } = useCorpDetailSearch(id);

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`신청정보_${corpData?.corpName ?? "미지정"}.pdf`);
  };

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const corpData = data?.data[0];

  const router = useRouter();

  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const [modalType, setModalType] = useState<
    "approve" | "reject" | "require" | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { mutate: handleAddRequire, isPaused: isAddRequirePending } =
    useAddRequire();
  const { mutate: handleApprove, isPending: isApprovePending } =
    useApplicationApprove();

  // ✅ 승인 API
  const handleModalOpen = (type: "approve" | "reject" | "require") => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (value: string | null) => {
    if (!id) return;

    if (modalType === "require") {
      handleAddRequire({
        // headers: { "Content-Type": "application/json" },
        body: {
          id: Number(id),
          requirement: value,
        },
      });
    }

    if (modalType === "approve") {
      handleApprove({
        // headers: { "Content-Type": "application/json" },
        body: {
          id: Number(id),
          isApproved: true,
          availableFundAmount: value,
        },
      });
    }

    if (modalType === "reject") {
      handleApprove({
        // headers: { "Content-Type": "application/json" },
        body: {
          id: Number(id),
          isApproved: false,
        },
      });
    }

    handleModalClose();
  };

  return (
    <Container maxWidth="md" ref={pdfRef}>
      <Paper elevation={1} sx={{ my: 3 }}>
        <Stack gap={6} px={3} py={6}>
          <Typography variant="h4" align="center" gutterBottom>
            기업 정보 요약
          </Typography>

          <Card variant="outlined">
            <CardContent>
              <Stack gap={3}>
                <Typography variant="h6">
                  <ChevronRightRounded
                    sx={{ verticalAlign: "sub", height: 20 }}
                  />{" "}
                  기업 정보
                </Typography>
                <Stack
                  display="grid"
                  rowGap={0.5}
                  columnGap={1}
                  gridColumn={2}
                  gridTemplateColumns="1fr 1fr"
                  gridAutoRows="2.5rem"
                  sx={{
                    [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                      gridColumn: 1,
                      gridTemplateColumns: "auto",
                    },
                    "& label": {
                      display: "inline-flex",
                      alignItems: "center",
                      p: 1,
                      bgcolor: "action.hover",
                      fontWeight: 600,
                    },
                    "& .MuiInputBase-root": {
                      height: "100%",
                      px: 1,
                    },
                  }}
                >
                  <Stack
                    sx={{ gridColumnStart: 1 }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="companyName"
                      sx={{
                        gridColumnStart: 1,
                        borderTopWidth: 1,
                        borderTopStyle: "solid",
                        borderTopColor: "action.hover",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        borderBottomColor: "action.hover",
                      }}
                    >
                      기업체명
                    </FormLabel>
                    <TextField
                      value={corpData?.corpName}
                      id="companyName"
                      autoComplete="off"
                      fullWidth
                      name="companyName"
                      hiddenLabel
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>

                  <Stack
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="ceoName"
                      sx={{
                        gridColumnStart: 1,
                        borderTopWidth: 1,
                        borderTopStyle: "solid",
                        borderTopColor: "action.hover",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        borderBottomColor: "action.hover",
                      }}
                    >
                      대표자명
                    </FormLabel>
                    <TextField
                      value={corpData?.userName}
                      id="ceoName"
                      autoComplete="off"
                      fullWidth
                      name="ceoName"
                      hiddenLabel
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>

                  <Stack
                    sx={{ gridColumnStart: 1 }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="businessNumber"
                      sx={{
                        gridColumnStart: 1,
                        borderTopWidth: 1,
                        borderTopStyle: "solid",
                        borderTopColor: "action.hover",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        borderBottomColor: "action.hover",
                      }}
                    >
                      사업자번호
                    </FormLabel>
                    <TextField
                      value={corpData?.businessNo}
                      id="businessNumber"
                      autoComplete="off"
                      fullWidth
                      name="businessNumber"
                      hiddenLabel
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>

                  <Stack
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="establishmentDate"
                      sx={{
                        gridColumnStart: 1,
                        borderTopWidth: 1,
                        borderTopStyle: "solid",
                        borderTopColor: "action.hover",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        borderBottomColor: "action.hover",
                      }}
                    >
                      설립일자
                    </FormLabel>
                    <TextField
                      value={corpData?.foundData}
                      id="establishmentDate"
                      autoComplete="off"
                      fullWidth
                      name="establishmentDate"
                      hiddenLabel
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>

                  <Stack
                    sx={{ gridColumnStart: 1 }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="companyLocation"
                      sx={{
                        gridColumnStart: 1,
                        borderTopWidth: 1,
                        borderTopStyle: "solid",
                        borderTopColor: "action.hover",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        borderBottomColor: "action.hover",
                      }}
                    >
                      기업 소재지
                    </FormLabel>
                    <TextField
                      value={data?.location ?? "서울"}
                      id="companyLocation"
                      autoComplete="off"
                      fullWidth
                      name="companyLocation"
                      hiddenLabel
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>

                  <Stack
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="ceoLocation"
                      sx={{
                        gridColumnStart: 1,
                        borderTopWidth: 1,
                        borderTopStyle: "solid",
                        borderTopColor: "action.hover",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        borderBottomColor: "action.hover",
                      }}
                    >
                      대표 소재지
                    </FormLabel>
                    <TextField
                      value={corpData?.ownerLocation}
                      id="ceoLocation"
                      autoComplete="off"
                      fullWidth
                      name="ceoLocation"
                      hiddenLabel
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>

                  <Stack
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                    justifyContent="end"
                  >
                    <FormControlLabel
                      sx={{
                        p: "0 !important",
                        bgcolor: "transparent !important",
                        gridColumnStart: 2,
                      }}
                      control={
                        <Checkbox
                          name="selfOwned"
                          checked={corpData?.isCorpLocationOwned === "Y"}
                        />
                      }
                      label="소재지 자가 여부"
                    />
                  </Stack>

                  <Stack
                    sx={{ gridColumnStart: 1 }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="businessType"
                      sx={{
                        gridColumnStart: 1,
                        borderTopWidth: 1,
                        borderTopStyle: "solid",
                        borderTopColor: "action.hover",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        borderBottomColor: "action.hover",
                      }}
                    >
                      업태
                    </FormLabel>

                    <TextField
                      value={corpData?.businessCategory}
                      id="businessType"
                      autoComplete="off"
                      fullWidth
                      name="businessType"
                      hiddenLabel
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>

                  <Stack
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="patent"
                      sx={{
                        gridColumnStart: 1,
                        borderTopWidth: 1,
                        borderTopStyle: "solid",
                        borderTopColor: "action.hover",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        borderBottomColor: "action.hover",
                      }}
                    >
                      특허
                    </FormLabel>
                    <TextField
                      value={corpData?.isPatentOwned === "Y" ? "유" : "무"}
                      id="businessType"
                      autoComplete="off"
                      fullWidth
                      name="businessType"
                      hiddenLabel
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack gap={3}>
                <Typography variant="h6">
                  <ChevronRightRounded
                    sx={{ verticalAlign: "sub", height: 20 }}
                  />{" "}
                  매출액 정보
                </Typography>
                <Stack
                  display="grid"
                  rowGap={0.5}
                  gridColumn={2}
                  gridTemplateColumns="1fr 3fr"
                  gridAutoRows="2.5rem"
                  sx={{
                    [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                      gridColumn: 1,
                      gridTemplateColumns: "1fr",
                    },
                    "& label": {
                      display: "inline-flex",
                      alignItems: "center",
                      p: 1,
                      bgcolor: "action.hover",
                      fontWeight: 600,
                    },
                    "& .MuiInputBase-root": {
                      height: "100%",
                      px: 1,
                    },
                  }}
                >
                  <FormLabel
                    htmlFor="sales2022"
                    sx={{
                      gridColumnStart: 1,
                      borderTopWidth: 1,
                      borderTopStyle: "solid",
                      borderTopColor: "action.hover",
                      borderBottomWidth: 1,
                      borderBottomStyle: "solid",
                      borderBottomColor: "action.hover",
                    }}
                  >
                    2022년 매출액 (억)
                  </FormLabel>
                  <TextField
                    value={Number(
                      corpData?.threeYearRevenue[0].revenue
                    ).toLocaleString()}
                    id="sales2022"
                    autoComplete="off"
                    fullWidth
                    name="sales2022"
                    hiddenLabel
                    variant="standard"
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">억</InputAdornment>
                        ),
                      },
                    }}
                  />

                  <FormLabel
                    htmlFor="sales2023"
                    sx={{
                      gridColumnStart: 1,
                      borderTopWidth: 1,
                      borderTopStyle: "solid",
                      borderTopColor: "action.hover",
                      borderBottomWidth: 1,
                      borderBottomStyle: "solid",
                      borderBottomColor: "action.hover",
                    }}
                  >
                    2023년 매출액 (억)
                  </FormLabel>
                  <TextField
                    value={Number(
                      corpData?.threeYearRevenue[1].revenue
                    ).toLocaleString()}
                    id="sales2023"
                    autoComplete="off"
                    fullWidth
                    name="sales2023"
                    hiddenLabel
                    variant="standard"
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">억</InputAdornment>
                        ),
                      },
                    }}
                  />

                  <FormLabel
                    htmlFor="sales2024"
                    sx={{
                      gridColumnStart: 1,
                      borderTopWidth: 1,
                      borderTopStyle: "solid",
                      borderTopColor: "action.hover",
                      borderBottomWidth: 1,
                      borderBottomStyle: "solid",
                      borderBottomColor: "action.hover",
                    }}
                  >
                    2024년 매출액 (억)
                  </FormLabel>
                  <TextField
                    value={Number(
                      corpData?.threeYearRevenue[2].revenue
                    ).toLocaleString()}
                    id="sales2024"
                    autoComplete="off"
                    fullWidth
                    name="sales2024"
                    hiddenLabel
                    variant="standard"
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">억</InputAdornment>
                        ),
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack gap={3}>
                <Typography variant="h6">
                  <ChevronRightRounded
                    sx={{ verticalAlign: "sub", height: 20 }}
                  />{" "}
                  부채 현황
                </Typography>
                {true && (
                  <Stack gap={0.5}>
                    {corpData?.debtStatus.map((item, index) => (
                      <Stack
                        key={index}
                        display="grid"
                        rowGap={0.5}
                        columnGap={1}
                        gridColumn={4}
                        gridTemplateColumns="auto 3fr 3fr auto"
                        gridAutoRows="2.5rem"
                        sx={{
                          [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                            gridColumn: 3,
                            gridTemplateColumns: "auto 1fr auto",
                            rowGap: 0,
                          },
                          "& label": {
                            display: "inline-flex",
                            alignItems: "center",
                            p: 1,
                            bgcolor: "action.hover",
                            fontWeight: 600,
                          },
                          "& .MuiInputBase-root": {
                            height: "100%",
                            px: 1,
                          },
                        }}
                      >
                        <FormLabel
                          sx={{
                            gridColumnStart: 1,
                            borderTopWidth: 1,
                            borderTopStyle: "solid",
                            borderTopColor: "action.hover",
                            borderBottomWidth: 1,
                            borderBottomStyle: "solid",
                            borderBottomColor: "action.hover",
                            borderRightWidth: 1,
                            borderRightStyle: "solid",
                            borderRightColor: "action.hover",
                            marginRight: "-0.5rem",
                            [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                              gridRowStart: 1,
                              gridRowEnd: 3,
                            },
                          }}
                        >
                          {index + 1}
                        </FormLabel>

                        <Stack
                          sx={{ gridColumnStart: 2 }}
                          display="grid"
                          rowGap={0.5}
                          gridColumn={2}
                          gridTemplateColumns="1fr 2fr"
                          gridAutoRows="2.5rem"
                        >
                          <FormLabel
                            htmlFor={`bank-${item.bankName}-${index}`}
                            sx={{
                              gridColumnStart: 1,
                              borderTopWidth: 1,
                              borderTopStyle: "solid",
                              borderTopColor: "action.hover",
                              borderBottomWidth: 1,
                              borderBottomStyle: "solid",
                              borderBottomColor: "action.hover",
                            }}
                          >
                            은행
                          </FormLabel>
                          <TextField
                            id={`bank-${item.bankName}-${index}`}
                            fullWidth
                            value={item.bankName}
                            variant="standard"
                            sx={{ gridColumnStart: 2 }}
                          ></TextField>
                        </Stack>

                        <Stack
                          sx={{
                            gridColumnStart: 3,
                            [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                              gridColumnStart: 2,
                            },
                          }}
                          display="grid"
                          rowGap={0.5}
                          gridColumn={2}
                          gridTemplateColumns="1fr 2fr"
                          gridAutoRows="2.5rem"
                        >
                          <FormLabel
                            htmlFor={`amount-${item.debtAmount}-${index}`}
                            sx={{
                              gridColumnStart: 1,
                              borderTopWidth: 1,
                              borderTopStyle: "solid",
                              borderTopColor: "action.hover",
                              borderBottomWidth: 1,
                              borderBottomStyle: "solid",
                              borderBottomColor: "action.hover",
                            }}
                          >
                            금액
                          </FormLabel>
                          <TextField
                            id={`amount-${item.debtAmount}-${index}`}
                            fullWidth
                            value={Number(item.debtAmount).toLocaleString()}
                            variant="standard"
                            sx={{ gridColumnStart: 2 }}
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    억
                                  </InputAdornment>
                                ),
                              },
                            }}
                          />
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack gap={3}>
                <Typography variant="h6">
                  <ChevronRightRounded
                    sx={{ verticalAlign: "sub", height: 20 }}
                  />{" "}
                  요구 사항
                </Typography>
                <Stack
                  gap={0.5}
                  display="grid"
                  gridColumn={4}
                  sx={{
                    [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                      gridColumn: 1,
                    },
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="operationFunds"
                        checked={
                          !!corpData?.fundRequirements?.includes("OPERATE")
                        }
                        onChange={() => {}}
                      />
                    }
                    label="운전자금"
                    sx={{ gridColumnStart: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="facilityFunds"
                        checked={
                          !!corpData?.fundRequirements?.includes("FACILITY")
                        }
                        onChange={() => {}}
                      />
                    }
                    label="시설자금"
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="creditLoan"
                        checked={
                          !!corpData?.fundRequirements?.includes("CREDIT_LOAN")
                        }
                        onChange={() => {}}
                      />
                    }
                    label="신용대출"
                    sx={{
                      gridColumnStart: 3,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="mortgageLoan"
                        checked={
                          !!corpData?.fundRequirements?.includes("SECURED_LOAN")
                        }
                        onChange={() => {}}
                      />
                    }
                    label="담보대출"
                    sx={{
                      gridColumnStart: 4,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack gap={3}>
                <Typography variant="h6">
                  <ChevronRightRounded
                    sx={{ verticalAlign: "sub", height: 20 }}
                  />{" "}
                  필수 제출 자료
                </Typography>
                <Stack gap={0.5}>
                  <FormLabel
                    sx={{
                      gridColumnStart: 2,
                      borderTopWidth: 1,
                      borderTopStyle: "solid",
                      borderTopColor: "action.hover",
                      borderBottomWidth: 1,
                      borderBottomStyle: "solid",
                      borderBottomColor: "action.hover",
                      display: "inline-flex",
                      alignItems: "center",
                      p: 1,
                      bgcolor: "action.hover",
                      fontWeight: 600,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnEnd: 4,
                      },
                    }}
                  >
                    사업자등록증 사본
                  </FormLabel>

                  <Stack
                    width="100%"
                    overflow="hidden"
                    flexDirection="row"
                    alignItems="center"
                    sx={{
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                        gridColumnEnd: 4,
                      },
                    }}
                  >
                    {corpData?.businessRegistrationCert?.[0] ? (
                      <Button
                        variant="outlined"
                        href={corpData.businessRegistrationCert[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ flexShrink: 0 }}
                      >
                        다운로드
                      </Button>
                    ) : (
                      <Typography color="text.secondary">파일 없음</Typography>
                    )}

                    {corpData?.businessRegistrationCert?.[0] && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        overflow="hidden"
                        textOverflow="ellipsis"
                        width="100%"
                        px={1}
                      >
                        {decodeURIComponent(
                          corpData.businessRegistrationCert[0]
                            .split("/")
                            .pop() ?? ""
                        )}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                <Stack gap={0.5}>
                  <FormLabel
                    sx={{
                      gridColumnStart: 2,
                      borderTopWidth: 1,
                      borderTopStyle: "solid",
                      borderTopColor: "action.hover",
                      borderBottomWidth: 1,
                      borderBottomStyle: "solid",
                      borderBottomColor: "action.hover",
                      display: "inline-flex",
                      alignItems: "center",
                      p: 1,
                      bgcolor: "action.hover",
                      fontWeight: 600,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnEnd: 4,
                      },
                    }}
                  >
                    재무제표 사본
                  </FormLabel>

                  <Stack
                    width="100%"
                    overflow="hidden"
                    flexDirection="row"
                    alignItems="center"
                    sx={{
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumnStart: 1,
                        gridColumnEnd: 4,
                      },
                    }}
                  >
                    {corpData?.financialReports?.[0] ? (
                      <Button
                        variant="outlined"
                        href={corpData.financialReports[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ flexShrink: 0 }}
                      >
                        다운로드
                      </Button>
                    ) : (
                      <Typography color="text.secondary">파일 없음</Typography>
                    )}

                    {corpData?.financialReports?.[0] && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        overflow="hidden"
                        textOverflow="ellipsis"
                        width="100%"
                        px={1}
                      >
                        {decodeURIComponent(
                          corpData.financialReports[0].split("/").pop() ?? ""
                        )}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Stack
            gap={1}
            flexDirection="row"
            sx={{
              [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                flexDirection: "column",
              },
            }}
          >
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={handleExportPDF}
            >
              PDF 저장
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => handleModalOpen("require")}
            >
              추가자료 요청
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => handleModalOpen("approve")}
            >
              승인
            </Button>
            <Button
              variant="contained"
              color="error"
              size="large"
              fullWidth
              onClick={() => handleModalOpen("reject")}
            >
              부결
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <CommonModal
        message={modalText}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);

          if (isSave) {
            router.push("/dashboard/submit-list");
          }
        }}
      />
      {/* ✅ 모달: 승인 */}
      <ApprovalModal
        open={modalOpen}
        type={modalType!}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </Container>
  );
}
