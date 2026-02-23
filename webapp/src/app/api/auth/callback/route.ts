import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
  return NextResponse.redirect(`${origin}/author`);
}
