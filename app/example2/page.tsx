"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Paper,
  Input,
  Button,
  IconButton,
  Grid2,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CompanyRNDForm() {
  const [form, setForm] = useState({
    companyName: "",
    ceoName: "",
    contact: "",
    location: "",
    businessType: "",
    sales: "",
    exportStatus: "",
    homepage: "",
    rAndDHistory: [""], // 배열로 변경
    rAndDFunding: "",
    rAndDDescription: "",
    files: {
      businessLicense: null,
      patent: null,
    },
    agreeToTerms: false,
  });

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

  const handleSubmit = () => {
    console.log("제출된 데이터:", form);
    // 실제 제출 로직 구현
  };

  const handleAgreementChange = (e) => {
    setForm({ ...form, agreeToTerms: e.target.checked });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          기업 정보 및 R&D 정보 입력
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="기업명"
              name="companyName"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="대표명"
              name="ceoName"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="연락처"
              name="contact"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="소재지"
              name="location"
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
              label="홈페이지"
              name="homepage"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="매출액 (억)"
              name="sales"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="수출액 (억)"
              name="exportStatus"
              onChange={handleChange}
            />
          </Grid2>

          {/* ✅ R&D 이력 다중 입력 */}
          <Grid2 size={12}>
            <Typography variant="h6" gutterBottom>
              R&D 이력
            </Typography>
            {form.rAndDHistory.map((item, index) => (
              <Grid2
                container
                spacing={1}
                key={index}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Grid2 size={11}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label={`R&D 이력 ${index + 1}`}
                    value={item}
                    onChange={(e) =>
                      handleRAndDHistoryChange(index, e.target.value)
                    }
                  />
                </Grid2>
                <Grid2 size={1}>
                  <IconButton
                    onClick={() => removeRAndDHistory(index)}
                    disabled={form.rAndDHistory.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid2>
              </Grid2>
            ))}
            <Button
              onClick={addRAndDHistory}
              startIcon={<AddIcon />}
              variant="outlined"
            >
              R&D 이력 추가
            </Button>
          </Grid2>

          <Grid2 size={12}>
            <TextField
              fullWidth
              label="R&D 아이템 설명 (20자 이내)"
              name="rAndDFunding"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="개발 필요 자금 (억)"
              name="rAndDFunding"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="R&D ITEM 내용 정리"
              name="rAndDDescription"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <Typography>사업자등록증 사본 업로드</Typography>
            <Input
              type="file"
              name="businessLicense"
              onChange={handleFileChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <Typography>특허 관련 파일 업로드</Typography>
            <Input type="file" name="patent" onChange={handleFileChange} />
          </Grid2>
          <Grid2 size={12} mt={2}>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              제출
            </Button>
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
              label="교수 정보공개 동의 (R&D 서비스는 유료이며, 연구를 담당하는 위원에게 지급됩니다.)"
            />
          </Grid2>
          <Grid2 size={6}>
            <Button variant="contained" fullWidth>
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
