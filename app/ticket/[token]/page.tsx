"use client";

import { use, useEffect, useState } from "react";
import { TicketTemplate, TicketGuestData } from "@/components/templates/ticket-template";
import { RsvpService } from "@/lib/api/rsvp-service";

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
 * Fetches confirmed ticket data from RsvpService and delegates UI rendering to TicketTemplate.
 */
export default function ETicketPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [ticketData, setTicketData] = useState<TicketGuestData>(MOCK_GUEST);

  useEffect(() => {
    async function loadTicket() {
      try {
        const res = await RsvpService.getTicket(token);
        if (res?.success && res.ticket) {
          setTicketData({
            name: res.ticket.name,
            tokenId: res.ticket.token,
            pax: res.ticket.pax,
            phone: res.ticket.phone,
            event: {
              date: res.ticket.event.date,
              time: res.ticket.event.time,
              venue: res.ticket.event.venue,
              address: res.ticket.event.address,
            },
            sales: {
              name: res.ticket.sales.name,
              phone: res.ticket.sales.phone,
            },
          });
        }
      } catch (err) {
        console.warn("[ETicketPage] Using local fallback ticket data:", err);
      }
    }

    loadTicket();
  }, [token]);

  return <TicketTemplate token={token} guest={ticketData} />;
}
