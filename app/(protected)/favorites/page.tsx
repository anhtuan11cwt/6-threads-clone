import { Suspense } from "react";
import ContainerLayout from "@/app/components/layout/container-layout";
import FavoritesLoader from "./_components/favorites-loader";

export const dynamic = "force-dynamic";

export default function FavoritesPage() {
  return (
    <ContainerLayout>
      <div className="space-y-6 p-4">
        <div>
          <h1 className="font-bold text-white text-2xl">Bài viết yêu thích</h1>
          <p className="text-zinc-400 text-sm">Những bài viết bạn đã thích</p>
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
