"use client";

import { useEffect, useRef, useState } from "react";
import { QrCode, Zap, X, CornerDownLeft } from "lucide-react";

interface BarcodeInputBoxProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (val: string) => void;
  isLoading?: boolean;
  label?: string;
  subLabel?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export function BarcodeInputBox({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  label = "Pindai QR / Kode E-Ticket",
  subLabel = "Arahkan scanner atau tekan Enter",
  placeholder = "Contoh: TKN-88319B-JKT",
  autoFocus = true,
}: BarcodeInputBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.trim()) {
      e.preventDefault();
      onSubmit(value.trim());
    } else if (e.key === "Escape") {
      onChange("");
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-toyota-red" />
          <h3 className="text-sm font-bold text-gray-900">{label}</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{subLabel}</span>
        </div>
      </div>

      {/* Input Group */}
      <form onSubmit={handleFormSubmit} className="flex gap-2">
        <div
          className={`flex-1 relative flex items-center border-2 rounded-lg bg-gray-50 transition-colors ${
            isFocused ? "border-toyota-red bg-white" : "border-gray-200"
          }`}
        >
          <div className="pl-3.5 pr-2 text-gray-400">
            <QrCode className="w-5 h-5 text-gray-500" />
          </div>

          <input
            ref={inputRef}
            id="barcode-scanner-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isLoading}
            autoComplete="off"
            className="w-full h-12 bg-transparent text-base font-mono font-bold text-gray-900 tracking-wider outline-none placeholder:text-gray-400 placeholder:font-sans placeholder:font-normal"
          />

          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                inputRef.current?.focus();
              }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Bersihkan input"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="pr-3 pl-1 hidden sm:flex items-center">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 text-[10px] font-bold font-mono">
              <CornerDownLeft className="w-2.5 h-2.5" />
              ENTER
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="h-12 px-5 bg-toyota-red text-white text-sm font-bold rounded-lg hover:opacity-95 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2 shrink-0 shadow-sm"
        >
          <Zap className="w-4 h-4" />
          <span>Scan / Enter</span>
        </button>
      </form>
    </div>
  );
}
