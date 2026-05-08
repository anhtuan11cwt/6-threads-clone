import ContainerLayout from "@/app/components/layout/container-layout";
import CreatePostAction from "@/app/components/post/CreatePostAction";
import Feed from "@/app/components/post/Feed";

export default function FeedPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="px-4 pt-6 pb-4">
        <h1 className="font-bold text-white text-2xl">Dành cho bạn</h1>
      </div>

      <ContainerLayout showBackButton={false}>
        <div className="space-y-6">
          <CreatePostAction />
          <Feed />
        </div>
      </ContainerLayout>
    </div>
  );
}
