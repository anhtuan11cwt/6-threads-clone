"use client";

import Image from "next/image";
import { useModalStore } from "@/app/store/useModalStore";

interface ProfileCardProps {
  isOwnProfile?: boolean;
  userProfile: {
    id: string;
    name: string | null;
    username: string | null;
    bio: string | null;
    image: string | null;
    _count: {
      posts: number;
      followers: number;
      following: number;
    };
  };
}

export default function ProfileCard({
  userProfile,
  isOwnProfile,
}: ProfileCardProps) {
  const { onOpenEditProfile } = useModalStore();

  return (
    <div className="border-b border-white/10 p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">{userProfile.name}</h2>

          <p className="text-zinc-400">@{userProfile.username}</p>
        </div>

        <div className="relative size-20 rounded-full overflow-hidden border border-white/10">
          <Image
            alt={userProfile.name || "Avatar"}
            className="object-cover"
            fill
            src={userProfile.image || "/avatar.png"}
          />
        </div>
      </div>

      <div>
        {userProfile.bio ? (
          <p className="text-white leading-relaxed">{userProfile.bio}</p>
        ) : (
          isOwnProfile && (
            <button
              className="text-zinc-500 italic hover:underline"
              onClick={onOpenEditProfile}
              type="button"
            >
              Thêm tiểu sử
            </button>
          )
        )}
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <span className="text-white font-semibold">
            {userProfile._count.posts}
          </span>
          <span className="text-zinc-400 text-sm">Bài viết</span>
        </div>

        <div className="flex flex-col">
          <span className="text-white font-semibold">
            {userProfile._count.followers}
          </span>
          <span className="text-zinc-400 text-sm">Người theo dõi</span>
        </div>

        <div className="flex flex-col">
          <span className="text-white font-semibold">
            {userProfile._count.following}
          </span>
          <span className="text-zinc-400 text-sm">Đang theo dõi</span>
        </div>
      </div>

      {isOwnProfile && (
        <button
          className="w-full bg-white text-black py-2 rounded-xl font-semibold hover:bg-zinc-200 transition"
          onClick={onOpenEditProfile}
          type="button"
        >
          Chỉnh sửa hồ sơ
        </button>
      )}
    </div>
  );
}
