import Link from "next/link";
import { Plus, Users } from "lucide-react";

export default function EventsPage() {
  // Simulasi data
  const mockEvents = [
    {
      id: 1,
      name: "Grand Launching Toyota All-New Yaris Cross",
      date: "14 Okt 2026",
      guestsCount: 45,
      quota: 100
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Event</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola semua acara Toyota di sini.</p>
        </div>
        <Link href="/admin/events/create" className="h-12 bg-toyota-red text-white px-6 rounded-lg font-semibold hover:bg-toyota-dark-red transition-all flex items-center gap-2 w-fit">
          <Plus className="w-5 h-5" />
          Buat Event
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 font-medium">
              <th className="p-4">Nama Event</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Tamu (Hadir/Kuota)</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{event.name}</td>
                <td className="p-4 text-gray-600">{event.date}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{event.guestsCount} / {event.quota}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/events/${event.id}`} className="text-sm font-semibold text-toyota-red hover:text-toyota-dark-red">
                      Detail & Tamu
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
