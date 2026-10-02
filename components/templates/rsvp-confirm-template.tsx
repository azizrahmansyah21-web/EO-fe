"use client";

import React from "react";
import { Calendar, Clock, MonitorCheck } from "lucide-react";
import { RsvpHeader } from "@/components/organisms/rsvp-header";
import { AttendanceOption } from "@/components/molecules/attendance-option";
import { Badge } from "@/components/atoms/badge";

export interface RsvpConfirmGuest {
  name: string;
  tokenId: string;
  vip: boolean;
  event: {
    name: string;
    date: string;
    time: string;
  };
}

interface RsvpConfirmTemplateProps {
  token: string;
  guest: RsvpConfirmGuest;
  attendance: "hadir" | "tidak" | null;
  onAttendanceChange: (val: "hadir" | "tidak") => void;
  quota: string;
  onQuotaChange: (val: string) => void;
  quotaOptions: string[];
  onSubmit: () => void;
  isLoading: boolean;
}

/**
 * RsvpConfirmTemplate: Atomic Design template for the guest attendance decision form.
 */
export function RsvpConfirmTemplate({
  token,
  guest,
  attendance,
  onAttendanceChange,
  quota,
  onQuotaChange,
  quotaOptions,
  onSubmit,
  isLoading,
}: RsvpConfirmTemplateProps) {
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
          <h1 className="text-xl font-black text-gray-900">{guest.name}</h1>
          <p className="text-sm text-gray-500">{guest.event.name}</p>
          <div className="flex items-center gap-4 text-xs text-gray-600 pt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-toyota-red" />
              <span>{guest.event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-toyota-red" />
              <span>{guest.event.time}</span>
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
              onSelect={() => onAttendanceChange("hadir")}
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
                      onChange={(e) => onQuotaChange(e.target.value)}
                      className="w-full h-11 border border-gray-300 rounded-lg px-3 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-toyota-red outline-none appearance-none cursor-pointer"
                    >
                      {quotaOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    <MonitorCheck className="w-4 h-4 shrink-0" />
                    <span>E-Ticket QR Code otomatis terbit setelah Anda simpan.</span>
                  </div>
                </div>
              }
            />

            <AttendanceOption
              selected={attendance === "tidak"}
              onSelect={() => onAttendanceChange("tidak")}
              title="Tidak Dapat Hadir"
              description="Informasikan kepada Sales Consultant agar kuota Anda dialihkan kepada pelanggan lainnya."
              badge={{ label: "Opsi", variant: "gray" }}
            />
          </div>
        </div>
      </main>

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-4 max-w-md mx-auto shadow-lg">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!attendance || isLoading}
          className={`flex items-center justify-center gap-2 w-full h-12 font-semibold rounded-lg text-base transition-all ${
            !attendance || isLoading
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-toyota-red text-white shadow-sm active:scale-95 hover:bg-toyota-dark"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Menyimpan Konfirmasi...
            </span>
          ) : (
            <span>Simpan &amp; Lanjutkan</span>
          )}
        </button>
      </div>
    </div>
  );
}
