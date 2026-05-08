import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Không được phép" }, { status: 401 });
    }

    const { content, postId, parentId } = await req.json();

    if (!content?.trim()) {
      return NextResponse.json(
        { error: "Nội dung là bắt buộc" },
        { status: 400 },
      );
    }

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID là bắt buộc" },
        { status: 400 },
      );
    }

    const comment = await prisma.comment.create({
      data: {
        authorId: session.user.id,
        content,
        parentId,
        postId,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("[COMMENT_POST_ERROR]", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
