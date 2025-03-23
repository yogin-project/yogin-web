import { NextResponse } from "next/server";

// TODO: 유저 프로필 api을 보고 마이그레이션
export async function GET(req: Request) {
  try {
    const body = await req.json();
    const API_URL = process.env.API_URL;

    const response = await fetch(`${API_URL}/admin/user/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
