import type { ReactNode } from "react";

import { requireAuth } from "@/actions/auth.actions";

interface Props {
  children: ReactNode;
}

export default async function ProtectedLayout({ children }: Props) {
  await requireAuth();

  return <>{children}</>;
}
