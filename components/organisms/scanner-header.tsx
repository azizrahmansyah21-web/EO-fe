"use client";

import { UserCheck, Gift, Utensils, Volume2, VolumeX, Flashlight, FlashlightOff, Laptop, Smartphone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { soundController } from "@/components/atoms/audio-chime";
import { useState } from "react";
import { ToyotaLogo } from "@/components/atoms/toyota-logo";

interface ScannerHeaderProps {
  currentPos: 1 | 2 | 3;
  onPosChange: (pos: 1 | 2 | 3) => void;
  isDesktopView: boolean;
  onToggleViewMode: () => void;
  isTorchOn?: boolean;
  onToggleTorch?: () => void;
}

export function ScannerHeader({
  currentPos,
  onPosChange,
  isDesktopView,
  onToggleViewMode,
  isTorchOn = false,
  onToggleTorch,
}: ScannerHeaderProps) {
  const [soundEnabled, setSoundEnabled] = useState(soundController.enabled);

  function toggleSound() {
    const next = !soundEnabled;
    soundController.enabled = next;
    setSoundEnabled(next);
  }

  const posNames = {
    1: { title: "Gate 1: Buku Tamu", role: "POS REGISTRASI", opName: "Arya Pratama", opInit: "AP", opDesk: "Gate Utama" },
    2: { title: "Pos 2 • Rian H.", role: "GATE CREW", opName: "Rian Hidayat", opInit: "RH", opDesk: "Meja Souvenir Desk 2" },
    3: { title: "Scanner Snack", role: "GATE CREW", opName: "Maya Lestari", opInit: "ML", opDesk: "Petugas Pos 3" },
  };

  const currentInfo = posNames[currentPos];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      {/* Desktop Bar (>= lg) */}
      <div className="hidden lg:flex items-center justify-between h-16 px-6 max-w-screen-2xl mx-auto">
        {/* Brand identity */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Kembali ke Dashboard Admin"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3 border-l border-gray-200 pl-3">
            <ToyotaLogo size="xs" noTagline />
            <div>
              <p className="text-xs font-black text-gray-900 tracking-tight uppercase leading-none">
                Agung Toyota
              </p>
              <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-0.5">
                Terminal Operasi Event
              </p>
            </div>
          </div>
        </div>

        {/* Pos 1/2/3 Center Switcher */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            type="button"
            onClick={() => onPosChange(1)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentPos === 1
                ? "bg-toyota-red text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Pos 1: Gate Check-in</span>
          </button>

          <button
            type="button"
            onClick={() => onPosChange(2)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentPos === 2
                ? "bg-toyota-red text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Pos 2: Souvenir</span>
          </button>

          <button
            type="button"
            onClick={() => onPosChange(3)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentPos === 3
                ? "bg-toyota-red text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Pos 3: Snack</span>
          </button>
        </div>

        {/* Right Status & Controls */}
        <div className="flex items-center gap-3">
          {/* Mode Switcher Toggle */}
          <button
            type="button"
            onClick={onToggleViewMode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 text-xs font-semibold text-gray-700 transition-colors"
            title={isDesktopView ? "Ganti ke Tampilan Kamera Mobile" : "Ganti ke Tampilan Terminal USB"}
          >
            {isDesktopView ? <Smartphone className="w-3.5 h-3.5 text-gray-500" /> : <Laptop className="w-3.5 h-3.5 text-gray-500" />}
            <span>{isDesktopView ? "Mode Kamera" : "Mode Terminal"}</span>
          </button>

          {/* USB Scanner Status */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>USB Scanner Aktif</span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
              soundEnabled
                ? "border-gray-200 text-gray-700 hover:bg-gray-100"
                : "border-red-200 bg-red-50 text-toyota-red"
            }`}
            title={soundEnabled ? "Matikan Suara (Mute)" : "Nyalakan Suara"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Operator Avatar */}
          <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900 leading-tight">{currentInfo.opName}</p>
              <p className="text-[10px] text-gray-400 font-medium">{currentInfo.opDesk}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-toyota-red text-white font-bold text-xs flex items-center justify-center shrink-0">
              {currentInfo.opInit}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bar (< lg) */}
      <div className="lg:hidden flex flex-col">
        {/* Top Header Row */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="p-1.5 -ml-1 text-gray-500 hover:text-gray-900 rounded-lg"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <p className="text-[10px] font-bold text-toyota-red uppercase tracking-wider leading-none">
                {currentInfo.role}
              </p>
              <h1 className="text-sm font-black text-gray-900 mt-0.5">{currentInfo.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleTorch && (
              <button
                type="button"
                onClick={onToggleTorch}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                  isTorchOn ? "bg-amber-100 border-amber-300 text-amber-700" : "border-gray-200 text-gray-600"
                }`}
                aria-label="Senter Flash"
              >
                {isTorchOn ? <Flashlight className="w-4 h-4" /> : <FlashlightOff className="w-4 h-4" />}
              </button>
            )}

            <button
              type="button"
              onClick={toggleSound}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                soundEnabled ? "border-gray-200 text-gray-600" : "bg-red-50 border-red-200 text-toyota-red"
              }`}
              aria-label="Toggle Suara"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onToggleViewMode}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600"
              title="Ganti Mode"
            >
              {isDesktopView ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
            </button>

            <div className="w-8 h-8 rounded-full bg-toyota-red text-white font-bold text-xs flex items-center justify-center shrink-0 ml-1">
              {currentInfo.opInit}
            </div>
          </div>
        </div>

        {/* Mobile Pos Switcher Pills */}
        <div className="grid grid-cols-3 gap-1 p-1.5 bg-gray-100 border-b border-gray-200">
          <button
            type="button"
            onClick={() => onPosChange(1)}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentPos === 1 ? "bg-toyota-red text-white shadow-sm" : "text-gray-600"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Pos 1: Gate</span>
          </button>

          <button
            type="button"
            onClick={() => onPosChange(2)}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentPos === 2 ? "bg-toyota-red text-white shadow-sm" : "text-gray-600"
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Pos 2: Souvenir</span>
          </button>

          <button
            type="button"
            onClick={() => onPosChange(3)}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentPos === 3 ? "bg-toyota-red text-white shadow-sm" : "text-gray-600"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Pos 3: Snack</span>
          </button>
        </div>
      </div>
    </header>
  );
}
