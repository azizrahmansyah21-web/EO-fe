import { CheckCircle2, Clock, AlertTriangle, Gift, Coffee, Info } from "lucide-react";

interface CrossPosStatusCardsProps {
  currentPos: 1 | 2 | 3;
  isGateCheckedIn: boolean;
  gateCheckInTime?: string;
  isSouvenirClaimed: boolean;
  souvenirClaimTime?: string;
  isSnackClaimed: boolean;
  snackClaimTime?: string;
}

export function CrossPosStatusCards({
  currentPos,
  isGateCheckedIn,
  gateCheckInTime = "10:42 WIB",
  isSouvenirClaimed,
  souvenirClaimTime = "10:45 WIB",
  isSnackClaimed,
  snackClaimTime = "10:50 WIB",
}: CrossPosStatusCardsProps) {
  // Pos 1 Gate View
  if (currentPos === 1) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-bold text-emerald-900 uppercase tracking-tight">
              Check-In Berhasil • Gate 1
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700">{gateCheckInTime}</span>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed">
          Data tiket valid &amp; terverifikasi resmi. Hak akses untuk Pos 2 (Souvenir) dan Pos 3 (Snack) otomatis terbuka.
        </p>

        <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-2 flex-wrap text-xs font-semibold text-emerald-900">
          <span className="text-emerald-700">Akses Logistik Otomatis:</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-800">
            <Gift className="w-3 h-3 text-emerald-600" />
            Pos 2 (Souvenir) ✓
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-800">
            <Coffee className="w-3 h-3 text-emerald-600" />
            Pos 3 (Snack) ✓
          </span>
        </div>
      </div>
    );
  }

  // Pos 2 Souvenir View
  if (currentPos === 2) {
    return (
      <div className="space-y-2.5">
        {/* Gate 1 Precondition Banner */}
        {isGateCheckedIn ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <p className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                  Prasyarat Gate 1 Lolos (Sudah Check-In)
                </p>
                <span className="text-xs font-mono font-bold text-emerald-700">{gateCheckInTime}</span>
              </div>
              <p className="text-xs text-emerald-700 mt-0.5">
                Tamu telah diverifikasi resmi oleh Gate 1. Layak menerima paket souvenir.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3.5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-toyota-red shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-red-900 uppercase tracking-wide">
                Prasyarat Belum Terpenuhi
              </p>
              <p className="text-xs text-red-700 mt-0.5">
                Tamu belum melakukan check-in di Gate 1. Arahkan tamu ke meja registrasi utama terlebih dahulu.
              </p>
            </div>
          </div>
        )}

        {/* Flexible sequence notice */}
        <div className="flex items-center gap-2 bg-blue-50/80 border border-blue-200/80 rounded-lg px-3 py-2 text-xs text-blue-800">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Alur fleksibel: Tamu bebas mengambil suvenir atau snack duluan setelah Gate 1.</span>
        </div>
      </div>
    );
  }

  // Pos 3 Snack View
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Gate 1 Precondition */}
        <div
          className={`rounded-lg border p-3 flex items-start gap-2.5 ${
            isGateCheckedIn
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          <CheckCircle2
            className={`w-4 h-4 shrink-0 mt-0.5 ${
              isGateCheckedIn ? "text-emerald-600" : "text-toyota-red"
            }`}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wide">Prasyarat Gate 1</span>
              {isGateCheckedIn && (
                <span className="text-[10px] font-mono text-emerald-700">{gateCheckInTime}</span>
              )}
            </div>
            <p className="text-xs mt-0.5 font-medium">
              {isGateCheckedIn ? "Terverifikasi Hadir (Gate Utama)" : "Belum Check-In di Gate"}
            </p>
          </div>
        </div>

        {/* Pos 2 Souvenir Status */}
        <div
          className={`rounded-lg border p-3 flex items-start gap-2.5 ${
            isSouvenirClaimed
              ? "bg-blue-50 border-blue-200 text-blue-900"
              : "bg-gray-50 border-gray-200 text-gray-700"
          }`}
        >
          <Gift
            className={`w-4 h-4 shrink-0 mt-0.5 ${
              isSouvenirClaimed ? "text-blue-600" : "text-gray-400"
            }`}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wide">Status Pos 2</span>
              {isSouvenirClaimed && (
                <span className="text-[10px] font-mono text-blue-700">{souvenirClaimTime}</span>
              )}
            </div>
            <p className="text-xs mt-0.5 font-medium">
              {isSouvenirClaimed ? "Souvenir Sudah Diambil" : "Souvenir Belum Diambil"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
