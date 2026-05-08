"use client";

import type { Post, User } from "@prisma/client";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PostWithRelations = Post & {
  author: User;
  likes: { userId: string }[];
  _count: { comments: number; likes?: number };
};

interface PostCardProps {
  isDetail?: boolean;
  post: PostWithRelations;
}

const PostCard = ({ post, isDetail = false }: PostCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (isDetail) return;
    router.push(`/feed/${post.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDetail) return;
    if (e.key === "Enter" || e.key === " ") {
      router.push(`/feed/${post.id}`);
    }
  };

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
              <p>{post._count.comments} bình luận</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className="w-full text-left p-4 border-white/10 border-b transition cursor-pointer hover:bg-white/[0.02]"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
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
            <p>{post._count.comments} bình luận</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default PostCard;
