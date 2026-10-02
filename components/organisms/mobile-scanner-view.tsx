"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { ScannerViewfinder } from "@/components/atoms/scanner-viewfinder";
import { CrossPosStatusCards } from "@/components/molecules/cross-pos-status-cards";
import { GuestVerificationCard, GuestVerificationData } from "@/components/molecules/guest-verification-card";
import { ManualTokenModal } from "@/components/molecules/manual-token-modal";
import { Keyboard, RefreshCw, Printer, UserCheck, Gift, Utensils, CheckCircle2, AlertCircle } from "lucide-react";

interface MobileScannerViewProps {
  currentPos: 1 | 2 | 3;
  onPosChange: (pos: 1 | 2 | 3) => void;
  onScanToken: (token: string) => void;
  verifiedGuest: GuestVerificationData | null;
  onConfirmHandover: () => void;
  isProcessing?: boolean;
  quotaCount: { current: number; total: number; label: string };
  isTorchOn?: boolean;
}

export function MobileScannerView({
  currentPos,
  onPosChange,
  onScanToken,
  verifiedGuest,
  onConfirmHandover,
  isProcessing = false,
  quotaCount,
  isTorchOn = false,
}: MobileScannerViewProps) {
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;
    let isMounted = true;

    async function initCamera() {
      try {
        html5QrCode = new Html5Qrcode("mobile-camera-reader");
        scannerRef.current = html5QrCode;

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        };

        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText: string) => {
            if (isMounted) {
              onScanToken(decodedText);
              // Pause scanning briefly
              try {
                html5QrCode?.pause();
              } catch {
                // ignore
              }
            }
          },
          () => {} // ignore non-QR frames
        );
      } catch (err: unknown) {
        if (isMounted) {
          console.warn("Camera start warning:", err);
          setCameraError("Kamera tidak aktif atau izin akses ditolak. Gunakan tombol Input Manual di bawah.");
        }
      }
    }

    initCamera();

    return () => {
      isMounted = false;
      if (html5QrCode) {
        try {
          if (html5QrCode.isScanning) {
            html5QrCode.stop().catch(console.error);
          }
        } catch {
          // ignore
        }
      }
    };
  }, [onScanToken]);

  function handleScanAgain() {
    try {
      scannerRef.current?.resume();
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900 min-h-0 relative pb-16">
      {/* Top Camera Stream Viewport */}
      <div className="relative w-full h-[40vh] min-h-[260px] max-h-[380px] bg-black overflow-hidden shrink-0">
        <div id="mobile-camera-reader" className="w-full h-full object-cover"></div>

        {/* Viewfinder Reticle Overlay */}
        <ScannerViewfinder isScanning={!verifiedGuest} />

        {/* Camera Top Floating Controls */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto z-20">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-semibold backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Kamera Belakang Aktif</span>
          </div>

          <button
            type="button"
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs font-bold backdrop-blur-sm border border-white/20 active:scale-95 transition-all shadow"
          >
            <Keyboard className="w-3.5 h-3.5 text-toyota-red" />
            <span>Input Manual</span>
          </button>
        </div>

        {/* Fallback Camera Alert */}
        {cameraError && (
          <div className="absolute inset-0 bg-gray-900/90 flex flex-col items-center justify-center p-6 text-center z-10 space-y-3">
            <p className="text-white text-xs leading-relaxed max-w-xs">{cameraError}</p>
            <button
              type="button"
              onClick={() => setIsManualModalOpen(true)}
              className="px-4 py-2 bg-toyota-red text-white text-xs font-bold rounded-lg shadow"
            >
              Buka Input Manual
            </button>
          </div>
        )}
      </div>

      {/* Bottom Verification Sheet / Card */}
      <div className="flex-1 bg-gray-50 rounded-t-2xl -mt-4 z-20 overflow-y-auto p-4 space-y-4 shadow-xl">
        {/* Handle bar indicator */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto -mt-1" />

        {verifiedGuest ? (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Cross-Pos Preconditions */}
            <CrossPosStatusCards
              currentPos={currentPos}
              isGateCheckedIn={verifiedGuest.gateCheckedIn}
              gateCheckInTime={verifiedGuest.gateCheckInTime}
              isSouvenirClaimed={verifiedGuest.souvenirClaimed}
              souvenirClaimTime={verifiedGuest.souvenirClaimTime}
              isSnackClaimed={verifiedGuest.snackClaimed}
              snackClaimTime={verifiedGuest.snackClaimTime}
            />

            {/* Guest Details & Action CTA */}
            <GuestVerificationCard
              currentPos={currentPos}
              guest={verifiedGuest}
              onConfirm={() => {
                onConfirmHandover();
                handleScanAgain();
              }}
              isLoading={isProcessing}
            />

            {/* Mobile Footer Actions (Pos 1 Extras) */}
            <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
              <span className="font-bold text-gray-700">
                ● {quotaCount.current} / {quotaCount.total} {quotaCount.label}
              </span>
              <div className="flex items-center gap-2">
                {currentPos === 1 && (
                  <button
                    type="button"
                    onClick={() => alert("Simulasi cetak name tag bluetooth")}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 font-semibold text-gray-700"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Name Tag</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleScanAgain}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 font-semibold text-toyota-red"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Scan Ulang</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Ready State */
          <div className="p-8 text-center space-y-2">
            <p className="text-sm font-bold text-gray-800">
              {currentPos === 1
                ? "Siap Memindai E-Ticket Gate"
                : currentPos === 2
                ? "Siap Memindai Tiket Souvenir"
                : "Siap Memindai Tiket Snack Box"}
            </p>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Arahkan kamera ke QR Code tiket tamu atau ketuk tombol Input Manual di atas.
            </p>
            <div className="pt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                ● {quotaCount.current} / {quotaCount.total} {quotaCount.label}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Manual Input Dialog Modal */}
      <ManualTokenModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        onSubmit={(token) => {
          onScanToken(token);
        }}
      />

      {/* Bottom Pos Switcher Fixed Navigation (< lg) */}
      <nav className="fixed bottom-0 inset-x-0 h-16 bg-white border-t border-gray-200 grid grid-cols-3 z-30">
        <button
          type="button"
          onClick={() => onPosChange(1)}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPos === 1 ? "text-toyota-red font-bold" : "text-gray-500 hover:text-gray-900 font-medium"
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[11px]">Pos 1: Tamu</span>
        </button>

        <button
          type="button"
          onClick={() => onPosChange(2)}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPos === 2 ? "text-toyota-red font-bold" : "text-gray-500 hover:text-gray-900 font-medium"
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="text-[11px]">Pos 2: Souvenir</span>
        </button>

        <button
          type="button"
          onClick={() => onPosChange(3)}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            currentPos === 3 ? "text-toyota-red font-bold" : "text-gray-500 hover:text-gray-900 font-medium"
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[11px]">Pos 3: Snack</span>
        </button>
      </nav>
    </div>
  );
}
