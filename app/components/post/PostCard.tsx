"use client";

import type { Comment, Post, User } from "@prisma/client";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useModalStore } from "@/app/store/useModalStore";
import CommentCard from "./CommentCard";
import PostActions from "./post-actions";

type PostWithRelations = Post & {
  author: User;
  likes: { userId: string }[];
  _count: { comments: number; likes?: number };
};

type CommentWithAuthor = Comment & {
  author: User;
};

interface PostCardProps {
  isDetail?: boolean;
  post: PostWithRelations;
}

const PostCard = ({ post, isDetail = false }: PostCardProps) => {
  const router = useRouter();
  const [showComments, setShowComments] = useState(isDetail);
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const { isReplyModalOpen } = useModalStore();

  const handleCardClick = () => {
    if (isDetail) return;
    router.push(`/feed/${post.id}`);
  };

  const fetchComments = useCallback(async () => {
    setLoadingComments(true);
    try {
      const { getComments } = await import("@/app/actions/comment.action");
      const fetchedComments = await getComments(post.id);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Lỗi khi tải bình luận:", error);
    } finally {
      setLoadingComments(false);
    }
  }, [post.id]);

  const handleShowComments = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showComments && comments.length === 0) {
      await fetchComments();
    }
    setShowComments(!showComments);
  };

  useEffect(() => {
    if (!isReplyModalOpen && showComments) {
      fetchComments();
    }
  }, [isReplyModalOpen, showComments, fetchComments]);

  useEffect(() => {
    if (isDetail && comments.length === 0) {
      fetchComments();
    }
  }, [isDetail, comments.length, fetchComments]);

  if (isDetail) {
    return (
      <div className="p-4 border-white/10 border-b">
        <div className="flex gap-3">
          <Link href={`/${post.author.username}`}>
            <Image
              alt="avatar"
              className="rounded-full object-cover aspect-square"
              height={40}
              src={post.author.image || "/avatar.png"}
              width={40}
            />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link
                className="hover:underline"
                href={`/${post.author.username}`}
              >
                <p className="font-semibold text-white">{post.author.name}</p>
              </Link>
              <Link href={`/${post.author.username}`}>
                <p className="text-neutral-400 text-sm">
                  @{post.author.username}
                </p>
              </Link>
              <p className="text-neutral-500 text-sm">·</p>
              <p className="text-neutral-500 text-sm">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
            {post.content && (
              <p className="mt-2 text-white text-sm whitespace-pre-wrap">
                {post.content}
              </p>
            )}
            {post.image && (
              <div className="relative mt-3 rounded-2xl aspect-square overflow-hidden">
                <Image
                  alt="post image"
                  className="object-cover"
                  fill
                  src={post.image}
                />
              </div>
            )}
            <div className="flex items-center gap-5 mt-3 text-neutral-400 text-sm">
              <p>{post.likes.length} lượt thích</p>
              <button
                className="hover:text-white transition"
                onClick={handleShowComments}
                type="button"
              >
                {post._count.comments} bình luận
              </button>
            </div>
            {showComments && (
              <div className="mt-4 pt-4 border-white/10 border-t">
                {loadingComments ? (
                  <p className="text-neutral-500 text-sm">Đang tải...</p>
                ) : comments.length === 0 ? (
                  <p className="text-neutral-500 text-sm">
                    Chưa có bình luận nào.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <CommentCard comment={comment} key={comment.id} />
                    ))}
                  </div>
                )}
              </div>
            )}
            <PostActions post={post} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className="hover:bg-white/[0.02] p-4 border-white/10 border-b w-full text-left transition cursor-pointer"
      onClick={handleCardClick}
      type="button"
    >
      <div className="flex gap-3">
        <Link
          href={`/${post.author.username}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            alt="avatar"
            className="rounded-full object-cover aspect-square"
            height={40}
            src={post.author.image || "/avatar.png"}
            width={40}
          />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link
              className="hover:underline"
              href={`/${post.author.username}`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-semibold text-white">{post.author.name}</p>
            </Link>
            <Link
              href={`/${post.author.username}`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-neutral-400 text-sm">
                @{post.author.username}
              </p>
            </Link>
            <p className="text-neutral-500 text-sm">·</p>
            <p className="text-neutral-500 text-sm">
              {moment(post.createdAt).fromNow()}
            </p>
          </div>
          {post.content && (
            <p className="mt-2 text-white text-sm whitespace-pre-wrap">
              {post.content}
            </p>
          )}
          {post.image && (
            <div className="relative mt-3 rounded-2xl aspect-square overflow-hidden">
              <Image
                alt="post image"
                className="object-cover"
                fill
                src={post.image}
              />
            </div>
          )}
          <div className="flex items-center gap-5 mt-3 text-neutral-400 text-sm">
            <p>{post.likes.length} lượt thích</p>
            <button
              className="hover:text-white transition"
              onClick={handleShowComments}
              type="button"
            >
              {post._count.comments} bình luận
            </button>
          </div>
          {showComments && (
            <div className="mt-4 pt-4 border-white/10 border-t">
              {loadingComments ? (
                <p className="text-neutral-500 text-sm">Đang tải...</p>
              ) : comments.length === 0 ? (
                <p className="text-neutral-500 text-sm">
                  Chưa có bình luận nào.
                </p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <CommentCard comment={comment} key={comment.id} />
                  ))}
                </div>
              )}
            </div>
          )}
          <PostActions post={post} />
        </div>
      </div>
    </button>
  );
};

export default PostCard;
