"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { BREAKPOINTS } from "@/app/libs/theme";
import { ChevronRightRounded } from "@mui/icons-material";
import CommonModal from "@/app/components/CommonModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { LOCATIONS } from "@/app/libs/contstant";
import { profileAtom } from "@/app/store/profileAtom";
import { useApplicationTemp } from "@/app/hooks/apis/useApplicationTemp";
import { useAtomValue } from "jotai";
import { useCompanyApplication } from "@/app/hooks/apis/useCompanyApplication";
import { useFirstApplicationId } from "@/app/hooks/apis/useFirstApplicationId";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

const bankList = [
  "기업은행",
  "우리은행",
  "하나은행",
  "지역농축협",
  "한국씨티은행",
  "국민은행",
  "신한은행",
  "농협은행",
  "sc은행",
  "우체국",
  "경남은행",
  "im은행(구 대구은행)",
  "부산은행",
  "산업은행",
  "새마을금고",
  "광주은행",
  "산림조합",
  "저축은행",
  "수협",
  "전북은행",
  "제주은행",
  "카카오뱅크",
  "케이뱅크",
  "토스뱅크",
];

export default function Loan() {
  const { mutate, isPending } = useApplicationTemp();
  const {
    data: applicationId,
    isLoading,
    refetch,
  } = useFirstApplicationId("FUND");

  const { mutate: saveTempApplication, isPending: isSavePending } =
    useCompanyApplication();

  const profile = useAtomValue(profileAtom);

  console.log("profile: ", profile);

  const router = useRouter();

  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const [form, setForm] = useState({
    companyName: profile?.additionalInfo?.corporateInfoCorpName,
    ceoName: profile?.name,
    ceoLocation: "",
    companyLocation: profile?.location ?? "서울",
    establishmentDate: "",
    selfOwned: false,
    businessNumber: profile?.additionalInfo?.corporateInfoBusinessNo,
    businessType: "",
    patent: "",
    sales2022: "",
    sales2023: "",
    sales2024: "",
    debts: [{ bank: "", amount: "" }],
    loanOptions: {
      operationFunds: false,
      facilityFunds: false,
      creditLoan: false,
      mortgageLoan: false,
    },
    files: {
      businessLicense: null,
      financialStatement: null,
    },
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    saveTempApplication(
      {
        body: {
          applicationId: Number(applicationId?.applications[0]?.id),
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

  const handleCheckboxChange = (e) => {
    setForm({
      ...form,
      loanOptions: { ...form.loanOptions, [e.target.name]: e.target.checked },
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, files: { ...form.files, [name]: files[0] } });
  };

  const handleAgreementChange = (e) => {
    setForm({ ...form, agreeToTerms: e.target.checked });
  };

  const handleDebtChange = (index, key, value) => {
    const updatedDebts = [...form.debts];
    updatedDebts[index][key] = value;
    setForm({ ...form, debts: updatedDebts });
  };

  const addDebt = () => {
    setForm({ ...form, debts: [...form.debts, { bank: "", amount: "" }] });
  };

  const removeDebt = (index) => {
    const updatedDebts = form.debts.filter((_, i) => i !== index);
    setForm({ ...form, debts: updatedDebts });
  };

  const handleTempSave = () => {
    const formData = new FormData();

    const data = {
      type: "FUND",
      ownerLocation: form.ceoLocation,
      isOwnerLocationOwned: form.selfOwned,
      isCorpLocationOwned: form.selfOwned,
      foundDate: form.establishmentDate,
      businessRegistrationNo: form.businessNumber,
      businessCategory: form.businessType,
      isPatentOwned: form.patent === "유",
      isFinancialInstituteInfoShareAgreed: form.agreeToTerms,
      threeYearRevenue: [
        { year: "2022", revenue: form.sales2022.replace(/,/g, "") },
        { year: "2023", revenue: form.sales2023.replace(/,/g, "") },
        { year: "2024", revenue: form.sales2024.replace(/,/g, "") },
      ],
      debtStatus: form.debts.map((debt) => ({
        bankName: debt.bank,
        debtAmount: debt.amount.replace(/,/g, ""),
      })),
      fundRequirements: Object.entries(form.loanOptions)
        .filter(([_, v]) => v)
        .map(([k]) =>
          k === "operationFunds"
            ? "OPERATE"
            : k === "facilityFunds"
            ? "FACILITY"
            : k === "creditLoan"
            ? "CREDIT_LOAN"
            : "SECURED_LOAN"
        ),
    };

    formData.append("data", JSON.stringify(data));

    if (form.files.businessLicense)
      formData.append("businessRegistrationCert", form.files.businessLicense);
    if (form.files.financialStatement)
      formData.append("financialReports", form.files.financialStatement);

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
                      disabled
                      value={profile?.additionalInfo?.corporateInfoCorpName}
                      id="companyName"
                      autoComplete="off"
                      fullWidth
                      name="companyName"
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
                      disabled
                      value={profile?.additionalInfo?.corporateInfoBusinessNo}
                      id="businessNumber"
                      autoComplete="off"
                      fullWidth
                      name="businessNumber"
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
                      id="establishmentDate"
                      autoComplete="off"
                      fullWidth
                      name="establishmentDate"
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
                      disabled
                      value={profile?.address ?? "서울"}
                      id="companyLocation"
                      autoComplete="off"
                      fullWidth
                      name="companyLocation"
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
                    <FormControl fullWidth sx={{ gridColumnStart: 2 }}>
                      <Select
                        id="ceoLocation"
                        name="ceoLocation"
                        value={form.ceoLocation}
                        onChange={handleChange}
                        variant="standard"
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>선택해주세요</em>
                        </MenuItem>
                        {LOCATIONS.map((loc) => (
                          <MenuItem key={loc} value={loc}>
                            {loc}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                          checked={form.selfOwned}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              selfOwned: e.target.checked,
                            }))
                          }
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
                      id="patent"
                      autoComplete="off"
                      fullWidth
                      select
                      name="patent"
                      hiddenLabel
                      value={form.patent}
                      onChange={handleChange}
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    >
                      <MenuItem value="유">유</MenuItem>
                      <MenuItem value="무">무</MenuItem>
                    </TextField>
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
                    id="sales2024"
                    autoComplete="off"
                    fullWidth
                    name="sales2024"
                    hiddenLabel
                    onChange={handleChange}
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
                    id="sales2023"
                    autoComplete="off"
                    fullWidth
                    name="sales2023"
                    hiddenLabel
                    onChange={handleChange}
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
                    id="sales2022"
                    autoComplete="off"
                    fullWidth
                    name="sales2022"
                    hiddenLabel
                    onChange={handleChange}
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
                {form.debts.length > 0 && (
                  <Stack gap={0.5}>
                    {form.debts.map((debt, index) => (
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
                            htmlFor={`bank-${debt}-${index}`}
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
                            id={`bank-${debt}-${index}`}
                            fullWidth
                            select
                            value={debt.bank}
                            onChange={(e) =>
                              handleDebtChange(index, "bank", e.target.value)
                            }
                            variant="standard"
                            sx={{ gridColumnStart: 2 }}
                          >
                            {bankList.map((bank, i) => (
                              <MenuItem key={i} value={bank}>
                                {bank}
                              </MenuItem>
                            ))}
                          </TextField>
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
                            htmlFor={`amount-${debt}-${index}`}
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
                            id={`amount-${debt}-${index}`}
                            fullWidth
                            value={debt.amount}
                            onChange={(e) =>
                              handleDebtChange(index, "amount", e.target.value)
                            }
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

                        <Stack
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            gridColumnStart: 4,
                            [`@media (max-width:${BREAKPOINTS.mobile}px)`]: {
                              marginTop: "-100%",
                            },
                          }}
                        >
                          <IconButton
                            onClick={() => removeDebt(index)}
                            sx={{ width: "fit-content" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                onClick={addDebt}
                variant="text"
                size="large"
                startIcon={<AddIcon />}
              >
                부채 추가
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
                        checked={form.loanOptions.operationFunds}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="운전자금"
                    sx={{ gridColumnStart: 1 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="facilityFunds"
                        checked={form.loanOptions.facilityFunds}
                        onChange={handleCheckboxChange}
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
                        checked={form.loanOptions.creditLoan}
                        onChange={handleCheckboxChange}
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
                        checked={form.loanOptions.mortgageLoan}
                        onChange={handleCheckboxChange}
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
                      재무제표
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
                          name="financialStatement"
                          onChange={handleFileChange}
                        />
                      </Button>
                      {form.files.financialStatement && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          overflow="hidden"
                          textOverflow="ellipsis"
                          width="100%"
                          px={1}
                        >
                          {form.files.financialStatement.name}
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
              label="금융기관 정보공개 동의"
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
              size="large"
              onClick={handleTempSave}
            >
              저장
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSavePending}
              variant="contained"
              color="primary"
              size="large"
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
