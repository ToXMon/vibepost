import { NextRequest, NextResponse } from "next/server";
import { createPost, listPosts } from "@/lib/storage";
import { requireAuthor } from "@/lib/auth";
import { pinMarkdownToIpfs } from "@/lib/storage-ipfs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const authorAddress = searchParams.get("authorAddress") || undefined;

    const posts = await listPosts({ status, authorAddress });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const author = await requireAuthor();
    const { title, contentMarkdown, isPaid } = await request.json();

    if (!contentMarkdown || typeof contentMarkdown !== "string") {
      return NextResponse.json({ error: "contentMarkdown is required" }, { status: 400 });
    }

    const ipfsCid = await pinMarkdownToIpfs({ title, contentMarkdown, authorAddress: author.address });

    const post = await createPost({
      title,
      contentMarkdown,
      isPaid,
      authorAddress: author.address,
      ipfsCid,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
