import { RsvpLandingTemplate, RsvpGuestData } from "@/components/templates/rsvp-landing-template";

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
 * Fetches guest/invitation data by token and delegates presentation to RsvpLandingTemplate.
 */
export default async function RsvpLandingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  // In production: const guest = await fetchGuestByToken(token);
  const guest = MOCK_GUEST;

  return <RsvpLandingTemplate token={token} guest={guest} />;
}
