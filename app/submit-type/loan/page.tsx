"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Grid2,
  Paper,
  MenuItem,
  IconButton,
  Input,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useApplicationTemp } from "@/app/hooks/apis/useApplicationTemp";

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
  const [form, setForm] = useState({
    companyName: "",
    ceoName: "",
    ceoLocation: "",
    companyLocation: "",
    establishmentDate: "",
    selfOwned: false,
    businessNumber: "",
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

  const { mutate, isPending } = useApplicationTemp();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleSave = () => {
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
        onSuccess: () => alert("저장 완료!"),
        onError: (e) => {
          console.error(e);
          alert("저장 실패");
        },
      }
    );
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, mb: 12 }}>
        <Typography variant="h5" align="center" gutterBottom>
          SUMMARY
        </Typography>

        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="기업체명"
              name="companyName"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="대표자명"
              name="ceoName"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="사업자번호"
              name="businessNumber"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="설립일자"
              name="establishmentDate"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="기업 소재지"
              name="companyLocation"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="대표 소재지"
              name="ceoLocation"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="업태"
              name="businessType"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              select
              label="특허"
              name="patent"
              value={form.patent}
              onChange={handleChange}
            >
              <MenuItem value="유">유</MenuItem>
              <MenuItem value="무">무</MenuItem>
            </TextField>
          </Grid2>

          <Grid2 size={12}>
            <FormControlLabel
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
          </Grid2>

          <Grid2 size={4}>
            <TextField
              fullWidth
              label="2022년 매출액 (원)"
              name="sales2022"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              label="2023년 매출액 (원)"
              name="sales2023"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth
              label="2024년 매출액 (원)"
              name="sales2024"
              onChange={handleChange}
            />
          </Grid2>

          <Grid2 size={12} mt={4}>
            <Typography variant="h6">부채 현황</Typography>
            {form.debts.map((debt, index) => (
              <Grid2
                container
                spacing={1}
                key={index}
                alignItems="center"
                mt={1}
              >
                <Grid2 size={5}>
                  <TextField
                    fullWidth
                    select
                    label="은행"
                    value={debt.bank}
                    onChange={(e) =>
                      handleDebtChange(index, "bank", e.target.value)
                    }
                  >
                    {bankList.map((bank, i) => (
                      <MenuItem key={i} value={bank}>
                        {bank}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 size={5}>
                  <TextField
                    fullWidth
                    label="금액 (원)"
                    value={debt.amount}
                    onChange={(e) =>
                      handleDebtChange(index, "amount", e.target.value)
                    }
                  />
                </Grid2>
                <Grid2 size={2}>
                  <IconButton onClick={() => removeDebt(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid2>
              </Grid2>
            ))}
            <Grid2 size={12} mt={1}>
              <Button
                onClick={addDebt}
                variant="outlined"
                startIcon={<AddIcon />}
              >
                부채 추가
              </Button>
            </Grid2>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="h6">요구사항</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="operationFunds"
                  checked={form.loanOptions.operationFunds}
                  onChange={handleCheckboxChange}
                />
              }
              label="운전자금"
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
            />
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="h6">파일 업로드</Typography>
            <Typography>사업자등록증 사본 업로드</Typography>
            <Input
              type="file"
              name="businessLicense"
              onChange={handleFileChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <Typography>재무제표 업로드</Typography>
            <Input
              type="file"
              name="financialStatement"
              onChange={handleFileChange}
            />
          </Grid2>

          <Grid2 size={12}>
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
          </Grid2>

          <Grid2 size={6}>
            <Button variant="contained" fullWidth onClick={handleSave}>
              저장
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button variant="contained" color="primary" fullWidth>
              신청
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
}
