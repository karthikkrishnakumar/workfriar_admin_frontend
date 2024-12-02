// src/app/holidays/route.ts
import { NextResponse } from "next/server";
import { HolidayData } from "../data/data-sets";

export async function GET() {
  try {
    // Fetch the holiday data

    const currentDate = new Date();

    // Convert holidays to Date objects and filter upcoming holidays
    const upcomingHolidays = HolidayData.filter((holiday) => {
      const holidayDate = new Date(holiday.holidayDate);
      return holidayDate.getTime() >= currentDate.getTime();
    });

    // Sort upcoming holidays by their date
    upcomingHolidays.sort((a, b) => {
      const dateA = new Date(Date.parse(a.holidayDate));
      const dateB = new Date(Date.parse(b.holidayDate));
      return dateA.getTime() - dateB.getTime();
    });

    // Return the holiday data in the response
    return NextResponse.json({
      holidayData: upcomingHolidays,
    });
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch holiday data",
      },
      { status: 500 }
    );
  }
}
