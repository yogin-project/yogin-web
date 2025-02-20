// libs/apiClient.ts
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
    const url = `/api/${path}`; // Next.js API Route 호출

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
