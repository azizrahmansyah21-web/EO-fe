import Link from "next/link";
import { LayoutDashboard, Calendar, Settings, QrCode } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar - App & Dashboard (R-05: Design around user decisions, not default template) */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0">
        <div className="p-6">
          <div className="text-xl font-black text-toyota-red tracking-tight">
            [LOGO AGUNG TOYOTA]
          </div>
          <p className="text-xs text-gray-500 mt-1 uppercase font-semibold">Admin Panel</p>
        </div>
        
        <nav className="px-4 pb-6 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors">
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors">
            <Calendar className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Data Event</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors">
            <Settings className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Pengaturan Global</span>
          </Link>
          <Link href="/scanner" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors mt-4 pt-4 border-t border-gray-200">
            <QrCode className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Buka Scanner</span>
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
