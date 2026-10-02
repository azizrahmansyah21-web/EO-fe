import { apiClient, USE_MOCK } from "./client";
import { BlastProgressResponse, WhatsAppBlastPayload } from "@/types/api";

export class BlastService {
  /**
   * Start WhatsApp Queue Blasting (with 2s per message queue delay enforced on Laravel backend)
   * Endpoint: POST /api/admin/blast/start
   */
  static async startBlast(payload: WhatsAppBlastPayload): Promise<{ success: boolean; message: string }> {
    if (USE_MOCK) {
      return { success: true, message: "WhatsApp Queue Blast berhasil dimulai di antrean Redis." };
    }

    try {
      const response = await apiClient.post<{ success: boolean; message: string }>(
        "/admin/blast/start",
        payload
      );
      return response.data;
    } catch (error: any) {
      if (!error.response && process.env.NODE_ENV === "development") {
        return { success: true, message: "Simulasi: WhatsApp Queue Blast dimulai." };
      }
      throw error;
    }
  }

  /**
   * Get Real-time WhatsApp Blast Progress
   * Endpoint: GET /api/admin/blast/progress
   */
  static async getProgress(eventId: number = 1): Promise<BlastProgressResponse> {
    if (USE_MOCK) {
      return this.mockProgress(eventId);
    }

    try {
      const response = await apiClient.get<BlastProgressResponse>(
        `/admin/blast/progress?event_id=${eventId}`
      );
      return response.data;
    } catch (error: any) {
      if (!error.response && process.env.NODE_ENV === "development") {
        return this.mockProgress(eventId);
      }
      throw error;
    }
  }

  // Simulated live progress ticker for development
  private static simulatedCount = 184;
  private static mockProgress(eventId: number): BlastProgressResponse {
    const total = 250;
    this.simulatedCount = Math.min(total, this.simulatedCount + 1);
    const sent = this.simulatedCount;
    const failed = 4;
    const pending = total - sent - failed;
    const percent = Math.round(((sent + failed) / total) * 100);

    return {
      success: true,
      event_id: eventId,
      status: percent >= 100 ? "completed" : "processing",
      total_target: total,
      sent_count: sent,
      failed_count: failed,
      pending_count: Math.max(0, pending),
      progress_percent: percent,
      estimated_seconds_remaining: Math.max(0, pending * 2), // 2s per message delay rule from AGENTS.md
      updated_at: new Date().toISOString(),
    };
  }
}
