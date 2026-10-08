import Cookies from "js-cookie";
import { AUTH_CONFIG, ROLE_DASHBOARD_ROUTES } from "./auth.config";
import { ICookieUser } from "@/types";
import { decodeJwt } from "@/utils/jwt";

/**
 * Client-side cookie utilities
 * Use in Client Components, axios interceptor, etc.
 */

/** Get the access token (client-side) */
export function getClientToken(): string | null {
  return Cookies.get(AUTH_CONFIG.TOKEN_COOKIE_KEY) || null;
}

/** Set the access token after login */
export function setClientToken(token: string): void {
  Cookies.set(AUTH_CONFIG.TOKEN_COOKIE_KEY, token, {
    expires: AUTH_CONFIG.COOKIE_EXPIRES_DAYS,
    path: AUTH_CONFIG.COOKIE_PATH,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

/** Get the refresh token */
export function getClientRefreshToken(): string | null {
  return Cookies.get(AUTH_CONFIG.REFRESH_TOKEN_COOKIE_KEY) || null;
}

/** Set the refresh token */
export function setClientRefreshToken(token: string): void {
  Cookies.set(AUTH_CONFIG.REFRESH_TOKEN_COOKIE_KEY, token, {
    expires: AUTH_CONFIG.COOKIE_EXPIRES_DAYS,
    path: AUTH_CONFIG.COOKIE_PATH,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

/** Save user object to cookie and localStorage */
export function setClientUser(user: Partial<ICookieUser>): void {
  const json = JSON.stringify(user);
  Cookies.set(AUTH_CONFIG.USER_COOKIE_KEY, json, {
    expires: AUTH_CONFIG.COOKIE_EXPIRES_DAYS,
    path: AUTH_CONFIG.COOKIE_PATH,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_CONFIG.USER_COOKIE_KEY, json);
  }
}

/** Get user object from cookie or localStorage */
export function getClientUser(): ICookieUser | null {
  try {
    const raw =
      Cookies.get(AUTH_CONFIG.USER_COOKIE_KEY) ||
      (typeof window !== "undefined"
        ? localStorage.getItem(AUTH_CONFIG.USER_COOKIE_KEY)
        : null);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Get the current user's role from user cookie or JWT */
export function getClientRole(): string | null {
  const user = getClientUser();
  if (user?.role) return user.role;

  const token = getClientToken();
  if (token) {
    const decoded = decodeJwt(token);
    if (decoded?.role) return decoded.role;
  }

  return null;
}

/** Get appropriate dashboard route for a given role */
export function getRoleDashboardPath(role?: string | null): string {
  if (!role) return "/login";
  return ROLE_DASHBOARD_ROUTES[role] || "/login";
}

/** Clear all tokens & user session */
export function clearAllAuthCookies(): void {
  Cookies.remove(AUTH_CONFIG.TOKEN_COOKIE_KEY, { path: AUTH_CONFIG.COOKIE_PATH });
  Cookies.remove(AUTH_CONFIG.REFRESH_TOKEN_COOKIE_KEY, { path: AUTH_CONFIG.COOKIE_PATH });
  Cookies.remove(AUTH_CONFIG.USER_COOKIE_KEY, { path: AUTH_CONFIG.COOKIE_PATH });
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_CONFIG.USER_COOKIE_KEY);
  }
}

/** Legacy alias */
export const clearClientToken = clearAllAuthCookies;
