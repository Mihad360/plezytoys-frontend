import {
  clearAllAuthCookies,
  getRoleDashboardPath,
  setClientRefreshToken,
  setClientToken,
  setClientUser,
} from "./cookies.client";
import { connectSocketWithToken, resetSocket } from "../socket";
import { ICookieUser } from "@/types";

interface LoginSuccessPayload {
  accessToken: string;
  refreshToken?: string;
  user?: Partial<ICookieUser> | any;
  role?: string;
}

/**
 * Handle successful login
 * - Saves tokens & user profile to cookies + localStorage
 * - Connects socket immediately with token
 * - Emits auth state change event
 * - Returns target role dashboard path
 */
export function handleLoginSuccess(payload: LoginSuccessPayload | string): string {
  const token = typeof payload === "string" ? payload : payload.accessToken;
  setClientToken(token);

  let userRole: string | undefined;

  if (typeof payload !== "string") {
    if (payload.refreshToken) {
      setClientRefreshToken(payload.refreshToken);
    }

    if (payload.user) {
      setClientUser(payload.user);
      userRole = payload.user.role;
    }

    if (payload.role) {
      userRole = payload.role;
    }
  }

  // Connect socket with active token
  try {
    connectSocketWithToken(token);
  } catch (err) {
    // ignore
  }

  // Notify listeners across app (like SocketProvider, Navigation, etc.)
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:state-change"));
  }

  return getRoleDashboardPath(userRole);
}

/**
 * Handle logout
 * - Clears all auth cookies & localStorage
 * - Closes real-time socket connection
 * - Emits auth state change event
 */
export function handleLogout(): void {
  clearAllAuthCookies();
  resetSocket();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:state-change"));
  }
}
