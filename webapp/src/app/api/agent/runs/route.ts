import { NextResponse } from "next/server";
import { requireAuthor } from "@/lib/auth";
import { listAgentRuns } from "@/lib/storage";

export async function GET() {
  try {
    const author = await requireAuthor();
    const runs = await listAgentRuns(author.address);
    return NextResponse.json(runs);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
