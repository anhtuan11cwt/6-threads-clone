"use client";

import Image from "next/image";
import Link from "next/link";
import { useProfile } from "@/app/contexts/ProfileContext";
import { useModalStore } from "@/app/store/useModalStore";

export default function CreatePostAction() {
  const { setIsCreatePostOpen } = useModalStore();
  const { profile } = useProfile();

  return (
    <div className="flex items-center gap-4 p-4 border-border border-b">
      <Link href={`/${profile?.username || "profile"}`}>
        <div className="relative bg-zinc-700 rounded-full w-10 h-10 overflow-hidden shrink-0">
          <Image
            alt="avatar"
            className="object-cover"
            fill
            src={profile?.image || "/images/avatar.png"}
          />
        </div>
      </Link>
      <div className="flex justify-between items-center w-full">
        <button
          className="bg-transparent p-0 border-none text-text-muted text-sm text-left hover:underline cursor-pointer"
          onClick={() => setIsCreatePostOpen(true)}
          type="button"
        >
          Có gì mới?
        </button>
        <button
          className="hover:bg-surface-hover px-3 py-1 border border-border rounded-lg font-semibold text-white transition cursor-pointer"
          onClick={() => setIsCreatePostOpen(true)}
          type="button"
        >
          Đăng
        </button>
      </div>
    </div>
  );
}
