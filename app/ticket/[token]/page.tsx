"use client";

import { Calendar, Clock, MapPin, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { use } from "react";

export default function TicketPage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = use(params);

  return (
    <main className="flex-1 w-full flex justify-center p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md flex flex-col items-center">
        
        <div className="mb-6 flex flex-col items-center">
          <div className="text-2xl font-black text-toyota-red tracking-tight">
            [LOGO AGUNG TOYOTA]
          </div>
        </div>

        <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-toyota-red p-6 text-center text-white">
            <h2 className="text-xl font-bold mb-1">E-Ticket Anda</h2>
            <p className="text-sm opacity-90">Tingkatkan kecerahan layar saat registrasi</p>
          </div>

          <div className="p-8 flex flex-col items-center border-b border-gray-100">
            <div className="p-4 bg-white rounded-lg mb-4 border-2 border-gray-100">
              <QRCodeSVG 
                value={resolvedParams.token} 
                size={200}
                level="H"
                includeMargin={false}
              />
            </div>
            <p className="font-mono text-lg font-bold text-gray-900 tracking-widest uppercase">{resolvedParams.token.substring(0, 8)}</p>
            <p className="text-sm text-gray-500 mt-1">Bapak/Ibu Hadirin</p>
          </div>

          <div className="p-6 space-y-4 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 mb-2">Grand Launching Toyota All-New Yaris Cross</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                <p className="text-sm text-gray-600">Sabtu, 14 Oktober 2026</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                <p className="text-sm text-gray-600">10:00 WIB - Selesai</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                <p className="text-sm text-gray-600">Showroom Agung Toyota Sudirman</p>
              </div>
            </div>
          </div>
        </div>

        <button className="mt-6 flex items-center justify-center gap-2 w-full h-12 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all">
          <Download className="w-5 h-5" />
          Simpan Tiket (Screenshot)
        </button>
      </div>
    </main>
  );
}
