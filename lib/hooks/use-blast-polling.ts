"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { BlastService } from "@/lib/api/blast-service";
import { BlastProgressResponse } from "@/types/api";

interface UseBlastPollingOptions {
  eventId?: number;
  intervalMs?: number; // default: 2500ms
  autoStart?: boolean;
}

export function useBlastPolling({
  eventId = 1,
  intervalMs = 2500,
  autoStart = true,
}: UseBlastPollingOptions = {}) {
  const [data, setData] = useState<BlastProgressResponse | null>(null);
  const [isPolling, setIsPolling] = useState(autoStart);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const result = await BlastService.getProgress(eventId);
      setData(result);
      setError(null);

      // Stop polling once finished
      if (result.status === "completed" || result.status === "failed") {
        setIsPolling(false);
      }
    } catch (err: any) {
      setError(err?.message || "Gagal memuat status pengiriman WhatsApp");
    }
  }, [eventId]);

  useEffect(() => {
    if (!isPolling) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // Initial immediate fetch
    fetchStatus();

    // Recurring poll
    timerRef.current = setInterval(fetchStatus, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPolling, intervalMs, fetchStatus]);

  const startPolling = useCallback(() => setIsPolling(true), []);
  const stopPolling = useCallback(() => setIsPolling(false), []);

  return {
    progress: data,
    isPolling,
    startPolling,
    stopPolling,
    error,
    refetch: fetchStatus,
  };
}
