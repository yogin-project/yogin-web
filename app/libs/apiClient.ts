export const apiClient = async ({
  method = "GET",
  path,
  headers = {},
  body = {},
}: {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  headers?: any;
  body?: any;
}) => {
  try {
    const url = `/api/${path}`;

    // ✅ SSR 안전 처리
    let authToken: string | null = null;
    if (typeof window !== "undefined") {
      authToken =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
    }

    const isFormData = body instanceof FormData;

    const requestOptions: RequestInit = {
      method,
      headers: {
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...headers,
      },
      credentials: "include",
    };

    // ✅ GET이나 HEAD가 아닐 때만 body 추가
    if (method !== "GET" && method !== "HEAD") {
      requestOptions.body = isFormData ? body : JSON.stringify(body);
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
