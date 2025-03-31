export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const API_URL = process.env.API_URL;

    const formData = await req.formData();

    const response = await fetch(`${API_URL}/company/application/temp`, {
      method: "POST",
      body: formData,
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text); // JSON 응답이라면 파싱됨
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

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("🔥 API Route Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
