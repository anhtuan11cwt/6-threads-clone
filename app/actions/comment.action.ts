"use server";

import { prisma } from "@/lib/prisma";

type CommentWithReplies = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  parentId: string | null;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    imagePublicId: string | null;
    bio: string | null;
    username: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  parent?: {
    author: {
      username: string | null;
    };
  };
  replies: CommentWithReplies[];
};

export async function getComments(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      where: {
        postId,
      },
    });

    // Cấu trúc lại dữ liệu phẳng thành dạng cây
    const commentMap = new Map<string, CommentWithReplies>();
    const rootComments: CommentWithReplies[] = [];

    for (const comment of comments) {
      commentMap.set(comment.id, {
        author: comment.author,
        authorId: comment.authorId,
        content: comment.content,
        createdAt: comment.createdAt,
        id: comment.id,
        parentId: comment.parentId,
        postId: comment.postId,
        replies: [],
      });
    }

    for (const comment of comments) {
      const commentWithReplies = commentMap.get(comment.id);
      if (comment.parentId && commentMap.has(comment.parentId)) {
        const parentComment = commentMap.get(comment.parentId);
        if (parentComment && commentWithReplies) {
          parentComment.replies.push(commentWithReplies);
        }
      } else if (commentWithReplies) {
        rootComments.push(commentWithReplies);
      }
    }

    // Trả về rootComments (nhưng đảo ngược để cái mới nhất lên đầu)
    return rootComments.reverse();
  } catch (error) {
    console.error("[GET_COMMENTS_ERROR]", error);
    return [];
  }
}
