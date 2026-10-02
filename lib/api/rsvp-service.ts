import { apiClient, USE_MOCK } from "./client";
import {
  RsvpInvitationResponse,
  RsvpConfirmPayload,
  RsvpConfirmResponse,
  TicketDetailResponse,
} from "@/types/api";

export class RsvpService {
  /**
   * Fetch public invitation data for landing screen
   * Endpoint: GET /api/rsvp/{token}
   */
  static async getInvitation(token: string): Promise<RsvpInvitationResponse> {
    if (USE_MOCK) {
      return this.mockInvitation(token);
    }

    try {
      const response = await apiClient.get<RsvpInvitationResponse>(`/rsvp/${token}`);
      return response.data;
    } catch (error: any) {
      if (!error.response && process.env.NODE_ENV === "development") {
        console.warn("[RsvpService] Backend unreachable, returning mock invitation.");
        return this.mockInvitation(token);
      }
      throw error;
    }
  }

  /**
   * Submit RSVP confirmation (Hadir / Tidak Hadir + Pax)
   * Endpoint: POST /api/rsvp/{token}/confirm
   */
  static async confirmRsvp(
    token: string,
    payload: RsvpConfirmPayload
  ): Promise<RsvpConfirmResponse> {
    if (USE_MOCK) {
      return this.mockConfirm(token, payload);
    }

    try {
      const response = await apiClient.post<RsvpConfirmResponse>(
        `/rsvp/${token}/confirm`,
        payload
      );
      return response.data;
    } catch (error: any) {
      if (!error.response && process.env.NODE_ENV === "development") {
        console.warn("[RsvpService] Backend unreachable, simulating confirmation.");
        return this.mockConfirm(token, payload);
      }
      throw error;
    }
  }

  /**
   * Fetch confirmed ticket data for E-Ticket QR Code screen
   * Endpoint: GET /api/ticket/{token}
   */
  static async getTicket(token: string): Promise<TicketDetailResponse> {
    if (USE_MOCK) {
      return this.mockTicket(token);
    }

    try {
      const response = await apiClient.get<TicketDetailResponse>(`/ticket/${token}`);
      return response.data;
    } catch (error: any) {
      if (!error.response && process.env.NODE_ENV === "development") {
        console.warn("[RsvpService] Backend unreachable, returning mock ticket.");
        return this.mockTicket(token);
      }
      throw error;
    }
  }

  // --- MOCK FALLBACKS ---

  private static async mockInvitation(token: string): Promise<RsvpInvitationResponse> {
    await new Promise((r) => setTimeout(r, 200));
    return {
      success: true,
      guest: {
        name: "Hendra Wijaya, S.E.",
        token: token || "TKN-88319B-JKT",
        vip: true,
        vip_tier: "VVIP",
        status: "invited",
      },
      event: {
        id: 1,
        name: "Toyota Customer Gathering & Weekend Expo 2025",
        subtitle: "ANNUAL GATHERING",
        date: "Sabtu, 15 Maret 2025",
        time: "Pukul 09:00 – 15:00 WIB",
        venue: "Grand Mercure Ballroom Lt. 3",
        address: "Jl. Sudirman No. 45, Pekanbaru, Riau",
        image_url: "/toyota-event.jpg",
        deadline: "Kamis, 13 Maret 2025 pukul 18:00 WIB",
      },
      sales: {
        name: "Doni Saputra",
        branch: "Cabang Sutomo",
        phone: "0812-3456-7890",
      },
    };
  }

  private static async mockConfirm(
    token: string,
    payload: RsvpConfirmPayload
  ): Promise<RsvpConfirmResponse> {
    await new Promise((r) => setTimeout(r, 600));
    return {
      success: true,
      message: "Konfirmasi kehadiran berhasil dicatat.",
      redirect_url: payload.attendance === "hadir" ? `/ticket/${token}` : `/rsvp/${token}`,
      ticket_token: token,
    };
  }

  private static async mockTicket(token: string): Promise<TicketDetailResponse> {
    await new Promise((r) => setTimeout(r, 200));
    return {
      success: true,
      ticket: {
        name: "Hendra Wijaya, S.E.",
        token: token || "TKN-88319B-JKT",
        pax: 1,
        phone: "+62 812-7561-9011",
        vip: true,
        status: "confirmed",
        claimed_at: null,
        event: {
          name: "Toyota Customer Gathering 2025",
          date: "Sabtu, 15 Maret 2025",
          time: "09:00 - 15:00 WIB",
          venue: "Grand Mercure Ballroom Lt. 3",
          address: "Kota Pekanbaru, Riau",
        },
        sales: {
          name: "Doni Saputra",
          phone: "0812-3456-7890",
        },
      },
    };
  }
}
