import { Suspense } from "react";
import ContainerLayout from "@/app/components/layout/container-layout";
import ProfileContent from "@/app/components/profile/profile-content";
import LoadingSpinner from "@/app/components/shared/loading-spinner";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="px-4 pt-6 pb-4">
        <h1 className="font-bold text-white text-2xl">Hồ sơ</h1>
      </div>

      <ContainerLayout showBackButton={false}>
        <Suspense fallback={<LoadingSpinner />}>
          <ProfileContent />
        </Suspense>
      </ContainerLayout>
    </div>
  );
}
