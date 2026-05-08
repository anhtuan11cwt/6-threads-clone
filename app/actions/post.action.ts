"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getPostById(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        author: true,
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: true,
      },
      where: {
        id: postId,
      },
    });

    return post;
  } catch (error) {
    console.error("[GET_POST_BY_ID_ERROR]", error);
    return null;
  }
}

export async function getLikedPosts() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return [];
    }

    const likes = await prisma.like.findMany({
      include: {
        post: {
          include: {
            _count: {
              select: {
                comments: true,
              },
            },
            author: true,
            likes: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        post: {
          authorId: {
            not: session.user.id,
          },
        },
        userId: session.user.id,
      },
    });

    return likes.map((like) => like.post);
  } catch (error) {
    console.error("[GET_LIKED_POSTS_ERROR]", error);
    return [];
  }
}
