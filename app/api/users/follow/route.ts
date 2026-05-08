import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Không được phép" }, { status: 401 });
    }

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "ID người dùng là bắt buộc" },
        { status: 400 },
      );
    }

    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Bạn không thể theo dõi chính mình" },
        { status: 400 },
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 },
      );
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });
      return NextResponse.json({
        following: false,
      });
    }

    await prisma.follow.create({
      data: {
        followerId: session.user.id,
        followingId: userId,
      },
    });

    return NextResponse.json({
      following: true,
    });
  } catch (error) {
    console.log("[FOLLOW_POST_ERROR]", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
