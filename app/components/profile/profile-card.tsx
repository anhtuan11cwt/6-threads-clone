"use client";

import Image from "next/image";
import FollowButton from "@/app/components/shared/FollowButton";
import { useModalStore } from "@/app/store/useModalStore";

interface ProfileCardProps {
  isOwnProfile?: boolean;
  userProfile: {
    id: string;
    name: string | null;
    username: string | null;
    bio: string | null;
    image: string | null;
    isFollowing?: boolean;
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
    <div className="space-y-6 p-6 border-white/10 border-b">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="font-bold text-white text-2xl">{userProfile.name}</h2>

          <p className="text-zinc-400">@{userProfile.username}</p>
        </div>

        <div className="relative border border-white/10 rounded-full size-20 overflow-hidden">
          <Image
            alt={userProfile.name || "Ảnh đại diện"}
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
              className="text-zinc-500 hover:underline italic"
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
          <span className="font-semibold text-white">
            {userProfile._count.posts}
          </span>
          <span className="text-zinc-400 text-sm">Bài viết</span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-white">
            {userProfile._count.followers}
          </span>
          <span className="text-zinc-400 text-sm">Người theo dõi</span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-white">
            {userProfile._count.following}
          </span>
          <span className="text-zinc-400 text-sm">Đang theo dõi</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isOwnProfile ? (
          <button
            className="bg-white hover:bg-zinc-200 py-2 rounded-xl w-full font-semibold text-black transition"
            onClick={onOpenEditProfile}
            type="button"
          >
            Chỉnh sửa hồ sơ
          </button>
        ) : (
          <FollowButton
            initialFollowing={userProfile.isFollowing || false}
            userId={userProfile.id}
          />
        )}
      </div>
    </div>
  );
}
