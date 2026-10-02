"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  UserPlus,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type AdminGuestFilterTab = "semua" | "menunggu" | "disetujui" | "hadir" | "tidak_hadir";

export interface AdminGuestRecord {
  no: number;
  initials: string;
  name: string;
  wa: string;
  sales: string;
  branch: string;
  approval: string;
  statusWa: string;
}

interface AdminGuestsTemplateProps {
  guests: AdminGuestRecord[];
  totalEntries: number;
  tab: AdminGuestFilterTab;
  onTabChange: (t: AdminGuestFilterTab) => void;
  search: string;
  onSearchChange: (q: string) => void;
  selected: number[];
  onToggleSelect: (no: number) => void;
  onToggleAll: () => void;
}

const APPROVAL_CONFIG: Record<string, { label: string; cls: string }> = {
  disetujui: { label: "Disetujui", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  menunggu: { label: "Menunggu Approval", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  hadir: { label: "Hadir Check-in", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  tidak_hadir: { label: "Tidak Hadir", cls: "bg-gray-100 text-gray-600 border-gray-200" },
};

const WA_CONFIG: Record<string, { label: string; cls: string }> = {
  terbaca: { label: "Terbaca", cls: "text-emerald-600" },
  terkirim: { label: "Terkirim", cls: "text-blue-600" },
  belum: { label: "Belum Terkirim", cls: "text-gray-400" },
  gagal: { label: "Gagal (Invalid No)", cls: "text-toyota-red" },
};

/**
 * AdminGuestsTemplate: Atomic Design template for Admin Guest Registry and WhatsApp Status.
 */
export function AdminGuestsTemplate({
  guests,
  totalEntries,
  tab,
  onTabChange,
  search,
  onSearchChange,
  selected,
  onToggleSelect,
  onToggleAll,
}: AdminGuestsTemplateProps) {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Breadcrumb + Title */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Operasional Event &rsaquo; <span className="text-toyota-red font-semibold">Toyota Customer Gathering 2025</span>
          </p>
          <div className="flex items-center gap-3 mt-0.5">
            <h1 className="text-2xl font-bold text-gray-900">Pusat Undangan &amp; Tamu</h1>
            <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1 font-medium">
              Node: Sutomo Central
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/admin/guests/wa-template"
            className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WA Template &amp; Desain Undangan</span>
          </Link>
          <Link
            href="/admin/guests"
            className="h-10 bg-toyota-red text-white px-4 rounded-lg text-sm font-semibold hover:bg-toyota-dark transition-colors flex items-center gap-2 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Kelola Tamu &amp; Kurasi Sales</span>
            <span className="bg-red-700 text-white text-[10px] font-bold rounded px-1.5 py-0.5">36</span>
          </Link>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Entri Tamu", value: `${totalEntries}`, sub: "100% Kuota", subColor: "text-gray-500" },
          { label: "Menunggu Review", value: "36", sub: "Prioritas", subColor: "text-amber-600" },
          { label: "Disetujui Admin", value: "250", sub: "87.4%", subColor: "text-gray-500" },
          { label: "Check-in Real-time", value: "184", sub: "Gate Open", subColor: "text-blue-600" },
          { label: "Tolak / Batal", value: "38", sub: "Slot Reallocated", subColor: "text-gray-500" },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3.5 shadow-xs">
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
            <p className={`text-xs mt-0.5 font-medium ${kpi.subColor}`}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-xs overflow-hidden">
        {/* Table Filter Tabs + Search */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {(
              [
                { id: "semua", label: "Semua Tamu", count: totalEntries },
                { id: "menunggu", label: "Menunggu Review", count: 36 },
                { id: "disetujui", label: "Disetujui", count: 250 },
                { id: "hadir", label: "Hadir Gate", count: 184 },
                { id: "tidak_hadir", label: "Tidak Hadir", count: 38 },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onTabChange(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  tab === t.id
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
              placeholder="Cari nama, WhatsApp, atau sales..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-9 pr-3 text-xs border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-toyota-red outline-none transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-semibold">
              <tr>
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selected.length === guests.length && guests.length > 0}
                    onChange={onToggleAll}
                    className="rounded border-gray-300 text-toyota-red focus:ring-toyota-red"
                  />
                </th>
                <th className="p-3">Nama Tamu &amp; Undangan</th>
                <th className="p-3">No. WhatsApp</th>
                <th className="p-3">Sales PIC &amp; Cabang</th>
                <th className="p-3">Status Verifikasi</th>
                <th className="p-3">Status WhatsApp</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {guests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    Tidak ada data tamu ditemukan.
                  </td>
                </tr>
              ) : (
                guests.map((g) => {
                  const appConf = APPROVAL_CONFIG[g.approval] || { label: g.approval, cls: "bg-gray-100 text-gray-700 border-gray-200" };
                  const waConf = WA_CONFIG[g.statusWa] || { label: g.statusWa, cls: "text-gray-400" };

                  return (
                    <tr key={g.no} className="hover:bg-gray-50/70 transition-colors">
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selected.includes(g.no)}
                          onChange={() => onToggleSelect(g.no)}
                          className="rounded border-gray-300 text-toyota-red focus:ring-toyota-red"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 font-bold text-gray-700 flex items-center justify-center text-xs shrink-0">
                            {g.initials}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{g.name}</p>
                            <p className="text-[11px] text-gray-400">Token ID: TKN-AGUNG-{g.no}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-medium text-gray-800">{g.wa}</td>
                      <td className="p-3">
                        <p className="font-semibold text-gray-900">{g.sales}</p>
                        <p className="text-[11px] text-gray-400">{g.branch}</p>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-semibold border ${appConf.cls}`}>
                          {appConf.label}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`font-semibold text-xs ${waConf.cls}`}>
                          ● {waConf.label}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <p>Menampilkan <strong>{guests.length}</strong> dari <strong>{totalEntries}</strong> data tamu</p>
          <div className="flex items-center gap-1">
            <button type="button" className="p-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" className="p-1 rounded border border-gray-200 hover:bg-gray-100">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
