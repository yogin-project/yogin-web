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

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false; // SSR 환경 방어

  const token =
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  return !!token; // `authToken`이 존재하면 true, 없으면 false
};

// 비밀번호 영문 8자리 이상
export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z]).{8,}$/;
  return regex.test(password);
};
