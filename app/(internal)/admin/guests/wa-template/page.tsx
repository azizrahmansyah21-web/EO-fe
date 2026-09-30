"use client";

import { useState } from "react";
import Link from "next/link";
import { Save, RefreshCw, Send, ChevronLeft, ToggleLeft, ToggleRight } from "lucide-react";

const VARIABLES = [
  "{{nama_tamu}}", "{{nama_event}}", "{{hari_tanggal}}",
  "{{waktu_acara}}", "{{lokasi_venue}}", "{{link_rsvp}}",
  "{{nama_sales}}", "{{kontak_sales}}",
];

const DEFAULT_MESSAGE = `Yth. Bapak/Ibu *{{nama_tamu}}*,

PT Agung Automall (Agung Toyota) mengundang Bapak/Ibu untuk hadir dalam acara eksklusif:
🚗 *{{nama_event}}*

📅 Tanggal: {{hari_tanggal}}
⏰ Waktu: {{waktu_acara}}
📍 Lokasi: {{lokasi_venue}}

Mohon lakukan konfirmasi kehadiran (RSVP) serta dapatkan Tiket Digital (QR Code Gate) dan merchandise resmi melalui tautan aman berikut:`;

export default function WATemplatePage() {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [headerType, setHeaderType] = useState<"poster" | "video" | "text">("poster");
  const [autoAttach, setAutoAttach] = useState(true);
  const [previewTab, setPreviewTab] = useState<"chat" | "rsvp">("chat");

  const insertVariable = (v: string) => {
    setMessage((prev) => prev + v);
  };

  const charCount = message.length;

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Breadcrumb + Title */}
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
          Operasional Event &rsaquo; <span className="text-toyota-red font-semibold">Toyota Customer Gathering 2025</span>
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          <Link href="/admin/guests" className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors" aria-label="Kembali">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Pusat Undangan &amp; Desain Template</h1>
          <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1 font-medium">Node: Sutomo Central</span>
        </div>
        {/* Sub tabs */}
        <div className="flex items-center gap-3 mt-3">
          <Link href="/admin/guests" className="h-9 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
            Kelola Tamu &amp; Kurasi Sales
            <span className="text-[10px] bg-gray-100 text-gray-600 rounded px-1.5 py-0.5 font-bold">36</span>
          </Link>
          <button type="button" className="h-9 px-4 bg-toyota-red text-white rounded-lg text-sm font-semibold flex items-center gap-2">
            WA Template &amp; Desain Undangan
            <span className="text-[10px] bg-red-600 text-white rounded px-1.5 py-0.5 font-bold">LIVE EDITOR</span>
          </button>
        </div>
      </div>

      {/* Main 2-col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Editor */}
        <div className="space-y-4">
          {/* Template config */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Parameter Pesan WhatsApp</h3>
                <p className="text-xs text-gray-400 mt-0.5">Konfigurasi dinamis pesan personalisasi ke nomor terdaftar</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 border border-emerald-200 bg-emerald-50 rounded px-2 py-1">Auto-Save Aktif</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[10px] text-gray-500 block mb-1 uppercase tracking-wider">Preset Pesan</label>
                <select className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none">
                  <option>Undangan Resmi & RSVP Link (Defa</option>
                  <option>Pengingat H-1</option>
                  <option>Follow-up RSVP</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1 uppercase tracking-wider">Nama Template (Internal)</label>
                <input type="text" defaultValue="Undangan Gathering Pelangg" className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none" />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[10px] text-gray-500 block mb-2 uppercase tracking-wider">Sisipkan Variabel Dinamis</label>
              <p className="text-[10px] text-gray-400 mb-2">Klik chip untuk memasukkan ke kursor teks</p>
              <div className="flex flex-wrap gap-1.5">
                {VARIABLES.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => insertVariable(v)}
                    className={`h-7 px-2.5 rounded border text-[10px] font-semibold transition-colors ${v === "{{link_rsvp}}" ? "bg-toyota-red text-white border-toyota-red" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider">Isi Pesan WhatsApp</label>
                <span className="text-[10px] text-gray-400">{charCount} / 1024 Karakter</span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={10}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none resize-none leading-relaxed"
              />
              <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                <span className="font-bold text-gray-700 cursor-pointer">*tebal*</span>
                <span className="italic cursor-pointer">_miring_</span>
                <span className="line-through cursor-pointer">~coret~</span>
                <span className="ml-auto font-bold text-gray-600 cursor-pointer">B Format Cepat</span>
              </div>
            </div>
          </div>

          {/* Header visual */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Pengaturan Header Visual WhatsApp</h3>
            <p className="text-xs text-gray-400 mb-4">Media multimedia pembuka pesan chat undangan</p>
            <div className="flex items-center gap-4 mb-4">
              {(["poster", "video", "text"] as const).map((t) => {
                const labels = { poster: "Poster Resmi", video: "Video Teaser", text: "Teks Saja" };
                const subs = { poster: "Rasio 16:9 Image", video: "MP4 max 8MB", text: "Tanpa Header Media" };
                return (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="headerType" value={t} checked={headerType === t} onChange={() => setHeaderType(t)} className="accent-toyota-red" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{labels[t]}</p>
                      <p className="text-[10px] text-gray-400">{subs[t]}</p>
                    </div>
                  </label>
                );
              })}
            </div>
            {headerType === "poster" && (
              <div className="bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200">
                <div className="w-full h-40 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-end p-4">
                  <div>
                    <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-1">Official Banner Asset</p>
                    <p className="text-white text-sm font-bold">gathering-sutomo-16x9-hq.jpg</p>
                  </div>
                  <button type="button" className="ml-auto text-[10px] bg-white text-gray-700 rounded px-2 py-1 font-semibold">Ganti File</button>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 mt-4">
              <button type="button" className="h-9 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Reset ke Default
              </button>
              <button type="button" className="h-9 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                Kirim Test ke Nomor Saya
              </button>
              <button type="button" className="ml-auto h-10 bg-toyota-red text-white px-5 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Simpan Template Pesan
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live preview + Gateway status */}
        <div className="space-y-4">
          {/* Phone preview */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-bold text-gray-900">Live Visual Simulator</h3>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                {(["chat", "rsvp"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setPreviewTab(t)}
                    className={`h-7 px-3 rounded text-xs font-semibold transition-colors ${previewTab === t ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}
                  >
                    {t === "chat" ? "Chat WhatsApp" : "Web RSVP / E-Ticket"}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone mockup */}
            <div className="mx-auto w-64 bg-gray-800 rounded-2xl p-2 shadow-lg">
              <div className="bg-[#075E54] rounded-t-xl px-3 py-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-400 flex items-center justify-center text-[10px] font-bold text-white">AT</div>
                <div className="flex-1">
                  <p className="text-white text-xs font-semibold">Agung Toyota ✓</p>
                  <p className="text-emerald-200 text-[9px]">Official Business Account</p>
                </div>
              </div>
              <div className="bg-[#ECE5DD] rounded-b-xl p-3 min-h-48">
                <div className="text-[9px] text-center text-gray-500 mb-2">HARI INI</div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm max-w-[90%]">
                  <div className="w-full h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded mb-2 flex items-center justify-center">
                    <p className="text-[8px] text-white font-bold">Poster Acara</p>
                  </div>
                  <p className="text-[9px] text-gray-800 leading-relaxed">
                    Yth. Bapak/Ibu <strong>Hendra Wijaya, S.E.</strong>,<br /><br />
                    PT Agung Automall (Agung Toyota) mengundang Bapak/Ibu untuk hadir dalam acara eksklusif:<br />
                    🚗 <strong>Toyota Customer Gathering 2025</strong><br /><br />
                    📅 Tanggal: Sabtu, 15 Maret 2025<br />
                    ⏰ Waktu: 09:00 - 15:00 WIB<br />
                    📍 Lokasi: Grand Ballroom Lt. 2, Hotel Mercure Sutomo...
                  </p>
                  <p className="text-[8px] text-gray-400 mt-1.5">Pesan terenkripsi end-to-end melalui Toyota Enterprise WhatsApp Gateway.</p>
                </div>
                <div className="flex items-center mt-3 bg-white rounded-lg px-2 py-1.5">
                  <p className="text-[9px] text-gray-400 flex-1">Balas pesan...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gateway status */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-900">Status Gateway Fonnte / Meta API</p>
                <span className="text-[10px] font-semibold text-emerald-700">Session Connected &amp; Rate Stable</span>
              </div>
              <span className="text-[10px] text-gray-400">Ping: 34ms</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">Kuota Kuota Broadcast Bulanan</p>
              <p className="text-xs font-bold text-gray-900">3.850 / 5.000 Pesan</p>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: "77%" }} />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <p className="text-[10px] text-gray-400">Est. Durasi 250 Tamu</p>
                <p className="text-xs font-bold text-gray-900">~2.5 Menit</p>
                <p className="text-[9px] text-gray-400">(Anti-banned delay 2s)</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Auto Fallback SMS</p>
                <p className="text-xs font-bold text-gray-900">Tersedia</p>
                <p className="text-[9px] text-emerald-600 font-medium">Telkomsel OTP Route</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <p className="text-xs font-semibold text-gray-900">Auto-attach Digital QR Ticket</p>
                <p className="text-[10px] text-gray-400">Kirim tiket QR otomatis saat tamu klik RSVP Hadir</p>
              </div>
              <button
                type="button"
                onClick={() => setAutoAttach(!autoAttach)}
                className="focus:outline-none"
                aria-label="Toggle auto attach"
              >
                {autoAttach
                  ? <ToggleRight className="w-8 h-8 text-toyota-red" />
                  : <ToggleLeft className="w-8 h-8 text-gray-300" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
