"use client";

import { useMemo } from "react";
import {
  AdminDashboardTemplate,
  DashboardCheckinItem,
  DashboardFunnelItem,
  DashboardActiveAdmin,
  DashboardActiveSale,
} from "@/components/templates/admin-dashboard-template";
import { useBlastPolling } from "@/lib/hooks/use-blast-polling";

const MOCK_RECENT_CHECKINS: DashboardCheckinItem[] = [
  { name: "Bambang Soeharto", wa: "+62 812-4421-9901", time: "13:42:10", status: "diterima", tag: "VIP", sales: "Hendra" },
  { name: "Dr. Nadia Maharani", wa: "+62 812-8802-3114", time: "13:39:48", status: "diterima", tag: "Customer Loyal", sales: "Rina" },
  { name: "Irwan Setiawan, S.T.", wa: "+62 812-7019-8832", time: "13:35:12", status: "diterima", tag: "Fleet Prospect", sales: "Dimas" },
  { name: "Siti Fatimah", wa: "+62 812-9930-4100", time: "13:31:05", status: "tertunda", tag: "Regular", sales: "Agus W." },
  { name: "H. Muhammad Fachri", wa: "+62 812-1049-7622", time: "13:28:40", status: "diterima", tag: "VVIP", sales: "Linda" },
];

const MOCK_ACTIVE_ADMINS: DashboardActiveAdmin[] = [
  { initials: "AP", name: "Arya Pratama", role: "Lead Gate Admin" },
  { initials: "LK", name: "Linda Kusuma", role: "Desk Registration" },
];

const MOCK_ACTIVE_SALES: DashboardActiveSale[] = [
  { name: "Hendra", count: 34 },
  { name: "Rina S.", count: 31 },
  { name: "Dimas W.", count: 28 },
  { name: "Agus W.", count: 24 },
  { name: "Fajar N.", count: 22 },
];

/**
 * DashboardPage (Page Controller)
 * Fetches command center metrics, live blast progress via polling, and delegates rendering to AdminDashboardTemplate.
 */
export default function DashboardPage() {
  const { progress } = useBlastPolling({ eventId: 1, intervalMs: 3000 });

  const funnelData = useMemo<DashboardFunnelItem[]>(() => {
    const blastSent = progress?.sent_count ?? 250;
    const blastPct = progress?.progress_percent ?? 100;

    return [
      { label: "Target Tamu Undangan", value: 300, pct: 100, color: "bg-gray-800" },
      { label: "Calon Terdaftar dari Sales", value: 286, pct: 95.3, color: "bg-gray-700" },
      { label: "Disetujui Admin Operasional", value: 250, pct: 83.3, color: "bg-gray-600" },
      {
        label: `WhatsApp Blast Terkirim (E-Invitation${progress?.status === "processing" ? " - Live" : ""})`,
        value: blastSent,
        pct: blastPct,
        color: "bg-gray-500",
      },
      { label: "RSVP Konfirmasi Hadir", value: 222, pct: 88.8, color: "bg-blue-600" },
      { label: "Hadir Check-in Gate (Realisasi Aktual)", value: 184, pct: 61.3, color: "bg-toyota-red", highlight: true },
    ];
  }, [progress]);

  const lastSync = progress?.updated_at
    ? new Date(progress.updated_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB"
    : "Live Node";

  return (
    <AdminDashboardTemplate
      lastSync={lastSync}
      recentCheckins={MOCK_RECENT_CHECKINS}
      funnelData={funnelData}
      activeAdmins={MOCK_ACTIVE_ADMINS}
      activeSales={MOCK_ACTIVE_SALES}
    />
  );
}
