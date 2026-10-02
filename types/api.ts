/**
 * API Domain Contracts & Data Transfer Objects (DTOs)
 * Strictly aligned with Laravel 11 Backend Schema (PRD 2 & AGENTS.md)
 */

// ==========================================
// 1. Core Database Entities
// ==========================================

export type UserRole = "admin" | "sales";

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  nik?: string; // Sales Consultant Employee ID
  role: UserRole;
  branch?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export type EventStatus = "draft" | "active" | "completed";

export interface ApiEvent {
  id: number;
  name: string;
  subtitle?: string;
  date: string; // ISO date string e.g. "2025-03-15"
  time: string; // e.g. "09:00 - 15:00 WIB"
  venue: string;
  address: string;
  maps_url?: string;
  image_url?: string;
  status: EventStatus;
  quota_total: number;
  quota_attended: number;
  created_at?: string;
  updated_at?: string;
}

export type GuestStatus = "pending" | "invited" | "confirmed" | "declined" | "attended";
export type VipTier = "REGULAR" | "VIP" | "VVIP";

export interface ApiGuest {
  id: number;
  token: string; // Mandatory Index UUID
  event_id: number;
  sales_id?: number;
  name: string;
  company?: string;
  title?: string;
  phone: string;
  vip: boolean;
  vip_tier?: VipTier;
  pax: number;
  status: GuestStatus;
  claimed_at?: string | null; // ISO timestamp when Gate check-in occurred
  snack_claimed: boolean;
  snack_claimed_at?: string | null;
  souvenir_claimed: boolean;
  souvenir_claimed_at?: string | null;
  sales_pic?: string;
  car_model?: string;
  created_at?: string;
  updated_at?: string;
}

// ==========================================
// 2. Scanner Verification Contracts (POST /api/scanner/verify)
// ==========================================

export interface ScannerVerifyPayload {
  token: string;
  pos: 1 | 2 | 3;
}

export type ScannerErrorCode =
  | "ALREADY_CLAIMED"
  | "GATE_NOT_CHECKED_IN"
  | "INVALID_TOKEN"
  | "PRECONDITION_FAILED"
  | "QUOTA_EXCEEDED"
  | "EVENT_NOT_ACTIVE";

export interface ScannerVerifySuccessResponse {
  success: true;
  message: string;
  pos: 1 | 2 | 3;
  guest: ApiGuest;
  timestamp: string;
}

export interface ScannerVerifyErrorResponse {
  success: false;
  message: string;
  pos: 1 | 2 | 3;
  error_code: ScannerErrorCode;
  claimed_at?: string;
  guest?: ApiGuest;
}

export type ScannerVerifyResponse = ScannerVerifySuccessResponse | ScannerVerifyErrorResponse;

// ==========================================
// 3. Public RSVP & E-Ticket Contracts
// ==========================================

export interface RsvpInvitationResponse {
  success: boolean;
  guest: {
    name: string;
    token: string;
    vip: boolean;
    vip_tier?: VipTier;
    status: GuestStatus;
  };
  event: {
    id: number;
    name: string;
    subtitle: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    image_url: string;
    deadline: string;
  };
  sales: {
    name: string;
    branch: string;
    phone: string;
  };
}

export interface RsvpConfirmPayload {
  attendance: "hadir" | "tidak";
  pax: number;
}

export interface RsvpConfirmResponse {
  success: boolean;
  message: string;
  redirect_url: string;
  ticket_token?: string;
}

export interface TicketDetailResponse {
  success: boolean;
  ticket: {
    name: string;
    token: string;
    pax: number;
    phone: string;
    vip: boolean;
    status: GuestStatus;
    claimed_at?: string | null;
    event: {
      name: string;
      date: string;
      time: string;
      venue: string;
      address: string;
    };
    sales: {
      name: string;
      phone: string;
    };
  };
}

// ==========================================
// 4. Authentication Contracts (Sanctum)
// ==========================================

export interface AdminLoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SalesLoginPayload {
  nik: string;
  password: string;
  remember?: boolean;
}

export interface AuthSuccessResponse {
  success: true;
  token: string;
  token_type: "Bearer";
  user: ApiUser;
  message: string;
}

// ==========================================
// 5. WhatsApp Blast & Polling Contracts
// ==========================================

export type BlastStatus = "idle" | "queued" | "processing" | "completed" | "failed";

export interface WhatsAppBlastPayload {
  event_id: number;
  guest_ids?: number[];
  filter?: "all" | "approved" | "uninvited";
}

export interface BlastProgressResponse {
  success: boolean;
  event_id: number;
  status: BlastStatus;
  total_target: number;
  sent_count: number;
  failed_count: number;
  pending_count: number;
  progress_percent: number;
  estimated_seconds_remaining?: number;
  updated_at: string;
}

// ==========================================
// 6. Generic Laravel Standard API Responses
// ==========================================

export interface PaginatedApiResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface LaravelValidationError {
  message: string;
  errors: Record<string, string[]>;
}
