"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, QrCode } from "lucide-react";

/**
 * BottomNav: Fixed bottom navigation for Sales Portal (mobile-first).
 * Includes quick shortcut to Scanner.
 * Reserves scroll padding so content is never hidden behind it.
 */

const navItems = [
  { href: "/sales", label: "Beranda", icon: Home, isScanner: false },
  { href: "/scanner", label: "Scanner", icon: QrCode, isScanner: true },
  { href: "/sales/guests", label: "Daftar Tamu", icon: Users, isScanner: false },
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

          if (item.isScanner) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 -mt-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-toyota-red text-white flex items-center justify-center shadow-md group-active:scale-95 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-toyota-red">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] h-12 rounded-lg transition-colors ${
                isActive
                  ? "text-toyota-red font-semibold"
                  : "text-gray-400 active:text-gray-600 font-medium"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
