export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    const API_URL = process.env.API_URL;

    let response;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      response = await fetch(`${API_URL}/auth/sign-up`, {
        method: "POST",
        body: formData, // ✅ 파일 포함된 multipart
      });
    } else if (contentType.includes("application/json")) {
      const json = await req.json();

      response = await fetch(`${API_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });
    } else {
      return NextResponse.json(
        { message: "Unsupported Content-Type" },
        { status: 415 }
      );
    }

    const data = await response.json();

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
