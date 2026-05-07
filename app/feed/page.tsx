// Copyright (c) 2026 Company Name. All rights reserved.

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/get-current-user";

export default async function FeedPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Chào mừng, {user.name}!</h1>
      <p className="text-muted mb-2">@{user.username || "chưa có username"}</p>
      <p className="text-sm text-muted">Đây là trang feed chính của bạn.</p>
    </main>
  );
}
