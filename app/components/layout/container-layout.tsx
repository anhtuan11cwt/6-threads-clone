"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface ContainerLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  title: string;
}

export default function ContainerLayout({
  title,
  children,
  showBackButton = true,
}: ContainerLayoutProps) {
  const router = useRouter();

  return (
    <div className="mx-auto border-white/10 border-x max-w-2xl min-h-screen">
      <header className="top-0 z-50 sticky bg-black/80 backdrop-blur-md border-white/10 border-b">
        <div className="flex items-center gap-4 px-4 py-3">
          {showBackButton && (
            <button
              className="hover:bg-white/10 p-2 rounded-full transition"
              onClick={() => router.back()}
              type="button"
            >
              <ArrowLeft className="size-5 text-white" />
            </button>
          )}

          <h1 className="font-semibold text-white text-lg">{title}</h1>
        </div>
      </header>

      <main className="pb-20 md:pb-0">{children}</main>
    </div>
  );
}
