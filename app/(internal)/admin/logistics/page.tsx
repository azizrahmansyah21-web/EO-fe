"use client";

import {
  AdminLogisticsTemplate,
  LogisticsSouvenirItem,
  LogisticsSnackItem,
  LogisticsBudgetCategory,
  LogisticsDistribution,
} from "@/components/templates/admin-logistics-template";

const SOUVENIR_ITEMS: LogisticsSouvenirItem[] = [
  {
    name: "Executive Leather Tumbler & Car Keychain Set",
    type: "Merchandise Premium Toyota",
    batch: "AGG-TOYOTA-JKT-01",
    jumlah: 250,
    harga: 75000,
    used: 184,
  },
];

const SNACK_ITEMS: LogisticsSnackItem[] = [
  {
    name: "Paket Snack Box Artisan & Mineral Water Box",
    type: "Konsumsi Tamu Undangan",
    catering: "Grand Mercure Sutomo Bakery",
    jumlah: 300,
    harga: 35000,
    used: 184,
  },
];

const BUDGET_BREAKDOWN: LogisticsBudgetCategory[] = [
  { category: "Venue & Hall", sub: "Grand Mercure Ballroom", value: 22000000, status: "Lunas 100%", statusColor: "text-emerald-600", note: "Verified" },
  { category: "Multimedia & AV", sub: "Sound System & Videotron LED P3", value: 12500000, status: "Vendor: Sinar Visual Prima", statusColor: "text-gray-500", note: "Installed" },
  { category: "Stage & Atmosphere", sub: "Dekorasi & Gate Registration", value: 5500000, status: "Archway + 3 Stand Scanner", statusColor: "text-gray-500", note: "Ready" },
  { category: "Digital Broadcasting", sub: "Kuota API WhatsApp Blast Gateway", value: 2150000, status: "Meta Cloud Tier-2 SLA", statusColor: "text-gray-500", note: "Active Sync" },
];

const DISTRIBUTION: LogisticsDistribution[] = [
  { label: "Sewa Venue", pct: 52.2, color: "bg-toyota-red" },
  { label: "Sound & LED", pct: 29.6, color: "bg-gray-700" },
  { label: "Dekorasi & Booth", pct: 13.0, color: "bg-gray-400" },
  { label: "WA Gateway", pct: 5.1, color: "bg-emerald-500" },
];

/**
 * LogisticsPage (Page Controller)
 * Fetches event logistics records, budget allocations, and renders AdminLogisticsTemplate.
 */
export default function LogisticsPage() {
  return (
    <AdminLogisticsTemplate
      souvenirs={SOUVENIR_ITEMS}
      snacks={SNACK_ITEMS}
      budgetCategories={BUDGET_BREAKDOWN}
      distribution={DISTRIBUTION}
    />
  );
}
