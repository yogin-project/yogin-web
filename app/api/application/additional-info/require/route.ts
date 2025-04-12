export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const API_URL = process.env.API_URL;

    const formData = await req.formData();

    const response = await fetch(
      `${API_URL}/application/additional-info/require`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: req.headers.get("authorization") ?? "",
        },
        credentials: "include",
      }
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ API 응답이 JSON이 아님:", text);
      return NextResponse.json(
        { message: "Upstream server returned non-JSON", raw: text },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        // ✅ CORS 헤더 추가 (필요한 경우만)
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  } catch (error) {
    console.error("🔥 API Route Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}
