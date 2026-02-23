import { NextRequest, NextResponse } from "next/server";
import { unsubscribeByEmail } from "@/lib/storage";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email parameter is required" }, { status: 400 });
    }

    const subscriber = await unsubscribeByEmail(email);
    if (!subscriber) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(`${appUrl}/unsubscribed`);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
