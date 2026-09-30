import { SalesHeader } from "@/components/ui/sales-header";
import { BottomNav } from "@/components/ui/bottom-nav";

/**
 * Sales Portal Layout.
 * Mobile: sticky header + content + bottom nav (with scroll padding).
 * Desktop: sidebar navigation replaces bottom nav.
 */

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SalesHeader />

      {/* Desktop sidebar + content wrapper */}
      <div className="flex-1 flex flex-col md:flex-row max-w-screen-xl mx-auto w-full">
        {/* Desktop Sidebar (hidden on mobile, bottom nav handles it) */}
        <aside className="hidden md:flex md:flex-col md:w-56 md:shrink-0 md:border-r md:border-gray-200 md:bg-white md:py-6 md:px-4 md:gap-1">
          <a
            href="/sales"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Beranda
          </a>
          <a
            href="/sales/guests"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Daftar Tamu
          </a>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pb-20 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
