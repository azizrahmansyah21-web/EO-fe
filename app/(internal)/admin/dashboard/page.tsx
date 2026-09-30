"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  Gift,
  Coffee,
  Scan,
  Circle,
} from "lucide-react";

const MOCK_RECENT_CHECKINS = [
  { name: "Bambang Soeharto", wa: "+62 812-4421-9901", time: "13:42:10", status: "diterima", tag: "VIP", sales: "Hendra" },
  { name: "Dr. Nadia Maharani", wa: "+62 812-8802-3114", time: "13:39:48", status: "diterima", tag: "Customer Loyal", sales: "Rina" },
  { name: "Irwan Setiawan, S.T.", wa: "+62 812-7019-8832", time: "13:35:12", status: "diterima", tag: "Fleet Prospect", sales: "Dimas" },
  { name: "Siti Fatimah", wa: "+62 812-9930-4100", time: "13:31:05", status: "tertunda", tag: "Regular", sales: "Agus W." },
  { name: "H. Muhammad Fachri", wa: "+62 812-1049-7622", time: "13:28:40", status: "diterima", tag: "VVIP", sales: "Linda" },
];

const FUNNEL = [
  { label: "Target Tamu Undangan", value: 300, pct: 100, color: "bg-gray-800" },
  { label: "Calon Terdaftar dari Sales", value: 286, pct: 95.3, color: "bg-gray-700" },
  { label: "Disetujui Admin Operasional", value: 250, pct: 83.3, color: "bg-gray-600" },
  { label: "WhatsApp Blast Terkirim (E-Invitation)", value: 250, pct: 100, color: "bg-gray-500" },
  { label: "RSVP Konfirmasi Hadir", value: 222, pct: 88.8, color: "bg-blue-600" },
  { label: "Hadir Check-in Gate (Realisasi Aktual)", value: 184, pct: 61.3, color: "bg-toyota-red", highlight: true },
];

const ACTIVE_ADMINS = [
  { initials: "AP", name: "Arya Pratama", role: "Lead Gate Admin" },
  { initials: "LK", name: "Linda Kusuma", role: "Desk Registration" },
];

const ACTIVE_SALES = [
  { name: "Hendra", count: 34 },
  { name: "Rina S.", count: 31 },
  { name: "Dimas W.", count: 28 },
  { name: "Agus W.", count: 24 },
  { name: "Fajar N.", count: 22 },
];

