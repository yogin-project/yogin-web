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

    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    const isFormData = body instanceof FormData;

    const requestOptions: RequestInit = {
      method,
      headers: {
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...headers,
      },
      credentials: "include",
      body: isFormData ? body : JSON.stringify(body),
    };

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
