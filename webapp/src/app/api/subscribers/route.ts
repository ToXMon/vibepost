import { NextRequest, NextResponse } from "next/server";
import { listActiveSubscribers, upsertSubscriber } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const { created } = await upsertSubscriber(email);
    return NextResponse.json(
      { message: created ? "Subscribed successfully" : "Resubscribed successfully" },
      { status: created ? 201 : 200 }
    );
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const subscribers = await listActiveSubscribers();
    return NextResponse.json(subscribers);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
