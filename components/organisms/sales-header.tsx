import { User } from "lucide-react";

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
        <div className="flex items-center gap-3">
          <span className="text-base font-black text-gray-900 tracking-tight uppercase">
            Agung Toyota
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-toyota-red text-white text-[10px] font-bold uppercase tracking-wider">
            Sales
          </span>
        </div>

        <button
          type="button"
          className="w-9 h-9 rounded-lg bg-toyota-red text-white flex items-center justify-center"
          aria-label="Profil pengguna"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
      {subtitle && (
        <div className="px-4 pb-2 max-w-screen-lg mx-auto">
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      )}
    </header>
  );
}
