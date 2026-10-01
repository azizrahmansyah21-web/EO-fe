"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface RsvpHeaderProps {
  title: string;
  backHref?: string;
}

export function RsvpHeader({ title, backHref }: RsvpHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-14 flex items-center px-4 gap-3">
      {backHref ? (
        <Link
          href={backHref}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      ) : (
        <div className="w-9" />
      )}

      {/* Logo */}
      <div className="flex items-center gap-1.5">
        <div className="w-7 h-7 bg-toyota-red rounded flex items-center justify-center shrink-0">
          <span className="text-white text-[8px] font-black leading-none">AT</span>
        </div>
        <div className="hidden sm:block">
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">AGUNG</p>
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">TOYOTA</p>
        </div>
      </div>

      <h1 className="flex-1 text-center text-sm font-bold text-gray-900">{title}</h1>

      {/* Right spacer to center the title */}
      <div className="w-9 shrink-0" />
    </header>
  );
}
