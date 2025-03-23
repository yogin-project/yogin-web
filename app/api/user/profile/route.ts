import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const API_URL = process.env.API_URL;

    const response = await fetch(`${API_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 토큰이 필요하면 아래처럼 헤더에 추가
        Authorization: req.headers.get("authorization") ?? "",
      },
      credentials: "include", // 이건 백엔드와 쿠키 교환 필요할 때만 필요
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  } catch (error) {
    console.error("API 에러:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}
