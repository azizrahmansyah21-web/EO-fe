import { apiClient, USE_MOCK } from "./client";
import {
  AdminLoginPayload,
  SalesLoginPayload,
  AuthSuccessResponse,
  ApiUser,
} from "@/types/api";
import { setAuthToken, setAuthUser, clearAuth } from "@/lib/auth";

export class AuthService {
  /**
   * Admin Authentication (Command Center)
   * Endpoint: POST /api/auth/login
   */
  static async loginAdmin(payload: AdminLoginPayload): Promise<AuthSuccessResponse> {
    if (USE_MOCK) {
      return this.mockAdminLogin(payload);
    }

    try {
      const response = await apiClient.post<AuthSuccessResponse>("/auth/login", payload);
      const data = response.data;
      setAuthToken(data.token, payload.remember);
      setAuthUser(data.user);
      return data;
    } catch (error: any) {
      if (!error.response && process.env.NODE_ENV === "development") {
        console.warn("[AuthService] Backend offline, simulating admin login.");
        return this.mockAdminLogin(payload);
      }
      throw error;
    }
  }

  /**
   * Sales Consultant Authentication
   * Endpoint: POST /api/auth/sales-login
   */
  static async loginSales(payload: SalesLoginPayload): Promise<AuthSuccessResponse> {
    if (USE_MOCK) {
      return this.mockSalesLogin(payload);
    }

    try {
      const response = await apiClient.post<AuthSuccessResponse>("/auth/sales-login", payload);
      const data = response.data;
      setAuthToken(data.token, payload.remember);
      setAuthUser(data.user);
      return data;
    } catch (error: any) {
      if (!error.response && process.env.NODE_ENV === "development") {
        console.warn("[AuthService] Backend offline, simulating sales login.");
        return this.mockSalesLogin(payload);
      }
      throw error;
    }
  }

  /**
   * Terminate current session
   * Endpoint: POST /api/auth/logout
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Ignore network errors on logout
    } finally {
      clearAuth();
    }
  }

  /**
   * Get authenticated user profile
   * Endpoint: GET /api/auth/me
   */
  static async getMe(): Promise<ApiUser> {
    const response = await apiClient.get<{ user: ApiUser }>("/auth/me");
    setAuthUser(response.data.user);
    return response.data.user;
  }

  // --- MOCK FALLBACKS ---

  private static async mockAdminLogin(payload: AdminLoginPayload): Promise<AuthSuccessResponse> {
    await new Promise((r) => setTimeout(r, 600));
    const user: ApiUser = {
      id: 1,
      name: "Arya Pratama, S.Kom",
      email: payload.email || "admin@agungtoyota.co.id",
      role: "admin",
      branch: "Sutomo Hub Pekanbaru",
    };
    const mockToken = "mock_admin_token_" + Date.now();
    setAuthToken(mockToken, payload.remember);
    setAuthUser(user);
    return {
      success: true,
      token: mockToken,
      token_type: "Bearer",
      user,
      message: "Login Admin berhasil",
    };
  }

  private static async mockSalesLogin(payload: SalesLoginPayload): Promise<AuthSuccessResponse> {
    await new Promise((r) => setTimeout(r, 600));
    const user: ApiUser = {
      id: 41,
      name: "Doni Saputra",
      email: "doni.saputra@agungtoyota.co.id",
      nik: payload.nik || "SC-STM-041",
      role: "sales",
      branch: "Cabang Sutomo",
      phone: "+62 812-3456-7890",
    };
    const mockToken = "mock_sales_token_" + Date.now();
    setAuthToken(mockToken, payload.remember);
    setAuthUser(user);
    return {
      success: true,
      token: mockToken,
      token_type: "Bearer",
      user,
      message: "Login Sales Consultant berhasil",
    };
  }
}
