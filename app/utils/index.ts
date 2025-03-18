export const fullVhWithoutHeader = "calc(100vh - 80px)";

export const pathEncoded = (path: string | undefined) => {
  const encodedPath = path
    ?.split("/")
    .map((v) => encodeURIComponent(v))
    .join("/");

  return encodedPath;
};

export const objToUrl = (obj: any, encode = true) => {
  const params = [];
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    let res;

    if (value === undefined || value === null) continue;

    if (typeof value === "string" || typeof value === "number") {
      res = encode
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : `${key}=${value}`;
    }

    params.push(res);
  }
  const url = params.join("&");
  return url;
};

export const locations = [
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

export const bankList = [
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

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false; // SSR 환경 방어

  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  return !!token; // `authToken`이 존재하면 true, 없으면 false
};
