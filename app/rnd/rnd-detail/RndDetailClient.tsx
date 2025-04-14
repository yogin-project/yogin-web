"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { BREAKPOINTS } from "@/app/libs/theme";
import { ChevronRightRounded } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useApplicationTemp } from "@/app/hooks/apis/useApplicationTemp";
import { useEffect, useRef, useState } from "react";

import { useAtomValue } from "jotai";
import { useFirstApplicationId } from "@/app/hooks/apis/useFirstApplicationId";
import { useCompanyApplication } from "@/app/hooks/apis/useCompanyApplication";
import CommonModal from "@/app/components/CommonModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCorpDetailSearch } from "@/app/hooks/apis/useCorpDetailSearch";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAddRequire } from "@/app/hooks/apis/useAddRequire";
import { useApplicationApprove } from "@/app/hooks/apis/useApplicationApprove";
import ApprovalModal from "@/app/components/ApprovalModal";

export default function RNDDetailClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, refetch } = useCorpDetailSearch(id);

  const corpData = data?.data[0];

  const router = useRouter();
  const pdfRef = useRef<HTMLDivElement>(null);

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

  console.log("corpData: ", corpData);

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
                      htmlFor="companyNameDatail"
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
                      id="companyNameDatail"
                      autoComplete="off"
                      fullWidth
                      name="companyName"
                      hiddenLabel
                      value={corpData?.corpName}
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>

                  <Stack
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumn: 1,
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
                      htmlFor="contactDetail"
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
                      연락처
                    </FormLabel>
                    <TextField
                      value={corpData?.userPhoneNumber}
                      id="contact"
                      autoComplete="off"
                      fullWidth
                      name="contact"
                      hiddenLabel
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>

                  <Stack
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumn: 1,
                      },
                    }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="locationDetail"
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
                      소재지
                    </FormLabel>
                    <TextField
                      value={corpData?.location ?? "서울"}
                      id="location"
                      autoComplete="off"
                      fullWidth
                      name="location"
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
                      htmlFor="businessTypeDetail"
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
                        gridColumn: 1,
                      },
                    }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="homepageDetail"
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
                      홈페이지
                    </FormLabel>
                    <TextField
                      id="homepage"
                      autoComplete="off"
                      fullWidth
                      name="homepage"
                      hiddenLabel
                      value={corpData?.homepage}
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
                      htmlFor="salesDetail"
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
                      매출액 (억)
                    </FormLabel>
                    <TextField
                      id="sales"
                      autoComplete="off"
                      fullWidth
                      name="sales"
                      hiddenLabel
                      value={
                        corpData?.lastYearRevenue?.revenue
                          ? Number(
                              corpData?.lastYearRevenue?.revenue
                            ).toLocaleString() + "억"
                          : "-"
                      }
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">억</InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Stack>

                  <Stack
                    sx={{
                      gridColumnStart: 2,
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        gridColumn: 1,
                      },
                    }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      htmlFor="exportStatusDetail"
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
                      수출액 (억)
                    </FormLabel>
                    <TextField
                      id="exportStatus"
                      autoComplete="off"
                      fullWidth
                      name="exportStatus"
                      hiddenLabel
                      value={
                        corpData?.lastYearExport?.export
                          ? Number(
                              corpData?.lastYearExport?.export
                            ).toLocaleString() + "억"
                          : "-"
                      }
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
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
                  R&D 이력
                </Typography>
                <Stack gap={0.5}>
                  {corpData?.history ? (
                    corpData?.history.map((item, index) => (
                      <Stack
                        key={index}
                        display="grid"
                        rowGap={0.5}
                        columnGap={1}
                        gridColumn={3}
                        gridTemplateColumns="3fr auto"
                        sx={{
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
                          gridColumn={3}
                          gridTemplateColumns="auto 1fr"
                        >
                          <FormLabel
                            htmlFor={`rAndDHistoryDetail-${index}`}
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
                            }}
                          >
                            {index + 1}
                          </FormLabel>
                          <TextField
                            id={`rAndDHistoryDetail-${index}`}
                            fullWidth
                            multiline
                            minRows={2}
                            value={item.content}
                            sx={{
                              ".MuiInputBase-root": {
                                borderRadius: "2px !important",
                              },
                            }}
                          />
                        </Stack>

                        {/* <Stack
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ gridColumnStart: 3 }}
                      >
                        
                      </Stack> */}
                      </Stack>
                    ))
                  ) : (
                    <></>
                  )}
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
                  아이템 상세
                </Typography>
                <Stack gap={0.5}>
                  <Stack
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
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
                    <FormLabel
                      htmlFor="rAndDItemDetail"
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
                      아이템 요약
                    </FormLabel>
                    <TextField
                      id="rAndDItem"
                      autoComplete="off"
                      fullWidth
                      name="rAndDItem"
                      hiddenLabel
                      value={corpData?.itemSummary}
                      variant="standard"
                      sx={{
                        [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                          gridColumnStart: 1,
                        },
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              20자 이내
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Stack>

                  <Stack
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
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
                    <FormLabel
                      htmlFor="rAndDFundingDetail"
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
                      개발 필요 자금 (억)
                    </FormLabel>
                    <TextField
                      id="rAndDFunding"
                      autoComplete="off"
                      fullWidth
                      name="rAndDFunding"
                      hiddenLabel
                      value={
                        corpData?.requiredBudget
                          ? Number(corpData?.requiredBudget).toLocaleString() +
                            "억"
                          : "-"
                      }
                      variant="standard"
                      sx={{
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

                  <Stack
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
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
                    <FormLabel
                      htmlFor="rAndDDescriptionDetail"
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
                      아이템 내용 정리
                    </FormLabel>
                    <TextField
                      id="rAndDDescriptionDetail"
                      autoComplete="off"
                      fullWidth
                      multiline
                      minRows={4}
                      name="rAndDDescription"
                      hiddenLabel
                      value={corpData?.item}
                      sx={{
                        [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                          gridColumnStart: 1,
                        },
                        ".MuiInputBase-root": {
                          borderRadius: "2px !important",
                        },
                      }}
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
                    특허 관련 파일
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
                    {corpData?.patentCert?.[0] ? (
                      <Button
                        variant="outlined"
                        href={corpData.patentCert[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ flexShrink: 0 }}
                      >
                        다운로드
                      </Button>
                    ) : (
                      <Typography color="text.secondary">파일 없음</Typography>
                    )}

                    {corpData?.patentCert?.[0] && (
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
                          corpData.patentCert[0].split("/").pop() ?? ""
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
            <Button variant="outlined" fullWidth onClick={handleExportPDF}>
              PDF 저장
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => {
                handleModalOpen("require");
              }}
            >
              추가자료 요청
            </Button>

            <Button
              disabled={corpData?.state !== "ADDITIONAL_INFO_REQUIRED"}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => handleModalOpen("approve")}
            >
              {corpData?.state !== "ADDITIONAL_INFO_REQUIRED"
                ? "추가자료 확인 후 승인"
                : "승인"}
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
