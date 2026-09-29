"use client";

import { MapPin, Calendar, Clock, Loader2 } from "lucide-react";
import { useState, use } from "react";
import { useRouter } from "next/navigation";

export default function RsvpPage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const eventData = {
    guestName: "Bapak/Ibu Hadirin",
    eventName: "Grand Launching Toyota All-New Yaris Cross",
    date: "Sabtu, 14 Oktober 2026",
    time: "10:00 WIB - Selesai",
    location: "Showroom Agung Toyota Sudirman",
    mapsUrl: "#",
  };

  const handleAttend = () => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      router.push(`/ticket/${resolvedParams.token}`);
    }, 1500);
  };

  return (
    <main className="flex-1 w-full flex justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md flex flex-col items-center">
        
        <div className="mb-6 flex flex-col items-center">
          <div className="text-2xl font-black text-toyota-red tracking-tight">
            [LOGO AGUNG TOYOTA]
          </div>
        </div>

        <div className="w-full text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Halo, {eventData.guestName}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Anda diundang untuk menghadiri acara spesial kami.
          </p>
        </div>

        <div className="w-full bg-white shadow-sm rounded-lg p-6 border border-gray-100 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-6">
            {eventData.eventName}
          </h1>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Tanggal</p>
                <p className="text-sm text-gray-600">{eventData.date}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Waktu</p>
                <p className="text-sm text-gray-600">{eventData.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Lokasi</p>
                <p className="text-sm text-gray-600">{eventData.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button 
            type="button"
            disabled={loading}
            className="w-full h-12 bg-toyota-red text-white font-semibold rounded-lg shadow-sm hover:bg-toyota-dark-red active:scale-95 transition-all flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleAttend}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ya, Saya Akan Hadir"}
          </button>
          
          <button 
            type="button"
            disabled={loading}
            className="w-full h-12 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 active:scale-95 transition-all flex justify-center items-center disabled:opacity-50"
          >
            Maaf, Tidak Bisa Hadir
          </button>
        </div>
      </div>
    </main>
  );
}
