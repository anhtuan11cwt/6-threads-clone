"use client";

import { Heart, MessageCircle } from "lucide-react";
import type { PostWithRelations } from "@/app/hooks/usePosts";
import { usePostStore } from "@/app/store/use-post-store";
import { useModalStore } from "@/app/store/useModalStore";

type Props = {
  post: PostWithRelations;
  hideComment?: boolean;
};

export default function PostActions({ post, hideComment }: Props) {
  const { setIsReplyModalOpen } = useModalStore();
  const { setSelectedPost } = usePostStore();

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPost(post);
    setIsReplyModalOpen(true);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Triển khai logic thích
  };

  return (
    <div className="flex items-center gap-5 mt-3">
      <button
        className="text-zinc-400 hover:text-white transition"
        onClick={handleLike}
        type="button"
      >
        <Heart className="size-5" />
      </button>

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
