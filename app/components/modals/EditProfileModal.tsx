"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";
import { useProfile } from "@/app/contexts/ProfileContext";
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
  const { updateProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [imagePreview, setImagePreview] = useState(user.image || "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const handleLabelClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("bio", bio);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.patch("/api/profile/update", formData);

      // Update profile data immediately in the UI
      updateProfile({
        bio,
        image: imagePreview,
        name,
        username,
      });

      toast.success("Cập nhật hồ sơ thành công");
    } catch (error) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err?.response?.data?.error || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isEditProfileOpen}
      onClose={onCloseEditProfile}
      title="Chỉnh sửa hồ sơ"
    >
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-4">
          <div className="relative rounded-full w-24 h-24 overflow-hidden">
            <Image
              alt="Avatar"
              className="object-cover"
              fill
              src={imagePreview || "/avatar.png"}
            />
          </div>
          <label
            className={`bg-white hover:opacity-90 px-4 py-2 rounded-full font-medium text-black text-sm transition cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleLabelClick}
            onKeyDown={(e) => e.key === "Enter" && handleLabelClick()}
          >
            Đổi ảnh đại diện
            <input
              accept="image/*"
              disabled={loading}
              hidden
              onChange={handleImageChange}
              type="file"
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-neutral-300 text-sm" htmlFor="name">
            Tên
          </label>
          <input
            className="bg-[#1A1A1A] disabled:opacity-50 px-4 py-3 border border-white/10 focus:border-white/30 rounded-xl outline-none w-full text-white text-sm transition"
            disabled={loading}
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên của bạn"
            type="text"
            value={name}
          />
        </div>

        <div className="space-y-2">
          <label className="text-neutral-300 text-sm" htmlFor="username">
            Tên người dùng
          </label>
          <input
            className="bg-[#1A1A1A] disabled:opacity-50 px-4 py-3 border border-white/10 focus:border-white/30 rounded-xl outline-none w-full text-white text-sm transition"
            disabled={loading}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên người dùng"
            type="text"
            value={username}
          />
        </div>

        <div className="space-y-2">
          <label className="text-neutral-300 text-sm" htmlFor="bio">
            Tiểu sử
          </label>
          <textarea
            className="bg-[#1A1A1A] disabled:opacity-50 px-4 py-3 border border-white/10 focus:border-white/30 rounded-xl outline-none w-full text-white text-sm transition resize-none"
            disabled={loading}
            id="bio"
            onChange={(e) => setBio(e.target.value)}
            placeholder="Viết gì đó về bản thân..."
            rows={4}
            value={bio}
          />
        </div>

        <button
          className="bg-white hover:opacity-90 disabled:opacity-50 py-3 rounded-xl w-full font-semibold text-black text-sm transition"
          disabled={loading}
          onClick={handleSubmit}
          type="button"
        >
          {loading ? "Đang lưu..." : "Lưu hồ sơ"}
        </button>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
