import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Chưa xác thực" }, { status: 401 });
    }

    const query = request.nextUrl.searchParams.get("q");
    if (!query) {
      return NextResponse.json([]);
    }

    const currentUserId = session.user.id;

    const following = await prisma.follow.findMany({
      select: { followingId: true },
      where: { followerId: currentUserId },
    });
    const followingIds = following.map((item) => item.followingId);

    const users = await prisma.user.findMany({
      select: {
        _count: {
          select: { followers: true, following: true },
        },
        bio: true,
        id: true,
        image: true,
        name: true,
        username: true,
      },
      take: 10,
      where: {
        AND: [
          { id: { not: currentUserId } },
          { id: { notIn: followingIds } },
          {
            OR: [
              { username: { contains: query, mode: "insensitive" } },
              { name: { contains: query, mode: "insensitive" } },
            ],
          },
        ],
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
