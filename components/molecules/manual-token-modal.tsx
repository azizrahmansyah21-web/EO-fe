"use client";

import { useState } from "react";
import { X, QrCode, Search, Check } from "lucide-react";

interface ManualTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (token: string) => void;
  quickTokens?: { label: string; token: string }[];
}

export function ManualTokenModal({
  isOpen,
  onClose,
  onSubmit,
  quickTokens = [
    { label: "Hendra Wijaya (VIP - Normal Flow)", token: "TKN-88319B-JKT" },
    { label: "Bambang Soeharto (VVIP - Gate Only)", token: "TKN-44219A-JKT" },
    { label: "Dr. Nadia Maharani (Customer Loyal)", token: "TKN-88023C-JKT" },
  ],
}: ManualTokenModalProps) {
  const [tokenInput, setTokenInput] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (tokenInput.trim()) {
      onSubmit(tokenInput.trim());
      setTokenInput("");
      onClose();
    }
  }

  function handleSelectQuick(token: string) {
    onSubmit(token);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl p-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-toyota-red" />
            <h3 className="text-base font-bold text-gray-900">Input Kode Tiket Manual</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="token-manual-input" className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Token ID / Kode Booking
            </label>
            <div className="relative">
              <input
                id="token-manual-input"
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                placeholder="Contoh: TKN-88319B-JKT"
                autoFocus
                className="w-full h-12 px-4 border-2 border-gray-200 focus:border-toyota-red rounded-lg font-mono font-bold text-base text-gray-900 outline-none uppercase"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!tokenInput.trim()}
            className="w-full h-12 bg-toyota-red text-white font-bold rounded-lg hover:opacity-95 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Cari &amp; Verifikasi Tamu</span>
          </button>
        </form>

        {/* Quick Selection for Test/Field Operasional */}
        <div className="pt-2 border-t border-gray-100 space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Simulasi Cepat Tamu
          </p>
          <div className="space-y-1.5">
            {quickTokens.map((qt) => (
              <button
                key={qt.token}
                type="button"
                onClick={() => handleSelectQuick(qt.token)}
                className="w-full text-left p-2.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-gray-900">{qt.label}</p>
                  <p className="text-[10px] font-mono text-gray-400">{qt.token}</p>
                </div>
                <Check className="w-3.5 h-3.5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
