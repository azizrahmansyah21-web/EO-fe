"use client";

import { useState } from "react";
import {
  SalesDashboardTemplate,
  SalesEventInfo,
  SalesStats,
  SalesRecentGuest,
} from "@/components/templates/sales-dashboard-template";

const MOCK_EVENT: SalesEventInfo = {
  name: "Toyota Customer Gathering & Weekend Test Drive",
  date: "Minggu, 24 Nov 2026",
  time: "09:00 - 17:00 WIB",
  location: "Grand Mercure Ballroom, Pekanbaru",
  imageUrl: null,
  isActive: true,
};

const MOCK_STATS: SalesStats = {
  totalInput: 34,
  disetujui: 26,
  menunggu: 8,
  sisaKuota: 16,
  maxKuota: 50,
};

const MOCK_RECENT_GUESTS: SalesRecentGuest[] = [
  { name: "Hendra Nugraha", phone: "0812-9844-3210", status: "disetujui" },
  { name: "Siti Rahmawati, S.E.", phone: "0813-7729-0012", status: "menunggu" },
  { name: "Bambang Sugiarto", phone: "0852-6631-8994", status: "disetujui" },
];

/**
 * SalesBerandaPage (Page Controller)
 * Fetches sales quota & assigned event data, then renders SalesDashboardTemplate.
 */
export default function SalesBerandaPage() {
  const [salesName] = useState("Doni Saputra");
  const [salesBranch] = useState("Cabang Sutomo");

  return (
    <SalesDashboardTemplate
      salesName={salesName}
      salesBranch={salesBranch}
      stats={MOCK_STATS}
      event={MOCK_EVENT}
      recentGuests={MOCK_RECENT_GUESTS}
    />
  );
}
