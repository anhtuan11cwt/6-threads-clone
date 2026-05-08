import type { Comment, Post, User } from "@prisma/client";
import { notFound } from "next/navigation";
import { getPostById } from "@/app/actions/post.action";
import CommentCard from "./CommentCard";
import PostCard from "./PostCard";

type CommentWithAuthor = Comment & {
  author: User;
};

type PostDetail = Post & {
  author: User;
  comments: CommentWithAuthor[];
  likes: { userId: string }[];
  _count: { comments: number; likes: number };
};

interface PostLoaderProps {
  postId: string;
}

export default async function PostLoader({ postId }: PostLoaderProps) {
  const post = await getPostById(postId);

  if (!post) {
    return notFound();
  }

  return (
    <div className="divide-y divide-white/10">
      <PostCard isDetail post={post as PostDetail} />

      <div className="space-y-4 p-4">
        <h2 className="text-sm font-semibold text-white">
          Trả lời ({post.comments.length})
        </h2>

        {post.comments.length === 0 ? (
          <p className="text-sm text-neutral-400">Chưa có câu trả lời nào.</p>
        ) : (
          <div className="divide-y divide-white/10">
            {post.comments.map((comment) => (
              <CommentCard comment={comment} key={comment.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
