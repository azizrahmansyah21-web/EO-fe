"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Download,
} from "lucide-react";

type TabKey = "semua" | "aktif" | "selesai" | "draft";

const MOCK_EVENTS = [
  {
    id: "EVT-2025-11-01",
    name: "Toyota Customer Gathering & Weekend Expo 2025",
    shortId: "EVT-2025-11-01",
    date: "24 Nov 2025, 09:00 WIB",
    duration: "8 Jam (09:00 - 17:00)",
    type: "Customer Gathering",
    location: "Grand Mercure Ballroom, Pekanbaru",
    pic: "Arya Pratama",
    picRole: "Marcom Lead",
    target: 300,
    confirmed: 222,
    attended: 184,
    kpi: "45 SPK",
    status: "aktif",
  },
  {
    id: "EVT-2025-11-02",
    name: "Showroom Weekend Super Deal Sutomo",
    shortId: "EVT-2025-11-02",
    date: "29 Nov 2025, 08:30 WIB",
    duration: "6 Jam (08:30 - 14:30)",
    type: "Showroom Event",
    location: "Agung Toyota Sutomo B",
    pic: "Budi Santoso",
    picRole: "Branch Sales Spv",
    target: 150,
    confirmed: 98,
    attended: 0,
    kpi: "20 SPK",
    status: "aktif",
  },
  {
    id: "EVT-2025-12-03",
    name: "GR Yaris & Hilux Rangga Experiential Expo",
    shortId: "EVT-2025-12-03",
    date: "05 Des 2025, 10:00 WIB",
    duration: "7 Jam (10:00 - 17:00)",
    type: "Test Drive Expo",
    location: "SKA Mall Outdoor Circuit",
    pic: "Rizky Handoko",
    picRole: "Senior Product Trainer",
    target: 200,
    confirmed: 54,
    attended: 0,
    kpi: "30 SPK",
    status: "draft",
  },
  {
    id: "EVT-2025-10-18",
    name: "Corporate Fleet Meet & Commercial Vehicle Roadshow",
    shortId: "EVT-2025-10-18",
    date: "18 Okt 2025, 09:00 WIB",
    duration: "5 Jam (09:00 - 14:00)",
    type: "Corporate Fleet Meet",
    location: "The Premiere Hotel Pekanbaru",
    pic: "Citra Melinda",
    picRole: "Corporate Account Mgr",
    target: 80,
    confirmed: 75,
    attended: 72,
    kpi: "Final",
    status: "selesai",
  },
];

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

