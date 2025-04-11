import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const API_URL = process.env.API_URL;

    const contentType = req.headers.get("content-type") || "";
    const isFormData = contentType.includes("multipart/form-data");

    let fetchOptions: RequestInit;

    if (isFormData) {
      // 🔄 클라이언트가 multipart/form-data로 보냈을 경우 처리
      const formData = await req.formData();

      // formData를 그대로 전달할 수 없기 때문에, 수동으로 FormData 구성
      const form = new FormData();
      formData.forEach((value, key) => {
        form.append(key, value);
      });

      fetchOptions = {
        method: "PATCH",
        headers: {
          Authorization: req.headers.get("authorization") ?? "",
          // Content-Type은 브라우저에서 자동 설정됨 (boundary 포함)
        },
        body: form,
      };
    } else {
      const jsonBody = await req.json();
      fetchOptions = {
        method: "PATCH",
        headers: {
          Authorization: req.headers.get("authorization") ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody),
      };
    }

    const response = await fetch(`${API_URL}/user`, fetchOptions);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("PATCH /v1/user error:", error);

    return NextResponse.json(
      {
        message: error?.message ?? "Internal Server Error",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
