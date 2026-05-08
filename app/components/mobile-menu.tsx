"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/app/constants/navigation";
import { authClient } from "@/lib/auth-client";

export const MobileMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="lg:hidden bottom-0 left-0 z-50 fixed flex justify-around items-center bg-black/95 backdrop-blur-md border-white/10 border-t w-full h-16">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            className={`
              flex
              flex-col
              items-center
              gap-1
              transition
              ${isActive ? "text-white" : "text-zinc-500 hover:text-white"}
            `}
            href={item.href}
            key={item.label}
          >
            <Icon size={24} />
            <span className="font-medium text-[10px]">{item.label}</span>
          </Link>
        );
      })}
      <button
        className="flex flex-col items-center gap-1 text-zinc-500 hover:text-red-400 transition"
        onClick={handleLogout}
        type="button"
      >
        <LogOut size={24} />
        <span className="font-medium text-[10px]">Đăng xuất</span>
      </button>
    </nav>
  );
};
