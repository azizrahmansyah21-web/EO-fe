"use client";

import { useState } from "react";
import {
  Package,
  AlertCircle,
  Coffee,
  Plus,
  Save,
} from "lucide-react";

const SOUVENIR_ITEMS = [
  {
    name: "Executive Leather Tumbler & Car Keychain Set",
    type: "Merchandise Premium Toyota",
    batch: "AGG-TOYOTA-JKT-01",
    jumlah: 250,
    harga: 75000,
    used: 184,
  },
];

const SNACK_ITEMS = [
  {
    name: "Paket Snack Box Artisan & Mineral Water Box",
    type: "Konsumsi Tamu Undangan",
    catering: "Grand Mercure Sutomo Bakery",
    jumlah: 300,
    harga: 35000,
    used: 184,
  },
];

const BUDGET_BREAKDOWN = [
  { category: "Venue & Hall", sub: "Grand Mercure Ballroom", value: 22000000, status: "Lunas 100%", statusColor: "text-emerald-600", note: "Verified" },
  { category: "Multimedia & AV", sub: "Sound System & Videotron LED P3", value: 12500000, status: "Vendor: Sinar Visual Prima", statusColor: "text-gray-500", note: "Installed" },
  { category: "Stage & Atmosphere", sub: "Dekorasi & Gate Registration", value: 5500000, status: "Archway + 3 Stand Scanner", statusColor: "text-gray-500", note: "Ready" },
  { category: "Digital Broadcasting", sub: "Kuota API WhatsApp Blast Gateway", value: 2150000, status: "Meta Cloud Tier-2 SLA", statusColor: "text-gray-500", note: "Active Sync" },
];

const DISTRIBUTION = [
  { label: "Sewa Venue", pct: 52.2, color: "bg-toyota-red" },
  { label: "Sound & LED", pct: 29.6, color: "bg-gray-700" },
  { label: "Dekorasi & Booth", pct: 13.0, color: "bg-gray-400" },
  { label: "WA Gateway", pct: 5.1, color: "bg-emerald-500" },
];

