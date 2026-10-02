"use client";

import { useState } from "react";
import {
  AdminGuestsTemplate,
  AdminGuestRecord,
  AdminGuestFilterTab,
} from "@/components/templates/admin-guests-template";

const MOCK_GUESTS: AdminGuestRecord[] = [
  { no: 1, initials: "HW", name: "Hendra Wijaya, S.E.", wa: "+62 812-7561-9011", sales: "Doni Saputra", branch: "Cabang Sutomo", approval: "disetujui", statusWa: "terbaca" },
  { no: 2, initials: "MA", name: "dr. M. Arifin Syah", wa: "+62 813-6420-8821", sales: "Rian Hidayat", branch: "Cabang Sutomo", approval: "menunggu", statusWa: "belum" },
  { no: 3, initials: "SR", name: "Siti Rahmah Putri", wa: "+62 821-9984-3320", sales: "Maya Lestari", branch: "Cabang Arengka", approval: "disetujui", statusWa: "terkirim" },
  { no: 4, initials: "BL", name: "Bambang Lesmana", wa: "+62 811-7765-100", sales: "Doni Saputra", branch: "Cabang Sutomo", approval: "disetujui", statusWa: "gagal" },
  { no: 5, initials: "RH", name: "Rizal Hakim, S.T.", wa: "+62 852-9911-2244", sales: "Rina Anggraini", branch: "Cabang Arengka", approval: "menunggu", statusWa: "belum" },
  { no: 6, initials: "DF", name: "Dewi Fortuna, M.Ak.", wa: "+62 812-3344-5566", sales: "Dimas W.", branch: "Cabang SM Amin", approval: "disetujui", statusWa: "terbaca" },
  { no: 7, initials: "IP", name: "Ir. Putra Widodo", wa: "+62 811-2233-4455", sales: "Agus W.", branch: "Cabang Sutomo", approval: "hadir", statusWa: "terkirim" },
  { no: 8, initials: "NN", name: "Nurul Nisa, S.Pd.", wa: "+62 821-8877-6655", sales: "Fajar N.", branch: "Cabang SM Amin", approval: "tidak_hadir", statusWa: "gagal" },
];

/**
 * GuestsPage (Page Controller)
 * Manages guest selection, search and filter states, and renders AdminGuestsTemplate.
 */
export default function GuestsPage() {
  const [tab, setTab] = useState<AdminGuestFilterTab>("semua");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = MOCK_GUESTS.filter((g) => {
    if (tab !== "semua" && g.approval !== tab) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        g.name.toLowerCase().includes(q) ||
        g.wa.includes(q) ||
        g.sales.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleSelect = (no: number) => {
    setSelected((prev) =>
      prev.includes(no) ? prev.filter((n) => n !== no) : [...prev, no]
    );
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map((g) => g.no));
  };

  return (
    <AdminGuestsTemplate
      guests={filtered}
      totalEntries={286}
      tab={tab}
      onTabChange={setTab}
      search={search}
      onSearchChange={setSearch}
      selected={selected}
      onToggleSelect={toggleSelect}
      onToggleAll={toggleAll}
    />
  );
}
