"use client";

import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ScannerPage() {
  const [scanState, setScanState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    // Memastikan scanner hanya berjalan di client-side
    let html5QrCode: Html5Qrcode | null = null;

    try {
      html5QrCode = new Html5Qrcode("reader");
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      const onScanSuccess = (decodedText: string) => {
        if (html5QrCode && html5QrCode.isScanning) {
          html5QrCode.pause();
        }
        setScanState("loading");
        
        // Simulasi hit API /api/scanner/verify
        setTimeout(() => {
          setScanResult(decodedText);
          if (decodedText.length > 5) {
            setScanState("success");
          } else {
            setScanState("error");
          }
          
          setTimeout(() => {
            setScanState("idle");
            setScanResult(null);
            try {
              html5QrCode?.resume();
            } catch {
              // ignore if not paused
            }
          }, 3000);
        }, 1000);
      };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess,
        () => {} // abaikan frame tanpa QR
      ).catch((err) => {
        console.error("Gagal memulai kamera:", err);
      });
    } catch (error) {
      console.error(error);
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 text-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Scanner Kehadiran</h2>
          <p className="text-sm text-gray-500 mt-1">Arahkan kamera ke QR Code tiket tamu</p>
        </div>

        <div className="relative bg-black flex items-center justify-center overflow-hidden min-h-[400px]">
          <div id="reader" className="w-full h-full"></div>
          
          {scanState === "loading" && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
              <p className="text-white font-medium mt-4">Memverifikasi...</p>
            </div>
          )}
          {scanState === "success" && (
            <div className="absolute inset-0 bg-emerald-500/95 flex flex-col items-center justify-center z-20">
              <CheckCircle className="w-20 h-20 text-white" />
              <p className="text-white font-bold text-xl mt-4">Check-in Berhasil!</p>
              <p className="text-white/90 font-medium text-sm mt-1">Token: {scanResult}</p>
            </div>
          )}
          {scanState === "error" && (
            <div className="absolute inset-0 bg-red-500/95 flex flex-col items-center justify-center z-20">
              <AlertCircle className="w-20 h-20 text-white" />
              <p className="text-white font-bold text-xl mt-4">Tiket Tidak Valid</p>
              <p className="text-white/90 font-medium text-sm mt-1">Bisa jadi sudah di-klaim.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
