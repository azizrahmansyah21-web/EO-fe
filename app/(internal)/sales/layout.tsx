"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Menu,
  LogOut,
  User,
} from "lucide-react";
import { BottomNav } from "@/components/organisms/bottom-nav";

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col shrink-0 bg-white border-r border-gray-200 fixed top-0 left-0 h-full z-20 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="w-64 flex flex-col h-full">
          {/* Brand */}
          <div className="px-5 pt-5 pb-4 border-b border-gray-100">
            <div className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-0.5">
              AGUNG TOYOTA
            </div>
            <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-toyota-red text-white text-[9px] font-bold uppercase tracking-wider">
              Sales Portal
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
            {[
              { href: "/sales", label: "Beranda", icon: Home },
              { href: "/sales/guests", label: "Daftar Tamu", icon: Users },
            ].map(({ href, label, icon: Icon }) => {
              // exact match for /sales to not highlight on /sales/guests
              const active = href === "/sales" ? pathname === "/sales" : pathname.startsWith(href);
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
          </nav>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">Core Engine v2.4.1</p>
            <p className="text-[10px] font-semibold text-gray-700">Doni Saputra</p>
          </div>
        </div>
      </aside>

      {/* Main wrapper */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 pb-24 md:pb-0 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-14 flex items-center px-4 md:px-6 gap-3">
          {/* Hamburger for Desktop */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile logo placeholder */}
          <div className="md:hidden flex items-center gap-2">
            <span className="text-base font-black text-gray-900 tracking-tight uppercase">
              Agung Toyota
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-toyota-red text-white text-[10px] font-bold uppercase tracking-wider">
              Sales
            </span>
          </div>

          {/* Active event chip */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-8 text-xs font-medium text-gray-700 truncate max-w-xs">
            <span className="text-toyota-red">&#x1F4E2;</span>
            Toyota Customer Gathering 2025
          </div>

          <div className="flex-1" />

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 pl-1 hover:opacity-80 transition-opacity focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-gray-900 leading-tight">Doni Saputra</p>
                <p className="text-[10px] text-gray-400">Cabang Sutomo</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center shrink-0">
                DS
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                  <p className="text-xs font-semibold text-gray-900">Doni Saputra</p>
                  <p className="text-[10px] text-gray-500">Cabang Sutomo</p>
                </div>
                <Link
                  href="/sales-login"
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

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
