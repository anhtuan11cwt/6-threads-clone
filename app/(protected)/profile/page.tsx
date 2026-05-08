import { Suspense } from "react";
import ContainerLayout from "@/app/components/layout/container-layout";
import ProfileContent from "@/app/components/profile/profile-content";
import LoadingSpinner from "@/app/components/shared/loading-spinner";

export default function ProfilePage() {
  return (
    <ContainerLayout showBackButton={false} title="Hồ sơ">
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileContent />
      </Suspense>
    </ContainerLayout>
  );
}
