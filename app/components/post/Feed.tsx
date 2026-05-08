"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { type PostWithRelations, usePosts } from "@/app/hooks/usePosts";
import PostCard from "./PostCard";

interface FeedProps {
  initialPosts?: PostWithRelations[];
}

const Feed = ({ initialPosts }: FeedProps) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !initialPosts) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, initialPosts]);

  if (initialPosts) {
    if (initialPosts.length === 0) {
      return (
        <div className="py-10 text-neutral-400 text-center">
          Chưa có bài viết nào.
        </div>
      );
    }

    return (
      <div>
        {initialPosts.map((post) => (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[0, 1, 2].map((i) => (
          <div
            className="bg-white/5 rounded-2xl h-32 animate-pulse"
            key={`skeleton-${i}`}
          />
        ))}
      </div>
    );
  }

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (posts.length === 0) {
    return (
      <div className="py-10 text-neutral-400 text-center">
        Chưa có bài viết nào.
      </div>
    );
  }

  return (
    <div>
      {posts.map((post, index) => {
        const isLastPost = index === posts.length - 1;
        return (
          <div key={post.id} ref={isLastPost ? ref : null}>
            <PostCard post={post} />
          </div>
        );
      })}
      {isFetchingNextPage && (
        <div className="py-5 text-neutral-400 text-sm text-center">
          Đang tải thêm bài viết...
        </div>
      )}
    </div>
  );
};

export default Feed;
