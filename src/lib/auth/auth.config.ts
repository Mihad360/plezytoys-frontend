/**
 * Shared auth configuration
 * Used by both server + client code
 */

export const AUTH_CONFIG = {
  /** Cookie name for the JWT access token */
  TOKEN_COOKIE_KEY: "accessToken",

  /** Cookie name for the JWT refresh token */
  REFRESH_TOKEN_COOKIE_KEY: "refreshToken",

  /** Cookie name for current user profile summary */
  USER_COOKIE_KEY: "shiftpoint_user",

  /** Cookie expiry in days */
  COOKIE_EXPIRES_DAYS: 30,

  /** Cookie path (root = app-wide) */
  COOKIE_PATH: "/",
};

/** Default dashboard home routes per role */
export const ROLE_DASHBOARD_ROUTES: Record<string, string> = {
  super_admin: "/admin",
  admin: "/admin",
  company_admin: "/company-admin",
  manager: "/manager",
  employee: "/employee",
};
