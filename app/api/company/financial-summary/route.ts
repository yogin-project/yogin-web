// app/api/company/financial-summary/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // 🔹 GET 처리
  try {
    const API_URL = process.env.API_URL;

    const response = await fetch(`${API_URL}/company/financial-summary`, {
      method: "GET",
      headers: {
        Authorization: req.headers.get("authorization") ?? "",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // 🔹 POST 처리
  try {
    const API_URL = process.env.API_URL;
    const body = await req.json();

    const response = await fetch(`${API_URL}/company/financial-summary`, {
      method: "POST",
      headers: {
        Authorization: req.headers.get("authorization") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  // 🔹 PUT 처리
  try {
    const API_URL = process.env.API_URL;
    const body = await req.json();

    const response = await fetch(`${API_URL}/company/financial-summary`, {
      method: "PUT",
      headers: {
        Authorization: req.headers.get("authorization") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
