"use client";

import { useState } from "react";
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
import Link from "next/link";

type FilterTab = "semua" | "menunggu" | "disetujui" | "hadir" | "tidak_hadir";

const MOCK_GUESTS = [
  { no: 1, initials: "HW", name: "Hendra Wijaya, S.E.", wa: "+62 812-7561-9011", sales: "Doni Saputra", branch: "Cabang Sutomo", approval: "disetujui", statusWa: "terbaca" },
  { no: 2, initials: "MA", name: "dr. M. Arifin Syah", wa: "+62 813-6420-8821", sales: "Rian Hidayat", branch: "Cabang Sutomo", approval: "menunggu", statusWa: "belum" },
  { no: 3, initials: "SR", name: "Siti Rahmah Putri", wa: "+62 821-9984-3320", sales: "Maya Lestari", branch: "Cabang Arengka", approval: "disetujui", statusWa: "terkirim" },
  { no: 4, initials: "BL", name: "Bambang Lesmana", wa: "+62 811-7765-100", sales: "Doni Saputra", branch: "Cabang Sutomo", approval: "disetujui", statusWa: "gagal" },
  { no: 5, initials: "RH", name: "Rizal Hakim, S.T.", wa: "+62 852-9911-2244", sales: "Rina Anggraini", branch: "Cabang Arengka", approval: "menunggu", statusWa: "belum" },
  { no: 6, initials: "DF", name: "Dewi Fortuna, M.Ak.", wa: "+62 812-3344-5566", sales: "Dimas W.", branch: "Cabang SM Amin", approval: "disetujui", statusWa: "terbaca" },
  { no: 7, initials: "IP", name: "Ir. Putra Widodo", wa: "+62 811-2233-4455", sales: "Agus W.", branch: "Cabang Sutomo", approval: "hadir", statusWa: "terkirim" },
  { no: 8, initials: "NN", name: "Nurul Nisa, S.Pd.", wa: "+62 821-8877-6655", sales: "Fajar N.", branch: "Cabang SM Amin", approval: "tidak_hadir", statusWa: "gagal" },
];

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

