import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Chưa được xác thực" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json(
        { error: "ID bài viết là bắt buộc" },
        { status: 400 },
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          postId,
          userId: session.user.id,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({
        liked: false,
      });
    }

    await prisma.like.create({
      data: {
        postId,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      liked: true,
    });
  } catch (error) {
    console.error("[LIKE_POST_ERROR]", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
