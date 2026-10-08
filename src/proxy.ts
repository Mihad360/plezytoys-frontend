import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG, ROLE_DASHBOARD_ROUTES } from "@/lib/auth/auth.config";
import { decodeJwt } from "@/utils/jwt";

// Protected prefixes mapped to authorized roles
const ROLE_PERMISSIONS: { prefix: string; roles: string[]; defaultHome: string }[] = [
  { prefix: "/admin", roles: ["super_admin", "admin"], defaultHome: "/admin" },
  { prefix: "/company-admin", roles: ["company_admin"], defaultHome: "/company-admin" },
  { prefix: "/manager", roles: ["manager"], defaultHome: "/manager" },
  { prefix: "/employee", roles: ["employee"], defaultHome: "/employee" },
];

const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/verify-otp", "/reset-password"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Read access token from cookie
  const token = request.cookies.get(AUTH_CONFIG.TOKEN_COOKIE_KEY)?.value;
  const decoded = token ? decodeJwt(token) : null;

  // Check if token is present and not expired
  const isTokenExpired = decoded?.exp ? decoded.exp * 1000 < Date.now() : false;
  const isAuthenticated = Boolean(token && decoded && !isTokenExpired);
  const userRole = decoded?.role;

  // 1. Root ("/") route handling
  if (pathname === "/") {
    if (isAuthenticated && userRole && ROLE_DASHBOARD_ROUTES[userRole]) {
      return NextResponse.redirect(new URL(ROLE_DASHBOARD_ROUTES[userRole], request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Auth routes (/login, /register, etc.)
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute) {
    // If already logged in, redirect away from login to user's dashboard
    if (isAuthenticated && userRole && ROLE_DASHBOARD_ROUTES[userRole]) {
      return NextResponse.redirect(new URL(ROLE_DASHBOARD_ROUTES[userRole], request.url));
    }
    return NextResponse.next();
  }

  // 3. Protected dashboard routes (/admin, /company-admin, /manager, /employee)
  const matchedProtection = ROLE_PERMISSIONS.find((perm) =>
    pathname.startsWith(perm.prefix),
  );

  if (matchedProtection) {
    // Unauthenticated -> redirect to login with return path
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(loginUrl);
      // Clean up invalid or expired cookie
      if (token) {
        response.cookies.delete(AUTH_CONFIG.TOKEN_COOKIE_KEY);
      }
      return response;
    }

    // Role-based authorization check
    const isAuthorized = userRole && matchedProtection.roles.includes(userRole);

    if (!isAuthorized) {
      // User is logged in but doesn't have permission for this dashboard
      // Redirect them to their own authorized dashboard home
      const userHome = (userRole && ROLE_DASHBOARD_ROUTES[userRole]) || "/login";
      return NextResponse.redirect(new URL(userHome, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
    "/admin/:path*",
    "/company-admin/:path*",
    "/manager/:path*",
    "/employee/:path*",
  ],
};

