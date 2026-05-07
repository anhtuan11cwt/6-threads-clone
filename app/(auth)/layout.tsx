import type { ReactNode } from "react";

import { requireGuest } from "@/actions/auth.actions";

interface Props {
  children: ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  await requireGuest();

  return <div className="bg-background">{children}</div>;
}
