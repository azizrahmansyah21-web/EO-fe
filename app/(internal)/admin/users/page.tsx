"use client";

import { useState } from "react";
import {
  AdminUsersTemplate,
  AdminUserTabKey,
  AdminUserItem,
  SalesUserItem,
} from "@/components/templates/admin-users-template";

const INITIAL_ADMINS: AdminUserItem[] = [
  {
    initials: "AP",
    name: "Arya Pratama, S.Kom",
    uid: "UID: ADM-STM-01",
    email: "arya.pratama@agungtoyota.co.id",
    pwStatus: "Enkripsi Bcrypt / 2FA On",
    pwBadge: "text-emerald-700 bg-emerald-50 border-emerald-200",
    level: "Super Admin / PIC Event",
    levelBadge: "text-purple-700 bg-purple-50 border-purple-200",
    status: "Aktif",
  },
  {
    initials: "NP",
    name: "Nadia Paramitha",
    uid: "UID: ADM-STM-02",
    email: "nadia.paramitha@agungtoyota.co.id",
    pwStatus: "Enkripsi Bcrypt",
    pwBadge: "text-emerald-700 bg-emerald-50 border-emerald-200",
    level: "Field Gate Supervisor",
    levelBadge: "text-blue-700 bg-blue-50 border-blue-200",
    status: "Aktif",
  },
];

const INITIAL_SALES: SalesUserItem[] = [
  {
    initials: "DS",
    name: "Doni Saputra",
    uid: "SC-STM-041",
    email: "doni.saputra@agungtoyota.co.id",
    pwStatus: "Tersimpan",
    pwBadge: "text-gray-600 bg-gray-100 border-gray-200",
    branch: "Sutomo",
    quota: 34,
    quotaMax: 50,
    status: "Aktif",
  },
  {
    initials: "RA",
    name: "Rina Anggraini",
    uid: "SC-ARK-012",
    email: "rina.anggraini@agungtoyota.co.id",
    pwStatus: "Default Direset",
    pwBadge: "text-amber-700 bg-amber-50 border-amber-200",
    branch: "Arengka",
    quota: 48,
    quotaMax: 50,
    status: "Aktif",
  },
  {
    initials: "BH",
    name: "Budi Hartono",
    uid: "SC-SMA-008",
    email: "budi.hartono@agungtoyota.co.id",
    pwStatus: "Tersimpan",
    pwBadge: "text-gray-600 bg-gray-100 border-gray-200",
    branch: "SM Amin",
    quota: 12,
    quotaMax: 40,
    status: "Aktif",
  },
  {
    initials: "MW",
    name: "Maya Lestari",
    uid: "SC-ARK-019",
    email: "maya.lestari@agungtoyota.co.id",
    pwStatus: "Tersimpan",
    pwBadge: "text-gray-600 bg-gray-100 border-gray-200",
    branch: "Arengka",
    quota: 22,
    quotaMax: 50,
    status: "Aktif",
  },
];

/**
 * UsersPage (Page Controller)
 * Manages admin and sales user listing state and delegates presentation to AdminUsersTemplate.
 */
export default function UsersPage() {
  const [tab, setTab] = useState<AdminUserTabKey>("semua");
  const [search, setSearch] = useState("");

  const filteredAdmins = INITIAL_ADMINS.filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
  });

  const filteredSales = INITIAL_SALES.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.branch.toLowerCase().includes(q)
    );
  });

  return (
    <AdminUsersTemplate
      tab={tab}
      onTabChange={setTab}
      search={search}
      onSearchChange={setSearch}
      admins={filteredAdmins}
      sales={filteredSales}
    />
  );
}
