"use client";

import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import AddressSearch from "@/app/components/AddSearch";
import AgreementSection from "../_components/AgreementSection";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MobileWrapper from "@/app/layout/MobileWrapper";
import SuccessModal from "../_components/SuccessModal";
import { isValidPassword } from "@/app/utils";
import { useCheckMailHandler } from "@/app/hooks/utils/useCheckMailHandler";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/app/hooks/apis/useSignUp";

function SignUpProfessor() {
  const router = useRouter();
  const { mutate, isPending } = useSignUpMutation();

  // 회원가입 폼 상태
  const [formData, setFormData] = useState({
    type: "PROFESSOR",
    email: "",
    password: "",
    confirmPassword: "", // API에 포함되지 않음
    phoneNumber: "",
    isAllowedST: "1",
    isAllowedPT: "1",
    name: "",
    location: "서울",
    organization: "",
    address: "",
    position: "",
    file: null, // 파일 업로드
  });

  const [agreements, setAgreements] = useState({
    personalInfo: false,
    terms: false,
  });

  const [passwordError, setPasswordError] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const { handleCheckEmail } = useCheckMailHandler(setIsEmailChecked);

  const handleAgreementChange = (updatedAgreements) => {
    setAgreements(updatedAgreements);
  };

  // 입력 필드 값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 비밀번호 확인 로직 초기화
    if (name === "password" || name === "confirmPassword") {
      setPasswordError(false);
    }

    if (name === "email") {
      setIsEmailChecked(false);
    }
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      setUploadedFiles([file]);
    }
  };

  const handleFileDelete = () => {
    setFormData((prev) => ({ ...prev, file: null }));
    setUploadedFiles([]);
  };

  // 주소 검색 핸들러
  const handleAddressChange = (address) => {
    setFormData((prev) => ({ ...prev, address }));
  };

  // 회원가입 요청
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPassword(formData.password)) {
      setPasswordError(true);
      alert("비밀번호는 영문자를 포함한 8자리 이상이어야 합니다.");
      return;
    }

    // 비밀번호 확인 체크
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }

    // confirmPassword 제외한 실제 전송할 데이터
    const { confirmPassword, ...requestData } = formData;

    const form = new FormData();
    Object.entries(requestData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // 파일이면 File 객체로 추가
        if (key === "file" && value instanceof File) {
          form.append(key, value);
        } else {
          form.append(key, value);
        }
      }
    });

    mutate(
      {
        body: form, // FormData로 전송
      },
      {
        onSuccess: () => {
          setOpenModal(true);
        },
        onError: (error) => {
          console.error("회원가입 실패:", error);
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  // 회원가입 버튼 활성화 여부
  const isSignupEnabled =
    agreements.personalInfo &&
    agreements.terms &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.phoneNumber &&
    formData.name &&
    formData.location &&
    formData.organization &&
    formData.address &&
    formData.position &&
    formData.file &&
    isEmailChecked;

  return (
    <MobileWrapper>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
          mb: 4,
        }}
      >
        <Typography variant="h6" mb={1}>
          전문가 회원가입
        </Typography>

        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* ✅ 계정정보 */}
          <Typography variant="body1">계정정보</Typography>
          <Divider />
          <Stack flexDirection={"row"} gap={2} mt={2}>
            <TextField
              name="email"
              variant="standard"
              label="이메일"
              fullWidth
              sx={{ flex: 1 }}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => handleCheckEmail(formData.email)}
            >
              중복 확인
            </Button>
          </Stack>

          <TextField
            name="password"
            variant="standard"
            label="비밀번호"
            type="password"
            fullWidth
            onChange={handleInputChange}
            error={passwordError}
            helperText={
              passwordError
                ? "비밀번호가 일치하지 않습니다."
                : "비밀번호는 영문자 포함 8자리 이상 입력해주세요."
            }
          />
          <TextField
            name="confirmPassword"
            variant="standard"
            label="비밀번호 확인"
            type="password"
            fullWidth
            onChange={handleInputChange}
            error={passwordError}
            helperText={
              passwordError
                ? "비밀번호가 일치하지 않습니다."
                : "비밀번호를 한 번 더 입력해주세요."
            }
          />
          <TextField
            name="name"
            variant="standard"
            label="이름"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            name="phoneNumber"
            variant="standard"
            label="휴대폰 번호"
            fullWidth
            onChange={handleInputChange}
          />

          {/* ✅ 소속 정보 */}
          <Typography variant="body1" mt={4}>
            학교 / 소속 정보
          </Typography>
          <Divider />
          <TextField
            name="organization"
            variant="standard"
            label="학교 또는 소속"
            fullWidth
            onChange={handleInputChange}
          />

          {/* ✅ 소재지 */}
          <Typography variant="body1" mt={2}>
            소재지
          </Typography>
          <AddressSearch
            selectedLocation={formData.location}
            setSelectedLocation={(location) =>
              setFormData((prev) => ({ ...prev, location }))
            }
            address={formData.address}
            setAddress={handleAddressChange}
          />

          {/* ✅ 직책 선택 */}
          <Select
            name="position"
            variant="standard"
            displayEmpty
            fullWidth
            value={formData.position}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, position: e.target.value }))
            }
          >
            <MenuItem value="" disabled>
              직책 선택
            </MenuItem>
            <MenuItem value="STUDENT">학생</MenuItem>
            <MenuItem value="BUSINESS">사업자</MenuItem>
          </Select>

          {/* ✅ 증빙사진 (파일 업로드) */}
          <Typography variant="body2" mt={2}>
            증빙사진 (재직 또는 학위증명서)
          </Typography>
          <Box width="100%" display="flex" justifyContent="center" mt={1}>
            <label
              htmlFor="file-upload"
              style={{ cursor: "pointer", width: "100%" }}
            >
              <Image
                src="/images/common/select-file.png"
                height={172}
                width={408}
                style={{ minWidth: "100%", height: "auto" }}
                alt=""
              />
            </label>
            <input
              id="file-upload"
              type="file"
              hidden
              onChange={handleFileUpload}
            />
          </Box>
          {uploadedFiles.length > 0 && (
            <Box mt={2}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <InsertDriveFileIcon color="primary" />
                <Typography variant="body2">{uploadedFiles[0].name}</Typography>
                <IconButton onClick={handleFileDelete}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Box>
          )}

          {/* ✅ 약관 동의 */}
          <AgreementSection
            agreements={agreements}
            onAgreementChange={handleAgreementChange}
          />

          {/* ✅ 회원가입 버튼 */}
          <Stack spacing={1}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isSignupEnabled || isPending}
            >
              {isPending ? "가입 중..." : "회원가입"}
            </Button>
            <Button variant="outlined" fullWidth onClick={() => router.back()}>
              이전으로
            </Button>
          </Stack>
        </Box>
      </Paper>
      <SuccessModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          router.push("/");
        }}
        message={`회원가입 신청이 정상적으로 접수되었습니다.\n관리자의 승인 절차가 완료된 후 서비스 이용이 가능하며,\n승인 결과는 등록하신 이메일로 안내드릴 예정입니다.`}
      />
    </MobileWrapper>
  );
}

export default SignUpProfessor;
