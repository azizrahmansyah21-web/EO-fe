"use client";

import { useEffect } from "react";
import { BarcodeInputBox } from "@/components/molecules/barcode-input-box";
import { CrossPosStatusCards } from "@/components/molecules/cross-pos-status-cards";
import { GuestVerificationCard, GuestVerificationData } from "@/components/molecules/guest-verification-card";
import { StockProgressBar } from "@/components/atoms/stock-progress-bar";
import { RecentScanItem, ScanFeedItem } from "@/components/molecules/recent-scan-item";
import { Wifi, Keyboard } from "lucide-react";

interface DesktopTerminalViewProps {
  currentPos: 1 | 2 | 3;
  inputToken: string;
  onInputChange: (val: string) => void;
  onSearchToken: (token: string) => void;
  verifiedGuest: GuestVerificationData | null;
  onConfirmHandover: () => void;
  isProcessing?: boolean;
  quotaStats: {
    label: string;
    subLabel: string;
    current: number;
    total: number;
    unit: string;
    badgeText: string;
    badgeVariant: "red" | "green" | "gray";
  };
  feedItems: ScanFeedItem[];
}

export function DesktopTerminalView({
  currentPos,
  inputToken,
  onInputChange,
  onSearchToken,
  verifiedGuest,
  onConfirmHandover,
  isProcessing = false,
  quotaStats,
  feedItems,
}: DesktopTerminalViewProps) {
  // Global keyboard shortcuts for terminal:
  // ENTER -> Trigger confirm if guest is verified
  // ESC -> Clear input and refocus
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onInputChange("");
        document.getElementById("barcode-scanner-input")?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onInputChange]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Main 2-Column Content */}
      <div className="flex-1 overflow-y-auto p-6 max-w-screen-2xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input + Verification + Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* USB Barcode Input Box */}
            <BarcodeInputBox
              value={inputToken}
              onChange={onInputChange}
              onSubmit={onSearchToken}
              isLoading={isProcessing}
              label={
                currentPos === 1
                  ? "Pindai QR / Kode E-Ticket"
                  : currentPos === 2
                  ? "Pindai Barcode / QR ID Tamu"
                  : "Pindai QR / Barcode E-Badge Tamu"
              }
              subLabel="Auto-Detect Buffer Siap"
              placeholder={
                currentPos === 1
                  ? "Contoh: TKT-AGUNG-2025-0891"
                  : "Contoh: TKN-88319B-JKT"
              }
            />

            {/* Verification & Cross-Pos Status Cards */}
            {verifiedGuest ? (
              <div className="space-y-4">
                <CrossPosStatusCards
                  currentPos={currentPos}
                  isGateCheckedIn={verifiedGuest.gateCheckedIn}
                  gateCheckInTime={verifiedGuest.gateCheckInTime}
                  isSouvenirClaimed={verifiedGuest.souvenirClaimed}
                  souvenirClaimTime={verifiedGuest.souvenirClaimTime}
                  isSnackClaimed={verifiedGuest.snackClaimed}
                  snackClaimTime={verifiedGuest.snackClaimTime}
                />

                <GuestVerificationCard
                  currentPos={currentPos}
                  guest={verifiedGuest}
                  onConfirm={onConfirmHandover}
                  isLoading={isProcessing}
                />
              </div>
            ) : (
              /* Idle Prompt Card */
              <div className="bg-white rounded-lg border-2 border-dashed border-gray-200 p-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <Keyboard className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-800">Menunggu Input Scanner USB</p>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 leading-relaxed">
                    Arahkan scanner barcode gun ke e-ticket atau ketikkan kode ID tamu lalu tekan tombol Enter.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Quota / Stock & Live Logs (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quota / Stock Widget */}
            <StockProgressBar
              label={quotaStats.label}
              subLabel={quotaStats.subLabel}
              current={quotaStats.current}
              total={quotaStats.total}
              unit={quotaStats.unit}
              badgeText={quotaStats.badgeText}
              badgeVariant={quotaStats.badgeVariant}
            />

            {/* Realtime Live Feed */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    {currentPos === 1
                      ? "Live Log Kedatangan"
                      : currentPos === 2
                      ? "Log Penyerahan Terakhir"
                      : "Log Penyerahan Snack Terkini"}
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Real-time
                </span>
              </div>

              <div className="divide-y divide-gray-50 -mx-2">
                {feedItems.slice(0, 5).map((item) => (
                  <RecentScanItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Footer Bar */}
      <footer className="h-10 bg-white border-t border-gray-200 px-6 flex items-center justify-between text-xs text-gray-500 shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">Shortcut Terminal:</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px]">
            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-700 font-bold">ENTER</kbd>
            <span>Serahkan &amp; Tandai</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px]">
            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-700 font-bold">ESC</kbd>
            <span>Fokus Scan Ulang</span>
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
            <Wifi className="w-3.5 h-3.5" />
            Jaringan Dealer Terhubung
          </span>
          <span className="text-gray-400">ID Terminal: POS-JKT-0{currentPos}</span>
        </div>
      </footer>
    </div>
  );
}
