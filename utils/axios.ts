import { apiClient } from "@/lib/api/client";

/**
 * Re-export standardized Axios instance from lib/api/client
 * Ensures backward compatibility with existing imports while leveraging Sanctum interceptors.
 */
export const axiosInstance = apiClient;
export default apiClient;
