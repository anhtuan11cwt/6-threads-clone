"use client";

import { LogOut, PenSquare } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/app/constants/navigation";
import { useModalStore } from "@/app/store/useModalStore";
import { authClient } from "@/lib/auth-client";
import { Logo } from "./logo";

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsCreatePostOpen } = useModalStore();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="hidden top-0 left-0 fixed lg:flex flex-col justify-between bg-black px-6 py-8 border-white/10 border-r w-[260px] h-screen">
      <div className="space-y-10">
        <Logo />
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  transition
                  hover:bg-white/10
                  ${isActive ? "bg-white text-black" : "text-white"}
                `}
                href={item.href}
                key={item.label}
              >
                <Icon size={22} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <button
          className="flex justify-center items-center gap-2 bg-white hover:opacity-90 py-3 rounded-full w-full font-semibold text-black transition cursor-pointer"
          onClick={() => setIsCreatePostOpen(true)}
          type="button"
        >
          <PenSquare size={18} />
          Tạo bài viết
        </button>
      </div>
      <button
        className="flex items-center gap-3 px-4 text-red-400 hover:text-red-300 transition cursor-pointer"
        onClick={handleLogout}
        type="button"
      >
        <LogOut size={20} />
        <span className="font-medium">Đăng xuất</span>
      </button>
    </aside>
  );
};
