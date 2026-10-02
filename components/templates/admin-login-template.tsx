"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Shield, Lock, ChevronRight, ExternalLink } from "lucide-react";
import { ToyotaLogo } from "@/components/atoms/toyota-logo";

interface AdminLoginTemplateProps {
  email: string;
  onEmailChange: (val: string) => void;
  password: string;
  onPasswordChange: (val: string) => void;
  rememberDevice: boolean;
  onRememberDeviceChange: (val: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

/**
 * AdminLoginTemplate: Atomic Design template for the Admin Command Center authentication screen.
 */
export function AdminLoginTemplate({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  rememberDevice,
  onRememberDeviceChange,
  onSubmit,
  isLoading,
}: AdminLoginTemplateProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Red accent top bar */}
      <div className="h-1.5 bg-toyota-red w-full shrink-0" />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Main Card */}
        <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 pt-8 pb-7">
            {/* Toyota Brand Logo */}
            <div className="flex items-center justify-center mb-5">
              <ToyotaLogo size="md" />
            </div>

            {/* Badge Indicator */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-1.5 border border-red-200 bg-red-50 text-toyota-red text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg">
                <Shield className="w-3.5 h-3.5" />
                <span>Command Center Operasional</span>
              </div>
            </div>

            <h1 className="text-xl font-black text-gray-900 text-center mb-1">
              Masuk Administrator
            </h1>
            <p className="text-xs text-gray-500 text-center mb-6 leading-relaxed">
              Sistem Operasional Manajemen Event, Registrasi Tamu &amp; Logistik
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="admin-email" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Email Resmi Toyota <span className="text-toyota-red">*</span>
                  </label>
                  <span className="text-[10px] text-gray-400 font-medium">@agungtoyota.co.id</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">@</span>
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    placeholder="admin@agungtoyota.co.id"
                    required
                    className="w-full h-12 pl-8 pr-4 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="admin-password" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    Kata Sandi <span className="text-toyota-red">*</span>
                  </label>
                  <button type="button" tabIndex={-1} className="text-xs font-semibold text-toyota-red hover:underline">
                    Lupa Sandi?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full h-12 pl-10 pr-11 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember device */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => onRememberDeviceChange(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-toyota-red focus:ring-toyota-red accent-toyota-red"
                  />
                  <span className="text-xs text-gray-600 font-medium">Ingat sesi perangkat ini (30 hari)</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-toyota-red text-white rounded-lg font-bold text-sm hover:bg-toyota-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memverifikasi Hak Akses...
                  </span>
                ) : (
                  <>
                    <span>Masuk ke Command Center</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Switcher & Security Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center space-y-3">
            {/* Explicit Switcher to Sales Portal */}
            <div className="p-3 bg-red-50/60 border border-red-100 rounded-lg text-center">
              <p className="text-[11px] text-gray-600 font-medium">
                Bukan Admin Event?
              </p>
              <Link
                href="/sales-login"
                className="text-xs font-bold text-toyota-red hover:text-toyota-dark transition-colors inline-flex items-center gap-1 mt-1"
              >
                <span>Masuk ke Portal Sales Consultant</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400 font-medium">
              <span>🔒 256-bit SSL Terproteksi</span>
              <span>•</span>
              <span>🛡️ Node: Sutomo Hub</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="text-center py-4 text-[10px] text-gray-400 space-y-0.5">
        <p>PT Agung Automall &bull; Event Management Security Protocol v2.4.1</p>
        <p>&copy; 2025 Agung Toyota. Authorized Personnel Access Only.</p>
      </footer>
    </div>
  );
}
