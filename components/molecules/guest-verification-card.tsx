"use client";

import { User, Phone, Briefcase, Car, Gift, Utensils, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export interface GuestVerificationData {
  tokenId: string;
  name: string;
  company?: string;
  title?: string;
  phone: string;
  vip: boolean;
  vipTier?: "VIP" | "VVIP";
  pax: number;
  salesPic: string;
  carModel?: string;
  gateCheckedIn: boolean;
  gateCheckInTime?: string;
  souvenirClaimed: boolean;
  souvenirClaimTime?: string;
  snackClaimed: boolean;
  snackClaimTime?: string;
}

interface GuestVerificationCardProps {
  currentPos: 1 | 2 | 3;
  guest: GuestVerificationData;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function GuestVerificationCard({
  currentPos,
  guest,
  onConfirm,
  isLoading = false,
}: GuestVerificationCardProps) {
  // Determine if this pos action has already been performed
  const isAlreadyProcessed =
    (currentPos === 1 && guest.gateCheckedIn) ||
    (currentPos === 2 && guest.souvenirClaimed) ||
    (currentPos === 3 && guest.snackClaimed);

  // Determine if prerequisite is blocked
  const isPrerequisiteBlocked = (currentPos === 2 || currentPos === 3) && !guest.gateCheckedIn;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm space-y-4 p-5">
      {/* Top Header Identity */}
      <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
              ID: {guest.tokenId}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                guest.vipTier === "VVIP"
                  ? "bg-purple-100 text-purple-800 border border-purple-200"
                  : "bg-red-50 text-toyota-red border border-red-200"
              }`}
            >
              {guest.vipTier || "VIP Guest"} • {guest.pax} Pax
            </span>
          </div>

          <h2 className="text-xl font-black text-gray-900 leading-tight">{guest.name}</h2>

          {guest.company && (
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {guest.company} {guest.title ? `• ${guest.title}` : ""}
            </p>
          )}
        </div>

        {/* Status Pill on top-right */}
        <div>
          {isAlreadyProcessed ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Sudah Diambil
            </span>
          ) : isPrerequisiteBlocked ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-toyota-red border border-red-200 text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              Belum Check-In
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              Belum Diambil
            </span>
          )}
        </div>
      </div>

      {/* 3 Metric Mini-cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">Nomor WhatsApp</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-800">
            <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <span className="truncate">{guest.phone}</span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">Sales PIC</p>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-800">
            <User className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <span className="truncate">{guest.salesPic}</span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">
            {guest.carModel ? "Unit Kendaraan" : "Status Kehadiran"}
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-gray-800">
            {guest.carModel ? (
              <>
                <Car className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span className="truncate">{guest.carModel}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{guest.pax} Pax Hadir</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Pos-specific Package Description Card */}
      {currentPos === 2 && (
        <div className="bg-red-50/50 border border-red-100 rounded-lg p-3.5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-100 text-toyota-red flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-toyota-red uppercase tracking-wider">
                Paket Hak Tamu
              </span>
              <span className="text-xs font-bold text-gray-700">1 Paket</span>
            </div>
            <p className="text-sm font-bold text-gray-900 mt-0.5">
              1x Executive Tumbler Toyota &amp; Key Pouch
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Matte Obsidian Tumbler 550ml + Nappa Leather Key Pouch RFID (GR Line Lasered)
            </p>
          </div>
        </div>
      )}

      {currentPos === 3 && (
        <div className="bg-red-50/50 border border-red-100 rounded-lg p-3.5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-100 text-toyota-red flex items-center justify-center shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-toyota-red uppercase tracking-wider">
                Paket Konsumsi Siap Diserahkan
              </span>
              <span className="text-xs font-bold text-gray-700">{guest.pax} Pax</span>
            </div>
            <p className="text-sm font-bold text-gray-900 mt-0.5">
              1x Artisan Snack Box &amp; Fore Coffee Voucher
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Quiche Lorraine, Danish Pastry &amp; Signature Latte + Mineral Infused Water 330ml
            </p>
          </div>
        </div>
      )}

      {/* Big Action CTA Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading || isAlreadyProcessed || isPrerequisiteBlocked}
          className="w-full h-14 bg-toyota-red text-white text-base font-bold rounded-lg shadow-sm hover:opacity-95 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Memproses...</span>
            </span>
          ) : isAlreadyProcessed ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Sudah Diserahkan Sebelumnya</span>
            </span>
          ) : isPrerequisiteBlocked ? (
            <span className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Wajib Check-In Gate 1 Terlebih Dahulu</span>
            </span>
          ) : currentPos === 1 ? (
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>KONFIRMASI HADIR &amp; BUKA LOGISTIK [ENTER]</span>
            </span>
          ) : currentPos === 2 ? (
            <span className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <span>SERAHKAN SOUVENIR &amp; CATAT DIAMBIL [ENTER]</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>SERAHKAN SNACK BOX &amp; SELESAI [ENTER]</span>
            </span>
          )}
        </button>

        <p className="text-[11px] text-center text-gray-400 mt-2">
          Tekan tombol <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-600 font-mono text-[10px]">ENTER</kbd> pada keyboard atau klik tombol di atas.
        </p>
      </div>
    </div>
  );
}
