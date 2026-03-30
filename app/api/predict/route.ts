import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const apiUrl = process.env.URL_CREDIT_GATEWAY;
    const apiKey = process.env.API_KEY;

    if (!apiUrl || !apiKey) {
      console.error("Variables are missing ");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const cloudResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey 
      },
      body: JSON.stringify(body)
    });

    const data = await cloudResponse.json();

    return NextResponse.json(data, { status: cloudResponse.status });

  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Communication internal error" }, { status: 500 });
  }
}