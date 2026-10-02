"use client";

import React from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  TrendingUp,
  Download,
} from "lucide-react";

export type AdminEventsTabKey = "semua" | "aktif" | "selesai" | "draft";

export interface AdminEventItem {
  id: string;
  name: string;
  shortId: string;
  date: string;
  duration: string;
  type: string;
  location: string;
  pic: string;
  picRole: string;
  target: number;
  confirmed: number;
  attended: number;
  kpi: string;
  status: string;
}

interface AdminEventsTemplateProps {
  events: AdminEventItem[];
  activeTab: AdminEventsTabKey;
  onTabChange: (tab: AdminEventsTabKey) => void;
  search: string;
  onSearchChange: (q: string) => void;
  tabCounts: Record<AdminEventsTabKey, number>;
}

const STATUS_EVENT_BADGE: Record<string, string> = {
  aktif: "bg-emerald-50 text-emerald-700 border-emerald-200",
  selesai: "bg-gray-100 text-gray-600 border-gray-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
};

const STATUS_EVENT_LABEL: Record<string, string> = {
  aktif: "Aktif",
  selesai: "Selesai",
  draft: "Draft",
};

/**
 * AdminEventsTemplate: Atomic Design template for the Admin Events List & Management page.
 */
export function AdminEventsTemplate({
  events,
  activeTab,
  onTabChange,
  search,
  onSearchChange,
  tabCounts,
}: AdminEventsTemplateProps) {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Breadcrumb + Title */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Command Center &rsaquo; Manajemen Event
          </p>
          <div className="flex items-center gap-3 mt-0.5">
            <h1 className="text-2xl font-bold text-gray-900">Daftar Agenda Event</h1>
            <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1 font-medium">
              Agung Toyota Sutomo
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => alert("Ekspor rekap data event dimulai...")}
            className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Rekap</span>
          </button>
          <Link
            href="/admin/events/create"
            className="h-10 bg-toyota-red text-white px-4 rounded-lg text-sm font-semibold hover:bg-toyota-dark transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Event Baru</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Event Terdaftar", value: `${tabCounts.semua}`, sub: "Tahun Berjalan 2025" },
          { label: "Event Aktif Berjalan", value: `${tabCounts.aktif}`, sub: "Sedang On-going", subColor: "text-emerald-600 font-bold" },
          { label: "Draft & Penjadwalan", value: `${tabCounts.draft}`, sub: "Menunggu Approval", subColor: "text-amber-600 font-bold" },
          { label: "Event Rampung (Selesai)", value: `${tabCounts.selesai}`, sub: "Arsip Operasional" },
        ].map((s, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3.5 shadow-xs">
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
            <p className={`text-xs mt-0.5 ${s.subColor || "text-gray-400"}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Events List */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-xs overflow-hidden">
        {/* Tabs & Search */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {(
              [
                { id: "semua", label: "Semua", count: tabCounts.semua },
                { id: "aktif", label: "Aktif", count: tabCounts.aktif },
                { id: "draft", label: "Draft", count: tabCounts.draft },
                { id: "selesai", label: "Selesai", count: tabCounts.selesai },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onTabChange(t.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === t.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t.label} ({t.count})
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama event atau lokasi..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-9 pr-3 text-xs border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-toyota-red outline-none transition-all"
            />
          </div>
        </div>

        {/* Event Cards */}
        <div className="divide-y divide-gray-100">
          {events.length === 0 ? (
            <div className="text-center py-12 p-6 text-gray-400 text-sm">
              Tidak ada agenda event ditemukan untuk filter ini.
            </div>
          ) : (
            events.map((evt) => (
              <div
                key={evt.id}
                className="p-5 hover:bg-gray-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                        STATUS_EVENT_BADGE[evt.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {STATUS_EVENT_LABEL[evt.status] || evt.status}
                    </span>
                    <span className="text-xs font-medium text-gray-400">&bull; {evt.shortId}</span>
                    <span className="text-xs font-semibold text-toyota-red bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                      {evt.type}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 leading-snug">
                    {evt.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 pt-0.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {evt.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-toyota-red" />
                      {evt.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      PIC: <strong className="text-gray-700">{evt.pic}</strong> ({evt.picRole})
                    </span>
                  </div>
                </div>

                {/* Metrics + Action */}
                <div className="flex items-center justify-between lg:justify-end gap-6 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0">
                  <div className="flex items-center gap-5 text-right">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-medium">Target / Hadir</p>
                      <p className="text-sm font-bold text-gray-900">
                        {evt.attended > 0 ? evt.attended : evt.confirmed}
                        <span className="text-xs text-gray-400 font-normal"> / {evt.target} Tamu</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-medium">Target SPK</p>
                      <p className="text-sm font-bold text-emerald-600">{evt.kpi}</p>
                    </div>
                  </div>

                  <Link
                    href={`/admin/events/${evt.id}`}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold transition-colors"
                  >
                    <span>Detail Event</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