export default function DashboardPage() {
  const [lastSync] = useState("2 detik lalu");

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Breadcrumb + Title */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Command Center Live Node &bull; Sutomo Hub Pekanbaru
          </p>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Utama</h1>
            <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Operasional
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 bg-red-50 border border-red-200 text-toyota-red font-semibold px-3 py-1.5 rounded-lg">
            Status Event: Hari-H Berlangsung
          </span>
          <Link
            href="/admin/events"
            className="h-10 bg-toyota-red text-white px-4 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            + Buat Event Baru
          </Link>
        </div>
      </div>

      {/* Hero Event Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left: Event Info */}
          <div className="flex-1 border-l-4 border-toyota-red pl-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-200 rounded px-2 py-0.5">Customer Gathering / SPK Expo</span>
              <span className="text-[10px] text-gray-400">&bull; Gate Monitoring: Pintu Utama Ballroom</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Toyota Customer Gathering &amp; Weekend Expo 2025
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Grand Mercure Ballroom, Pekanbaru
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Waktu Pelaksanaan", value: "24 Nov 2025", sub: "09:00 - 17:00 WIB" },
                { label: "Durasi Sesi", value: "8 Jam Kerja", sub: "Sisa 3 Jam 45 Mnt", subColor: "text-amber-600" },
                { label: "PIC Lapangan", value: "Arya Pratama", sub: "Event Ops Lead" },
                { label: "Closing SPK Target", value: "45 Unit Deal", sub: "29 SPK Terkunci", subColor: "text-toyota-red" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  <p className={`text-xs mt-0.5 ${item.subColor ?? "text-gray-500"}`}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Capacity gauge */}
          <div className="lg:w-52 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-3 text-center">Kepadatan Ballroom Saat Ini</p>
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9155" fill="none"
                  stroke="#EB0A1E" strokeWidth="3"
                  strokeDasharray={`${61.3} ${100 - 61.3}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-gray-900">61.3%</span>
                <span className="text-[9px] text-gray-500 text-center leading-tight">184 / 300 TAMU</span>
              </div>
            </div>
            <span className="mt-2 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5">Kapasitas Aman</span>
            <div className="mt-3 text-center">
              <p className="text-[10px] text-gray-500">Fast Check-in Gate Status:</p>
              <p className="text-xs font-bold text-gray-900 mt-0.5">2 Scanner Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Target Tamu Undangan",
            icon: <Users className="w-4 h-4" />,
            main: "300",
            mainSub: "Tamu Terdaftar",
            detail1: "Target KPI Event: 45 SPK Unit Deal",
            detail2: "Database Sales: 286 Tamu Terverifikasi (95.3%)",
          },
          {
            label: "Realisasi Kehadiran Live",
            icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
            main: "184",
            mainSub: "61.3% Hadir",
            detail1: "38 Tidak Hadir",
            detail2: "78 Belum Check-in",
            accent: true,
          },
          {
            label: "Alokasi Logistik Terkunci",
            icon: <Package className="w-4 h-4" />,
            main: null,
            mainSub: null,
            logistic: true,
          },
          {
            label: "Estimasi Biaya Event",
            icon: <TrendingUp className="w-4 h-4" />,
            main: "Rp 42.150.000",
            mainSub: null,
            detail1: "Total Anggaran: Rp 48.500.000",
            detail2: "Efisien 13.1% · Sisa: Rp 6.350.000",
            budget: true,
          },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold leading-tight">{card.label}</p>
              <div className="text-gray-400">{card.icon}</div>
            </div>
            {card.logistic ? (
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-gray-500">Souvenir (250 Locked)</p>
                  <div className="flex items-center justify-between text-xs mt-0.5">
                    <span className="text-gray-700 font-medium">184 / 250 Digunakan</span>
                    <span className="text-gray-400">Sisa: 66</span>
                  </div>
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-toyota-red rounded-full" style={{ width: "73.6%" }} />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Snack Box (300 Locked)</p>
                  <div className="flex items-center justify-between text-xs mt-0.5">
                    <span className="text-gray-700 font-medium">184 / 300 Dibagikan</span>
                    <span className="text-gray-400">Sisa: 116</span>
                  </div>
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "61.3%" }} />
                  </div>
                </div>
              </div>
            ) : card.budget ? (
              <div>
                <p className="text-2xl font-black text-gray-900 leading-none">{card.main}</p>
                <p className="text-[10px] text-gray-400 mt-1">{card.detail1}</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">{card.detail2}</p>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-gray-900">{card.main}</span>
                  {card.accent && <span className="text-sm font-semibold text-toyota-red">{card.mainSub}</span>}
                  {!card.accent && card.mainSub && <span className="text-xs text-gray-500">{card.mainSub}</span>}
                </div>
                {card.accent && (
                  <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-toyota-red rounded-full" style={{ width: "61.3%" }} />
                  </div>
                )}
                <p className="text-[10px] text-gray-400 mt-1">{card.detail1}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{card.detail2}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom 2-col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Live Event Funnel */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Live Event Funnel &amp; Guest Flow</h3>
              <p className="text-xs text-gray-400 mt-0.5">Konversi tahapan tamu dari alokasi sales hingga gate scanner</p>
            </div>
          </div>
          <div className="space-y-3">
            {FUNNEL.map((step, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-xs font-medium ${step.highlight ? "text-toyota-red font-semibold" : "text-gray-600"}`}>
                    {i + 1}. {step.label}
                  </p>
                  <span className={`text-xs font-bold ${step.highlight ? "text-toyota-red" : "text-gray-600"}`}>
                    {step.value} Tamu ({step.pct}%)
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${step.color}`}
                    style={{ width: `${(step.value / 300) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right col: Recent Check-ins + Team */}
        <div className="space-y-4">
          {/* Recent Check-ins */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900">5 Tamu Terakhir Check-in Gate</h3>
                <p className="text-xs text-gray-400">Log kedatangan optical scanner gate Ballroom</p>
              </div>
              <Link href="/admin/guests" className="text-xs font-semibold text-toyota-red hover:underline flex items-center gap-0.5">
                Lihat Semua <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {MOCK_RECENT_CHECKINS.map((g, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {g.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{g.name}</p>
                    <p className="text-[10px] text-gray-400">{g.tag} &bull; Sales: {g.sales}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-gray-500">{g.time} WIB</p>
                    <span className={`text-[10px] font-semibold ${g.status === "diterima" ? "text-emerald-600" : "text-amber-600"}`}>
                      {g.status === "diterima" ? "Diterima" : "Tertunda"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Active */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">Status Akun &amp; Tim Aktif</h3>
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                14 Online
              </span>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Event Administrator (2 Personel)</p>
            <div className="flex gap-2 mb-4">
              {ACTIVE_ADMINS.map((a) => (
                <div key={a.initials} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 flex-1">
                  <div className="w-7 h-7 rounded-lg bg-toyota-red text-white text-[10px] font-bold flex items-center justify-center shrink-0">{a.initials}</div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-900">{a.name}</p>
                    <p className="text-[9px] text-gray-400">{a.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Sales Consultant Aktif Input (12 Sales)</p>
            <div className="flex flex-wrap gap-1.5">
              {ACTIVE_SALES.map((s) => (
                <span key={s.name} className="text-[10px] bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1" />
                  {s.name} ({s.count} Tamu)
                </span>
              ))}
              <span className="text-[10px] bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-500">+7 Sales Lainnya</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-[10px] text-gray-400">Pusat data tersinkronisasi {lastSync}</p>
              <button
                type="button"
                className="text-[10px] font-semibold text-toyota-red flex items-center gap-1 hover:underline"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh Sync
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
