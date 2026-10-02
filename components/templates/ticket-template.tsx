"use client";

import React from "react";
import { Calendar, MapPin, Gift, Coffee, Phone, Download, Wallet, Sun } from "lucide-react";
import { RsvpHeader } from "@/components/organisms/rsvp-header";
import { TicketCard } from "@/components/molecules/ticket-card";
import { FacilityItem } from "@/components/molecules/facility-item";
import { InfoRow } from "@/components/atoms/info-row";

export interface TicketGuestData {
  name: string;
  tokenId: string;
  pax: number;
  phone: string;
  event: {
    date: string;
    time: string;
    venue: string;
    address: string;
  };
  sales: {
    name: string;
    phone: string;
  };
}

interface TicketTemplateProps {
  token: string;
  guest: TicketGuestData;
}

/**
 * TicketTemplate: Atomic Design template for the guest E-Ticket view with QR Code.
 */
export function TicketTemplate({ token, guest }: TicketTemplateProps) {
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
              QR Code juga telah otomatis dikirimkan ke WhatsApp Anda ({guest.phone}).
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
          guestName={guest.name}
          tokenId={guest.tokenId}
          pax={guest.pax}
        />

        {/* Facilities */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            HAK FASILITAS TAMU (AUTO-LOCKED SAAT SCAN)
          </p>
          <FacilityItem
            icon={<Gift className="w-4 h-4 text-toyota-red" />}
            name="1x Souvenir Eksklusif Toyota"
            description="Dapat diklaim di Pos 2 Souvenir Desk."
            variant="card"
          />
          <FacilityItem
            icon={<Coffee className="w-4 h-4 text-amber-600" />}
            name="1x Welcome Snack Box &amp; Coffee Lounge"
            description="Dapat diklaim di Pos 3 Lounge Konsumsi."
            variant="card"
          />
        </div>

        {/* Event details */}
        <div className="space-y-2">
          <InfoRow
            icon={<Calendar className="w-4 h-4" />}
            label="WAKTU ACARA"
            value={guest.event.date}
            subValue={guest.event.time}
          />
          <InfoRow
            icon={<MapPin className="w-4 h-4" />}
            label="LOKASI ACARA"
            value={guest.event.venue}
            subValue={guest.event.address}
          />
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 w-full h-12 bg-gray-900 text-white font-semibold rounded-lg active:scale-95 transition-all text-sm shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download E-Ticket (PDF / Image)
          </button>
          <button
            type="button"
            onClick={() => alert("Fitur Apple/Google Wallet terhubung.")}
            className="flex items-center justify-center gap-2 w-full h-12 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg active:scale-95 transition-all text-sm"
          >
            <Wallet className="w-4 h-4" />
            Simpan ke Apple / Google Wallet
          </button>
        </div>

        {/* Sales Contact */}
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              BANTUAN &amp; PIC SALES
            </p>
            <p className="text-sm font-semibold text-gray-800">{guest.sales.name}</p>
          </div>
          <a
            href={`tel:${guest.sales.phone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Hubungi</span>
          </a>
        </div>
      </main>
    </div>
  );
}
