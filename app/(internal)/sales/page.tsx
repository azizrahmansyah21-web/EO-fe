"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  UserPlus,
  Users,
  CheckCircle,
  Clock3,
  ChevronRight,
  Info,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

// Data mock untuk event aktif (akan diganti API)
const mockEvent = {
  name: "Toyota Customer Gathering & Weekend Test Drive",
  date: "Minggu, 24 Nov 2026",
  time: "09:00 - 17:00 WIB",
  location: "Grand Mercure Ballroom, Pekanbaru",
  imageUrl: null,
  isActive: true,
};

const mockStats = {
  totalInput: 34,
  disetujui: 26,
  menunggu: 8,
  sisaKuota: 16,
  maxKuota: 50,
};

const mockRecentGuests = [
  { name: "Hendra Nugraha", phone: "0812-9844-3210", status: "disetujui" as const },
  { name: "Siti Rahmawati, S.E.", phone: "0813-7729-0012", status: "menunggu" as const },
  { name: "Bambang Sugiarto", phone: "0852-6631-8994", status: "disetujui" as const },
];

export default function SalesBerandaPage() {
  const [salesName] = useState("Doni Saputra");
  const [salesBranch] = useState("Cabang Sutomo");

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-screen-md mx-auto">
      {/* Sapaan Sales + Sisa Kuota */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Halo, {salesName}
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ml-2 align-middle" />
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Sales Consultant &middot; {salesBranch}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">Sisa Kuota</p>
          <p className="text-2xl font-bold text-toyota-red">
            {mockStats.sisaKuota}
            <span className="text-sm font-normal text-gray-400"> / {mockStats.maxKuota}</span>
          </p>
        </div>
      </div>

      {/* Event Aktif Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Event image placeholder */}
        <div className="relative h-36 md:h-48 bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            [FOTO EVENT]
          </div>
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-toyota-red text-white text-xs font-bold">
              🎉 Event Aktif
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h2 className="text-base font-bold text-gray-900 leading-snug">
            {mockEvent.name}
          </h2>

          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-sm text-gray-600">{mockEvent.date}</span>
              <Clock className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
              <span className="text-sm text-gray-600">{mockEvent.time}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-toyota-red shrink-0" />
              <span className="text-sm text-gray-600">{mockEvent.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Total Input</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-2xl font-bold text-gray-900">{mockStats.totalInput}</span>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Disetujui</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-2xl font-bold text-emerald-600">{mockStats.disetujui}</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
          <p className="text-xs text-gray-500 mb-1">Menunggu</p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-2xl font-bold text-amber-600">{mockStats.menunggu}</span>
            <Clock3 className="w-4 h-4 text-amber-500" />
          </div>
        </div>
      </div>

      {/* CTA: Input Tamu Baru */}
      <Link
        href="/sales/guests/add"
        className="flex items-center justify-center gap-2 w-full h-12 bg-toyota-red text-white font-semibold rounded-lg active:scale-[0.98] transition-transform"
      >
        <UserPlus className="w-5 h-5" />
        + Input Tamu Baru
      </Link>

      {/* Tamu Terbaru Ditambahkan */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            Tamu Terbaru Ditambahkan
          </h3>
          <Link
            href="/sales/guests"
            className="text-sm font-medium text-toyota-red flex items-center gap-0.5"
          >
            Lihat Semua
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-2">
          {mockRecentGuests.map((guest, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  guest.status === "menunggu"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {guest.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{guest.name}</p>
                <p className="text-xs text-gray-500">{guest.phone}</p>
              </div>
              <StatusBadge status={guest.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Undangan WhatsApp e-ticket otomatis terkirim setelah disetujui Branch Admin.
          Pastikan nomor kontak aktif di aplikasi WhatsApp.
        </p>
      </div>
    </div>
  );
}
