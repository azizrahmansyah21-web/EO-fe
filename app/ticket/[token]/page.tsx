"use client";

import { use } from "react";
import { TicketTemplate, TicketGuestData } from "@/components/templates/ticket-template";

const MOCK_GUEST: TicketGuestData = {
  name: "Hendra Wijaya, S.E.",
  tokenId: "TKN-88319B-JKT",
  pax: 1,
  phone: "+62 812-7561-9011",
  event: {
    date: "Sabtu, 15 Maret 2025",
    time: "09:00 - 15:00 WIB",
    venue: "Grand Mercure Ballroom Lt. 3",
    address: "Kota Pekanbaru, Riau",
  },
  sales: {
    name: "Doni Saputra",
    phone: "0812-3456-7890",
  },
};

/**
 * ETicketPage (Page Controller)
 * Fetches confirmed ticket data and delegates UI rendering to TicketTemplate.
 */
export default function ETicketPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);

  return <TicketTemplate token={token} guest={MOCK_GUEST} />;
}