export default function LogisticsPage() {
  const [souvenirForm, setSouvenirForm] = useState({ nama: "", jumlah: "", jenis: "", harga: "" });
  const [snackForm, setSnackForm] = useState({ jumlah: "", harga: "", nama: "", jenis: "" });

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
          <button type="button" className="h-10 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Kunci Data Terkunci
          </button>
          <button type="button" className="h-10 bg-toyota-red text-white px-4 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah Item Logistik / Biaya
          </button>
        </div>
      </div>

      {/* Event selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 h-10">
          <span className="text-xs text-gray-400">&#x1F697;</span>
          <span className="text-sm font-medium text-gray-700">Toyota Customer Gathering &amp; Weekend Expo 2025 - Sutomo</span>
        </div>
      </div>

      {/* Read-only warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-bold text-amber-800">Sinkronisasi Check-in Gate Real-time Terproteksi</p>
          <p className="text-xs text-amber-700 mt-0.5">Kunci Logistik (Locked Souvenir &amp; Locked Snack) aktif untuk mencegah perubahan alokasi stok saat gate scanner tamu berjalan live.</p>
        </div>
        <span className="text-[10px] font-bold text-amber-700 border border-amber-300 bg-amber-100 rounded px-2 py-1 shrink-0">Status: Read-Only Mode Gate</span>
      </div>

      {/* 4 budget KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Estimasi vs Realisasi", main: "Rp 48.500.000", sub: "Realisasi Akhir: Rp 42.150.000", badge: "Hemat 13.1%", badgeColor: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: <Package className="w-4 h-4" /> },
          { label: "Pengeluaran Souvenir", main: "Rp 18.750.000", sub: "250 Unit x Rp 75.000 · 184/250 Diserahkan", badge: "Locked", badgeColor: "text-gray-600 bg-gray-100 border-gray-200", progress: 73.6, icon: <Package className="w-4 h-4" /> },
          { label: "Pengeluaran Snack Box", main: "Rp 10.500.000", sub: "300 Box x Rp 35.000 · 184/300 Terdistribusi", badge: "Locked", badgeColor: "text-gray-600 bg-gray-100 border-gray-200", progress: 61.3, icon: <Coffee className="w-4 h-4" /> },
          { label: "Biaya Operasional Lainnya", main: "Rp 12.900.000", sub: "Venue, Sound, Stage, WA Gateway", badge: "4 Pos Anggaran", badgeColor: "text-blue-600 bg-blue-50 border-blue-200", icon: <Package className="w-4 h-4" /> },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold leading-tight">{k.label}</p>
              <div className="text-gray-300">{k.icon}</div>
            </div>
            <p className="text-xl font-black text-gray-900">{k.main}</p>
            <p className="text-[10px] text-gray-400 mt-1">{k.sub}</p>
            {k.progress && (
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-toyota-red rounded-full" style={{ width: `${k.progress}%` }} />
              </div>
            )}
            <span className={`inline-block mt-2 text-[10px] font-semibold border rounded px-2 py-0.5 ${k.badgeColor}`}>{k.badge}</span>
          </div>
        ))}
      </div>

      {/* Souvenir + Snack side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Souvenir */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900">Logistik Souvenir</h3>
                <span className="text-[10px] font-semibold text-toyota-red border border-red-200 bg-red-50 rounded px-1.5 py-0.5">Terkunci di Gate</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">Skema Registrasi: Nama &bull; Jumlah &bull; Jenis &bull; Harga</p>
            </div>
          </div>
          <div className="px-5 py-3 flex items-center gap-6 border-b border-gray-50">
            <div><p className="text-[10px] text-gray-400">Total Alokasi</p><p className="text-sm font-bold text-gray-900">250 Pcs</p></div>
            <div><p className="text-[10px] text-gray-400">Telah Diserahkan</p><p className="text-sm font-bold text-gray-900">184 Pcs</p></div>
            <div><p className="text-[10px] text-gray-400">Sisa Aman Box</p><p className="text-sm font-bold text-emerald-600">66 Pcs</p></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  <th className="px-5 py-2.5">Nama Souvenir</th>
                  <th className="px-3 py-2.5">Jenis</th>
                  <th className="px-3 py-2.5">Jumlah</th>
                  <th className="px-3 py-2.5">Harga Satuan</th>
                  <th className="px-3 py-2.5">Total</th>
                </tr>
              </thead>
              <tbody>
                {SOUVENIR_ITEMS.map((item) => (
                  <tr key={item.name} className="border-b border-gray-50">
                    <td className="px-5 py-3">
                      <p className="text-xs font-semibold text-gray-900">{item.name}</p>
                      <p className="text-[10px] text-gray-400">Batch: {item.batch}</p>
                    </td>
                    <td className="px-3 py-3"><span className="text-[10px] border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">{item.type}</span></td>
                    <td className="px-3 py-3 text-sm font-bold text-gray-900">{item.jumlah} Pcs</td>
                    <td className="px-3 py-3 text-xs text-gray-700">Rp {item.harga.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-900">Rp {(item.jumlah * item.harga).toLocaleString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Quick add form */}
          <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-gray-700">Entri Cepat Souvenir Baru</p>
              <span className="text-[10px] text-gray-400">Strict Schema</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Nama Souvenir</label>
                <input type="text" placeholder="Contoh: Metal Luggage" value={souvenirForm.nama} onChange={(e) => setSouvenirForm(p => ({ ...p, nama: e.target.value }))} className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Jumlah (Unit/Pcs)</label>
                <input type="number" placeholder="Contoh: 100" value={souvenirForm.jumlah} onChange={(e) => setSouvenirForm(p => ({ ...p, jumlah: e.target.value }))} className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Jenis Souvenir</label>
                <input type="text" placeholder="Contoh: Aksesoris Eksk" value={souvenirForm.jenis} onChange={(e) => setSouvenirForm(p => ({ ...p, jenis: e.target.value }))} className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Harga Satuan (Rp)</label>
                <input type="number" placeholder="Contoh: 45000" value={souvenirForm.harga} onChange={(e) => setSouvenirForm(p => ({ ...p, harga: e.target.value }))} className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none" />
              </div>
            </div>
            <button type="button" className="w-full h-10 bg-gray-900 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              <Save className="w-4 h-4" />
              Simpan Logistik Souvenir
            </button>
          </div>
        </div>

        {/* Snack Box */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900">Logistik Snack Box</h3>
                <span className="text-[10px] font-semibold text-toyota-red border border-red-200 bg-red-50 rounded px-1.5 py-0.5">Terkunci di Gate</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">Skema Registrasi: Jumlah &bull; Harga &bull; Nama &bull; Jenis</p>
            </div>
          </div>
          <div className="px-5 py-3 flex items-center gap-6 border-b border-gray-50">
            <div><p className="text-[10px] text-gray-400">Total Dipesan</p><p className="text-sm font-bold text-gray-900">300 Box</p></div>
            <div><p className="text-[10px] text-gray-400">Terpakai (Check-in)</p><p className="text-sm font-bold text-gray-900">184 Box</p></div>
            <div><p className="text-[10px] text-gray-400">Sisa Pending</p><p className="text-sm font-bold text-amber-600">116 Box</p></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  <th className="px-5 py-2.5">Nama Paket Snack</th>
                  <th className="px-3 py-2.5">Jenis</th>
                  <th className="px-3 py-2.5">Jumlah</th>
                  <th className="px-3 py-2.5">Harga Satuan</th>
                  <th className="px-3 py-2.5">Total Biaya</th>
                </tr>
              </thead>
              <tbody>
                {SNACK_ITEMS.map((item) => (
                  <tr key={item.name} className="border-b border-gray-50">
                    <td className="px-5 py-3">
                      <p className="text-xs font-semibold text-gray-900">{item.name}</p>
                      <p className="text-[10px] text-gray-400">Catering: {item.catering}</p>
                    </td>
                    <td className="px-3 py-3"><span className="text-[10px] border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">{item.type}</span></td>
                    <td className="px-3 py-3 text-sm font-bold text-gray-900">{item.jumlah} Box</td>
                    <td className="px-3 py-3 text-xs text-gray-700">Rp {item.harga.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-900">Rp {(item.jumlah * item.harga).toLocaleString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-gray-700">Entri Cepat Snack Box Baru</p>
              <span className="text-[10px] text-gray-400">Strict Schema</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Jumlah (Box)</label>
                <input type="number" placeholder="Contoh: 150" value={snackForm.jumlah} onChange={(e) => setSnackForm(p => ({ ...p, jumlah: e.target.value }))} className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Harga Satuan (Rp)</label>
                <input type="number" placeholder="Contoh: 30000" value={snackForm.harga} onChange={(e) => setSnackForm(p => ({ ...p, harga: e.target.value }))} className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Nama Snack / Menu</label>
                <input type="text" placeholder="Contoh: Heavy Snack C" value={snackForm.nama} onChange={(e) => setSnackForm(p => ({ ...p, nama: e.target.value }))} className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Jenis Konsumsi</label>
                <input type="text" placeholder="Contoh: Konsumsi Pani" value={snackForm.jenis} onChange={(e) => setSnackForm(p => ({ ...p, jenis: e.target.value }))} className="w-full h-9 px-3 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none" />
              </div>
            </div>
            <button type="button" className="w-full h-10 bg-gray-900 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              <Save className="w-4 h-4" />
              Simpan Logistik Snack Box
            </button>
          </div>
        </div>
      </div>

      {/* Budget breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-bold text-gray-900">Rincian Pos Biaya Event Keseluruhan</h3>
          <p className="text-xs text-gray-400">Komparasi alokasi anggaran operasional venue, multimedia, dekorasi, dan infrastruktur WhatsApp Gateway.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {BUDGET_BREAKDOWN.map((b) => (
            <div key={b.category} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{b.category}</p>
              <p className="text-xs text-gray-600 mt-0.5 mb-2">{b.sub}</p>
              <p className="text-lg font-black text-gray-900">Rp {b.value.toLocaleString("id-ID")}</p>
              <div className="flex items-center justify-between mt-1">
                <p className={`text-[10px] ${b.statusColor}`}>{b.status}</p>
                <span className="text-[10px] font-bold text-emerald-600">{b.note}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Distribution bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700">Distribusi Realisasi Anggaran Keseluruhan</p>
            <p className="text-xs text-gray-500">Total Aktual: <span className="font-bold text-gray-900">Rp 42.150.000</span> / Anggaran Rencana: Rp 48.500.000</p>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden">
            {DISTRIBUTION.map((d) => (
              <div key={d.label} className={`${d.color} first:rounded-l-full last:rounded-r-full`} style={{ width: `${d.pct}%` }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {DISTRIBUTION.map((d) => (
              <div key={d.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${d.color} shrink-0`} />
                <span className="text-[10px] text-gray-500">{d.label}: {d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
