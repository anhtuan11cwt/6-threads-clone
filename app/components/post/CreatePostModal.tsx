"use client";

import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { ImageIcon, Smile } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";
import PostButton from "@/app/components/post/PostButton";
import AutoSizeTextarea from "@/app/components/shared/AutoSizeTextarea";
import { useModalStore } from "@/app/store/useModalStore";

export default function CreatePostModal() {
  const router = useRouter();
  const { isCreatePostOpen, setIsCreatePostOpen } = useModalStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setContent((prev) => prev + emoji.emoji);
  };

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("content", content);
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch("/api/post", {
        body: formData,
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Không thể tạo bài viết");
      }

      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setIsCreatePostOpen(false);
      router.refresh();
      toast.success("Đăng bài thành công!");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isCreatePostOpen}
      onClose={() => setIsCreatePostOpen(false)}
      title="Tạo Thread"
    >
      <div className="space-y-4">
        <AutoSizeTextarea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Có gì mới?"
          value={content}
        />

        {imagePreview && (
          <Image
            alt="Xem trước"
            className="rounded-2xl w-full max-h-[400px] object-cover"
            height={400}
            src={imagePreview}
            width={400}
          />
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className="text-zinc-400 hover:text-white transition"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              <ImageIcon className="size-5" />
            </button>
            <button
              className="text-zinc-400 hover:text-white transition"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              type="button"
            >
              <Smile className="size-5" />
            </button>
          </div>
          <PostButton
            disabled={(!content.trim() && !imageFile) || loading}
            loading={loading}
            onClick={handleSubmit}
          >
            Đăng
          </PostButton>
        </div>

        {showEmojiPicker && (
          <div className="pt-2">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <input
          accept="image/*"
          hidden
          onChange={handleSelectImage}
          ref={fileInputRef}
          type="file"
        />
      </div>
    </Modal>
  );
}
