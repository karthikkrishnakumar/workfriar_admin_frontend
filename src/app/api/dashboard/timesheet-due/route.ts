// src/app/project-time/route.ts
import { NextResponse } from "next/server";
import { formatTime, getFullWeek, getStartOfWeek } from "@/utils/api-helpers/dashboard-helper";
import { dataForUser1, dataForUser2 } from "../data/data-sets";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const startDateParam = url.searchParams.get("startDate");
    const endDateParam = url.searchParams.get("endDate");

    // Default to current date if no parameters are passed
    const startDate = startDateParam ? new Date(startDateParam) : new Date();
    const endDate = endDateParam ? new Date(endDateParam) : new Date();

    const startDateHeader = request.headers.get("userID");
    const userId = startDateHeader ? parseInt(startDateHeader) : 1;

    // Adjust start and end to cover the full week
    const weekStart = getStartOfWeek(new Date(startDate));
    const fullWeekDates = getFullWeek(weekStart);

//using that data sets 
    const data = userId === 1 ? dataForUser1 : dataForUser2;
    //==========================================================

    const filteredData = fullWeekDates.map(({ dayOfWeek, date }) => {
      const [day, month, year] = date.split("/").map(Number);
      const normalizedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      const existingEntry = data.timesheetData.days.find((entry) => {
        const entryDateNormalized = entry.date.replace(/\//g, "-");
        return entryDateNormalized === normalizedDate;
      });

      const parsedDate = new Date(normalizedDate);
      const inRange = parsedDate >= startDate && parsedDate <= endDate;
      const isDisabled = !inRange || (existingEntry ? false : true);

      if (existingEntry) {
        const hasHours = existingEntry.hours !== "00:00";
        return { ...existingEntry, disable: hasHours ? false : isDisabled };
      }

      return { dayOfWeek, date: normalizedDate, hours: "00:00", disable: isDisabled };
    });

    let totalHours = 0;
    filteredData.forEach((entry) => {
      const [hours, minutes] = entry.hours.split(":").map(Number);
      totalHours += hours + minutes / 60;
    });

    filteredData.push({
      dayOfWeek: "TOTAL",
      date: " ",
      hours: formatTime(totalHours),
      disable: false,
    });

    
  console.log(filteredData);


    return NextResponse.json({

      timesheetData:{
        days: filteredData,
      } ,
 
    });
  } catch (error) {
    console.error("Error fetching time sheet due data:", error);
    return NextResponse.json(
      { error: "Failed to fetch time sheet due data" },
      { status: 500 }
    );
  }
}
