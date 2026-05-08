"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import ContainerLayout from "@/app/components/layout/container-layout";

export default function PostDetailClient({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <ContainerLayout onBackClick={() => router.back()} showBackButton>
      {children}
    </ContainerLayout>
  );
}
