"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate event creation API call
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/events");
    }, 800);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/events" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buat Event Baru</h1>
          <p className="text-sm text-gray-500 mt-1">Isi detail acara yang akan diselenggarakan.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">Nama Event</label>
            <input required type="text" placeholder="Contoh: Launching Yaris Cross" className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-toyota-red outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Tanggal</label>
              <input required type="date" className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-toyota-red outline-none" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Waktu</label>
              <input required type="time" className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-toyota-red outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">Lokasi</label>
            <input required type="text" placeholder="Nama Tempat / Showroom" className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-toyota-red outline-none" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">URL Google Maps (Opsional)</label>
            <input type="url" placeholder="https://maps.google.com/..." className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-toyota-red outline-none" />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">Maksimal Kuota Tamu</label>
            <input required type="number" min="1" placeholder="Contoh: 100" className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-toyota-red outline-none" />
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <Link href="/admin/events" className="h-12 px-6 flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all">
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="h-12 px-6 bg-toyota-red text-white font-semibold rounded-lg hover:bg-toyota-dark-red transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{loading ? "Menyimpan..." : "Simpan Event"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
