"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle,
  Clock,
  Package,
  ChevronRight,
  Gift,
  Coffee,
  Scan,
} from "lucide-react";

export interface DashboardCheckinItem {
  name: string;
  wa: string;
  time: string;
  status: string;
  tag: string;
  sales: string;
}

export interface DashboardFunnelItem {
  label: string;
  value: number;
  pct: number;
  color: string;
  highlight?: boolean;
}

export interface DashboardActiveAdmin {
  initials: string;
  name: string;
  role: string;
}

export interface DashboardActiveSale {
  name: string;
  count: number;
}

interface AdminDashboardTemplateProps {
  lastSync: string;
  recentCheckins: DashboardCheckinItem[];
  funnelData: DashboardFunnelItem[];
  activeAdmins: DashboardActiveAdmin[];
  activeSales: DashboardActiveSale[];
}

/**
 * AdminDashboardTemplate: Atomic Design template for the Admin Command Center dashboard.
 */
export function AdminDashboardTemplate({
  lastSync,
  recentCheckins,
  funnelData,
  activeAdmins,
  activeSales,
}: AdminDashboardTemplateProps) {
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
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Operasional
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 bg-red-50 border border-red-200 text-toyota-red font-semibold px-3 py-1.5 rounded-lg">
            Status: Hari-H Berlangsung
          </span>
          <Link
            href="/admin/events"
            className="h-10 bg-toyota-red text-white px-4 rounded-lg font-semibold text-sm hover:bg-toyota-dark transition-colors flex items-center gap-2 shadow-sm"
          >
            + Buat Event Baru
          </Link>
        </div>
      </div>

      {/* Hero Event Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left: Event Info */}
          <div className="flex-1 border-l-4 border-toyota-red pl-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-200 rounded px-2 py-0.5">
                Customer Gathering / SPK Expo
              </span>
              <span className="text-[10px] text-gray-400">
                &bull; Gate Monitoring: Pintu Utama Ballroom
              </span>
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
                { label: "Target Tamu", value: "300 Undangan", sub: "100% Slot Terisi", subColor: "text-emerald-600" },
                { label: "Realisasi Kehadiran", value: "184 Tamu", sub: "61.3% dari Target", subColor: "text-toyota-red font-bold" },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-[11px] text-gray-400 font-medium">{item.label}</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{item.value}</p>
                  <p className={`text-xs mt-0.5 ${item.subColor || "text-gray-500"}`}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quick Action CTAs */}
          <div className="lg:w-64 flex flex-col gap-2.5 justify-center border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-5 shrink-0">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Aksi Cepat Meja Operasi</p>
            <Link
              href="/scanner"
              className="flex items-center justify-between p-3 bg-toyota-red text-white rounded-lg hover:bg-toyota-dark transition-colors font-semibold text-xs shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Scan className="w-4 h-4" />
                <span>Buka Scanner Gate</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin/guests/wa-template"
              className="flex items-center justify-between p-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">WA</span>
                <span>Broadcast Undangan</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              href="/admin/logistics"
              className="flex items-center justify-between p-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs"
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-600" />
                <span>Logistik Meja (Souvenir/Snack)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Real-time Logistic & Registry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Kehadiran Tamu (Gate)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">184</span>
            <span className="text-sm font-medium text-gray-400">/ 300 Tamu</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-3 overflow-hidden">
            <div className="bg-toyota-red h-full rounded-full transition-all duration-500" style={{ width: "61.3%" }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>61.3% Terealisasi</span>
            <span className="text-emerald-600 font-semibold">+12 tamu / 15 mnt</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Souvenir Diserahkan (Pos 2)</span>
            <Gift className="w-4 h-4 text-toyota-red" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">184</span>
            <span className="text-sm font-medium text-gray-400">/ 250 Pcs</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-3 overflow-hidden">
            <div className="bg-gray-800 h-full rounded-full transition-all duration-500" style={{ width: "73.6%" }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Sisa Stok: 66 Pcs</span>
            <span className="text-amber-600 font-medium">Stok Aman</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Snack Box Diserahkan (Pos 3)</span>
            <Coffee className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">184</span>
            <span className="text-sm font-medium text-gray-400">/ 300 Box</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-3 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: "61.3%" }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Sisa Fresh: 116 Box</span>
            <span className="text-emerald-600 font-semibold">Terkendali</span>
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Funnel vs Checkins */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Event Funnel (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-gray-200 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Funnel Alur Registrasi &amp; Realisasi Tamu</span>
            <span className="text-xs font-normal text-gray-400">Sinkronisasi: {lastSync}</span>
          </h3>
          <div className="space-y-4">
            {funnelData.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className={item.highlight ? "text-toyota-red font-bold" : "text-gray-700"}>
                    {idx + 1}. {item.label}
                  </span>
                  <span className={item.highlight ? "text-toyota-red font-bold" : "text-gray-900"}>
                    {item.value} ({item.pct}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Check-in Feed (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-gray-200 p-5 shadow-xs flex flex-col">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Tamu Masuk Terkini</span>
            <span className="text-[11px] font-semibold text-toyota-red">Pos 1 Gate</span>
          </h3>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {recentCheckins.map((chk, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{chk.name}</p>
                  <p className="text-[11px] text-gray-400">Sales: {chk.sales} &bull; {chk.time}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                  {chk.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Active Admins on duty */}
          <div className="pt-4 mt-4 border-t border-gray-100">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Petugas Gate Aktif</p>
            <div className="flex gap-2">
              {activeAdmins.map((adm, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-100 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center text-[10px] font-bold">
                    {adm.initials}
                  </span>
                  <span>{adm.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Sales Leaderboard */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          Performa Input Tamu Sales Consultant
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {activeSales.map((s, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center">
              <p className="text-xs font-bold text-gray-900">{s.name}</p>
              <p className="text-lg font-black text-toyota-red mt-1">{s.count}</p>
              <p className="text-[10px] text-gray-400">Tamu Terdaftar</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
