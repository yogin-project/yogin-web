import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_URL}/management/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: req.headers.get("authorization") ?? "",
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
