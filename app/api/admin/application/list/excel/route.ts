import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const API_URL = process.env.API_URL!;
    const { searchParams } = new URL(req.url);

    const response = await fetch(
      `${API_URL}/admin/application/list/excel?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: req.headers.get("authorization") ?? "",
        },
        credentials: "include",
      }
    );

    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      status: response.status,
      headers: {
        "Content-Disposition":
          response.headers.get("Content-Disposition") ?? "",
        "Content-Type":
          response.headers.get("Content-Type") ?? "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Excel Download Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
