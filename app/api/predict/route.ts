import { NextResponse } from "next/server";

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 25000,
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.turnstileToken) {
      return NextResponse.json(
        { error: "Security token is missing." },
        { status: 400 },
      );
    }

    const verifyFormData = new FormData();
    verifyFormData.append("secret", process.env.TURNSTILE_SECRET_KEY!);
    verifyFormData.append("response", body.turnstileToken);

    const cfVerify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: verifyFormData,
      },
    );

    const cfResponse = await cfVerify.json();

    if (!cfResponse.success) {
      console.warn("Bot attempt blocked by Turnstile.");
      return NextResponse.json(
        { error: "Human verification failed." },
        { status: 403 },
      );
    }
    const route = request.headers.get("TO")?.toLowerCase();
    const gateWayUrls: Record<string, string | undefined> = {
      credit: process.env.URL_CREDIT_GATEWAY,
      churn: process.env.URL_CHURN_GATEWAY,
    };
    const apiUrl = route ? gateWayUrls[route] : undefined;
    const apiKey = process.env.API_KEY;

    if (!apiUrl || !apiKey) {
      console.error("Variables are missing ");
      return NextResponse.json(
        { error: "Server config error" },
        { status: 500 },
      );
    }

    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const cloudResponse = await fetchWithTimeout(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify(body.formData),
        }, 30000);
        const data = await cloudResponse.json();

        if (cloudResponse.status !== 500 || attempt === maxAttempts) {
          return NextResponse.json(data, { status: cloudResponse.status });
        }

        console.warn(
          `Cloud gateway returned 500 (attempt ${attempt}/${maxAttempts})`,
        );
      } catch (innerError) {
        if (attempt === maxAttempts) {
          console.error("Cloud gateway error:", innerError);
          return NextResponse.json(
            { error: "Communication internal error" },
            { status: 500 },
          );
        }
        console.warn(
          `Cloud gateway connection failed (attempt ${attempt}/${maxAttempts}):`,
          innerError,
        );
      }

      await new Promise((r) => setTimeout(r, 3000));
    }
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Communication internal error" },
      { status: 500 },
    );
  }
}
