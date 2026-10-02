import { ApiUser, UserRole } from "@/types/api";

const TOKEN_KEY = "stitch_auth_token";
const USER_KEY = "stitch_auth_user";

/**
 * Safe local storage getter for Next.js SSR hydration safety
 */
function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getAuthToken(): string | null {
  if (!isClient()) return null;
  return localStorage.getItem(TOKEN_KEY) || getCookie(TOKEN_KEY);
}

export function setAuthToken(token: string, remember: boolean = true): void {
  if (!isClient()) return;
  localStorage.setItem(TOKEN_KEY, token);
  // Also store in cookie for server-side middleware if needed
  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days vs 1 day
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function getAuthUser(): ApiUser | null {
  if (!isClient()) return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ApiUser;
  } catch {
    return null;
  }
}

export function setAuthUser(user: ApiUser): void {
  if (!isClient()) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  if (!isClient()) return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function hasRole(role: UserRole): boolean {
  const user = getAuthUser();
  return user?.role === role;
}

// Cookie helper
function getCookie(name: string): string | null {
  if (!isClient()) return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}
