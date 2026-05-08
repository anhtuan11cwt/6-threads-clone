import { Suspense } from "react";
import PostLoader from "@/app/components/post/PostLoader";
import PostDetailClient from "./PostDetailClient";

interface Props {
  params: Promise<{
    postId: string;
  }>;
}

export default async function PostDetailPage({ params }: Props) {
  const { postId } = await params;

  return (
    <PostDetailClient>
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostLoader postId={postId} />
      </Suspense>
    </PostDetailClient>
  );
}

function PostDetailSkeleton() {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      <div className="flex gap-3">
        <div className="size-12 rounded-full bg-white/5" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded bg-white/5" />
          <div className="h-3 w-20 rounded bg-white/5" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-4 rounded bg-white/5" />
        <div className="h-4 w-4/5 rounded bg-white/5" />
      </div>

      <div className="h-[300px] rounded-2xl bg-white/5" />
    </div>
  );
}
