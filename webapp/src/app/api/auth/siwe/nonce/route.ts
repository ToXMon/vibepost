import { NextResponse } from "next/server";
import { issueNonce } from "@/lib/wallet-auth";

export async function GET() {
  const nonce = await issueNonce();
  return NextResponse.json({ nonce });
}
