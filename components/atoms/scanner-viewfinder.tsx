import { QrCode } from "lucide-react";

interface ScannerViewfinderProps {
  guideText?: string;
  isScanning?: boolean;
}

export function ScannerViewfinder({
  guideText = "Arahkan ke QR E-Ticket Tamu",
  isScanning = true,
}: ScannerViewfinderProps) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 z-10">
      {/* Target Box with 4 Toyota-Red Corner Brackets */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* Top-Left Bracket */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-toyota-red rounded-tl-lg" />
        {/* Top-Right Bracket */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-toyota-red rounded-tr-lg" />
        {/* Bottom-Left Bracket */}
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-toyota-red rounded-bl-lg" />
        {/* Bottom-Right Bracket */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-toyota-red rounded-br-lg" />

        {/* Center Target Reticle */}
        <div className="relative w-20 h-20 border border-red-500/40 rounded-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-toyota-red/80 rounded-sm" />
          {/* Subtle scanning laser line */}
          {isScanning && (
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-toyota-red to-transparent animate-pulse" />
          )}
        </div>
      </div>

      {/* Guide text badge */}
      <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 text-white text-xs font-semibold backdrop-blur-sm shadow">
        <QrCode className="w-3.5 h-3.5 text-toyota-red" />
        <span>{guideText}</span>
      </div>
    </div>
  );
}
