"use client";

import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function PostButton({
  children,
  disabled,
  loading,
  onClick,
  type = "button",
}: Props) {
  return (
    <button
      className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
}
