"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IdCard, Lock, Eye, EyeOff, ArrowRight, Loader2, HelpCircle } from "lucide-react";

export default function SalesLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    nik: "",
    password: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/sales");
    }, 1500);
  };

  const isValid = form.nik.trim() !== "" && form.password.trim() !== "";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Portal Sales</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Masuk untuk mendaftarkan dan memantau calon tamu event Agung Toyota.
          </p>
        </div>

        {/* Login Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
          {/* NIK / Email */}
          <div>
            <label htmlFor="login-nik" className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5">
              <span>NIK Sales / Email</span>
              <span className="text-xs text-gray-400">Wajib</span>
            </label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="login-nik"
                type="text"
                placeholder="Contoh: AT-89241 atau nama@a"
                value={form.nik}
                onChange={(e) => updateField("nik", e.target.value)}
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5">
              <span>Kata Sandi</span>
              <button
                type="button"
                className="text-xs text-toyota-red font-medium hover:underline"
                tabIndex={-1}
              >
                Lupa Sandi?
              </button>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className="w-full h-12 pl-10 pr-11 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-toyota-red focus:border-transparent outline-none transition-all"
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

          {/* Remember Me + Gate Ready */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 rounded border-gray-300 text-toyota-red focus:ring-toyota-red"
              />
              <span className="text-sm text-gray-600">Ingat sesi saya</span>
            </label>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Gate Ready
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full h-12 bg-toyota-red text-white font-semibold rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Masuk ke Portal Sales
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Help link */}
        <div className="text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            Butuh bantuan akun?{" "}
            <span className="text-toyota-red font-medium">Hubungi Admin Event</span>
          </p>
        </div>
      </div>
    </div>
  );
}
