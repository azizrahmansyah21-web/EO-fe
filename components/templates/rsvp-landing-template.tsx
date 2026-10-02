"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Gift, Coffee, Shield, Phone } from "lucide-react";
import { RsvpHeader } from "@/components/organisms/rsvp-header";
import { EventCard } from "@/components/molecules/event-card";
import { FacilityItem } from "@/components/molecules/facility-item";
import { InfoRow } from "@/components/atoms/info-row";
import { ToyotaLogo } from "@/components/atoms/toyota-logo";

export interface RsvpGuestData {
  name: string;
  tokenId: string;
  vip: boolean;
  event: {
    name: string;
    subtitle: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    imageUrl?: string | null;
    deadline?: string;
  };
  sales: {
    name: string;
    branch: string;
    phone: string;
  };
}

interface RsvpLandingTemplateProps {
  token: string;
  guest: RsvpGuestData;
}

/**
 * RsvpLandingTemplate: Atomic Design template for the guest official invitation letter.
 * Isolates presentation layout from data fetching / routing logic.
 */
export function RsvpLandingTemplate({ token, guest }: RsvpLandingTemplateProps) {
  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      <RsvpHeader title="Rsvp Landing" />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-5 space-y-4 pb-10">
        {/* Center Logo */}
        <div className="flex justify-center pt-1">
          <ToyotaLogo size="xs" />
        </div>

        {/* SSL Badge */}
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
            Yth. Bapak/Ibu<br />{guest.name}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            PT Agung Automall (Agung Toyota) mengundang Anda secara khusus untuk
            menghadiri agenda eksklusif pelanggan setia.
          </p>
        </div>

        {/* Event Card */}
        <EventCard
          name={guest.event.name}
          subtitle={guest.event.subtitle}
          imageUrl={guest.event.imageUrl || "/toyota-event.jpg"}
        />

        {/* Date & Location */}
        <div className="space-y-2">
          <InfoRow
            icon={<Calendar className="w-4 h-4" />}
            label="WAKTU & TANGGAL"
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

        {/* Primary CTA */}
        <Link
          href={`/rsvp/${token}/confirm`}
          className="flex items-center justify-center gap-2 w-full h-12 bg-toyota-red text-white font-semibold rounded-lg shadow-sm active:scale-95 transition-all text-base"
        >
          Konfirmasi Kehadiran Sekarang
          <span>→</span>
        </Link>

        {/* Sales PIC info */}
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              SALES CONSULTANT ANDA
            </p>
            <p className="text-sm font-semibold text-gray-800">
              {guest.sales.name} ({guest.sales.branch})
            </p>
          </div>
        </div>

        {/* Exclusive Privileges */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            FASILITAS &amp; HAK TAMU VIP
          </p>
          <div className="space-y-2">
            <FacilityItem
              icon={<Gift className="w-4 h-4 text-toyota-red" />}
              name="Official Merchandise Toyota"
              description="Souvenir premium eksklusif untuk setiap undangan resmi."
              variant="card"
            />
            <FacilityItem
              icon={<Coffee className="w-4 h-4 text-amber-600" />}
              name="Voucher Fore Coffee &amp; Snack Box"
              description="Dapat diklaim langsung di station lounge acara."
              variant="card"
            />
          </div>
        </div>

        {/* Deadline notice */}
        {guest.event.deadline && (
          <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
            <span>⚠️</span>
            <span>Batas konfirmasi kehadiran: <strong>{guest.event.deadline}</strong></span>
          </div>
        )}
      </main>
    </div>
  );
}
