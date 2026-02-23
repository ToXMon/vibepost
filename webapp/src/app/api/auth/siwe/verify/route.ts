import { NextRequest, NextResponse } from "next/server";
import { SiweMessage } from "siwe";
import { clearNonce, createSession, getNonce } from "@/lib/wallet-auth";

export async function POST(request: NextRequest) {
  try {
    const { message, signature } = await request.json();
    if (!message || !signature) {
      return NextResponse.json({ error: "Missing message or signature" }, { status: 400 });
    }

    const nonce = await getNonce();
    if (!nonce) {
      return NextResponse.json({ error: "Missing auth nonce" }, { status: 400 });
    }

    const siwe = new SiweMessage(message);
    const verified = await siwe.verify({ signature, nonce });

    if (!verified.success) {
      return NextResponse.json({ error: "Invalid SIWE signature" }, { status: 401 });
    }

    await createSession(siwe.address);
    await clearNonce();

    return NextResponse.json({ ok: true, address: siwe.address.toLowerCase() });
  } catch {
    return NextResponse.json({ error: "Failed to verify wallet" }, { status: 500 });
  }
}
