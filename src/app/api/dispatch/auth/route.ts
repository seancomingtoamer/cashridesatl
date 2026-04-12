import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correct = process.env.DISPATCH_PASSWORD;

    if (!correct) {
      return NextResponse.json({ error: "Dispatch password not configured" }, { status: 500 });
    }

    if (password === correct) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
