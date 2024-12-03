// src/app//route.ts
import { NextResponse } from "next/server";
import { dataForUser1, dataForUser2 } from "../data/data-sets";

export async function GET(request: Request) {
  try {
    const startDateHeader = request.headers.get("userID");
    const userId = startDateHeader ? parseInt(startDateHeader) : 1;
   
    const data = userId === 1 ? dataForUser1 : dataForUser2;

    // Return the timesheet chart data in the response
    return NextResponse.json({
      timesheet_chart: data.stats,
    });
  } catch (error) {
    console.error("Error fetching timesheet chart data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch timesheet chart data",
      },
      { status: 500 }
    );
  }
}
