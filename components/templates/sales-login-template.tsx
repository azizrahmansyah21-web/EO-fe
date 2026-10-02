"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IdCard, Lock, Eye, EyeOff, ArrowRight, HelpCircle, ExternalLink, UserCheck } from "lucide-react";
import { ToyotaLogo } from "@/components/atoms/toyota-logo";

interface SalesLoginTemplateProps {
  nik: string;
  onNikChange: (val: string) => void;
  password: string;
  onPasswordChange: (val: string) => void;
  rememberMe: boolean;
  onRememberMeChange: (val: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isValid: boolean;
}

/**
 * SalesLoginTemplate: Atomic Design template for the Sales Consultant authentication screen.
 */
export function SalesLoginTemplate({
  nik,
  onNikChange,
  password,
  onPasswordChange,
  rememberMe,
  onRememberMeChange,
  onSubmit,
  isLoading,
  isValid,
}: SalesLoginTemplateProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Top neutral accent */}
      <div className="h-1 bg-gray-900 w-full shrink-0" />

      <div className="flex-1 flex flex-col items-center justify-center p-4 py-8">
        <div className="w-full max-w-sm space-y-5">
          {/* Header Area */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center">
              <ToyotaLogo size="md" />
            </div>

            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 text-gray-800 text-[11px] font-bold border border-gray-200 uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5 text-toyota-red" />
                <span>Portal Sales Consultant</span>
              </span>
            </div>

            <h1 className="text-xl font-bold text-gray-900">Masuk Portal Sales</h1>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Daftarkan calon prospek dan pantau alokasi kuota undangan event Agung Toyota.
            </p>
          </div>

          {/* Login Card Form */}
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 shadow-sm"
          >
            {/* NIK / Email / WA */}
            <div>
              <label
                htmlFor="sales-nik"
                className="flex items-center justify-between text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5"
              >
                <span>NIK Sales / No. WhatsApp</span>
                <span className="text-xs text-toyota-red font-normal">Wajib</span>
              </label>
              <div className="relative">
                <IdCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="sales-nik"
                  type="text"
                  placeholder="Contoh: AT-89241 atau 0812xxxx"
                  value={nik}
                  onChange={(e) => onNikChange(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="sales-password"
                  className="text-xs font-bold text-gray-800 uppercase tracking-wide"
                >
                  Kata Sandi
                </label>
                <button
                  type="button"
                  className="text-xs text-toyota-red font-medium hover:underline"
                  tabIndex={-1}
                >
                  Lupa Sandi?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="sales-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  className="w-full h-12 pl-10 pr-11 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me + Node Status */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => onRememberMeChange(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-toyota-red focus:ring-toyota-red accent-toyota-red"
                />
                <span className="text-xs text-gray-600 font-medium">Ingat sesi saya</span>
              </label>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Node Aktif
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full h-12 bg-toyota-red text-white font-bold rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-toyota-dark shadow-sm text-sm mt-3"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memverifikasi...
                </span>
              ) : (
                <>
                  <span>Masuk ke Portal Sales</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Explicit Switcher to Admin Command Center */}
          <div className="p-3 bg-white border border-gray-200 rounded-lg text-center shadow-xs">
            <p className="text-[11px] text-gray-500 font-medium">
              Petugas Operasional / Admin Event?
            </p>
            <Link
              href="/login"
              className="text-xs font-bold text-gray-900 hover:text-toyota-red transition-colors inline-flex items-center gap-1 mt-1"
            >
              <span>Masuk ke Command Center Admin</span>
              <ExternalLink className="w-3 h-3 text-toyota-red" />
            </Link>
          </div>

          {/* Help link */}
          <div className="text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              <span>Butuh bantuan akun?</span>
              <span className="text-toyota-red font-semibold">Hubungi Admin Event</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-[10px] text-gray-400">
        &copy; 2025 Agung Toyota. All Rights Reserved. Portal Penjualan Resmi.
      </footer>
    </div>
  );
}
