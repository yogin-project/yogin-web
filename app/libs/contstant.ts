export const USER_TYPES = [
  { value: "CORPORATE", label: "기업" },
  { value: "MANAGER", label: "은행" },
  { value: "PROFESSOR", label: "전문가" },
];

export const USER_STATE_MAP: Record<string, string> = {
  PENDING: "승인 대기",
  APPROVED: "승인 완료",
  REJECTED: "승인 거부",
};

export const USER_STATE_DETAIL_MAP: Record<
  keyof typeof USER_STATE_MAP,
  { label: string; value: string }
> = {
  PENDING: { label: "승인 대기", value: "PENDING" },
  APPROVED: { label: "승인 완료", value: "APPROVED" },
  REJECTED: { label: "승인 거부", value: "REJECTED" },
};

export const SORT_OPTIONS = [
  { value: "DESC", label: "최신순" },
  { value: "ASC", label: "과거순" },
];

// 신청분류
export const APPLICATION_TYPES_OBJ = { FUND: "대출", RND: "R&D" };
export const APPLICATION_TYPES = [
  { label: "대출", value: "FUND" },
  { label: "R&D", value: "RND" },
];

export const APPLICATION_STATE_MAP: Record<string, string> = {
  TEMP: "임시저장",
  REGISTERED: "등록완료",
  REVIEWING: "전문가 확인중",
  ADDITIONAL_INFO_REQUIRED: "추가 자료 요청됨",
  APPROVED: "전문가 승인",
  REJECTED: "전문가 부결",
  DELETED: "삭제됨",
  FINAL_APPROVED: "최종 승인",
};

export const APPLICATION_STATE_DETAIL_MAP: Record<
  keyof typeof APPLICATION_STATE_MAP,
  { label: string; value: string; color: string }
> = {
  REGISTERED: { label: "등록완료", value: "REGISTERED", color: "secondary" },
  TEMP: { label: "임시저장", value: "TEMP", color: "secondary" },
  REVIEWING: { label: "전문가 확인중", value: "REVIEWING", color: "primary" },
  ADDITIONAL_INFO_REQUIRED: {
    label: "추가 자료 요청됨",
    value: "ADDITIONAL_INFO_REQUIRED",
    color: "warning",
  },
  APPROVED: { label: "전문가 승인", value: "APPROVED", color: "success" },
  REJECTED: { label: "전문가 부결", value: "REJECTED", color: "error" },
  DELETED: { label: "삭제됨", value: "DELETED", color: "error" },
  FINAL_APPROVED: {
    label: "최종 승인",
    value: "FINAL_APPROVED",
    color: "success",
  },
};

export const LOCATIONS = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

export const BANKS = [
  "기업",
  "우리",
  "하나",
  "지역농축협",
  "한국씨티",
  "국민",
  "신한",
  "농협",
  "sc",
  "우체국",
  "경남",
  "im(구 대구은행)",
  "부산",
  "산업",
  "새마을금고",
  "광주",
  "산림조합",
  "저축",
  "수협",
  "전북",
  "제주",
  "카카오뱅크",
  "케이뱅크",
  "토스뱅크",
];

export const BANKS_FULLNAME = [
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

export const FUND_REQUIREMENTS_OBJ = {
  OPERATE: "운용자금",
  FACILITY: "시설자금",
  CREDIT_LOAN: "신용대출",
  SECURED_LOAN: "담보대출",
};
export const FUND_REQUIREMENTS = [
  { label: "운용자금", value: "OPERATE" },
  { label: "시설자금", value: "FACILITY" },
  { label: "신용대출", value: "CREDIT_LOAN" },
  { label: "담보대출", value: "SECURED_LOAN" },
];

export const DRAWER_WIDTH = 240;
export const MOBILE_NAV_HEIGHT = 60;
export const DESKTOP_NAV_HEIGHT = 80;
