import { objToUrl, pathEncoded } from "../utils";

// API 기본 URL 설정
const getBaseUrl = () => {
  if (process.env.VERCEL_ENV === "production")
    return process.env.NEXT_PUBLIC_MAIN_BASE_URL;
  if (process.env.VERCEL_ENV === "preview")
    return process.env.NEXT_PUBLIC_STAGE_BASE_URL;
  return process.env.NEXT_PUBLIC_DEV_BASE_URL;
};

// API 요청 함수
export const apiClient = async ({
  method = "GET",
  path,
  headers = {},
  params = {},
  paramsPath = "",
  body = {},
}: {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  headers?: any;
  params?: any;
  paramsPath?: string;
  body?: any;
}) => {
  try {
    const baseUrl = getBaseUrl();
    let url = `${baseUrl}/${pathEncoded(path)}${paramsPath}`;

    // GET 요청 시 params를 URL에 추가
    if (method === "GET" && params) {
      const paramString = objToUrl(params);
      if (paramString) url += `?${paramString}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET") {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        message: response.statusText,
        details: errorData,
      };
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
