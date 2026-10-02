"use client";

import { useState, useEffect, useCallback } from "react";
import { ScannerHeader } from "@/components/organisms/scanner-header";
import { DesktopTerminalView } from "@/components/organisms/desktop-terminal-view";
import { MobileScannerView } from "@/components/organisms/mobile-scanner-view";
import { GuestVerificationData } from "@/components/molecules/guest-verification-card";
import { ScanFeedItem } from "@/components/molecules/recent-scan-item";
import { soundController } from "@/components/atoms/audio-chime";

// Realistic Mock Database of Event Attendees
const INITIAL_GUESTS: Record<string, GuestVerificationData> = {
  "TKN-88319B-JKT": {
    tokenId: "TKN-88319B-JKT",
    name: "Hendra Wijaya, S.E.",
    company: "PT Mega Nusantara Logistik",
    title: "Direktur Utama",
    phone: "+62 812-7561-9011",
    vip: true,
    vipTier: "VVIP",
    pax: 1,
    salesPic: "Doni Saputra",
    carModel: "Innova Zenix HEV",
    gateCheckedIn: true,
    gateCheckInTime: "10:42 WIB",
    souvenirClaimed: false,
    snackClaimed: false,
  },
  "TKT-AGUNG-2025-0891": {
    tokenId: "TKT-AGUNG-2025-0891",
    name: "Hendra Wijaya, S.E.",
    company: "PT Mega Nusantara Logistik",
    title: "Direktur Utama",
    phone: "0812-8899-7721",
    vip: true,
    vipTier: "VVIP",
    pax: 1,
    salesPic: "Doni Saputra",
    carModel: "Innova Zenix HEV",
    gateCheckedIn: false,
    souvenirClaimed: false,
    snackClaimed: false,
  },
  "TKN-44219A-JKT": {
    tokenId: "TKN-44219A-JKT",
    name: "Bambang Soeharto",
    company: "PT Duta Mandiri",
    title: "Komisaris",
    phone: "+62 812-4421-9901",
    vip: true,
    vipTier: "VVIP",
    pax: 2,
    salesPic: "Hendra Nugraha",
    carModel: "Alphard Hybrid",
    gateCheckedIn: true,
    gateCheckInTime: "10:35 WIB",
    souvenirClaimed: true,
    souvenirClaimTime: "10:38 WIB",
    snackClaimed: false,
  },
  "TKN-88023C-JKT": {
    tokenId: "TKN-88023C-JKT",
    name: "Dr. Nadia Maharani",
    company: "RS Awal Bros",
    title: "Spesialis Anak",
    phone: "+62 812-8802-3114",
    vip: true,
    vipTier: "VIP",
    pax: 1,
    salesPic: "Rina S.",
    carModel: "Yaris Cross HEV",
    gateCheckedIn: true,
    gateCheckInTime: "10:28 WIB",
    souvenirClaimed: true,
    souvenirClaimTime: "10:30 WIB",
    snackClaimed: true,
    snackClaimTime: "10:32 WIB",
  },
};

