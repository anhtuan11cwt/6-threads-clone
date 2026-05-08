"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FollowButtonProps {
  initialFollowing: boolean;
  userId: string;
}

export default function FollowButton({
  userId,
  initialFollowing,
}: FollowButtonProps) {
  const router = useRouter();
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const response = await fetch("/api/users/follow", {
        body: JSON.stringify({
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Đã xảy ra lỗi");
      }

      setFollowing(data.following);
      toast.success(
        data.following ? "Đã theo dõi người dùng" : "Đã bỏ theo dõi người dùng",
      );
      router.refresh();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`
        px-4
        py-2
        rounded-full
        text-sm
        font-medium
        transition
        cursor-pointer
        disabled:opacity-50
        ${following ? "bg-zinc-800 text-white" : "bg-white text-black"}
      `}
      disabled={loading}
      onClick={handleFollow}
      type="button"
    >
      {loading ? "Đang tải..." : following ? "Hủy theo dõi" : "Theo dõi"}
    </button>
  );
}
