"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/app/constants/navigation";

export const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        z-50
        flex
        h-16
        w-full
        items-center
        justify-around
        border-t
        border-white/10
        bg-black/95
        backdrop-blur-md
        lg:hidden
      "
    >
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
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
