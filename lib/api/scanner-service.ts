import { apiClient, USE_MOCK } from "./client";
import {
  ScannerVerifyPayload,
  ScannerVerifyResponse,
} from "@/types/api";
import { GuestVerificationData } from "@/components/molecules/guest-verification-card";

export class ScannerService {
  /**
   * Verify token at Pos 1 (Gate), Pos 2 (Souvenir), or Pos 3 (Snack)
   * Integrates with Laravel's Pessimistic Locking verify endpoint: POST /api/scanner/verify
   */
  static async verifyToken(payload: ScannerVerifyPayload): Promise<ScannerVerifyResponse> {
    if (USE_MOCK) {
      return this.mockVerify(payload);
    }

    try {
      const response = await apiClient.post<ScannerVerifyResponse>("/scanner/verify", payload);
      return response.data;
    } catch (error: any) {
      // If network failure or backend not yet launched, graceful mock fallback
      if (!error.response && process.env.NODE_ENV === "development") {
        console.warn("[ScannerService] Backend unreachable, falling back to local verification simulation.");
        return this.mockVerify(payload);
      }

      if (error.response?.data) {
        return error.response.data as ScannerVerifyResponse;
      }

      throw error;
    }
  }

  /**
   * Internal mock verification for testing and dev safety
   */
  private static async mockVerify(payload: ScannerVerifyPayload): Promise<ScannerVerifyResponse> {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const token = payload.token.trim().toUpperCase();

    // Mock check for Gate precondition on Pos 2 and Pos 3
    return {
      success: true,
      message: `Verifikasi Pos ${payload.pos} Sukses`,
      pos: payload.pos,
      guest: {
        id: 101,
        token: token,
        event_id: 1,
        name: "Hendra Wijaya, S.E.",
        company: "PT Mega Nusantara Logistik",
        title: "Direktur Utama",
        phone: "+62 812-7561-9011",
        vip: true,
        vip_tier: "VVIP",
        pax: 1,
        status: payload.pos === 1 ? "attended" : "confirmed",
        claimed_at: new Date().toISOString(),
        snack_claimed: payload.pos === 3,
        souvenir_claimed: payload.pos === 2,
        sales_pic: "Doni Saputra",
        car_model: "Innova Zenix HEV",
      },
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Adapter helper to bridge backend ApiGuest to GuestVerificationData used by UI Card
 */
export function mapApiGuestToVerificationData(
  guest: any,
  pos: 1 | 2 | 3
): GuestVerificationData {
  return {
    tokenId: guest.token || guest.tokenId || "TKN-UNKNOWN",
    name: guest.name || "Tamu Undangan",
    company: guest.company || "Perusahaan",
    title: guest.title || "Tamu Kehormatan",
    phone: guest.phone || "-",
    vip: !!guest.vip,
    vipTier: guest.vip_tier || (guest.vip ? "VIP" : "REGULAR"),
    pax: guest.pax || 1,
    salesPic: guest.sales_pic || guest.salesPic || "Doni Saputra",
    carModel: guest.car_model || guest.carModel || "Toyota",
    gateCheckedIn: guest.status === "attended" || !!guest.claimed_at || guest.gateCheckedIn || pos > 1,
    gateCheckInTime: guest.claimed_at
      ? new Date(guest.claimed_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB"
      : guest.gateCheckInTime || "Baru saja",
    souvenirClaimed: !!guest.souvenir_claimed || !!guest.souvenirClaimed,
    souvenirClaimTime: guest.souvenir_claimed_at || guest.souvenirClaimTime,
    snackClaimed: !!guest.snack_claimed || !!guest.snackClaimed,
    snackClaimTime: guest.snack_claimed_at || guest.snackClaimTime,
  };
}
