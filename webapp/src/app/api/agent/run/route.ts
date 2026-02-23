import { NextRequest, NextResponse } from "next/server";
import { requireAuthor } from "@/lib/auth";
import { createAgentRun, updateAgentRun } from "@/lib/storage";
import { generateResearchPosts } from "@/lib/agent";

export async function POST(request: NextRequest) {
  try {
    const author = await requireAuthor();
    const { topic, referenceMaterial } = await request.json();

    if (!topic || !referenceMaterial) {
      return NextResponse.json({ error: "topic and referenceMaterial are required" }, { status: 400 });
    }

    const run = await createAgentRun({
      authorAddress: author.address,
      topic: String(topic),
      referenceMaterial: String(referenceMaterial),
    });

    try {
      const output = await generateResearchPosts({ topic: String(topic), referenceMaterial: String(referenceMaterial) });
      const updated = await updateAgentRun(run.id, {
        status: "COMPLETED",
        freeTitle: output.freeTitle,
        freeMarkdown: output.freeMarkdown,
        premiumTitle: output.premiumTitle,
        premiumMarkdown: output.premiumMarkdown,
        notes: output.notes,
      });
      return NextResponse.json(updated, { status: 201 });
    } catch (error) {
      await updateAgentRun(run.id, {
        status: "FAILED",
        error: error instanceof Error ? error.message : "Agent run failed",
      });
      throw error;
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}
