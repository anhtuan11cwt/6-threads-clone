"use client";

import type { Like, Post, User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

export type PostWithRelations = Post & {
  author: User;
  likes: Pick<Like, "userId">[];
  _count: { comments: number };
};

interface FetchPostsResponse {
  hasMore: boolean;
  nextCursor: string | null;
  posts: PostWithRelations[];
}

const fetchPosts = async ({
  pageParam,
}: {
  pageParam?: string | null;
}): Promise<FetchPostsResponse> => {
  const url = new URL("/api/post", window.location.origin);
  url.searchParams.set("limit", "3");
  if (pageParam) {
    url.searchParams.set("cursor", pageParam);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("Không thể tải bài viết");
  }
  return res.json();
};

export const usePosts = () => {
  return useInfiniteQuery({
    getNextPageParam: (lastPage: FetchPostsResponse) => lastPage.nextCursor,
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }: { pageParam?: string | null }) =>
      fetchPosts({ pageParam }),
    queryKey: ["posts"],
  });
};
