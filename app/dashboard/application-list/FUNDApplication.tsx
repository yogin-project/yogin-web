import {
  APPLICATION_STATES_OBJ,
  APPLICATION_TYPES_OBJ,
  FUND_REQUIREMENTS,
} from "@/app/libs/contstant";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { CustomStackGrid, CustomStackGridColumn } from "./components";

import { ChevronRightRounded } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

interface FUNDApplicationProps {
  item: any;
}

export default function FUNDApplication({ item }: FUNDApplicationProps) {
  const { type, state, businessCategory } = item || {};
  return (
    <Stack gap={2}>
      <Card variant="outlined">
        <CardContent>
          <Stack gap={3}>
            <Typography variant="h6">
              <ChevronRightRounded sx={{ verticalAlign: "sub", height: 20 }} />{" "}
              신청 정보
            </Typography>
            <CustomStackGrid gridColumn={2}>
              <CustomStackGridColumn
                start={1}
                label="신청일"
                value={new Date(item.createdAt).toLocaleString("ko-KR")}
              />
              <CustomStackGridColumn
                start={2}
                label="컨설팅 신청 정보"
                value={item.isManagementApplied ? "신청" : "신청하지 않음"}
              />
              <CustomStackGridColumn
                start={1}
                label="신청분류"
                value={
                  APPLICATION_TYPES_OBJ[
                    type as keyof typeof APPLICATION_TYPES_OBJ
                  ]
                }
              />
              {/* <CustomStackGridColumn
                start={2}
                label="R&D 유형"
                value={item.fundRequirements?.map(
                  (value: string, index: number) =>
                    FUND_REQUIREMENTS_OBJ[
                      value as keyof typeof FUND_REQUIREMENTS_OBJ
                    ] + (index == item.fundRequirements.length - 1 ? "" : ", ")
                )}
              /> */}
            </CustomStackGrid>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Stack gap={3}>
            <Typography variant="h6">
              <ChevronRightRounded sx={{ verticalAlign: "sub", height: 20 }} />{" "}
              기업 정보
            </Typography>
            <CustomStackGrid gridColumn={2}>
              <CustomStackGridColumn
                start={1}
                label="기업체명"
                value={item.corpName}
              />
              <CustomStackGridColumn
                start={2}
                label="대표자명"
                value={item.name}
              />
              <CustomStackGridColumn
                start={1}
                label="사업자번호"
                value={item.businessNo}
              />
              <CustomStackGridColumn
                start={2}
                label="설립일자"
                value={
                  item.foundDate
                    ? new Date(item.foundDate).toLocaleString("ko-KR")
                    : "-"
                }
              />
              <CustomStackGridColumn
                start={1}
                label="기업 소재지"
                value={item.corpLocation}
              />
              <CustomStackGridColumn
                start={2}
                label="대표 소재지"
                value={
                  item.ownerLocation +
                  " " +
                  (item.isOwnerLocationOwned ? "(자가)" : "")
                }
              />
              <CustomStackGridColumn
                start={1}
                label="사업 분류"
                value={businessCategory}
              />
              <CustomStackGridColumn
                start={2}
                label="특허"
                value={item.isPatentOwned ? "Y" : "N"}
              />

              <CustomStackGridColumn
                start={1}
                label="연락처"
                value={item.phoneNumber}
              />
              <CustomStackGridColumn
                start={2}
                label="이메일"
                value={item.email}
              />
              <CustomStackGridColumn
                start={1}
                label="사업자등록번호"
                value={item.businessRegistrationNo}
              />
            </CustomStackGrid>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Stack gap={3}>
            <Typography variant="h6">
              <ChevronRightRounded sx={{ verticalAlign: "sub", height: 20 }} />
              매출액 정보
            </Typography>
            <CustomStackGrid gridColumn={1}>
              {item.threeYearRevenue?.map((row: any) => (
                <CustomStackGridColumn
                  key={row.year}
                  label={row.year + "년 매출액"}
                  value={row.revenue + "억"}
                />
              ))}
            </CustomStackGrid>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Stack gap={3}>
            <Typography variant="h6">
              <ChevronRightRounded sx={{ verticalAlign: "sub", height: 20 }} />
              부채 현황
            </Typography>
            <CustomStackGrid gridColumn={1}>
              {item.debtStatus?.map((row: any, index: number) => (
                <CustomStackGridColumn
                  key={row.bankName}
                  label={row.bankName}
                  value={row.debtAmount + "억"}
                />
              ))}
            </CustomStackGrid>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Stack gap={3}>
            <Typography variant="h6">
              <ChevronRightRounded sx={{ verticalAlign: "sub", height: 20 }} />
              요구 사항
            </Typography>
            <CustomStackGrid gridColumn={1}>
              {FUND_REQUIREMENTS?.map((row: any, index: number) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      readOnly
                      checked={item.fundRequirements?.includes(row.value)}
                      disableTouchRipple
                      disableFocusRipple
                      disableRipple
                    />
                  }
                  label={row.label}
                  sx={{ gridColumnStart: 1, bgcolor: "transparent !important" }}
                />
              ))}
            </CustomStackGrid>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Stack gap={3}>
            <Typography variant="h6">
              <ChevronRightRounded sx={{ verticalAlign: "sub", height: 20 }} />
              필수 제출 자료
            </Typography>
            <CustomStackGrid gridColumn={1}>
              <CustomStackGridColumn label="사업자등록증 사본">
                {item.businessRegistrationCert?.length > 0
                  ? item.businessRegistrationCert?.map((url: string) => (
                      <Stack key={url} flexDirection="row">
                        <Button
                          LinkComponent={Link}
                          href={url}
                          target="_blank"
                          size="small"
                          variant="contained"
                          color="secondary"
                          disableElevation
                        >
                          새 창으로
                        </Button>
                      </Stack>
                    ))
                  : "-"}
              </CustomStackGridColumn>
              <CustomStackGridColumn label="재무제표">
                {item.financialReports?.length > 0
                  ? item.financialReports?.map((url: string, index: number) => (
                      <Stack key={url} flexDirection="row">
                        <Button
                          LinkComponent={Link}
                          href={url}
                          target="_blank"
                          size="small"
                          variant="contained"
                          color="secondary"
                          disableElevation
                        >
                          새 창으로
                        </Button>
                      </Stack>
                    ))
                  : "-"}
              </CustomStackGridColumn>
            </CustomStackGrid>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Stack gap={3}>
            <Typography variant="h6">
              <ChevronRightRounded sx={{ verticalAlign: "sub", height: 20 }} />
              검토 정보
            </Typography>
            <CustomStackGrid gridColumn={2}>
              <CustomStackGridColumn
                start={1}
                label="추가자료"
                value={
                  item.additionalInfoSubmittedAt
                    ? `제출 완료 (${new Date(
                        item.additionalInfoSubmittedAt
                      ).toLocaleString("ko-KR")})`
                    : item.isAdditionalInfoRequired == "Y"
                    ? "추가 자료 필요"
                    : "-"
                }
              />

              <CustomStackGridColumn
                start={1}
                label="검토 상태"
                value={
                  APPLICATION_STATES_OBJ[
                    state as keyof typeof APPLICATION_STATES_OBJ
                  ]
                }
              />
              <CustomStackGridColumn
                start={2}
                label="대출 가능 금액"
                value={item.availableFundAmount || "-"}
              />
              <CustomStackGridColumn
                start={1}
                label="리뷰일"
                value={
                  item.reviewAt
                    ? new Date(item.reviewAt).toLocaleString("ko-KR")
                    : "-"
                }
              />
              <CustomStackGridColumn
                start={2}
                label="승인/부결일"
                value={
                  item.approvedAt || item.rejectedAt
                    ? new Date(
                        item.approvedAt || item.rejectedAt
                      ).toLocaleString("ko-KR")
                    : "-"
                }
              />
              {item.approveRejectAt && (
                <CustomStackGridColumn
                  start={1}
                  label="승인/부결일"
                  value={new Date(item.approveRejectAt).toLocaleString("ko-KR")}
                />
              )}
            </CustomStackGrid>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
