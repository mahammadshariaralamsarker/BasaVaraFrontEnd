import { NextResponse } from "next/server";

export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path*"] };

export function middleware(req: any) {
  const token = req.cookies.get("token") || null;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userRole = JSON.parse(atob(token.split(".")[1])).role;

  if (req.nextUrl.pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/dashboard/landlord") && userRole !== "landlord") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/dashboard/tenants") && userRole !== "tenants") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}