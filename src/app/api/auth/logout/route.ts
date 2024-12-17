import { NextRequest, NextResponse } from "next/server";
import { resetCookie } from "@/utils/intersection";

export async function POST(request: NextRequest) {
  try {
    // Create a new response
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Reset the cookie
    return resetCookie(response);
  } catch (error) {
    console.error("Error in POST /api/auth/logout:", error);
    return NextResponse.json(
      { success: false, message: "Failed to logout" },
      { status: 500 }
    );
  }
}