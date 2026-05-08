"use client";

import { useModalStore } from "@/app/store/useModalStore";

export default function CreatePostAction() {
  const { setIsCreatePostOpen } = useModalStore();

  return (
    <button
      className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 p-4 border border-white/10 rounded-2xl w-full transition"
      onClick={() => setIsCreatePostOpen(true)}
      type="button"
    >
      <div className="bg-zinc-700 rounded-full size-10" />
      <div className="flex-1 text-zinc-400 text-sm text-left">Có gì mới?</div>
    </button>
  );
}
