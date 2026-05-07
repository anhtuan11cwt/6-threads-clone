import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/get-current-user";

export default async function FeedPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col justify-center items-center p-4 min-h-screen">
      <h1 className="mb-4 font-bold text-2xl">Chào mừng, {user.name}!</h1>
      <p className="mb-2 text-muted">@{user.username || "chưa có username"}</p>
      <p className="text-muted text-sm">Đây là trang feed chính của bạn.</p>
    </main>
  );
}
