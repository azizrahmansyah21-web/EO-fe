"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, UserPlus, Phone } from "lucide-react";

interface SalesGuestAddTemplateProps {
  name: string;
  onNameChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isValid: boolean;
}

/**
 * SalesGuestAddTemplate: Atomic Design template for Sales Guest Input Form.
 */
export function SalesGuestAddTemplate({
  name,
  onNameChange,
  phone,
  onPhoneChange,
  onSubmit,
  isLoading,
  isValid,
}: SalesGuestAddTemplateProps) {
  return (
    <div className="p-4 md:p-6 max-w-screen-md mx-auto space-y-5">
      {/* Back Navigation */}
      <div className="flex items-center gap-3">
        <Link
          href="/sales/guests"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Kembali ke daftar tamu"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Input Tamu Baru</h1>
          <p className="text-xs text-gray-500">Tambahkan calon tamu ke daftar undangan event</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Nama Lengkap */}
        <div>
          <label htmlFor="guest-name" className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5">
            <span>Nama Lengkap</span>
            <span className="text-xs text-toyota-red font-normal">Wajib</span>
          </label>
          <div className="relative">
            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="guest-name"
              type="text"
              placeholder="Nama calon tamu"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all shadow-xs"
            />
          </div>
        </div>

        {/* No WhatsApp */}
        <div>
          <label htmlFor="guest-phone" className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5">
            <span>No. WhatsApp</span>
            <span className="text-xs text-toyota-red font-normal">Wajib</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="guest-phone"
              type="tel"
              placeholder="08xx-xxxx-xxxx"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full h-12 bg-toyota-red text-white font-semibold rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-toyota-dark shadow-sm"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Simpan Calon Tamu</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
