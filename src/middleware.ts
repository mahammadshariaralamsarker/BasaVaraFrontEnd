// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { default as nextAuthMiddleware } from "next-auth/middleware";

// Define role types for better type safety
type UserRole = "admin" | "landlord" | "tenant";

interface DecodedToken {
  role: UserRole;
  exp?: number;
  [key: string]: any;
}

export default nextAuthMiddleware;

export const config = {
  matcher: [ 
    "/login",
    "/register",
    "/unauthorized"
  ]
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/register", "/unauthorized"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If no token and trying to access protected route
  if (!token) {
    return redirectToLogin(req, pathname);
  }

  let decodedToken: DecodedToken;
  try {
    decodedToken = decodeAndVerifyToken(token);
    
    // Check token expiration
    if (isTokenExpired(decodedToken)) {
      return redirectToLogin(req, pathname, "Session expired. Please login again.");
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return redirectToLogin(req, pathname, "Invalid session. Please login again.");
  }

  // Handle root dashboard redirect
  if (pathname === "/dashboard") {
    return redirectToRoleDashboard(decodedToken.role, req);
  }

  // Check route permissions
  if (!hasRouteAccess(decodedToken.role, pathname)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

// Helper functions
function decodeAndVerifyToken(token: string): DecodedToken {
  // In production, you should verify the token signature
  // This is just decoding for demonstration
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64').toString();
  return JSON.parse(payload);
}

function isTokenExpired(token: DecodedToken): boolean {
  if (!token.exp) return false;
  return Date.now() >= token.exp * 1000;
}

function hasRouteAccess(role: UserRole, pathname: string): boolean {
  const roleRoutes: Record<UserRole, string[]> = {
    admin: ['/dashboard/admin', '/dashboard/admin/:path*'],
    landlord: ['/dashboard/landlord', '/dashboard/landlord/:path*'],
    tenant: ['/dashboard/tenant', '/dashboard/tenant/:path*']
  };

  return roleRoutes[role].some(route => {
    const routePattern = new RegExp(`^${route.replace(':path*', '.*')}$`);
    return routePattern.test(pathname);
  });
}

function redirectToLogin(req: NextRequest, originalPath: string, message?: string) {
  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('callback', originalPath);
  if (message) loginUrl.searchParams.set('error', encodeURIComponent(message));
  return NextResponse.redirect(loginUrl);
}

function redirectToRoleDashboard(role: UserRole, req: NextRequest) {
  const dashboardUrl = new URL(`/dashboard/${role}`, req.url);
  return NextResponse.redirect(dashboardUrl);
}