import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  // 🔹 회원정보 수정
  try {
    const API_URL = process.env.API_URL;

    const contentType = req.headers.get("content-type") || "";
    const isFormData = contentType.includes("multipart/form-data");

    let body: any;
    let fetchOptions: RequestInit;

    if (isFormData) {
      // ⛳️ 실제로는 multipart로 요청 오지 않음 (Next.js edge runtime 제한으로 인해), 참고용
      return NextResponse.json(
        { message: "multipart/form-data 직접 지원되지 않음" },
        { status: 400 }
      );
    } else {
      // 일반 JSON 방식
      body = await req.json();

      const response = await fetch(`${API_URL}/user`, {
        method: "PATCH",
        headers: {
          Authorization: req.headers.get("authorization") ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error("PATCH /v1/user error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
