import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getAuthToken, clearAuth } from "@/lib/auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

export const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

// Request Interceptor: Attach Sanctum Bearer Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 and parse Laravel Validation Errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      // 401 Unauthorized handling
      if (status === 401) {
        clearAuth();
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          if (currentPath.startsWith("/admin") && currentPath !== "/login") {
            window.location.href = "/login";
          } else if (currentPath.startsWith("/sales") && currentPath !== "/sales-login") {
            window.location.href = "/sales-login";
          }
        }
      }

      // Format Laravel 422 validation errors into readable message
      const data = error.response.data as {
        message?: string;
        errors?: Record<string, string[]>;
      };

      if (data?.errors) {
        const errorDetails = Object.values(data.errors)
          .flat()
          .join(" • ");
        error.message = errorDetails || data.message || error.message;
      } else if (data?.message) {
        error.message = data.message;
      }
    } else if (error.request) {
      error.message = "Tidak dapat terhubung ke server backend (Network/CORS Error). Pastikan server Laravel aktif di " + API_BASE_URL;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