export default function MasterScannerPage() {
  const [currentPos, setCurrentPos] = useState<1 | 2 | 3>(1);
  const [isDesktopView, setIsDesktopView] = useState(true);
  const [inputToken, setInputToken] = useState("");
  const [guests, setGuests] = useState(INITIAL_GUESTS);
  const [verifiedGuest, setVerifiedGuest] = useState<GuestVerificationData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);

  // Quota & Stock State
  const [quotas, setQuotas] = useState({
    pos1: { current: 184, total: 300 },
    pos2: { current: 184, total: 250 },
    pos3: { current: 184, total: 300 },
  });

  // Feeds per Pos
  const [pos1Feed, setPos1Feed] = useState<ScanFeedItem[]>([
    { id: "1", name: "Hendra Wijaya, S.E.", initials: "HW", subtitle: "Sales: Doni Saputra • VVIP", timestamp: "10:42 WIB", badge: "SUKSES", badgeVariant: "green" },
    { id: "2", name: "Rian Gunawan, M.T.", initials: "RG", subtitle: "Sales: Anita Lestari • Reguler", timestamp: "10:38 WIB", badge: "SUKSES", badgeVariant: "green" },
    { id: "3", name: "Dra. Maya Indrawati", initials: "MI", subtitle: "Sales: Kevin Pratama • Priority", timestamp: "10:31 WIB", badge: "SUKSES", badgeVariant: "green" },
    { id: "4", name: "Bambang Haryanto", initials: "BH", subtitle: "Sales: Doni Saputra • Reguler", timestamp: "10:24 WIB", badge: "SUKSES", badgeVariant: "green" },
    { id: "5", name: "Ir. Teddy Kurniawan", initials: "TK", subtitle: "Sales: Doni Saputra • VVIP", timestamp: "10:15 WIB", badge: "SUKSES", badgeVariant: "green" },
  ]);

  const [pos2Feed, setPos2Feed] = useState<ScanFeedItem[]>([
    { id: "1", name: "Bambang Hartono", initials: "BH", subtitle: "Tumbler & Key Pouch", timestamp: "10:48 WIB", badge: "SUKSES", badgeVariant: "green" },
    { id: "2", name: "drg. Ratna Dewi Susanti", initials: "RD", subtitle: "Tumbler & Key Pouch", timestamp: "10:45 WIB", badge: "SUKSES", badgeVariant: "green" },
    { id: "3", name: "Ir. Hadi Gunawan", initials: "HG", subtitle: "Tumbler & Key Pouch", timestamp: "10:41 WIB", badge: "SUKSES", badgeVariant: "green" },
    { id: "4", name: "Kevin Pratama, M.B.A.", initials: "KP", subtitle: "Tumbler & Key Pouch", timestamp: "10:37 WIB", badge: "SUKSES", badgeVariant: "green" },
  ]);

  const [pos3Feed, setPos3Feed] = useState<ScanFeedItem[]>([
    { id: "1", name: "Rudi Hermawan", initials: "RH", subtitle: "TKN-99201A • 1x Snack Box", timestamp: "10:48 WIB", badge: "SUKSES", badgeVariant: "green" },
    { id: "2", name: "Dr. Anita Siregar", initials: "AS", subtitle: "TKN-33104C • 1x Snack Box", timestamp: "10:46 WIB", badge: "SUKSES", badgeVariant: "green" },
    { id: "3", name: "Bambang S. (PT Adhi)", initials: "BS", subtitle: "TKN-55208F • 1x Snack Box", timestamp: "10:43 WIB", badge: "SUKSES", badgeVariant: "green" },
    { id: "4", name: "Siti Nurhaliza", initials: "SN", subtitle: "TKN-44910B • 1x Snack Box", timestamp: "10:35 WIB", badge: "SUKSES", badgeVariant: "green" },
  ]);

  // Initial Responsive Screen Check
  useEffect(() => {
    function checkWidth() {
      if (typeof window !== "undefined") {
        setIsDesktopView(window.innerWidth >= 1024);
      }
    }
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // When changing Pos, reset search state
  const handlePosChange = (pos: 1 | 2 | 3) => {
    setCurrentPos(pos);
    setInputToken("");
    setVerifiedGuest(null);
  };

  // Search or Scan Token Handler
  const handleScanToken = useCallback(
    (rawToken: string) => {
      const cleanToken = rawToken.trim().toUpperCase();
      if (!cleanToken) return;

      setIsProcessing(true);

      // Simulate instantaneous database query
      setTimeout(() => {
        let found = guests[cleanToken];

        // If not found by exact match, generate or match first mock guest
        if (!found) {
          const matchKey = Object.keys(guests).find((k) =>
            k.toLowerCase().includes(cleanToken.toLowerCase())
          );
          if (matchKey) {
            found = guests[matchKey];
          } else {
            // Create dynamic guest record for demonstration
            found = {
              tokenId: cleanToken,
              name: "Tamu Undangan Resmi",
              company: "PT Agung Automall Partner",
              title: "Tamu Kehormatan",
              phone: "+62 812-9900-1122",
              vip: true,
              vipTier: "VIP",
              pax: 1,
              salesPic: "Doni Saputra",
              carModel: "Innova Zenix HEV",
              gateCheckedIn: currentPos > 1,
              gateCheckInTime: "10:42 WIB",
              souvenirClaimed: false,
              snackClaimed: false,
            };
          }
        }

        setVerifiedGuest(found);
        soundController.playSuccess();
        setIsProcessing(false);
      }, 400);
    },
    [guests, currentPos]
  );

  // Confirm Handover / Check-In Action Handler
  const handleConfirmHandover = () => {
    if (!verifiedGuest) return;

    setIsProcessing(true);
    const nowTime = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }) + " WIB";

    setTimeout(() => {
      const token = verifiedGuest.tokenId;
      let updatedGuest = { ...verifiedGuest };

      if (currentPos === 1) {
        updatedGuest = {
          ...updatedGuest,
          gateCheckedIn: true,
          gateCheckInTime: nowTime,
        };
        setQuotas((prev) => ({
          ...prev,
          pos1: { ...prev.pos1, current: prev.pos1.current + 1 },
        }));
        setPos1Feed((prev) => [
          {
            id: Date.now().toString(),
            name: verifiedGuest.name,
            initials: verifiedGuest.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
            subtitle: `Sales: ${verifiedGuest.salesPic} • ${verifiedGuest.vipTier || "VIP"}`,
            timestamp: nowTime,
            badge: "SUKSES",
            badgeVariant: "green",
          },
          ...prev,
        ]);
      } else if (currentPos === 2) {
        updatedGuest = {
          ...updatedGuest,
          souvenirClaimed: true,
          souvenirClaimTime: nowTime,
        };
        setQuotas((prev) => ({
          ...prev,
          pos2: { ...prev.pos2, current: prev.pos2.current + 1 },
        }));
        setPos2Feed((prev) => [
          {
            id: Date.now().toString(),
            name: verifiedGuest.name,
            initials: verifiedGuest.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
            subtitle: "Tumbler & Key Pouch",
            timestamp: nowTime,
            badge: "SUKSES",
            badgeVariant: "green",
          },
          ...prev,
        ]);
      } else if (currentPos === 3) {
        updatedGuest = {
          ...updatedGuest,
          snackClaimed: true,
          snackClaimTime: nowTime,
        };
        setQuotas((prev) => ({
          ...prev,
          pos3: { ...prev.pos3, current: prev.pos3.current + 1 },
        }));
        setPos3Feed((prev) => [
          {
            id: Date.now().toString(),
            name: verifiedGuest.name,
            initials: verifiedGuest.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
            subtitle: `${verifiedGuest.tokenId} • 1x Snack Box`,
            timestamp: nowTime,
            badge: "SUKSES",
            badgeVariant: "green",
          },
          ...prev,
        ]);
      }

      setGuests((prev) => ({ ...prev, [token]: updatedGuest }));
      setVerifiedGuest(updatedGuest);
      soundController.playSuccess();
      setIsProcessing(false);

      // Clear input and refocus on desktop
      setInputToken("");
      if (typeof window !== "undefined") {
        document.getElementById("barcode-scanner-input")?.focus();
      }
    }, 600);
  };

  // Keyboard shortcut listener for Desktop Enter trigger
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === "Enter" &&
        verifiedGuest &&
        !isProcessing &&
        ((currentPos === 1 && !verifiedGuest.gateCheckedIn) ||
          (currentPos === 2 && !verifiedGuest.souvenirClaimed && verifiedGuest.gateCheckedIn) ||
          (currentPos === 3 && !verifiedGuest.snackClaimed && verifiedGuest.gateCheckedIn))
      ) {
        e.preventDefault();
        handleConfirmHandover();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [verifiedGuest, isProcessing, currentPos]);

  // Pos quota statistics for desktop and mobile
  const quotaStats = {
    1: {
      label: "KUOTA SESI INI",
      subLabel: "Total Hadir Pos 1",
      current: quotas.pos1.current,
      total: quotas.pos1.total,
      unit: "Tamu",
      badgeText: "61% Terisi",
      badgeVariant: "red" as const,
    },
    2: {
      label: "STOK SOUVENIR POS 2",
      subLabel: "Meja Desk 2",
      current: quotas.pos2.current,
      total: quotas.pos2.total,
      unit: "Diserahkan",
      badgeText: `Sisa: ${quotas.pos2.total - quotas.pos2.current} Pcs`,
      badgeVariant: "red" as const,
    },
    3: {
      label: "STOK ARTISAN SNACK BOX",
      subLabel: `Sisa Fresh: ${quotas.pos3.total - quotas.pos3.current} Box`,
      current: quotas.pos3.current,
      total: quotas.pos3.total,
      unit: "Box Diserahkan",
      badgeText: "61.3%",
      badgeVariant: "green" as const,
    },
  }[currentPos];

  const currentFeed = {
    1: pos1Feed,
    2: pos2Feed,
    3: pos3Feed,
  }[currentPos];

  return (
    <div className="min-h-dvh flex flex-col bg-gray-50">
      {/* Top Universal Header */}
      <ScannerHeader
        currentPos={currentPos}
        onPosChange={handlePosChange}
        isDesktopView={isDesktopView}
        onToggleViewMode={() => setIsDesktopView(!isDesktopView)}
        isTorchOn={isTorchOn}
        onToggleTorch={() => setIsTorchOn(!isTorchOn)}
      />

      {/* Main Viewport Content: Desktop Terminal vs Mobile Scanner */}
      {isDesktopView ? (
        <DesktopTerminalView
          currentPos={currentPos}
          inputToken={inputToken}
          onInputChange={setInputToken}
          onSearchToken={handleScanToken}
          verifiedGuest={verifiedGuest}
          onConfirmHandover={handleConfirmHandover}
          isProcessing={isProcessing}
          quotaStats={quotaStats}
          feedItems={currentFeed}
        />
      ) : (
        <MobileScannerView
          currentPos={currentPos}
          onPosChange={handlePosChange}
          onScanToken={handleScanToken}
          verifiedGuest={verifiedGuest}
          onConfirmHandover={handleConfirmHandover}
          isProcessing={isProcessing}
          quotaCount={{
            current: quotaStats.current,
            total: quotaStats.total,
            label: currentPos === 1 ? "Tamu Hadir" : currentPos === 2 ? "Souvenir" : "Snack Box",
          }}
          isTorchOn={isTorchOn}
        />
      )}
    </div>
  );
}
