"use client";

import type { Comment, User } from "@prisma/client";
import { usePostStore } from "@/app/store/use-post-store";
import { useModalStore } from "@/app/store/useModalStore";

type CommentWithAuthor = Comment & {
  author: User;
  postId: string;
};

export default function CommentReplyButton({
  comment,
}: {
  comment: CommentWithAuthor;
}) {
  const { setIsReplyModalOpen } = useModalStore();
  const { setSelectedPost } = usePostStore();

  const handleReply = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Assuming the comment object has the postId of the parent post
    // We should reply to the parent post, not the comment itself.
    // Let's store the information about the post we are replying to.
    // Since we don't have the full post here, we may have to fetch it or pass it.
    // Actually, since the comment already has `postId`, we can pass a mock post or just the postId.
    // Let's update usePostStore to also handle postId if needed,
    // or just pass a reconstructed post object.

    // Simplest fix for now: fetch the post or use the postId.
    // Actually, I will just set a minimal object that the ReplyModal can use.

    setSelectedPost({
      author: {
        id: comment.author.id,
        image: comment.author.image,
        name: comment.author.name,
        username: comment.author.username,
      },
      content: comment.content,
      createdAt: comment.createdAt,
      id: comment.id,
      image: null,
      postId: comment.postId,
    });
    setIsReplyModalOpen(true);
  };

  return (
    <button
      className="text-neutral-500 text-sm hover:text-white transition mt-2"
      onClick={handleReply}
      type="button"
    >
      Trả lời
    </button>
  );
}
