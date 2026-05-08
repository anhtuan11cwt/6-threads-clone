"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "@/app/components/Modal";
import { useModalStore } from "@/app/store/useModalStore";

interface EditProfileModalProps {
  user: {
    name: string | null;
    username: string | null;
    bio: string | null;
    image: string | null;
  };
}

const EditProfileModal = ({ user }: EditProfileModalProps) => {
  const { isEditProfileOpen, onCloseEditProfile } = useModalStore();
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [imagePreview, setImagePreview] = useState(user.image || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const handleSubmit = async () => {
    console.log({ bio, imagePreview, name, username });
    onCloseEditProfile();
  };

  return (
    <Modal
      isOpen={isEditProfileOpen}
      onClose={onCloseEditProfile}
      title="Chỉnh sửa hồ sơ"
    >
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full">
            <Image
              alt="Avatar"
              className="object-cover"
              fill
              src={imagePreview || "/avatar.png"}
            />
          </div>
          <label className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90">
            Đổi ảnh đại diện
            <input
              accept="image/*"
              hidden
              onChange={handleImageChange}
              type="file"
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-300" htmlFor="name">
            Tên
          </label>
          <input
            className="w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên của bạn"
            type="text"
            value={name}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-300" htmlFor="username">
            Tên người dùng
          </label>
          <input
            className="w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên người dùng"
            type="text"
            value={username}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-300" htmlFor="bio">
            Tiểu sử
          </label>
          <textarea
            className="w-full resize-none rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
            id="bio"
            onChange={(e) => setBio(e.target.value)}
            placeholder="Viết gì đó về bản thân..."
            rows={4}
            value={bio}
          />
        </div>

        <button
          className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:opacity-90"
          onClick={handleSubmit}
          type="button"
        >
          Lưu hồ sơ
        </button>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
