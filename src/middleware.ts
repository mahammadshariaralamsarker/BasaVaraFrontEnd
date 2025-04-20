import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/login", "/register"] };

export function middleware(req: any) { 
  const token = req.cookies.get("token")?.value 
  console.log(token, "token");

  if (!token) { 
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let userRole: string;
  try {
    userRole = JSON.parse(atob(token.split(".")[1])).role;
    console.log(userRole, "userRole");
  } catch (error) {
    console.error("Invalid token. Redirecting to /login.", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
    console.log("Unauthorized access attempt to admin dashboard.");
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