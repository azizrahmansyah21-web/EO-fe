"use client";

import { use } from "react";
import { Calendar, MapPin, Gift, Coffee, Phone, Download, Wallet, Sun } from "lucide-react";
import { RsvpHeader } from "@/components/organisms/rsvp-header";
import { TicketCard } from "@/components/molecules/ticket-card";
import { FacilityItem } from "@/components/molecules/facility-item";
import { InfoRow } from "@/components/atoms/info-row";

const mockGuest = {
  name: "Hendra Wijaya, S.E.",
  tokenId: "TKN-88319B-JKT",
  pax: 1,
  phone: "+62 812-7561-9011",
  event: {
    date: "Sabtu, 15 Maret 2025",
    time: "09:00 - 15:00 WIB",
    venue: "Grand Mercure Ballroom Lt. 3",
    address: "Kota Pekanbaru, Riau",
  },
  sales: {
    name: "Doni Saputra",
    phone: "0812-3456-7890",
  },
};

export default function ETicketPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      <RsvpHeader title="Digital E Ticket" backHref={`/rsvp/${token}/confirm`} />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-5 space-y-4 pb-10">

        {/* Success banner */}
        <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-800">Kehadiran Terkonfirmasi!</p>
            <p className="text-xs text-emerald-700 leading-relaxed mt-0.5">
              QR Code juga telah otomatis dikirimkan ke WhatsApp Anda ({mockGuest.phone}).
            </p>
          </div>
        </div>

        {/* Brightness tip */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <Sun className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed font-medium">
            💡 Harap terangkan kecerahan layar ponsel Anda saat memindai di meja registrasi gate.
          </p>
        </div>

        {/* Ticket card with QR */}
        <TicketCard
          guestName={mockGuest.name}
          tokenId={mockGuest.tokenId}
          pax={mockGuest.pax}
        />

        {/* Facilities */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            HAK FASILITAS TAMU (AUTO-LOCKED SAAT SCAN)
          </p>
          <FacilityItem
            icon={<Gift className="w-4 h-4" />}
            name="1x Souvenir Eksklusif Toyota"
            variant="list"
          />
          <FacilityItem
            icon={<Coffee className="w-4 h-4" />}
            name="1x Welcome Snack Box & Coffee Lounge"
            variant="list"
          />
        </div>

        {/* Event details */}
        <div className="space-y-2">
          <InfoRow
            icon={<Calendar className="w-4 h-4" />}
            label="WAKTU ACARA"
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

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full h-12 bg-gray-900 text-white font-semibold rounded-lg active:scale-95 transition-all text-sm"
          >
            <Wallet className="w-4 h-4" />
            Simpan ke Google / Apple Wallet
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full h-12 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg active:scale-95 transition-all text-sm hover:border-gray-400"
          >
            <Download className="w-4 h-4" />
            Download Gambar Tiket (PNG)
          </button>
        </div>

        {/* Sales contact */}
        <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-toyota-red flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-semibold mb-0.5">Butuh bantuan di lokasi?</p>
            <p className="text-sm text-gray-700">
              Sales Consultant: {mockGuest.sales.name}
            </p>
            <a
              href={`tel:${mockGuest.sales.phone}`}
              className="text-sm font-bold text-toyota-red"
            >
              {mockGuest.sales.phone} (Direct Call / WA)
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
