"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Paper,
  Input,
  Button,
  Grid2,
} from "@mui/material";

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
    rAndDHistory: "",
    rAndDFunding: "",
    rAndDDescription: "",
    files: {
      businessLicense: null,
      patent: null,
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, files: { ...form.files, [name]: files[0] } });
  };

  const handleSubmit = () => {
    console.log("제출된 데이터:", form);
    // 실제 제출 로직을 여기에 구현하세요.
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
              label="매출"
              name="sales"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="수출 여부"
              name="exportStatus"
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
          <Grid2 size={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="R&D 이력"
              name="rAndDHistory"
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="R&D ITEM 개발 필요 자금 (만원)"
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
        </Grid2>
      </Paper>
    </Container>
  );
}
