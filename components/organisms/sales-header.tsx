import { User } from "lucide-react";
import { ToyotaLogo } from "@/components/atoms/toyota-logo";

/**
 * SalesHeader: Top bar for Sales Portal.
 * Shows Toyota logo, SALES badge, and user avatar icon.
 * Matches mockup header structure.
 */

interface SalesHeaderProps {
  subtitle?: string;
}

export function SalesHeader({ subtitle = "Beranda" }: SalesHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-14 px-4 max-w-screen-lg mx-auto">
        <div className="flex items-center gap-2.5">
          <ToyotaLogo size="xs" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-gray-900 tracking-tight uppercase">
                Agung Toyota
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-lg bg-red-50 text-toyota-red border border-red-200 text-[10px] font-bold uppercase tracking-wider">
                Sales
              </span>
            </div>
            {subtitle && (
              <span className="text-[11px] text-gray-500 font-medium -mt-0.5">{subtitle}</span>
            )}
          </div>
        </div>

        <button
          type="button"
          className="w-8 h-8 rounded-full bg-toyota-red text-white flex items-center justify-center shrink-0"
          aria-label="Profil pengguna"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
