import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPost, updatePost } from "@/lib/storage";
import { requireAuthor } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getPost(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const author = await requireAuthor();
    const { id } = await params;

    const post = await getPost(id);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    if (post.authorAddress.toLowerCase() !== author.address.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const updated = await updatePost(id, {
      title: body.title ?? post.title,
      contentMarkdown: body.contentMarkdown ?? post.contentMarkdown,
      isPaid: body.isPaid ?? post.isPaid,
      status: body.status ?? post.status,
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const author = await requireAuthor();
    const { id } = await params;

    const post = await getPost(id);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    if (post.authorAddress.toLowerCase() !== author.address.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await deletePost(id);
    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
