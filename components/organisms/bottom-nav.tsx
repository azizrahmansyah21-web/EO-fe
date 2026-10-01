"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users } from "lucide-react";

/**
 * BottomNav: Fixed bottom navigation for Sales Portal (mobile-first).
 * Two tabs only: Beranda and Daftar Tamu.
 * Reserves scroll padding so content is never hidden behind it.
 */

const navItems = [
  { href: "/sales", label: "Beranda", icon: Home },
  { href: "/sales/guests", label: "Daftar Tamu", icon: Users },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 md:hidden pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/sales"
              ? pathname === "/sales"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] h-12 rounded-lg transition-colors ${
                isActive
                  ? "text-toyota-red"
                  : "text-gray-400 active:text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
