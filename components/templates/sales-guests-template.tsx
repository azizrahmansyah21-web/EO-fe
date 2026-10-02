"use client";

import React from "react";
import Link from "next/link";
import { Search, UserPlus, Filter } from "lucide-react";
import { GuestCard } from "@/components/molecules/guest-card";

export type FilterTab = "semua" | "disetujui" | "menunggu";

export interface SalesGuestItem {
  name: string;
  phone: string;
  status: "disetujui" | "menunggu" | "ditolak";
}

interface SalesGuestsTemplateProps {
  guests: SalesGuestItem[];
  totalCount: number;
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  tabCounts: { semua: number; disetujui: number; menunggu: number };
}

/**
 * SalesGuestsTemplate: Atomic Design template for Sales Prospects List.
 */
export function SalesGuestsTemplate({
  guests,
  totalCount,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  tabCounts,
}: SalesGuestsTemplateProps) {
  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "semua", label: "Semua", count: tabCounts.semua },
    { key: "disetujui", label: "Disetujui", count: tabCounts.disetujui },
    { key: "menunggu", label: "Menunggu", count: tabCounts.menunggu },
  ];

  return (
    <div className="p-4 md:p-6 max-w-screen-md mx-auto space-y-4">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">
            Portal Eksekutif Penjualan
          </p>
          <h1 className="text-xl font-bold text-gray-900 mt-0.5">
            Daftar Calon Tamu
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Filter className="w-4 h-4" />
          <span className="font-medium text-toyota-red">{totalCount} Tamu</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nama atau no WhatsApp..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all shadow-xs"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`h-9 px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 active:bg-gray-100"
            }`}
          >
            {tab.key !== "semua" && (
              <span
                className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                  tab.key === "disetujui" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
            )}
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Guest Cards List */}
      <div className="space-y-3">
        {guests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200 p-6 space-y-2">
            <p className="text-sm font-bold text-gray-800">Tidak ada tamu ditemukan</p>
            <p className="text-xs text-gray-500">
              Coba sesuaikan kata kunci pencarian atau ganti filter status di atas.
            </p>
          </div>
        ) : (
          guests.map((guest, idx) => (
            <GuestCard
              key={idx}
              name={guest.name}
              phone={guest.phone}
              status={guest.status}
            />
          ))
        )}
      </div>

      {/* Quick Add CTA */}
      <div className="pt-2">
        <Link
          href="/sales/guests/add"
          className="flex items-center justify-center gap-2 w-full h-12 bg-toyota-red text-white font-semibold rounded-lg shadow-sm hover:bg-toyota-dark active:scale-[0.98] transition-all text-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Tambah Calon Tamu Baru</span>
        </Link>
      </div>
    </div>
  );
}
