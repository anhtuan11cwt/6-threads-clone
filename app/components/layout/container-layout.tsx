"use client";

import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export default function ContainerLayout({
  children,
  showBackButton = false,
  onBackClick,
}: {
  children: ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
}) {
  return (
    <div className="mx-auto border-white/10 border-x max-w-2xl min-h-screen">
      {showBackButton && (
        <div className="top-0 z-10 sticky bg-black/95 backdrop-blur-md border-white/10 border-b">
          <button
            className="flex items-center gap-2 px-4 py-3 text-white hover:text-zinc-300 transition-colors cursor-pointer"
            onClick={onBackClick}
            type="button"
          >
            <ArrowLeft size={20} />
            <span>Quay về</span>
          </button>
        </div>
      )}
      <main className="pb-20 md:pb-0">{children}</main>
    </div>
  );
}
