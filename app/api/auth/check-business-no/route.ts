import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const API_URL = process.env.PUBLIC_DATA_API_URL;

        let queryString = '';
        if(process.env.PUBLIC_DATA_SERVICE_KEY) {
            const params = {
                serviceKey: process.env.PUBLIC_DATA_SERVICE_KEY
            }

            queryString = new URLSearchParams(params).toString();
        } else {
            throw new Error('public data service key required');
        }

        const response = await fetch(`${API_URL}/nts-businessman/v1/validate?${queryString}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if(!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error },
            { status: 500 }
        )
    }
}