import { create } from "zustand";

export type SelectedPost = {
  id: string;
  content: string | null;
  image: string | null;
  createdAt: Date;
  postId?: string; // Optional field for comments
  author: {
    id: string;
    name: string;
    username: string | null;
    image: string | null;
  };
};

type PostStore = {
  selectedPost: SelectedPost | null;
  setSelectedPost: (post: SelectedPost | null) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
}));
