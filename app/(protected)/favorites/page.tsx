import { Suspense } from "react";
import ContainerLayout from "@/app/components/layout/container-layout";
import FavoritesLoader from "./_components/favorites-loader";

export default function FavoritesPage() {
  return (
    <ContainerLayout>
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Bài viết yêu thích</h1>
          <p className="text-sm text-zinc-400">Những bài viết bạn đã thích</p>
        </div>

        <Suspense
          fallback={
            <p className="text-neutral-500">Đang tải bài viết yêu thích...</p>
          }
        >
          <FavoritesLoader />
        </Suspense>
      </div>
    </ContainerLayout>
  );
}
