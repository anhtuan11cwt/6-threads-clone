"use client";

import { MessageCircle } from "lucide-react";
import type { PostWithRelations } from "@/app/hooks/usePosts";
import { usePostStore } from "@/app/store/use-post-store";
import { useModalStore } from "@/app/store/useModalStore";
import LikeButton from "./LikeButton";

type Props = {
  post: PostWithRelations;
  hideComment?: boolean;
  currentUserId?: string;
};

export default function PostActions({
  post,
  hideComment,
  currentUserId,
}: Props) {
  const { setIsReplyModalOpen } = useModalStore();
  const { setSelectedPost } = usePostStore();

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPost(post);
    setIsReplyModalOpen(true);
  };

  return (
    <div className="flex items-center gap-5 mt-3">
      <LikeButton
        initialCount={post.likes.length}
        initialLiked={post.likes.some(
          (like: { userId: string }) => like.userId === currentUserId,
        )}
        postId={post.id}
      />

      {!hideComment && (
        <button
          className="text-zinc-400 hover:text-white transition"
          onClick={handleComment}
          type="button"
        >
          <MessageCircle className="size-5" />
        </button>
      )}
    </div>
  );
}
