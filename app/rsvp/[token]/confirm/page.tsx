"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, MonitorCheck } from "lucide-react";
import { RsvpHeader } from "@/components/organisms/rsvp-header";
import { AttendanceOption } from "@/components/molecules/attendance-option";
import { Badge } from "@/components/atoms/badge";

const mockGuest = {
  name: "Hendra Wijaya, S.E.",
  tokenId: "TKN-88319B-JKT",
  vip: true,
  event: {
    name: "Toyota Customer Gathering 2025 • Ballroom Agung Toyota",
    date: "Sabtu, 29 Maret 2025",
    time: "09:00 WIB",
  },
};

const QUOTA_OPTIONS = [
  "Hanya Saya Sendiri (1 Orang)",
  "Saya + 1 Pendamping (2 Orang)",
  "Saya + 2 Pendamping (3 Orang)",
];

export default function RsvpConfirmPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();
  const [attendance, setAttendance] = useState<"hadir" | "tidak" | null>("hadir");
  const [quota, setQuota] = useState(QUOTA_OPTIONS[0]);
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (!attendance) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (attendance === "hadir") {
        router.push(`/ticket/${token}`);
      } else {
        router.push(`/rsvp/${token}`);
      }
    }, 1200);
  }

  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      <RsvpHeader title="Rsvp Confirmation" backHref={`/rsvp/${token}`} />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-5 space-y-5 pb-24">

        {/* Guest header card */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-4 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge label="● Konfirmasi VIP Guest" variant="blue" />
            <span className="text-xs text-gray-500">Toyota Gathering 2025</span>
          </div>
          <h1 className="text-xl font-black text-gray-900">{mockGuest.name}</h1>
          <p className="text-sm text-gray-500">{mockGuest.event.name}</p>
          <div className="flex items-center gap-4 text-xs text-gray-600 pt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-toyota-red" />
              <span>{mockGuest.event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-toyota-red" />
              <span>{mockGuest.event.time}</span>
            </div>
          </div>
        </div>

        {/* Status section */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            TENTUKAN STATUS KEHADIRAN ANDA
          </p>
          <div className="space-y-3">
            <AttendanceOption
              selected={attendance === "hadir"}
              onSelect={() => setAttendance("hadir")}
              title="Ya, Saya Pasti Hadir"
              description="Dapatkan Tiket QR Code Gate langsung di layar dan dikirim ke WhatsApp Anda untuk penukaran souvenir & snack box."
              badge={{ label: "Aktif", variant: "green" }}
              extra={
                <div className="space-y-2.5">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Jumlah Kuota / Pendamping
                    </label>
                    <select
                      value={quota}
                      onChange={(e) => setQuota(e.target.value)}
                      className="w-full h-11 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-toyota-red outline-none appearance-none cursor-pointer"
                    >
                      {QUOTA_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700">
                    <MonitorCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Akses khusus lounge &amp; privilege VIP disiapkan</span>
                  </div>
                </div>
              }
            />

            <AttendanceOption
              selected={attendance === "tidak"}
              onSelect={() => setAttendance("tidak")}
              title="Maaf, Saya Tidak Bisa Hadir"
              description="Bila memilih ini, kursi dan alokasi Anda akan dialihkan. Sistem akan mengarahkan Anda kembali ke Halaman Awal RSVP."
            />
          </div>
        </div>

        {/* Sync info */}
        <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            Data kehadiran tersinkronisasi langsung ke sistem Meja Registrasi Agung Toyota.
          </p>
        </div>
      </main>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 safe-pb">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!attendance || loading}
            className="flex items-center justify-center gap-2 w-full h-12 bg-toyota-red text-white font-semibold rounded-lg shadow-sm active:scale-95 transition-all text-base disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin shrink-0" />
                Menyimpan...
              </>
            ) : (
              <>🎟 Simpan &amp; Dapatkan E-Ticket QR Code</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
