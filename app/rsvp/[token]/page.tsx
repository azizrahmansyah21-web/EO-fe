import Link from "next/link";
import { Calendar, MapPin, Gift, Coffee, Clock, Shield, Phone } from "lucide-react";
import { RsvpHeader } from "@/components/organisms/rsvp-header";
import { EventCard } from "@/components/molecules/event-card";
import { FacilityItem } from "@/components/molecules/facility-item";
import { InfoRow } from "@/components/atoms/info-row";
import { ToyotaLogo } from "@/components/atoms/toyota-logo";

const mockGuest = {
  name: "Hendra Wijaya, S.E.",
  tokenId: "TKN-88319B-JKT",
  vip: true,
  event: {
    name: "Toyota Customer Gathering & Weekend Expo 2025",
    subtitle: "ANNUAL GATHERING",
    date: "Sabtu, 15 Maret 2025",
    time: "Pukul 09:00 – 15:00 WIB",
    venue: "Grand Mercure Ballroom Lt. 3",
    address: "Jl. Sudirman No. 45, Pekanbaru, Riau",
    imageUrl: "/toyota-event.jpg",
    deadline: "Kamis, 13 Maret 2025 pukul 18:00 WIB",
  },
  sales: {
    name: "Doni Saputra",
    branch: "Cabang Sutomo",
    phone: "0812-3456-7890",
  },
};

export default function RsvpLandingPage({ params }: { params: { token: string } }) {
  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      <RsvpHeader title="Rsvp Landing" />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-5 space-y-4 pb-10">

        {/* Center Logo */}
        <div className="flex justify-center pt-1">
          <ToyotaLogo size="xs" />
        </div>

        {/* SSL badge */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Koneksi Aman Terverifikasi SSL</span>
        </div>

        {/* Hero text */}
        <div className="space-y-1">
          <p className="text-xs font-bold text-toyota-red uppercase tracking-widest">
            UNDANGAN RESMI EKSKLUSIF
          </p>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">
            Yth. Bapak<br />{mockGuest.name}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            PT Agung Automall (Agung Toyota) mengundang Bapak secara khusus untuk
            menghadiri agenda eksklusif pelanggan setia.
          </p>
        </div>

        {/* Event image card */}
        <EventCard
          name={mockGuest.event.name}
          subtitle={mockGuest.event.subtitle}
          imageUrl={mockGuest.event.imageUrl}
        />

        {/* Date & Location */}
        <div className="space-y-2">
          <InfoRow
            icon={<Calendar className="w-4 h-4" />}
            label="WAKTU & TANGGAL"
            value={mockGuest.event.date}
            subValue={mockGuest.event.time}
          />
          <InfoRow
            icon={<MapPin className="w-4 h-4" />}
            label="LOKASI ACARA"
            value={mockGuest.event.venue}
            subValue={mockGuest.event.address}
          />
        </div>

        {/* CTA */}
        <Link
          href={`/rsvp/${params.token}/confirm`}
          className="flex items-center justify-center gap-2 w-full h-12 bg-toyota-red text-white font-semibold rounded-lg shadow-sm active:scale-95 transition-all text-base"
        >
          Konfirmasi Kehadiran Sekarang
          <span>→</span>
        </Link>

        {/* Sales info */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Sales Pendamping Pribadi</p>
            <p className="text-sm font-semibold text-gray-900">
              {mockGuest.sales.name}{" "}
              <span className="text-gray-500 font-normal">({mockGuest.sales.branch})</span>
            </p>
          </div>
        </div>

        {/* Facilities */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">Fasilitas Tamu Hadir</h2>
            <span className="text-xs text-toyota-red font-medium">🎟 Klaim via E-Ticket</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FacilityItem
              icon={<Gift className="w-5 h-5" />}
              name="Paket Merchandise"
              description="Official merchandise eksklusif Toyota edisi 2025."
              variant="card"
            />
            <FacilityItem
              icon={<Coffee className="w-5 h-5" />}
              name="Artisan Snack Box"
              description="Welcome refreshment artisan menu khusus VIP tamu."
              variant="card"
            />
          </div>
        </div>

        {/* Deadline warning */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-700 mb-0.5">Batas Waktu Konfirmasi</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Mohon konfirmasi kesediaan kehadiran Bapak/Ibu sebelum{" "}
              <strong>{mockGuest.event.deadline}</strong> untuk alokasi reserved seating.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200 text-center space-y-1">
          <p className="text-[10px] text-gray-400 leading-relaxed">
            🔒 Sistem Terintegrasi Agung Toyota Event Care
          </p>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Data Anda terlindungi oleh kebijakan privasi PT Agung Automall.
            Tautan ini bersifat rahasia dan dikhususkan untuk tamu tercantum.
          </p>
          <p className="text-[10px] font-mono text-gray-400 mt-1">
            ID: AG-2025-{mockGuest.tokenId}
          </p>
        </div>
      </main>
    </div>
  );
}
