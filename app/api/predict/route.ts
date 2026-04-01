import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.turnstileToken) {
      return NextResponse.json({ error: "Security token is missing." }, { status: 400 });
    }

    const verifyFormData = new FormData();
    verifyFormData.append('secret', process.env.TURNSTILE_SECRET_KEY!);
    verifyFormData.append('response', body.turnstileToken);

    const cfVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: verifyFormData,
    });

    const cfResponse = await cfVerify.json();

    if (!cfResponse.success) {
      console.warn("Bot attempt blocked by Turnstile.");
      return NextResponse.json({ error: "Human verification failed." }, { status: 403 });
    }


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
      body: JSON.stringify(body.formData)
    });

    const data = await cloudResponse.json();

    return NextResponse.json(data, { status: cloudResponse.status });

  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Communication internal error" }, { status: 500 });
  }
}