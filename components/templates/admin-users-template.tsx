"use client";

import React from "react";
import { Search, UserPlus, MoreVertical, Shield } from "lucide-react";

export type AdminUserTabKey = "semua" | "admin" | "sales";

export interface AdminUserItem {
  initials: string;
  name: string;
  uid: string;
  email: string;
  pwStatus: string;
  pwBadge: string;
  level: string;
  levelBadge: string;
  status: string;
}

export interface SalesUserItem {
  initials: string;
  name: string;
  uid: string;
  email: string;
  pwStatus: string;
  pwBadge: string;
  branch: string;
  quota: number;
  quotaMax: number;
  status: string;
}

interface AdminUsersTemplateProps {
  tab: AdminUserTabKey;
  onTabChange: (t: AdminUserTabKey) => void;
  search: string;
  onSearchChange: (q: string) => void;
  admins: AdminUserItem[];
  sales: SalesUserItem[];
}

export function AdminUsersTemplate({
  tab,
  onTabChange,
  search,
  onSearchChange,
  admins,
  sales,
}: AdminUsersTemplateProps) {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-toyota-red" />
            <p className="text-xs font-bold text-toyota-red uppercase tracking-widest">
              Access Control &amp; Security Provisioning
            </p>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna &amp; Akses</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Kelola kredensial akun Admin Operasional dan Tim Sales Consultant Agung Toyota.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-xs text-gray-400">Kapasitas Kursi Terisi</p>
            <p className="text-lg font-black text-gray-900">428 / 600</p>
          </div>
          <button
            type="button"
            className="h-10 bg-toyota-red text-white px-4 rounded-lg text-sm font-semibold hover:bg-toyota-dark transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Tambah Pengguna Baru
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          {(
            [
              { key: "semua", label: "Semua Pengguna (14)" },
              { key: "admin", label: "Role Admin (2)" },
              { key: "sales", label: "Role Sales Consultant (12)" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => onTabChange(t.key)}
              className={`h-9 px-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                tab === t.key
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative ml-auto w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama, email cabang..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-64 h-9 pl-9 pr-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Admin section */}
      {(tab === "semua" || tab === "admin") && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-toyota-red" />
              <h2 className="text-sm font-bold text-gray-900">Akun Admin Operasional</h2>
              <span className="text-[10px] font-semibold border border-purple-200 bg-purple-50 text-purple-700 rounded px-2 py-0.5">
                Command Center Privileges
              </span>
            </div>
            <span className="text-xs text-gray-500">Total: {admins.length} Akun Aktif</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  <th className="px-5 py-3">Avatar &amp; Nama Admin</th>
                  <th className="px-5 py-3">Email Resmi</th>
                  <th className="px-5 py-3">Password Status</th>
                  <th className="px-5 py-3">Level Akses</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-3 py-3 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {admins.map((a) => (
                  <tr key={a.uid} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-toyota-red text-white text-sm font-bold flex items-center justify-center shrink-0">
                          {a.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                          <p className="text-[10px] text-gray-400">{a.uid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">{a.email}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-semibold border rounded px-2 py-0.5 ${a.pwBadge}`}>
                        {a.pwStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-semibold border rounded px-2 py-0.5 ${a.levelBadge}`}>
                        {a.level}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {a.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        aria-label="Menu"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sales section */}
      {(tab === "semua" || tab === "sales") && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <h2 className="text-sm font-bold text-gray-900">Akun Sales Consultant</h2>
              <span className="text-[10px] font-semibold border border-blue-200 bg-blue-50 text-blue-700 rounded px-2 py-0.5">
                Akses Input Tamu &amp; E-Ticket
              </span>
            </div>
            <span className="text-xs text-gray-500">Total: {sales.length} Sales Terdaftar</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  <th className="px-5 py-3">Avatar &amp; Nama Sales</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Password Status</th>
                  <th className="px-5 py-3">Cabang Dealer</th>
                  <th className="px-5 py-3">Alokasi Kuota Tamu</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-3 py-3 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sales.map((s) => {
                  const pct = Math.round((s.quota / s.quotaMax) * 100);
                  const barColor =
                    pct >= 90 ? "bg-toyota-red" : pct >= 60 ? "bg-amber-500" : "bg-emerald-500";
                  return (
                    <tr key={s.uid} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 text-sm font-bold flex items-center justify-center shrink-0">
                            {s.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                            <p className="text-[10px] text-gray-400">{s.uid}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">{s.email}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] font-semibold border rounded px-2 py-0.5 ${s.pwBadge}`}>
                          {s.pwStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium text-gray-700">{s.branch}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 min-w-16">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-gray-900">
                                {s.quota} / {s.quotaMax}
                              </span>
                              <span
                                className={`text-[10px] font-semibold ${
                                  pct >= 90 ? "text-toyota-red" : "text-gray-500"
                                }`}
                              >
                                {pct}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden w-24">
                              <div
                                className={`h-full rounded-full ${barColor}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {s.status}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                          aria-label="Menu"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            Menampilkan {sales.length} Sales Consultant Agung Toyota
          </div>
        </div>
      )}
    </div>
  );
}
