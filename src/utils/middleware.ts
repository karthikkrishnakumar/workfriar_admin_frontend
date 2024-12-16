import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./intersection"; 

export async function middleware(request: NextRequest) {
  try {
    // Retrieve and decode the cookie using the getCookie function
    const decodedCookie = await getCookie(request);

    // If the cookie is valid, allow access to the requested page
    return NextResponse.next();
  } catch (error) {
    // If the cookie is expired or invalid, redirect to the login page
    // Optionally, you can log the error here for debugging purposes
    console.error("Session error:", error);

    // If the request is already on login or forgot-password page, let it pass
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/forgot-password")
    ) {
      return NextResponse.next();
    }

    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
