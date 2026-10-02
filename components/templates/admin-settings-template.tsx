"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Save } from "lucide-react";

interface AdminSettingsTemplateProps {
  brandName: string;
  onBrandNameChange: (v: string) => void;
  supportWa: string;
  onSupportWaChange: (v: string) => void;
  autoCloseQuota: boolean;
  onAutoCloseQuotaChange: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  savedSuccess: boolean;
}

export function AdminSettingsTemplate({
  brandName,
  onBrandNameChange,
  supportWa,
  onSupportWaChange,
  autoCloseQuota,
  onAutoCloseQuotaChange,
  onSubmit,
  isLoading,
  savedSuccess,
}: AdminSettingsTemplateProps) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Global</h1>
        <p className="text-sm text-gray-500 mt-1">
          Atur konfigurasi default untuk halaman tamu, landing RSVP, dan operasional event.
        </p>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Pengaturan berhasil disimpan ke sistem.</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-900">
              Nama Brand Halaman Tamu
            </label>
            <input
              id="brandName"
              type="text"
              value={brandName}
              onChange={(e) => onBrandNameChange(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 text-gray-900 focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-gray-500">Teks fallback yang muncul jika logo gagal dimuat.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="supportWa" className="block text-sm font-medium text-gray-900">
              Nomor WhatsApp Bantuan (Admin / CS)
            </label>
            <input
              id="supportWa"
              type="text"
              value={supportWa}
              onChange={(e) => onSupportWaChange(e.target.value)}
              placeholder="Contoh: 08123456789"
              className="w-full h-12 border border-gray-300 rounded-lg px-4 text-gray-900 focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-gray-500">Nomor yang dihubungi oleh tamu jika mengalami kendala RSVP.</p>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoCloseQuota}
                onChange={(e) => onAutoCloseQuotaChange(e.target.checked)}
                className="w-5 h-5 text-toyota-red rounded border-gray-300 focus:ring-toyota-red"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Otomatis Tutup RSVP jika Kuota Penuh
                </span>
                <p className="text-xs text-gray-500">
                  Sistem otomatis menolak konfirmasi baru jika alokasi kursi event telah habis.
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span>Terhubung ke Node Pekanbaru</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="h-12 px-6 bg-toyota-red text-white font-semibold rounded-lg shadow-sm hover:bg-toyota-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] gap-2"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </div>
      </form>
    </div>
  );
}
