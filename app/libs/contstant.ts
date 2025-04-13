export const SORT_OPTIONS = [
  { value: 'DESC', label: '최신순' },
  { value: 'ASC', label: '과거순' },
];

// 신청분류
export const APPLICATION_TYPES_OBJ = { FUND: '대출', RND: 'R&D' };
export const APPLICATION_TYPES = [
  { label: '대출', value: 'FUND' },
  { label: 'R&D', value: 'RND' },
];
// 신청상태
export const APPLICATION_STATES_OBJ = {
  REGISTERED: '등록완료',
  TEMP: '임시저장',
  REVIEWING: '전문가 확인중',
  ADDITIONAL_INFO_REQUIRED: '추가 자료 요청됨',
  APPROVED: '전문가 승인',
  REJECTED: '전문가 부결',
};
export const APPLICATION_STATES = [
  { label: '등록완료', value: 'REGISTERED', color: 'secondary' },
  { label: '임시저장', value: 'TEMP', color: 'secondary' },
  { label: '전문가 확인중', value: 'REVIEWING', color: 'primary' },
  {
    label: '추가 자료 요청됨',
    value: 'ADDITIONAL_INFO_REQUIRED',
    color: 'warning',
  },
  { label: '전문가 승인', value: 'APPROVED', color: 'success' },
  { label: '전문가 부결', value: 'REJECTED', color: 'error' },
];

export const LOCATIONS = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];

export const FUND_REQUIREMENTS_OBJ = {
  OPERATE: '운용자금',
  FACILITY: '시설자금',
  CREDIT_LOAN: '신용대출',
  SECURED_LOAN: '담보대출',
};
export const FUND_REQUIREMENTS = [
  { label: '운용자금', value: 'OPERATE' },
  { label: '시설자금', value: 'FACILITY' },
  { label: '신용대출', value: 'CREDIT_LOAN' },
  { label: '담보대출', value: 'SECURED_LOAN' },
];
