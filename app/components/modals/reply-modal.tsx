"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";
import { type SelectedPost, usePostStore } from "@/app/store/use-post-store";
import { useModalStore } from "@/app/store/useModalStore";

export default function ReplyModal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isReplyModalOpen, setIsReplyModalOpen } = useModalStore();
  const { selectedPost, setSelectedPost } = usePostStore();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setContent("");
    setSelectedPost(null);
    setIsReplyModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const isReplyingToComment = !!(selectedPost as SelectedPost).postId;
      const response = await fetch("/api/comments", {
        body: JSON.stringify({
          content,
          parentId: isReplyingToComment ? selectedPost?.id : null,
          postId: isReplyingToComment
            ? (selectedPost as SelectedPost).postId
            : selectedPost?.id,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) throw new Error("Không thể trả lời");

      toast.success("Đã trả lời");
      // Invalidate queries to update Feed counts
      await queryClient.invalidateQueries({ queryKey: ["posts"] });

      // Close modal first
      handleClose();

      // router.refresh() helps update server components if any
      router.refresh();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isReplyModalOpen} onClose={handleClose} title="Trả lời">
      <div className="space-y-2">
        {selectedPost && (
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <Image
                alt="user"
                className="size-10 rounded-full object-cover"
                height={40}
                src={selectedPost.author.image || "/avatar.png"}
                width={40}
              />
              <div className="w-0.5 grow bg-zinc-800 my-2" />
            </div>
            <div className="pb-4">
              <p className="text-white font-semibold">
                {selectedPost.author.name}
              </p>
              <p className="text-white text-sm whitespace-pre-wrap">
                {selectedPost.content}
              </p>
              <p className="text-neutral-500 text-sm mt-1">
                Đang trả lời @{selectedPost.author.username}
              </p>
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <Image
            alt="user"
            className="size-10 rounded-full object-cover"
            height={40}
            src="/avatar.png"
            width={40}
          />
          <textarea
            className="w-full min-h-[120px] bg-transparent text-white outline-none resize-none pt-2"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nhập câu trả lời..."
            value={content}
          />
        </div>
        <div className="flex justify-end pt-2">
          <button
            className="bg-white text-black px-6 py-2 rounded-full font-semibold disabled:opacity-50"
            disabled={loading || !content.trim()}
            onClick={handleSubmit}
            type="button"
          >
            {loading ? (
              <Loader2 className="size-5 animate-spin mx-auto" />
            ) : (
              "Đăng"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
