"use client";

import { useState } from "react";
import {
  SalesGuestsTemplate,
  SalesGuestItem,
  FilterTab,
} from "@/components/templates/sales-guests-template";

const MOCK_GUESTS: SalesGuestItem[] = [
  { name: "Hendra Wijaya", phone: "0812-3456-7890", status: "disetujui" },
  { name: "Siska Amelia", phone: "0811-2345-8899", status: "disetujui" },
  { name: "Bambang Sutrisno", phone: "0852-1122-6780", status: "menunggu" },
  { name: "Dr. Irwan Siregar", phone: "0812-6677-8899", status: "disetujui" },
  { name: "Dewi Kartika", phone: "0821-4477-9011", status: "menunggu" },
];

/**
 * SalesGuestsPage (Page Controller)
 * Handles search query and filter state, and renders SalesGuestsTemplate.
 */
export default function SalesGuestsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuests = MOCK_GUESTS.filter((g) => {
    if (activeTab !== "semua" && g.status !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return g.name.toLowerCase().includes(q) || g.phone.includes(q);
    }
    return true;
  });

  const tabCounts = {
    semua: MOCK_GUESTS.length,
    disetujui: MOCK_GUESTS.filter((g) => g.status === "disetujui").length,
    menunggu: MOCK_GUESTS.filter((g) => g.status === "menunggu").length,
  };

  return (
    <SalesGuestsTemplate
      guests={filteredGuests}
      totalCount={MOCK_GUESTS.length}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      tabCounts={tabCounts}
    />
  );
}
