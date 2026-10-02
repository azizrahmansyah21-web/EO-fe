import { RsvpLandingTemplate, RsvpGuestData } from "@/components/templates/rsvp-landing-template";
import { RsvpService } from "@/lib/api/rsvp-service";

const MOCK_GUEST: RsvpGuestData = {
  name: "Hendra Wijaya, S.E.",
  tokenId: "TKN-88319B-JKT",
  vip: true,
  event: {
    name: "Toyota Customer Gathering & Weekend Expo 2025",
    subtitle: "ANNUAL GATHERING",
    date: "Sabtu, 15 Maret 2025",
    time: "Pukul 09:00 – 15:00 WIB",
    venue: "Grand Mercure Ballroom Lt. 3",
    address: "Jl. Sudirman No. 45, Pekanbaru, Riau",
    imageUrl: "/toyota-event.jpg",
    deadline: "Kamis, 13 Maret 2025 pukul 18:00 WIB",
  },
  sales: {
    name: "Doni Saputra",
    branch: "Cabang Sutomo",
    phone: "0812-3456-7890",
  },
};

/**
 * RsvpLandingPage (Page Controller)
 * Fetches guest/invitation data from RsvpService by token and delegates presentation to RsvpLandingTemplate.
 */
export default async function RsvpLandingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let guestData = MOCK_GUEST;
  try {
    const res = await RsvpService.getInvitation(token);
    if (res?.success && res.guest) {
      guestData = {
        name: res.guest.name,
        tokenId: res.guest.token,
        vip: res.guest.vip,
        event: {
          name: res.event.name,
          subtitle: res.event.subtitle,
          date: res.event.date,
          time: res.event.time,
          venue: res.event.venue,
          address: res.event.address,
          imageUrl: res.event.image_url,
          deadline: res.event.deadline,
        },
        sales: {
          name: res.sales.name,
          branch: res.sales.branch,
          phone: res.sales.phone,
        },
      };
    }
  } catch (err) {
    console.warn("[RsvpLandingPage] Falling back to default guest preview data:", err);
  }

  return <RsvpLandingTemplate token={token} guest={guestData} />;
}
