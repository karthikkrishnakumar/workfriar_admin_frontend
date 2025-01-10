import { setCookie } from "@/utils/intersection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  try {
    const { token } = await request.json(); // Parse JSON body


    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is required." },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Cookie set successfully",
    });
    
    // Set the cookie using your setCookie function


    await setCookie(response, {token} );
  
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to set cookie" },
      { status: 500 }
    );
  }
}
