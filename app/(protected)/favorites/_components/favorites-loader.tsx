import { getLikedPosts } from "@/app/actions/post.action";
import Feed from "@/app/components/post/Feed";

export default async function FavoritesLoader() {
  const posts = await getLikedPosts();

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 p-10 text-center">
        <p className="text-zinc-400">Bạn chưa có bài viết yêu thích nào.</p>
      </div>
    );
  }

  return <Feed initialPosts={posts} />;
}