export default function GuestsPage() {
  const [tab, setTab] = useState<FilterTab>("semua");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = MOCK_GUESTS.filter((g) => {
    if (tab !== "semua" && g.approval !== tab) return false;
    if (search) {
      const q = search.toLowerCase();
      return g.name.toLowerCase().includes(q) || g.wa.includes(q) || g.sales.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleSelect = (no: number) => {
    setSelected((prev) => prev.includes(no) ? prev.filter((n) => n !== no) : [...prev, no]);
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map((g) => g.no));
  };

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
            <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1 font-medium">Node: Sutomo Central</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/admin/guests/wa-template" className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            WA Template &amp; Desain Undangan
          </Link>
          <Link href="/admin/guests/manage" className="h-10 bg-toyota-red text-white px-4 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Kelola Tamu &amp; Kurasi Sales
            <span className="bg-red-600 text-white text-[10px] font-bold rounded px-1.5 py-0.5">36</span>
          </Link>
        </div>
      </div>

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Entri Tamu", value: "286", sub: "100% Kuota", subColor: "text-gray-500" },
          { label: "Menunggu Review", value: "36", sub: "Prioritas", subColor: "text-amber-600", badge: true },
          { label: "Disetujui Admin", value: "250", sub: "87.4%", subColor: "text-gray-500" },
          { label: "Check-in Real-time", value: "184", sub: "Gate Open", subColor: "text-blue-600" },
          { label: "Tolak / Batal", value: "38", sub: "Slot Reallocated", subColor: "text-gray-500" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2 leading-tight">{k.label}</p>
            <p className="text-2xl font-black text-gray-900">{k.value}</p>
            {k.badge ? (
              <span className="inline-block mt-1 text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded px-1.5 py-0.5 font-semibold">{k.sub}</span>
            ) : (
              <p className={`text-xs mt-1 font-semibold ${k.subColor}`}>{k.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Filter + Bulk actions */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Tab bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            {([
              { key: "semua", label: "Semua Tamu (286)" },
              { key: "menunggu", label: "Menunggu Approval (36)" },
              { key: "disetujui", label: "Disetujui (250)" },
              { key: "hadir", label: "Hadir Check-in (184)" },
              { key: "tidak_hadir", label: "Tidak Hadir (38)" },
            ] as { key: FilterTab; label: string }[]).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`h-9 px-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${tab === t.key ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, no WA, atau sales..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 h-9 pl-9 pr-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Bulk action bar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.length === filtered.length && filtered.length > 0}
              onChange={toggleAll}
              className="w-4 h-4 accent-toyota-red"
              id="select-all"
            />
            <label htmlFor="select-all" className="text-sm text-gray-600 font-medium">
              {selected.length > 0 ? `${selected.length} Data Tamu Terpilih` : "0 Data Tamu Terpilih"}
            </label>
          </div>
          <span className="text-xs text-gray-400">Skema Ketat: Hanya [Nama] dan [Whatsapp]</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              disabled={selected.length === 0}
              className="h-8 px-3 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Setujui Terpilih
            </button>
            <button
              type="button"
              disabled={selected.length === 0}
              className="h-8 px-3 rounded-lg text-xs font-semibold bg-red-50 text-toyota-red border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <XCircle className="w-3.5 h-3.5" />
              Tolak Terpilih
            </button>
            <button
              type="button"
              disabled={selected.length === 0}
              className="h-8 px-3 rounded-lg text-xs font-semibold bg-toyota-red text-white hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Trigger WhatsApp Blast
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                <th className="pl-5 pr-3 py-3 w-10">#</th>
                <th className="px-3 py-3">Nama Calon Tamu</th>
                <th className="px-3 py-3">WhatsApp</th>
                <th className="px-3 py-3">Sales Penginput</th>
                <th className="px-3 py-3">Approval Status</th>
                <th className="px-3 py-3">Status WA</th>
                <th className="px-3 py-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length > 0 ? filtered.map((g) => (
                <tr key={g.no} className={`hover:bg-gray-50 transition-colors ${selected.includes(g.no) ? "bg-red-50" : ""}`}>
                  <td className="pl-5 pr-3 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.includes(g.no)}
                      onChange={() => toggleSelect(g.no)}
                      className="w-4 h-4 accent-toyota-red"
                    />
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center shrink-0">
                        {g.initials}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{g.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-sm text-blue-600 font-medium">{g.wa}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <p className="text-sm font-medium text-gray-900">{g.sales}</p>
                    <p className="text-[10px] text-gray-400">{g.branch}</p>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className={`text-[10px] font-semibold border rounded px-2 py-0.5 ${APPROVAL_CONFIG[g.approval]?.cls}`}>
                      {APPROVAL_CONFIG[g.approval]?.label}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className={`text-xs font-medium ${WA_CONFIG[g.statusWa]?.cls}`}>
                      {WA_CONFIG[g.statusWa]?.label}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <button type="button" className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors" aria-label="Menu lainnya">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <p className="text-sm text-gray-500">Tidak ada tamu ditemukan untuk filter ini.</p>
                    <p className="text-xs text-gray-400 mt-1">Coba ubah kata kunci atau tab filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">Menampilkan 1-{filtered.length} dari 286 entri tamu</p>
          <div className="flex items-center gap-1">
            <button type="button" disabled className="h-8 w-8 rounded border border-gray-200 flex items-center justify-center text-gray-400 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" className="h-8 w-8 rounded bg-toyota-red text-white text-xs font-bold">1</button>
            <button type="button" className="h-8 w-8 rounded border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">2</button>
            <button type="button" className="h-8 w-8 rounded border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">3</button>
            <span className="text-xs text-gray-400 px-1">...</span>
            <button type="button" className="h-8 w-8 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
