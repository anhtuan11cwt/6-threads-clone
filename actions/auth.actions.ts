import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (!session.user.username) {
    redirect("/setup-username");
  }

  return session;
}

export async function requireGuest() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.username) {
    redirect("/feed");
  }

  return session;
}
