"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { RsvpConfirmTemplate, RsvpConfirmGuest } from "@/components/templates/rsvp-confirm-template";
import { RsvpService } from "@/lib/api/rsvp-service";

const MOCK_GUEST: RsvpConfirmGuest = {
  name: "Hendra Wijaya, S.E.",
  tokenId: "TKN-88319B-JKT",
  vip: true,
  event: {
    name: "Toyota Customer Gathering 2025 • Ballroom Agung Toyota",
    date: "Sabtu, 29 Maret 2025",
    time: "09:00 WIB",
  },
};

const QUOTA_OPTIONS = [
  "Hanya Saya Sendiri (1 Orang)",
  "Saya + 1 Pendamping (2 Orang)",
  "Saya + 2 Pendamping (3 Orang)",
];

/**
 * RsvpConfirmPage (Controller)
 * Manages form state, calls RsvpService.confirmRsvp, and delegates UI presentation to RsvpConfirmTemplate.
 */
export default function RsvpConfirmPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();
  const [attendance, setAttendance] = useState<"hadir" | "tidak" | null>("hadir");
  const [quota, setQuota] = useState(QUOTA_OPTIONS[0]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!attendance) return;
    setLoading(true);

    const paxMatch = quota.match(/\d+/);
    const pax = paxMatch ? parseInt(paxMatch[0], 10) : 1;

    try {
      const res = await RsvpService.confirmRsvp(token, {
        attendance,
        pax,
      });
      router.push(res.redirect_url || (attendance === "hadir" ? `/ticket/${token}` : `/rsvp/${token}`));
    } catch (err: any) {
      console.error("[RSVP Confirm Error]", err);
      // Fallback redirect for offline demo
      if (attendance === "hadir") {
        router.push(`/ticket/${token}`);
      } else {
        router.push(`/rsvp/${token}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <RsvpConfirmTemplate
      token={token}
      guest={MOCK_GUEST}
      attendance={attendance}
      onAttendanceChange={setAttendance}
      quota={quota}
      onQuotaChange={setQuota}
      quotaOptions={QUOTA_OPTIONS}
      onSubmit={handleSubmit}
      isLoading={loading}
    />
  );
}
