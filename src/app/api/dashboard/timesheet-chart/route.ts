import { NextResponse } from "next/server";
import { dataForUser1, dataForUser2 } from "../data/data-sets";

export async function POST(request: Request) {
  try {
    // Extract query parameters from the request URL

    const { year, month } = await request.json();
    console.log(year);
    // Extract user ID from the headers
    const startDateHeader = request.headers.get("userID");
    const userId = startDateHeader ? parseInt(startDateHeader) : 1;

    // Get the appropriate dataset
    const data = userId === 1 ? dataForUser1 : dataForUser2;

    // Filter stats based on year and month
    let filteredStats = { saved: 0, approved: 0, rejected: 0 };

    // Check if year or month filter is provided
    if (year || month) {
      const yearNumber = year ? parseInt(year) : null;
      const monthNumber = month ? parseInt(month) : null;

      // Find the matching year in the stats data
      const yearStats = data.stats.find((stat) => stat.year === yearNumber);

      if (yearStats) {
        // If year is provided, filter by month
        if (monthNumber) {
          const monthStats = yearStats.months.find(
            (monthStat) => monthStat.month === getMonthName(monthNumber)
          );
          if (monthStats) {
            filteredStats = {
              saved: monthStats.saved,
              approved: monthStats.approved,
              rejected: monthStats.rejected,
            };
          }
        } else {
          // If only year is provided, return the total for that year
          filteredStats = {
            saved: yearStats.saved,
            approved: yearStats.approved,
            rejected: yearStats.rejected,
          };
        }
      }
    } else {
      // Return the total stats if no filters are applied
      filteredStats = data.stats.reduce(
        (acc, stat) => {
          acc.saved += stat.saved;
          acc.approved += stat.approved;
          acc.rejected += stat.rejected;

          // Aggregate monthly data
          stat.months.forEach((monthStat) => {
            acc.saved += monthStat.saved;
            acc.approved += monthStat.approved;
            acc.rejected += monthStat.rejected;
          });

          return acc;
        },
        { saved: 0, approved: 0, rejected: 0 }
      );
      // You can adjust this default total if needed
    }

    // Return the filtered stats as part of the response
    return NextResponse.json({
      timesheet_chart: filteredStats,
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

// Helper function to get month name from month number (1-12)
function getMonthName(monthNumber: number): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1];
}
