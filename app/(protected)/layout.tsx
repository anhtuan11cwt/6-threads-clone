import type { ReactNode } from "react";
import { requireAuth } from "@/actions/auth.actions";
import { getCurrentUser } from "@/actions/get-current-user";
import { MobileMenu } from "@/app/components/mobile-menu";
import EditProfileModal from "@/app/components/modals/EditProfileModal";
import { Sidebar } from "@/app/components/sidebar";

interface Props {
  children: ReactNode;
}

export default async function ProtectedLayout({ children }: Props) {
  await requireAuth();
  const user = await getCurrentUser();

  return (
    <div className="bg-black min-h-screen text-white">
      <Sidebar />
      <main className="lg:ml-[260px] pb-20">
        <div className="mx-auto px-4 py-6 max-w-3xl">{children}</div>
      </main>
      <MobileMenu />
      {user && <EditProfileModal user={user} />}
    </div>
  );
}
