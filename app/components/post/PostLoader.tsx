import { notFound } from "next/navigation";
import { getPostById } from "@/app/actions/post.action";
import type { PostWithRelations } from "@/app/hooks/usePosts";
import PostCard from "./PostCard";

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
      <PostCard isDetail post={post as PostWithRelations} />
    </div>
  );
}