export default function EventsPage() {
  const [tab, setTab] = useState<TabKey>("semua");
  const [search, setSearch] = useState("");

  const filtered = MOCK_EVENTS.filter((e) => {
    if (tab !== "semua" && e.status !== tab) return false;
    if (search) {
      const q = search.toLowerCase();
      return e.name.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.pic.toLowerCase().includes(q);
    }
    return true;
  });

  const featured = MOCK_EVENTS[0];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Breadcrumb + Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Portal Operasional &rsaquo; <span className="text-toyota-red font-semibold">Manajemen Event</span>
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Manajemen Event</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola jadwal, target KPI, panitia penyelenggara, serta status penguncian logistik event.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Unduh Rekap
          </button>
          <Link href="/admin/events/create" className="h-10 bg-toyota-red text-white px-4 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Buat Event Baru
          </Link>
        </div>
      </div>

      {/* 4 Summary KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Event Berjalan (Q4)", value: "4", sub: "Node Aktif", icon: <Calendar className="w-4 h-4 text-toyota-red" />, detail: "Target Kumulatif SPK: 160 Unit" },
          { label: "Total Undangan Terkirim", value: "1.240", sub: "Tamu", icon: <Users className="w-4 h-4 text-blue-500" />, detail: "Rasio RSVP Hadir: 81.4% (1.010 Tamu)" },
          { label: "Alokasi Souvenir Terkunci", value: "950", sub: "Paket", icon: <Package className="w-4 h-4 text-purple-500" />, detail: "Integritas Logistik: 100% Locked & Verified" },
          { label: "Capaian SPK Realtime", value: "118", sub: "/ 160 Target", icon: <TrendingUp className="w-4 h-4 text-emerald-500" />, detail: "Pencapaian Wilayah: 73.7% Target Terpenuhi" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold leading-tight">{k.label}</p>
              {k.icon}
            </div>
            <p className="text-2xl font-black text-gray-900">{k.value} <span className="text-sm font-medium text-gray-500">{k.sub}</span></p>
            <p className="text-[10px] text-gray-400 mt-1">{k.detail}</p>
          </div>
        ))}
      </div>

      {/* Featured Live Event */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b border-gray-200">
          <span className="w-2 h-2 rounded-full bg-toyota-red" />
          <span className="text-xs font-bold text-toyota-red uppercase tracking-widest">Live Operasional Hari Ini</span>
          <span className="text-xs text-gray-400 ml-2">Event ID: AG-EVT-20251124-01</span>
          <div className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium">
            <CheckCircle className="w-3 h-3" />
            Logistik Gate Terkunci &amp; QR Token Sync Aktif
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Event details */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] border border-gray-200 rounded px-2 py-0.5 text-gray-500">Customer Gathering</span>
                <span className="text-[10px] border border-blue-200 bg-blue-50 text-blue-600 rounded px-2 py-0.5">Weekend Expo</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{featured.name}</h2>
              <p className="text-sm text-gray-500 mb-4">Peluncuran program akhir tahun, test drive Yaris Cross Hybrid, dan VIP Gala Dinner.</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Waktu Mulai</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">24 Nov 2025, 09:00 WIB</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Durasi</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">8 Jam (09:00 - 17:00)</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Lokasi &amp; PIC</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">Grand Mercure Ballroom, Pekanbaru</p>
                  <p className="text-xs text-gray-500">PIC: Arya Pratama - Marcom Lead (Ext. 402)</p>
                </div>
              </div>
            </div>

            {/* Realtime presence */}
            <div className="lg:w-64 bg-gray-50 rounded-lg border border-gray-100 p-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Realtime Guest Presence</p>
              <p className="text-lg font-bold text-gray-900">222 dari 300 Tamu Terdaftar <span className="text-toyota-red">74.0%</span></p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-toyota-red rounded-full" style={{ width: "74%" }} />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  { label: "Hadir di Venue", value: 184, sub: "Checked-in QR", color: "text-emerald-600" },
                  { label: "Tidak Hadir / Batal", value: 38, sub: "Konfirmasi Cancel", color: "text-gray-500" },
                  { label: "Menunggu Kedatangan", value: 78, sub: "Pending Check-in", color: "text-amber-600" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-[9px] text-gray-500 leading-tight">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI sidebar */}
            <div className="lg:w-48 space-y-3">
              <div className="bg-gray-50 rounded-lg border border-gray-100 p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Target KPI Sales Venue</p>
                <p className="text-2xl font-black text-gray-900 mt-1">39 <span className="text-xs font-medium text-gray-500">/ 45 Surat Pemesanan</span></p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">86.6% target tercapai per 14:30 WIB</p>
              </div>
              <div className="bg-gray-50 rounded-lg border border-gray-100 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-gray-500">Souvenir Terkunci</p>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-1.5 font-semibold">Terkunci</span>
                </div>
                <p className="text-xs font-semibold text-gray-700">250 Paket Exec. Tumbler</p>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-gray-500">Snack &amp; F&B Terkunci</p>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-1.5 font-semibold">Terkunci</span>
                </div>
                <p className="text-xs font-semibold text-gray-700">300 Box Pastry &amp; Mineral</p>
              </div>
              <Link href={`/admin/events/${featured.id}`} className="w-full h-10 bg-gray-900 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                Kelola Event
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filter + Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {(["semua", "aktif", "selesai", "draft"] as TabKey[]).map((t) => {
              const counts: Record<string, number> = {
                semua: MOCK_EVENTS.length,
                aktif: MOCK_EVENTS.filter(e => e.status === "aktif").length,
                selesai: MOCK_EVENTS.filter(e => e.status === "selesai").length,
                draft: MOCK_EVENTS.filter(e => e.status === "draft").length,
              };
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`h-9 px-3 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)} {counts[t]}
                </button>
              );
            })}
          </div>
          <div className="relative flex-1 max-w-xs ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama event, lokasi, PIC..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                <th className="px-5 py-3">Nama Event</th>
                <th className="px-5 py-3">Waktu &amp; Durasi</th>
                <th className="px-5 py-3">Jenis</th>
                <th className="px-5 py-3">Lokasi</th>
                <th className="px-5 py-3">Panitia PIC</th>
                <th className="px-5 py-3">Target KPI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length > 0 ? filtered.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-2">
                      <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${event.status === "aktif" ? "bg-emerald-500" : event.status === "draft" ? "bg-amber-400" : "bg-gray-300"}`} />
                      <div>
                        <Link href={`/admin/events/${event.id}`} className="text-sm font-semibold text-gray-900 hover:text-toyota-red transition-colors leading-snug block">
                          {event.name}
                        </Link>
                        <p className="text-[10px] text-gray-400 mt-0.5">{event.shortId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-medium text-gray-700">{event.date}</p>
                    <p className="text-[10px] text-gray-400">Durasi: {event.duration}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[10px] border border-gray-200 rounded px-2 py-0.5 text-gray-600">{event.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-1">
                      <MapPin className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600">{event.location}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-medium text-gray-900">{event.pic}</p>
                    <p className="text-[10px] text-gray-400">{event.picRole}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-semibold text-gray-900">{event.target} Tamu</p>
                    <p className={`text-[10px] font-semibold ${event.status === "aktif" ? "text-toyota-red" : "text-gray-400"}`}>
                      {event.kpi} {event.status === "aktif" ? "Target" : event.status === "selesai" ? "Final" : "Target"}
                    </p>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <p className="text-sm text-gray-500">Tidak ada event ditemukan.</p>
                    <p className="text-xs text-gray-400 mt-1">Coba ubah filter atau kata kunci pencarian.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">Menampilkan {filtered.length} dari {MOCK_EVENTS.length} Master Event Agung Toyota</p>
          <div className="flex items-center gap-1">
            <button type="button" disabled className="h-8 px-3 rounded border border-gray-200 text-xs text-gray-400 disabled:cursor-not-allowed">Sebelumnya</button>
            <button type="button" className="h-8 w-8 rounded bg-toyota-red text-white text-xs font-bold">1</button>
            <button type="button" className="h-8 px-3 rounded border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">Berikutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
}
