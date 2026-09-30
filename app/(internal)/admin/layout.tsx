"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Package,
  UserCog,
  QrCode,
  RefreshCw,
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard Utama", icon: LayoutDashboard },
  { href: "/admin/events", label: "Manajemen Event", icon: Calendar },
  { href: "/admin/guests", label: "Pusat Undangan & Tamu", icon: Users },
  { href: "/admin/logistics", label: "Biaya & Logistik", icon: Package },
  { href: "/admin/users", label: "Manajemen Pengguna", icon: UserCog },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 bg-white border-r border-gray-200 flex-col shrink-0 fixed top-0 left-0 h-full z-20">
        {/* Brand */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="text-xs font-bold text-toyota-red tracking-widest uppercase mb-0.5">
            AGUNG TOYOTA
          </div>
          <div className="text-xs text-gray-500">Command Center</div>
        </div>

        {/* System Status */}
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
            Sistem Operasional
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-xs font-medium text-gray-700">Event Node Active</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-toyota-red text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-gray-200">
            <Link
              href="/scanner"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <QrCode className="w-4 h-4 shrink-0" />
              <span>Buka Scanner</span>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100">
          <p className="text-[10px] text-gray-400">Core Engine v2.4.1</p>
          <p className="text-[10px] font-semibold text-toyota-red">Sutomo Hub</p>
        </div>
      </aside>

      {/* Main wrapper */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 h-14 flex items-center px-4 md:px-6 gap-3">
          {/* Active event chip */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-8 text-xs font-medium text-gray-700 truncate max-w-xs">
            <span className="text-toyota-red">&#x1F4E2;</span>
            Toyota Customer Gathering &amp; Weekend Expo 2025
          </div>

          <div className="flex-1" />

          {/* Status pills */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg px-2.5 h-7 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              WhatsApp Gateway: Online
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg px-2.5 h-7 font-medium">
              <RefreshCw className="w-3 h-3 shrink-0" />
              Sync: Real-time
            </div>
          </div>

          <button
            type="button"
            aria-label="Notifikasi"
            className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-toyota-red" />
          </button>

          <button
            type="button"
            aria-label="Cari"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User */}
          <div className="flex items-center gap-2 pl-1">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-gray-900 leading-tight">Arya Pratama</p>
              <p className="text-[10px] text-gray-400">Event Operational Lead</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-toyota-red text-white text-xs font-bold flex items-center justify-center shrink-0">
              AP
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
