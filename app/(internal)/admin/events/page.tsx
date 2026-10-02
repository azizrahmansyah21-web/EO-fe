"use client";

import { useState } from "react";
import {
  AdminEventsTemplate,
  AdminEventItem,
  AdminEventsTabKey,
} from "@/components/templates/admin-events-template";

const MOCK_EVENTS: AdminEventItem[] = [
  {
    id: "EVT-2025-11-01",
    name: "Toyota Customer Gathering & Weekend Expo 2025",
    shortId: "EVT-2025-11-01",
    date: "24 Nov 2025, 09:00 WIB",
    duration: "8 Jam (09:00 - 17:00)",
    type: "Customer Gathering",
    location: "Grand Mercure Ballroom, Pekanbaru",
    pic: "Arya Pratama",
    picRole: "Marcom Lead",
    target: 300,
    confirmed: 222,
    attended: 184,
    kpi: "45 SPK",
    status: "aktif",
  },
  {
    id: "EVT-2025-11-02",
    name: "Showroom Weekend Super Deal Sutomo",
    shortId: "EVT-2025-11-02",
    date: "29 Nov 2025, 08:30 WIB",
    duration: "6 Jam (08:30 - 14:30)",
    type: "Showroom Event",
    location: "Agung Toyota Sutomo B",
    pic: "Budi Santoso",
    picRole: "Branch Sales Spv",
    target: 150,
    confirmed: 98,
    attended: 0,
    kpi: "20 SPK",
    status: "aktif",
  },
  {
    id: "EVT-2025-12-03",
    name: "GR Yaris & Hilux Rangga Experiential Expo",
    shortId: "EVT-2025-12-03",
    date: "05 Des 2025, 10:00 WIB",
    duration: "7 Jam (10:00 - 17:00)",
    type: "Test Drive Expo",
    location: "SKA Mall Outdoor Circuit",
    pic: "Rizky Handoko",
    picRole: "Senior Product Trainer",
    target: 200,
    confirmed: 54,
    attended: 0,
    kpi: "30 SPK",
    status: "draft",
  },
  {
    id: "EVT-2025-10-18",
    name: "Corporate Fleet Meet & Commercial Vehicle Roadshow",
    shortId: "EVT-2025-10-18",
    date: "18 Okt 2025, 09:00 WIB",
    duration: "5 Jam (09:00 - 14:00)",
    type: "Corporate Fleet Meet",
    location: "The Premiere Hotel Pekanbaru",
    pic: "Citra Melinda",
    picRole: "Corporate Account Mgr",
    target: 80,
    confirmed: 75,
    attended: 72,
    kpi: "Final",
    status: "selesai",
  },
];

/**
 * EventsPage (Page Controller)
 * Manages search, tab state, and renders AdminEventsTemplate.
 */
export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<AdminEventsTabKey>("semua");
  const [search, setSearch] = useState("");

  const filteredEvents = MOCK_EVENTS.filter((evt) => {
    if (activeTab !== "semua" && evt.status !== activeTab) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        evt.name.toLowerCase().includes(q) ||
        evt.location.toLowerCase().includes(q) ||
        evt.pic.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const tabCounts = {
    semua: MOCK_EVENTS.length,
    aktif: MOCK_EVENTS.filter((e) => e.status === "aktif").length,
    draft: MOCK_EVENTS.filter((e) => e.status === "draft").length,
    selesai: MOCK_EVENTS.filter((e) => e.status === "selesai").length,
  };

  return (
    <AdminEventsTemplate
      events={filteredEvents}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      search={search}
      onSearchChange={setSearch}
      tabCounts={tabCounts}
    />
  );
}
