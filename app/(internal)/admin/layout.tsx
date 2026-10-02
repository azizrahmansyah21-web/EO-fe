"use client";

import { useState, useEffect, useRef } from "react";
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
  Menu,
  LogOut,
  User,
} from "lucide-react";
import { ToyotaLogo } from "@/components/atoms/toyota-logo";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/guests", label: "Undangan", icon: Users },
  { href: "/admin/logistics", label: "Logistik", icon: Package },
  { href: "/admin/users", label: "Pengguna", icon: UserCog },
];

const mobileNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/scanner", label: "Scanner", icon: QrCode, isScanner: true },
  { href: "/admin/guests", label: "Undangan", icon: Users },
  { href: "/admin/logistics", label: "Logistik", icon: Package },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-dvh overflow-hidden bg-gray-50 flex flex-col">

      {/* Top bar — always on top, never scrolls */}
      <header className="shrink-0 z-30 bg-white border-b border-gray-200 h-14 flex items-center px-4 lg:px-6 gap-3">

        {/* Desktop hamburger — only visible lg+ */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden lg:flex p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile brand */}
        <div className="lg:hidden flex items-center gap-2">
          <ToyotaLogo size="xs" noTagline />
          <span className="text-xs font-bold text-gray-500 border-l border-gray-200 pl-2 ml-1">Command Center</span>
        </div>

        {/* Desktop event chip */}
        <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-8 text-xs font-medium text-gray-700 max-w-xs truncate">
          <span className="text-toyota-red shrink-0">&#x1F4E2;</span>
          <span className="truncate">Toyota Customer Gathering 2025</span>
        </div>

        <div className="flex-1" />

        {/* Quick Scanner CTA - Highly visible on Mobile & Tablet */}
        <Link
          href="/scanner"
          className="flex items-center gap-1.5 px-3 h-9 bg-toyota-red text-white hover:bg-toyota-dark rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0"
          title="Buka Scanner QR / Tiket"
        >
          <QrCode className="w-4 h-4" />
          <span className="hidden sm:inline">Scanner</span>
        </Link>

        {/* Status pills — desktop only */}
        <div className="hidden lg:flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg px-2.5 h-7 font-medium whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            WA Gateway: Online
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg px-2.5 h-7 font-medium whitespace-nowrap">
            <RefreshCw className="w-3 h-3 shrink-0" />
            Real-time
          </div>
        </div>

        <button
          type="button"
          aria-label="Notifikasi"
          className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors shrink-0"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-toyota-red" />
        </button>

        <button
          type="button"
          aria-label="Cari"
          className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors shrink-0"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Profile dropdown */}
        <div className="relative shrink-0" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-gray-900 leading-tight">Arya Pratama</p>
              <p className="text-[10px] text-gray-400">Event Ops Lead</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-toyota-red text-white text-xs font-bold flex items-center justify-center shrink-0">
              AP
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                <p className="text-xs font-semibold text-gray-900">Arya Pratama</p>
                <p className="text-[10px] text-gray-500">Event Ops Lead</p>
              </div>
              <Link
                href="/admin/users"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                <User className="w-4 h-4" />
                Profil Saya
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm text-toyota-red hover:bg-red-50 font-medium transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                <LogOut className="w-4 h-4" />
                Keluar / Logout
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Body: sidebar + content — fills remaining height */}
      <div className="flex flex-1 overflow-hidden">

        {/* Desktop sidebar — only visible lg+, collapses with hamburger */}
        <aside
          className={`hidden lg:flex flex-col shrink-0 bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-0 overflow-hidden border-0"
          }`}
        >
          <div className="w-64 flex flex-col h-full">
            {/* Brand */}
            <div className="px-5 pt-5 pb-4 border-b border-gray-100 flex items-center gap-3">
              <ToyotaLogo size="sm" />
              <div className="flex flex-col">
                <span className="text-xs font-black text-toyota-red uppercase tracking-tight leading-tight">
                  Agung Toyota
                </span>
                <span className="text-[11px] font-bold text-gray-900 tracking-tight leading-tight">
                  Command Center
                </span>
              </div>
            </div>

            {/* System status */}
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
            <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
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
            <div className="px-5 py-3 border-t border-gray-100 shrink-0">
              <p className="text-[10px] text-gray-400">Core Engine v2.4.1</p>
              <p className="text-[10px] font-semibold text-toyota-red">Sutomo Hub</p>
            </div>
          </div>
        </aside>

        {/* Main scroll area */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav — fixed to viewport bottom, lg+ hidden */}
      <nav className="lg:hidden shrink-0 bg-white border-t border-gray-200 z-30">
        <div className="flex items-center justify-around h-16 px-1">
          {mobileNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            if (item.isScanner) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors -mt-2 group"
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
                className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors ${
                  isActive ? "text-toyota-red" : "text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className={`text-[9px] ${isActive ? "font-bold" : "font-medium"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
