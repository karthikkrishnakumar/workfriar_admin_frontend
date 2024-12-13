// src/app/notifications/route.ts
import { NextResponse } from "next/server";
import { dataForUser1, dataForUser2 } from "../data/data-sets";

export async function POST(request: Request) {
  try {
    const startDateHeader = request.headers.get("userID");
    const userId = startDateHeader ? parseInt(startDateHeader) : 1;
    

    const data = userId === 1 ? dataForUser1 : dataForUser2;

    // Return the notificatons in the response
    return NextResponse.json({
    notifications: data.notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch notifications data",
      },
      { status: 500 }
    );
  }
}
