"use client";

import React from "react";
import {
  Package,
  AlertCircle,
  Coffee,
  Plus,
} from "lucide-react";

export interface LogisticsSouvenirItem {
  name: string;
  type: string;
  batch: string;
  jumlah: number;
  harga: number;
  used: number;
}

export interface LogisticsSnackItem {
  name: string;
  type: string;
  catering: string;
  jumlah: number;
  harga: number;
  used: number;
}

export interface LogisticsBudgetCategory {
  category: string;
  sub: string;
  value: number;
  status: string;
  statusColor: string;
  note: string;
}

export interface LogisticsDistribution {
  label: string;
  pct: number;
  color: string;
}

interface AdminLogisticsTemplateProps {
  souvenirs: LogisticsSouvenirItem[];
  snacks: LogisticsSnackItem[];
  budgetCategories: LogisticsBudgetCategory[];
  distribution: LogisticsDistribution[];
}

/**
 * AdminLogisticsTemplate: Atomic Design template for Event Logistics, Stock, and Budget tracking.
 */
export function AdminLogisticsTemplate({
  souvenirs,
  snacks,
  budgetCategories,
  distribution,
}: AdminLogisticsTemplateProps) {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Command Center Operasional &rsaquo; <span className="text-toyota-red font-semibold">Audit &amp; Pengadaan</span>
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Biaya &amp; Logistik Event</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-toyota-red border border-red-200 bg-red-50 rounded-lg px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-toyota-red" />
            Gate Lock Active
          </div>
          <button
            type="button"
            className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-xs"
          >
            Kunci Data Terkunci
          </button>
          <button
            type="button"
            onClick={() => alert("Form tambah pengadaan baru terbuka.")}
            className="h-10 bg-toyota-red text-white px-4 rounded-lg text-sm font-semibold hover:bg-toyota-dark transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Item Logistik</span>
          </button>
        </div>
      </div>

      {/* Event selector chip */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 h-10 shadow-xs">
          <span className="text-xs text-gray-400">🚗</span>
          <span className="text-sm font-medium text-gray-700">
            Toyota Customer Gathering &amp; Weekend Expo 2025 - Sutomo
          </span>
        </div>
      </div>

      {/* Read-only warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-bold text-amber-800">Sinkronisasi Check-in Gate Real-time Terproteksi</p>
          <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
            Kunci Logistik (Locked Souvenir &amp; Locked Snack) aktif untuk mencegah perubahan alokasi stok saat gate scanner tamu berjalan live.
          </p>
        </div>
        <span className="text-[10px] font-bold text-amber-700 border border-amber-300 bg-amber-100 rounded px-2 py-1 shrink-0">
          Status: Read-Only Mode Gate
        </span>
      </div>

      {/* 4 Budget KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Anggaran vs Realisasi", main: "Rp 48.500.000", sub: "Realisasi: Rp 42.150.000", badge: "Hemat 13.1%", badgeColor: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: <Package className="w-4 h-4" /> },
          { label: "Pengeluaran Souvenir (Pos 2)", main: "Rp 18.750.000", sub: "250 Unit · 184 Diserahkan", badge: "Locked", badgeColor: "text-gray-600 bg-gray-100 border-gray-200", progress: 73.6, icon: <Package className="w-4 h-4" /> },
          { label: "Pengeluaran Snack Box (Pos 3)", main: "Rp 10.500.000", sub: "300 Box · 184 Terdistribusi", badge: "Locked", badgeColor: "text-gray-600 bg-gray-100 border-gray-200", progress: 61.3, icon: <Coffee className="w-4 h-4" /> },
          { label: "Operasional Venue & Vendor", main: "Rp 12.900.000", sub: "Sewa Ballroom & Sound System", badge: "Vendor", badgeColor: "text-blue-600 bg-blue-50 border-blue-200", icon: <Package className="w-4 h-4" /> },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">{kpi.label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${kpi.badgeColor}`}>{kpi.badge}</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{kpi.main}</p>
            <p className="text-xs text-gray-500 mt-0.5">{kpi.sub}</p>
            {kpi.progress && (
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
                <div className="bg-toyota-red h-full rounded-full" style={{ width: `${kpi.progress}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 2-Column: Tables for Souvenir & Snack Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Souvenir Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-toyota-red" />
              <h2 className="text-base font-bold text-gray-900">Alokasi Souvenir Pos 2</h2>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-semibold">Terkunci</span>
          </div>

          {souvenirs.map((item, idx) => (
            <div key={idx} className="space-y-3 bg-gray-50 rounded-lg p-3.5 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.type} &bull; Batch: {item.batch}</p>
                </div>
                <span className="text-sm font-bold text-toyota-red">
                  Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2 rounded border border-gray-200">
                  <p className="text-gray-400">Total Stok</p>
                  <p className="font-bold text-gray-900 text-sm mt-0.5">{item.jumlah} Pcs</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <p className="text-gray-400">Diserahkan</p>
                  <p className="font-bold text-emerald-600 text-sm mt-0.5">{item.used} Pcs</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <p className="text-gray-400">Sisa Meja</p>
                  <p className="font-bold text-amber-600 text-sm mt-0.5">{item.jumlah - item.used} Pcs</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Snack Box Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-gray-900">Alokasi Konsumsi Pos 3</h2>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-semibold">Terkunci</span>
          </div>

          {snacks.map((item, idx) => (
            <div key={idx} className="space-y-3 bg-gray-50 rounded-lg p-3.5 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.type} &bull; Vendor: {item.catering}</p>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2 rounded border border-gray-200">
                  <p className="text-gray-400">Total Order</p>
                  <p className="font-bold text-gray-900 text-sm mt-0.5">{item.jumlah} Box</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <p className="text-gray-400">Diserahkan</p>
                  <p className="font-bold text-emerald-600 text-sm mt-0.5">{item.used} Box</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <p className="text-gray-400">Sisa Fresh</p>
                  <p className="font-bold text-amber-600 text-sm mt-0.5">{item.jumlah - item.used} Box</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Breakdown & Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Rincian Pos Biaya Pengadaan &amp; Vendor
        </h3>
        <div className="space-y-3">
          {budgetCategories.map((cat, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 text-xs gap-2">
              <div>
                <p className="font-bold text-gray-900 text-sm">{cat.category}</p>
                <p className="text-gray-500">{cat.sub} &bull; {cat.note}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-sm">Rp {cat.value.toLocaleString("id-ID")}</p>
                <p className={`font-semibold ${cat.statusColor}`}>{cat.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
