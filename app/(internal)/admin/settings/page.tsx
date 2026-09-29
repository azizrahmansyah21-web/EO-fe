"use client";

import { useState } from "react";

export default function SettingsPage() {
  // R-38: Real data placeholder. In a real app, this fetches from the API.
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Simulasi: Pengaturan berhasil disimpan ke backend!");
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Global</h1>
        <p className="text-sm text-gray-500 mt-1">Atur konfigurasi default untuk halaman tamu dan undangan.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          {/* R-05 & R-31: Forms built around real content needs, not just random inputs */}
          
          <div className="space-y-2">
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-900">Nama Brand Halaman Tamu</label>
            <input 
              id="brandName"
              type="text" 
              defaultValue="Agung Toyota"
              className="w-full h-12 border border-gray-300 rounded-lg px-4 text-gray-900 focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-gray-500">Teks fallback yang muncul jika logo gagal dimuat.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="supportWa" className="block text-sm font-medium text-gray-900">Nomor WhatsApp Bantuan (Admin)</label>
            <input 
              id="supportWa"
              type="text" 
              placeholder="Contoh: 08123456789"
              className="w-full h-12 border border-gray-300 rounded-lg px-4 text-gray-900 focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-gray-500">Nomor yang dihubungi oleh tamu jika mengalami kendala RSVP.</p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 text-toyota-red rounded border-gray-300 focus:ring-toyota-red" />
              <span className="text-sm font-medium text-gray-900">Otomatis Tutup RSVP jika Kuota Penuh</span>
            </label>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button 
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="h-12 px-6 bg-toyota-red text-white font-semibold rounded-lg shadow-sm hover:bg-toyota-dark-red active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
          >
            {loading ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </div>
      </div>
    </div>
  );
}
