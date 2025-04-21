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
import { useState } from "react";

import { useAtomValue } from "jotai";
import { profileAtom } from "@/app/store/profileAtom";
import { useFirstApplicationId } from "@/app/hooks/apis/useFirstApplicationId";
import { useCompanyApplication } from "@/app/hooks/apis/useCompanyApplication";
import CommonModal from "@/app/components/CommonModal";
import { useRouter } from "next/navigation";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CompanyRNDForm() {
  const { mutate, isPending } = useApplicationTemp();
  const {
    data: applicationData,
    isLoading,
    refetch,
  } = useFirstApplicationId("RND");

  const applicationId = applicationData?.applications[0];

  const { mutate: saveTempApplication, isPending: isSavePending } =
    useCompanyApplication();

  const profile = useAtomValue(profileAtom);

  const router = useRouter();

  const [form, setForm] = useState({
    companyName: profile?.additionalInfo?.corporateInfoCorpName,
    ceoName: profile?.name,
    contact: profile?.phoneNumber,
    location: profile?.location ?? "서울",
    businessType: "",
    sales: "",
    exportStatus: "",
    homepage: "",
    rAndDHistory: [""],
    rAndDItem: "",
    rAndDFunding: "",
    rAndDDescription: "",
    files: {
      businessLicense: null,
      patent: null,
    },
    agreeToTerms: false,
  });

  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const handleSave = () => {
    saveTempApplication(
      {
        body: {
          applicationId: Number(applicationId?.id),
        },
      },
      {
        onSuccess: () => {
          setIsSave(true);
          setModalText(
            "신청을 완료하였습니다.\n전문가의 검토가 시작되면 이메일로 안내드리겠습니다."
          );
          setIsModalOpen(true);
        },

        onError: (e) => {
          console.log("error", e);
          setModalText(
            "저장 버튼을 클릭하여 신청 내역을 저장 후, 신청해주세요."
          );
          setIsModalOpen(true);
        },
      }
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, files: { ...form.files, [name]: files[0] } });
  };

  const handleRAndDHistoryChange = (index, value) => {
    const updated = [...form.rAndDHistory];
    updated[index] = value;
    setForm({ ...form, rAndDHistory: updated });
  };

  const addRAndDHistory = () => {
    setForm({ ...form, rAndDHistory: [...form.rAndDHistory, ""] });
  };

  const removeRAndDHistory = (index) => {
    const updated = form.rAndDHistory.filter((_, i) => i !== index);
    setForm({ ...form, rAndDHistory: updated });
  };

  const handleAgreementChange = (e) => {
    setForm({ ...form, agreeToTerms: e.target.checked });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    const data = {
      type: "RND",
      businessCategory: form.businessType,
      lastYearRevenue: {
        year: "2024",
        revenue: form.sales.replace(/,/g, ""),
      },
      lastYearExport: {
        year: "2024",
        export: form.exportStatus.replace(/,/g, ""),
      },
      homepage: form.homepage,
      history: form.rAndDHistory.filter(Boolean).map((content, index) => ({
        sequence: String(index + 1),
        content,
      })),
      item: form.rAndDItem,
      requiredBudget: form.rAndDFunding.replace(/,/g, ""),
      itemSummary: form.rAndDDescription,
      isFinancialInstituteInfoShareAgreed: form.agreeToTerms,
    };

    formData.append("data", JSON.stringify(data));

    if (form.files.businessLicense) {
      formData.append("businessRegistrationCert", form.files.businessLicense);
    }
    if (form.files.patent) {
      formData.append("patentCert", form.files.patent);
    }

    mutate(
      { body: formData },
      {
        onSuccess: () => {
          setModalText(
            "임시 저장을 완료하였습니다.\n신청 버튼을 클릭해주세요."
          );
          setIsModalOpen(true);

          setTimeout(() => {
            refetch();
          }, 1000);
        },

        onError: (e) => {
          console.log("temp save error: ", e);

          setModalText(
            "임시 저장에 실패하였습니다.\n누락된 정보를 확인하세요."
          );
          setIsModalOpen(true);
        },
      }
    );
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ my: 3 }}>
        <Stack gap={6} px={3} py={6}>
          <Typography variant="h4" align="center" gutterBottom>
            기업 정보 및 R&D 정보 입력
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
                      disabled
                      id="companyName"
                      autoComplete="off"
                      fullWidth
                      name="companyName"
                      hiddenLabel
                      value={profile?.additionalInfo?.corporateInfoCorpName}
                      // onChange={handleChange}
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
                      disabled
                      value={profile?.name}
                      id="ceoName"
                      autoComplete="off"
                      fullWidth
                      name="ceoName"
                      hiddenLabel
                      onChange={handleChange}
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
                      htmlFor="contact"
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
                      disabled
                      value={profile?.phoneNumber}
                      id="contact"
                      autoComplete="off"
                      fullWidth
                      name="contact"
                      hiddenLabel
                      onChange={handleChange}
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
                      htmlFor="location"
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
                      disabled
                      value={profile?.location ?? "서울"}
                      id="location"
                      autoComplete="off"
                      fullWidth
                      name="location"
                      hiddenLabel
                      onChange={handleChange}
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
                      id="businessType"
                      autoComplete="off"
                      fullWidth
                      name="businessType"
                      hiddenLabel
                      onChange={handleChange}
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
                      htmlFor="homepage"
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
                      onChange={handleChange}
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
                      htmlFor="sales"
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
                      onChange={handleChange}
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
                      htmlFor="exportStatus"
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
                      onChange={handleChange}
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
                  {form.rAndDHistory.map((item, index) => (
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
                          htmlFor={`rAndDHistory-${index}`}
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
                          id={`rAndDHistory-${index}`}
                          fullWidth
                          multiline
                          minRows={2}
                          value={item}
                          onChange={(e) =>
                            handleRAndDHistoryChange(index, e.target.value)
                          }
                          sx={{
                            ".MuiInputBase-root": {
                              borderRadius: "2px !important",
                            },
                          }}
                        />
                      </Stack>

                      <Stack
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ gridColumnStart: 3 }}
                      >
                        <IconButton
                          onClick={() => removeRAndDHistory(index)}
                          disabled={form.rAndDHistory.length === 1}
                          sx={{ width: "fit-content" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                onClick={addRAndDHistory}
                startIcon={<AddIcon />}
                variant="text"
                size="large"
              >
                R&D 이력 추가
              </Button>
            </CardActions>
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
                      htmlFor="rAndDItem"
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
                      onChange={handleChange}
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
                      htmlFor="rAndDFunding"
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
                      onChange={handleChange}
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
                      htmlFor="rAndDDescription"
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
                      id="rAndDDescription"
                      autoComplete="off"
                      fullWidth
                      multiline
                      minRows={4}
                      name="rAndDDescription"
                      hiddenLabel
                      onChange={handleChange}
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
                  <Stack
                    display="grid"
                    rowGap={0.5}
                    gridColumn={3}
                    gridTemplateColumns="auto 1fr 2fr"
                    sx={{
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        rowGap: 0,
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
                        display: "inline-flex",
                        alignItems: "center",
                        p: 1,
                        bgcolor: "action.hover",
                        fontWeight: 600,
                      }}
                    >
                      1
                    </FormLabel>

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
                      <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        sx={{
                          flexShrink: 0,
                          flexGrow: 1,
                        }}
                      >
                        파일 선택
                        <VisuallyHiddenInput
                          type="file"
                          name="businessLicense"
                          onChange={handleFileChange}
                        />
                      </Button>
                      {form.files.businessLicense && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          overflow="hidden"
                          textOverflow="ellipsis"
                          width="100%"
                          px={1}
                        >
                          {form.files.businessLicense.name}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                  <Stack
                    display="grid"
                    rowGap={0.5}
                    gridColumn={3}
                    gridTemplateColumns="auto 1fr 2fr"
                    gridAutoRows="2.5rem"
                    sx={{
                      [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                        rowGap: 0,
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
                        display: "inline-flex",
                        alignItems: "center",
                        p: 1,
                        bgcolor: "action.hover",
                        fontWeight: 600,
                      }}
                    >
                      2
                    </FormLabel>

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
                      <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        sx={{
                          flexShrink: 0,
                          flexGrow: 1,
                        }}
                      >
                        파일 선택
                        <VisuallyHiddenInput
                          type="file"
                          name="patent"
                          onChange={handleFileChange}
                        />
                      </Button>
                      {form.files.patent && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          overflow="hidden"
                          textOverflow="ellipsis"
                          width="100%"
                          px={1}
                        >
                          {form.files.patent.name}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Stack>
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={form.agreeToTerms}
                  onChange={handleAgreementChange}
                />
              }
              label="교수 정보공개 동의 (R&D 서비스는 유료이며, 연구를 담당하는 위원에게 지급됩니다.)"
            />
          </Stack>

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
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "제출 중..." : "저장"}
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSavePending}
              variant="contained"
              color="primary"
              fullWidth
            >
              신청
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
    </Container>
  );
}
