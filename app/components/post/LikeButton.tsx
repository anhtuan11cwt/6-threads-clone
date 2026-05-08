"use client";

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LikeButtonProps {
  initialCount: number;
  initialLiked: boolean;
  postId: string;
}

const LikeButton = ({
  postId,
  initialLiked,
  initialCount,
}: LikeButtonProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;

    try {
      setLoading(true);
      const nextLiked = !liked;
      setLiked(nextLiked);
      setLikeCount((prev) => (nextLiked ? prev + 1 : prev - 1));

      const response = await axios.post("/api/post/like", {
        postId,
      });

      setLiked(response.data.liked);
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    } catch (error) {
      console.error(error);
      setLiked(initialLiked);
      setLikeCount(initialCount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="flex items-center gap-2 cursor-pointer transition hover:opacity-80"
      disabled={loading}
      onClick={handleLike}
      type="button"
    >
      <Heart
        className={`size-5 transition ${
          liked ? "fill-pink-500 text-pink-500" : "text-zinc-400"
        }`}
      />
      <span className="text-sm text-zinc-300">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
