"use client";

import Link from "next/link";
import { ArrowLeft, Download, CheckCircle, XCircle } from "lucide-react";
import { useParams } from "next/navigation";

export default function EventDetail() {
  const params = useParams();
  
  const mockGuests = [
    { id: 1, name: "Budi Santoso", phone: "08123456789", rsvp: "Hadir", checkedIn: true },
    { id: 2, name: "Siti Aminah", phone: "08987654321", rsvp: "Hadir", checkedIn: false },
    { id: 3, name: "Joko Anwar", phone: "08111222333", rsvp: "Tidak Hadir", checkedIn: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/events" className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Event</h1>
            <p className="text-sm text-gray-500 mt-1">Daftar tamu dan status kehadiran.</p>
          </div>
        </div>
        <button className="h-12 bg-white border border-gray-300 text-gray-700 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 w-fit">
          <Download className="w-5 h-5" />
          Export Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total RSVP Hadir</p>
          <p className="text-3xl font-bold text-gray-900">45</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Check-In (Di Lokasi)</p>
          <p className="text-3xl font-bold text-emerald-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Sisa Kuota</p>
          <p className="text-3xl font-bold text-toyota-red">55</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="font-semibold text-gray-900">Daftar Tamu</h3>
          <input type="text" placeholder="Cari nama tamu..." className="h-10 border border-gray-300 rounded-md px-3 text-sm outline-none focus:ring-2 focus:ring-toyota-red w-full max-w-xs" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500 font-medium bg-white">
                <th className="p-4">Nama</th>
                <th className="p-4">No. HP</th>
                <th className="p-4">Status RSVP</th>
                <th className="p-4">Check-in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{guest.name}</td>
                  <td className="p-4 text-gray-600">{guest.phone}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${guest.rsvp === 'Hadir' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {guest.rsvp}
                    </span>
                  </td>
                  <td className="p-4">
                    {guest.checkedIn ? (
                      <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                        <CheckCircle className="w-5 h-5" /> Sudah
                      </div>
                    ) : guest.rsvp === 'Hadir' ? (
                      <button className="text-sm font-semibold text-toyota-red hover:text-toyota-dark-red bg-red-50 px-3 py-1.5 rounded-md transition-colors">
                        Manual Check-in
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400 font-medium text-sm">
                        <XCircle className="w-5 h-5" /> Batal
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
