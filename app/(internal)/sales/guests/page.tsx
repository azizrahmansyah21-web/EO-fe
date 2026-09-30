"use client";

import { useState } from "react";
import { Search, UserPlus, Zap, Filter } from "lucide-react";
import Link from "next/link";
import { GuestCard } from "@/components/ui/guest-card";

type FilterTab = "semua" | "disetujui" | "menunggu";

const mockGuests = [
  {
    name: "Hendra Wijaya",
    phone: "0812-3456-7890",
    status: "disetujui" as const,
  },
  {
    name: "Siska Amelia",
    phone: "0811-2345-8899",
    status: "disetujui" as const,
  },
  {
    name: "Bambang Sutrisno",
    phone: "0852-1122-6780",
    status: "menunggu" as const,
  },
  {
    name: "Dr. Irwan Siregar",
    phone: "0812-6677-8899",
    status: "disetujui" as const,
  },
  {
    name: "Dewi Kartika",
    phone: "0821-4477-9011",
    status: "menunggu" as const,
  },
];

const tabs: { key: FilterTab; label: string; count: number }[] = [
  { key: "semua", label: "Semua", count: 34 },
  { key: "disetujui", label: "Disetujui", count: 26 },
  { key: "menunggu", label: "Menunggu", count: 8 },
];

export default function SalesGuestsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuests = mockGuests.filter((g) => {
    if (activeTab !== "semua" && g.status !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return g.name.toLowerCase().includes(q) || g.phone.includes(q);
    }
    return true;
  });

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
          <span className="font-medium text-toyota-red">34 Tamu</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nama atau no WhatsApp..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`h-9 px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 active:bg-gray-100"
            }`}
          >
            {tab.key !== "semua" && (
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                  tab.key === "disetujui" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
            )}
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Sync Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Menampilkan {filteredGuests.length} calon tamu terpilih</span>
        <span className="flex items-center gap-1 text-emerald-600 font-medium">
          <Zap className="w-3 h-3" />
          Sync Aktif
        </span>
      </div>

      {/* Guest List */}
      <div className="space-y-2">
        {filteredGuests.length > 0 ? (
          filteredGuests.map((guest, i) => (
            <GuestCard key={i} {...guest} />
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-500">Tidak ada tamu ditemukan untuk filter ini.</p>
            <p className="text-xs text-gray-400 mt-1">Coba ubah kata kunci atau tab filter Anda.</p>
          </div>
        )}
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-20 md:bottom-8 left-0 right-0 px-4 max-w-screen-md mx-auto z-30">
        <Link
          href="/sales/guests/add"
          className="flex items-center justify-center gap-2 w-full h-12 bg-toyota-red text-white font-semibold rounded-lg shadow-lg active:scale-[0.98] transition-transform"
        >
          <UserPlus className="w-5 h-5" />
          + Tambah Tamu
        </Link>
      </div>
    </div>
  );
}
