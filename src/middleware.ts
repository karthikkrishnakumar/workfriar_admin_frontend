import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const IntersectionCookie: string = process.env.INTERSECTION_COOKIE || "workfriar_intersection";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.nextUrl.searchParams.get("token");

  // Allow all image files and certain static assets to pass through
  if (
    pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/) || 
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/_next/image")
  ) {
    return NextResponse.next();
  }


  // Login page logic
  if (pathname === "/") {
    // Redirect to dashboard if already logged in
    if (request.cookies.has(IntersectionCookie)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If there's a token and user is logged in, redirect to dashboard
    if (token && request.cookies.has(IntersectionCookie)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // Protect other routes
  if (request.method === "GET") {
    // Redirect to login if no cookie exists
    if (!request.cookies.has(IntersectionCookie)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes
    "/(.*)",
  ],
};