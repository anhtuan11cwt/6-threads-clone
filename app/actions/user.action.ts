"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserProfileByUsername(username: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
      followers: true,
      following: true,
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    where: {
      username,
    },
  });

  if (!user) {
    return null;
  }

  const isOwnerProfile = session.user.id === user.id;

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: session.user.id,
      followingId: user.id,
    },
  });

  return {
    ...user,
    isFollowing: !!existingFollow,
    isOwnerProfile,
  };
}
