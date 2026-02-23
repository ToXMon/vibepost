import { NextResponse } from "next/server";
import { getAuthenticatedAuthor } from "@/lib/auth";

export async function GET() {
  const author = await getAuthenticatedAuthor();
  return NextResponse.json({ user: author });
}
