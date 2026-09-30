"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Shield, Lock, ChevronRight, ExternalLink } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/admin/dashboard";
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Red accent top bar */}
      <div className="h-1 bg-toyota-red w-full shrink-0" />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        {/* Card */}
        <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 pt-8 pb-7">
            {/* Logo area */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-toyota-red rounded flex items-center justify-center text-white text-[10px] font-black">AT</div>
                <div>
                  <p className="text-xs font-black text-gray-900 leading-none">TOYOTA</p>
                  <p className="text-[8px] text-gray-400 uppercase tracking-widest">LET&apos;S GO BEYOND</p>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="flex justify-center mb-5">
              <div className="flex items-center gap-1.5 border border-red-200 bg-red-50 text-toyota-red text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
                <Shield className="w-3 h-3" />
                Command Center Operasional
              </div>
            </div>

            <h1 className="text-2xl font-black text-gray-900 text-center mb-1">Masuk ke Sistem</h1>
            <p className="text-sm text-gray-500 text-center mb-7">
              Sistem Operasional Manajemen Event &amp; Registrasi Tamu
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-900">
                    Email Resmi Toyota <span className="text-toyota-red">*</span>
                  </label>
                  <span className="text-[10px] text-gray-400">Domain @agungtoyota.co.id</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@agungtoyota.co.id"
                    required
                    className="w-full h-12 pl-8 pr-4 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-900">
                    Kata Sandi <span className="text-toyota-red">*</span>
                  </label>
                  <button type="button" className="text-xs font-semibold text-toyota-red hover:underline">
                    Lupa Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full h-12 pl-10 pr-11 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all"
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
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="w-4 h-4 accent-toyota-red"
                  />
                  <span className="text-sm text-gray-600">Ingat sesi perangkat ini (30 hari)</span>
                </label>
                <button type="button" aria-label="Info ingat sesi" className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <span className="text-xs border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center font-bold">?</span>
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-toyota-red text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    Masuk ke Command Center
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer links */}
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 text-center space-y-3">
            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400">
              <span className="flex items-center gap-1">&#x1F512; 256-bit SSL Terproteksi</span>
              <span>•</span>
              <span className="flex items-center gap-1">&#x2705; Autentikasi Internal</span>
            </div>
            <div>
              <Link
                href="/sales-login"
                className="text-xs font-semibold text-gray-600 hover:text-toyota-red transition-colors flex items-center justify-center gap-1"
              >
                Bukan Admin? Masuk ke Portal Sales Consultant
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <p className="text-[10px] text-gray-400">
              &copy; 2025 PT Agung Automall. Dilindungi Hak Cipta. Core Engine v2.4.1
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pb-6 space-y-1">
        <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" />
          PT Agung Automall &bull; Event Management Security Protocol
        </p>
        <p className="text-[10px] text-gray-400">&copy; 2024 Agung Toyota. Authorized Personnel Access Only.</p>
      </div>
    </div>
  );
}
