import { NextRequest, NextResponse } from "next/server";
import { requireAuthor } from "@/lib/auth";
import { createPost, getAgentRun } from "@/lib/storage";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const author = await requireAuthor();
    const { id } = await params;
    const run = await getAgentRun(id);

    if (!run) {
      return NextResponse.json({ error: "Agent run not found" }, { status: 404 });
    }

    if (run.authorAddress.toLowerCase() !== author.address.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (run.status !== "COMPLETED" || !run.freeMarkdown || !run.premiumMarkdown) {
      return NextResponse.json({ error: "Agent output not ready" }, { status: 400 });
    }

    const freePost = await createPost({
      title: run.freeTitle || `${run.topic} — Free`,
      contentMarkdown: run.freeMarkdown,
      isPaid: false,
      authorAddress: author.address,
    });

    const premiumPost = await createPost({
      title: run.premiumTitle || `${run.topic} — Premium`,
      contentMarkdown: run.premiumMarkdown,
      isPaid: true,
      authorAddress: author.address,
    });

    return NextResponse.json({ freePost, premiumPost }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
