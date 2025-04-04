"use client";

import React from "react";
import { Box, Typography, Paper, Divider, Stack } from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";

function UserDetailPage() {
  const searchParams = useSearchParams();
  const rawUser = searchParams.get("user");
  const user = rawUser ? JSON.parse(decodeURIComponent(rawUser)) : null;

  if (!user) return <Typography>유저 정보를 불러올 수 없습니다.</Typography>;

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Typography variant="h6" gutterBottom>
        회원 상세 정보
      </Typography>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Stack spacing={2}>
          <Typography>
            <b>ID:</b> {user.id}
          </Typography>
          <Typography>
            <b>이메일:</b> {user.email}
          </Typography>
          <Typography>
            <b>이름:</b> {user.name}
          </Typography>
          <Typography>
            <b>전화번호:</b> {user.phoneNumber}
          </Typography>
          <Typography>
            <b>회원 타입:</b> {user.type}
          </Typography>
          <Typography>
            <b>소재지:</b> {user.location}
          </Typography>
          <Typography>
            <b>상세 주소:</b> {user.address}
          </Typography>
          <Typography>
            <b>가입일:</b> {user.createdAt}
          </Typography>
          {user.updatedAt && (
            <Typography>
              <b>수정일:</b> {user.updatedAt}
            </Typography>
          )}
          <Divider />

          {user.type === "CORPORATE" && (
            <>
              <Typography>
                <b>회사명:</b> {user.corpName}
              </Typography>
              <Typography>
                <b>사업자번호:</b> {user.businessNo}
              </Typography>
            </>
          )}

          {user.type === "MANAGER" && (
            <>
              <Typography>
                <b>지점명:</b> {user.branchName}
              </Typography>
              <Typography>
                <b>관리자 승인 여부:</b>{" "}
                {user.adminApproval ? "승인" : "미승인"}
              </Typography>
              {user.adminApprovedAt && (
                <Typography>
                  <b>승인일:</b> {user.adminApprovedAt}
                </Typography>
              )}
              {user.verifiyData && (
                <Box>
                  <Typography>
                    <b>증빙자료:</b>
                  </Typography>
                  <img
                    src={user.verifiyData}
                    alt="증빙자료"
                    style={{ maxWidth: "100%", borderRadius: 8, marginTop: 8 }}
                  />
                </Box>
              )}
            </>
          )}

          {user.type === "PROFESSOR" && (
            <>
              <Typography>
                <b>소속:</b> {user.organization}
              </Typography>
              <Typography>
                <b>직책:</b> {user.position}
              </Typography>
              <Typography>
                <b>관리자 승인 여부:</b>{" "}
                {user.adminApproval ? "승인" : "미승인"}
              </Typography>
              {user.adminApprovedAt && (
                <Typography>
                  <b>승인일:</b> {user.adminApprovedAt}
                </Typography>
              )}
              {user.verifiyData && (
                <Box>
                  <Typography>
                    <b>증빙자료:</b>
                  </Typography>
                  <img
                    src={user.verifiyData}
                    alt="증빙자료"
                    style={{ maxWidth: "100%", borderRadius: 8, marginTop: 8 }}
                  />
                </Box>
              )}
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default UserDetailPage;
