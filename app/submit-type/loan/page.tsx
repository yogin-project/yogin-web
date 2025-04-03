'use client';

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
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { ChevronRightRounded } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useApplicationTemp } from '@/app/hooks/apis/useApplicationTemp';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const bankList = [
  '기업은행',
  '우리은행',
  '하나은행',
  '지역농축협',
  '한국씨티은행',
  '국민은행',
  '신한은행',
  '농협은행',
  'sc은행',
  '우체국',
  '경남은행',
  'im은행(구 대구은행)',
  '부산은행',
  '산업은행',
  '새마을금고',
  '광주은행',
  '산림조합',
  '저축은행',
  '수협',
  '전북은행',
  '제주은행',
  '카카오뱅크',
  '케이뱅크',
  '토스뱅크',
];

export default function Loan() {
  const [form, setForm] = useState({
    companyName: '',
    ceoName: '',
    ceoLocation: '',
    companyLocation: '',
    establishmentDate: '',
    selfOwned: false,
    businessNumber: '',
    businessType: '',
    patent: '',
    sales2022: '',
    sales2023: '',
    sales2024: '',
    debts: [{ bank: '', amount: '' }],
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
    setForm({ ...form, debts: [...form.debts, { bank: '', amount: '' }] });
  };

  const removeDebt = (index) => {
    const updatedDebts = form.debts.filter((_, i) => i !== index);
    setForm({ ...form, debts: updatedDebts });
  };

  const handleSave = () => {
    const formData = new FormData();

    const data = {
      type: 'FUND',
      ownerLocation: form.ceoLocation,
      isOwnerLocationOwned: form.selfOwned,
      isCorpLocationOwned: form.selfOwned,
      foundDate: form.establishmentDate,
      businessRegistrationNo: form.businessNumber,
      businessCategory: form.businessType,
      isPatentOwned: form.patent === '유',
      isFinancialInstituteInfoShareAgreed: form.agreeToTerms,
      threeYearRevenue: [
        { year: '2022', revenue: form.sales2022.replace(/,/g, '') },
        { year: '2023', revenue: form.sales2023.replace(/,/g, '') },
        { year: '2024', revenue: form.sales2024.replace(/,/g, '') },
      ],
      debtStatus: form.debts.map((debt) => ({
        bankName: debt.bank,
        debtAmount: debt.amount.replace(/,/g, ''),
      })),
      fundRequirements: Object.entries(form.loanOptions)
        .filter(([_, v]) => v)
        .map(([k]) =>
          k === 'operationFunds'
            ? 'OPERATE'
            : k === 'facilityFunds'
            ? 'FACILITY'
            : k === 'creditLoan'
            ? 'CREDIT_LOAN'
            : 'SECURED_LOAN'
        ),
    };

    formData.append('data', JSON.stringify(data));

    if (form.files.businessLicense)
      formData.append('businessRegistrationCert', form.files.businessLicense);
    if (form.files.financialStatement)
      formData.append('financialReports', form.files.financialStatement);

    mutate(
      { body: formData },
      {
        onSuccess: () => alert('저장 완료!'),
        onError: (e) => {
          console.error(e);
          alert('저장 실패');
        },
      }
    );
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={1} sx={{ my: 3 }}>
        <Stack gap={6} px={3} py={6}>
          <Typography variant="h4" align="center" gutterBottom>
            SUMMARY
          </Typography>

          <Card variant="outlined">
            <CardContent>
              <Stack gap={3}>
                <Typography variant="h6">
                  <ChevronRightRounded sx={{ verticalAlign: 'sub' }} /> 기업
                  정보
                </Typography>
                <Stack
                  display="grid"
                  rowGap={0.5}
                  columnGap={1}
                  gridColumn={2}
                  gridTemplateColumns="1fr 1fr"
                  gridAutoRows="2.5rem"
                  sx={{
                    '& label': {
                      display: 'inline-flex',
                      alignItems: 'center',
                      p: 1,
                      bgcolor: 'action.hover',
                      fontWeight: 600,
                    },
                    '& .MuiInputBase-root': {
                      height: '100%',
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
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
                      }}
                    >
                      기업체명
                    </FormLabel>
                    <TextField
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
                    sx={{ gridColumnStart: 2 }}
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
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
                      }}
                    >
                      대표자명
                    </FormLabel>
                    <TextField
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
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
                      }}
                    >
                      사업자번호
                    </FormLabel>
                    <TextField
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
                    sx={{ gridColumnStart: 2 }}
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
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
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
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
                      }}
                    >
                      기업 소재지
                    </FormLabel>
                    <TextField
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
                    sx={{ gridColumnStart: 2 }}
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
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
                      }}
                    >
                      대표 소재지
                    </FormLabel>
                    <TextField
                      id="ceoLocation"
                      autoComplete="off"
                      fullWidth
                      name="ceoLocation"
                      hiddenLabel
                      onChange={handleChange}
                      variant="standard"
                      sx={{ gridColumnStart: 2 }}
                    />
                  </Stack>

                  <Stack
                    sx={{ gridColumnStart: 2 }}
                    display="grid"
                    rowGap={0.5}
                    gridColumn={2}
                    gridTemplateColumns="1fr 2fr"
                    gridAutoRows="2.5rem"
                    justifyContent="end"
                  >
                    <FormControlLabel
                      sx={{
                        p: '0 !important',
                        bgcolor: 'transparent !important',
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
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
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
                    sx={{ gridColumnStart: 2 }}
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
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
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
                  <ChevronRightRounded sx={{ verticalAlign: 'sub' }} /> 매출액
                  정보
                </Typography>
                <Stack
                  display="grid"
                  rowGap={0.5}
                  gridColumn={2}
                  gridTemplateColumns="1fr 3fr"
                  gridAutoRows="2.5rem"
                  sx={{
                    '& label': {
                      display: 'inline-flex',
                      alignItems: 'center',
                      p: 1,
                      bgcolor: 'action.hover',
                      fontWeight: 600,
                    },
                    '& .MuiInputBase-root': {
                      height: '100%',
                      px: 1,
                    },
                  }}
                >
                  <FormLabel
                    htmlFor="sales2022"
                    sx={{
                      gridColumnStart: 1,
                      borderTopWidth: 1,
                      borderTopStyle: 'solid',
                      borderTopColor: 'action.hover',
                      borderBottomWidth: 1,
                      borderBottomStyle: 'solid',
                      borderBottomColor: 'action.hover',
                    }}
                  >
                    2022년 매출액 (원)
                  </FormLabel>
                  <TextField
                    id="sales2022"
                    autoComplete="off"
                    fullWidth
                    name="sales2022"
                    hiddenLabel
                    onChange={handleChange}
                    variant="standard"
                    sx={{ gridColumnStart: 2 }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">원</InputAdornment>
                        ),
                      },
                    }}
                  />

                  <FormLabel
                    htmlFor="sales2023"
                    sx={{
                      gridColumnStart: 1,
                      borderTopWidth: 1,
                      borderTopStyle: 'solid',
                      borderTopColor: 'action.hover',
                      borderBottomWidth: 1,
                      borderBottomStyle: 'solid',
                      borderBottomColor: 'action.hover',
                    }}
                  >
                    2023년 매출액 (원)
                  </FormLabel>
                  <TextField
                    id="sales2023"
                    autoComplete="off"
                    fullWidth
                    name="sales2023"
                    hiddenLabel
                    onChange={handleChange}
                    variant="standard"
                    sx={{ gridColumnStart: 2 }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">원</InputAdornment>
                        ),
                      },
                    }}
                  />

                  <FormLabel
                    htmlFor="sales2024"
                    sx={{
                      gridColumnStart: 1,
                      borderTopWidth: 1,
                      borderTopStyle: 'solid',
                      borderTopColor: 'action.hover',
                      borderBottomWidth: 1,
                      borderBottomStyle: 'solid',
                      borderBottomColor: 'action.hover',
                    }}
                  >
                    2024년 매출액 (원)
                  </FormLabel>
                  <TextField
                    id="sales2024"
                    autoComplete="off"
                    fullWidth
                    name="sales2024"
                    hiddenLabel
                    onChange={handleChange}
                    variant="standard"
                    sx={{ gridColumnStart: 2 }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">원</InputAdornment>
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
                  <ChevronRightRounded sx={{ verticalAlign: 'sub' }} /> 부채
                  현황
                </Typography>
                {form.debts.length > 0 && (
                  <Stack gap={0.5}>
                    {form.debts.map((debt, index) => (
                      <Stack
                        key={index}
                        display="grid"
                        rowGap={0.5}
                        columnGap={1}
                        gridColumn={3}
                        gridTemplateColumns="3fr 3fr auto"
                        gridAutoRows="2.5rem"
                        sx={{
                          '& label': {
                            display: 'inline-flex',
                            alignItems: 'center',
                            p: 1,
                            bgcolor: 'action.hover',
                            fontWeight: 600,
                          },
                          '& .MuiInputBase-root': {
                            height: '100%',
                            px: 1,
                          },
                        }}
                      >
                        <Stack
                          sx={{ gridColumnStart: 1 }}
                          display="grid"
                          rowGap={0.5}
                          gridColumn={3}
                          gridTemplateColumns="auto 1fr 2fr"
                          gridAutoRows="2.5rem"
                        >
                          <FormLabel
                            sx={{
                              gridColumnStart: 1,
                              borderTopWidth: 1,
                              borderTopStyle: 'solid',
                              borderTopColor: 'action.hover',
                              borderBottomWidth: 1,
                              borderBottomStyle: 'solid',
                              borderBottomColor: 'action.hover',
                              borderRightWidth: 1,
                              borderRightStyle: 'solid',
                              borderRightColor: 'action.hover',
                            }}
                          >
                            {index + 1}
                          </FormLabel>
                          <FormLabel
                            htmlFor={`bank-${debt}-${index}`}
                            sx={{
                              gridColumnStart: 2,
                              borderTopWidth: 1,
                              borderTopStyle: 'solid',
                              borderTopColor: 'action.hover',
                              borderBottomWidth: 1,
                              borderBottomStyle: 'solid',
                              borderBottomColor: 'action.hover',
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
                              handleDebtChange(index, 'bank', e.target.value)
                            }
                            variant="standard"
                            sx={{
                              gridColumnStart: 3,
                            }}
                          >
                            {bankList.map((bank, i) => (
                              <MenuItem key={i} value={bank}>
                                {bank}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>

                        <Stack
                          sx={{ gridColumnStart: 2 }}
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
                              borderTopStyle: 'solid',
                              borderTopColor: 'action.hover',
                              borderBottomWidth: 1,
                              borderBottomStyle: 'solid',
                              borderBottomColor: 'action.hover',
                            }}
                          >
                            금액 (원)
                          </FormLabel>
                          <TextField
                            id={`amount-${debt}-${index}`}
                            fullWidth
                            value={debt.amount}
                            onChange={(e) =>
                              handleDebtChange(index, 'amount', e.target.value)
                            }
                            variant="standard"
                            sx={{
                              gridColumnStart: 2,
                            }}
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    원
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
                          sx={{ gridColumnStart: 3 }}
                        >
                          <IconButton
                            onClick={() => removeDebt(index)}
                            sx={{ width: 'fit-content' }}
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
                  <ChevronRightRounded sx={{ verticalAlign: 'sub' }} /> 요구
                  사항
                </Typography>
                <Stack gap={0.5} display="grid" gridColumn={4}>
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
                    sx={{ gridColumnStart: 2 }}
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
                    sx={{ gridColumnStart: 3 }}
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
                    sx={{ gridColumnStart: 4 }}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack gap={3}>
                <Typography variant="h6">
                  <ChevronRightRounded sx={{ verticalAlign: 'sub' }} /> 필수
                  제출 자료
                </Typography>
                <Stack gap={0.5}>
                  <Stack
                    display="grid"
                    rowGap={0.5}
                    gridColumn={3}
                    gridTemplateColumns="auto 1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      sx={{
                        gridColumnStart: 1,
                        borderTopWidth: 1,
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
                        borderRightWidth: 1,
                        borderRightStyle: 'solid',
                        borderRightColor: 'action.hover',
                        display: 'inline-flex',
                        alignItems: 'center',
                        p: 1,
                        bgcolor: 'action.hover',
                        fontWeight: 600,
                      }}
                    >
                      1
                    </FormLabel>
                    <FormLabel
                      sx={{
                        gridColumnStart: 2,
                        borderTopWidth: 1,
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
                        display: 'inline-flex',
                        alignItems: 'center',
                        p: 1,
                        bgcolor: 'action.hover',
                        fontWeight: 600,
                      }}
                    >
                      사업자등록증 사본
                    </FormLabel>
                    <Button
                      component="label"
                      role={undefined}
                      variant="outlined"
                      tabIndex={-1}
                    >
                      파일 선택
                      <VisuallyHiddenInput
                        type="file"
                        name="businessLicense"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </Stack>
                  <Stack
                    display="grid"
                    rowGap={0.5}
                    gridColumn={3}
                    gridTemplateColumns="auto 1fr 2fr"
                    gridAutoRows="2.5rem"
                  >
                    <FormLabel
                      sx={{
                        gridColumnStart: 1,
                        borderTopWidth: 1,
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
                        borderRightWidth: 1,
                        borderRightStyle: 'solid',
                        borderRightColor: 'action.hover',
                        display: 'inline-flex',
                        alignItems: 'center',
                        p: 1,
                        bgcolor: 'action.hover',
                        fontWeight: 600,
                      }}
                    >
                      1
                    </FormLabel>
                    <FormLabel
                      sx={{
                        gridColumnStart: 2,
                        borderTopWidth: 1,
                        borderTopStyle: 'solid',
                        borderTopColor: 'action.hover',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: 'action.hover',
                        display: 'inline-flex',
                        alignItems: 'center',
                        p: 1,
                        bgcolor: 'action.hover',
                        fontWeight: 600,
                      }}
                    >
                      재무제표
                    </FormLabel>
                    <Button
                      component="label"
                      role={undefined}
                      variant="outlined"
                      tabIndex={-1}
                    >
                      파일 선택
                      <VisuallyHiddenInput
                        type="file"
                        name="financialStatement"
                        onChange={handleFileChange}
                      />
                    </Button>
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

          <Stack gap={1} flexDirection="row">
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={handleSave}
            >
              저장
            </Button>
            <Button variant="contained" color="primary" size="large" fullWidth>
              신청
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
