"use server";

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
