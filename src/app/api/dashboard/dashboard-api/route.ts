import { NextResponse } from "next/server";

// Helper function to format total hours as hh:mm
function formatTime(totalHours: number): string {
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

// Helper function to get a date string in "DD/MM/YYYY" format
function formatDate(date: Date): string {
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

// Helper function to get all dates between startDate and endDate
function getDatesInRange(
  startDate: Date,
  endDate: Date
): { dayOfWeek: string; date: string }[] {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push({
      dayOfWeek: daysOfWeek[currentDate.getDay()],
      date: formatDate(currentDate),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
export async function GET(request: Request) {
  const url = new URL(request.url);
  const startDateParam = url.searchParams.get("startDate");
  const endDateParam = url.searchParams.get("endDate");

  // Parse the date parameters
  const startDate = startDateParam ? new Date(startDateParam) : new Date();
  const endDate = endDateParam ? new Date(endDateParam) : new Date();

  const data = {
    projectTimeChart: [
      { project: "One view", hours: 10 },
      { project: "Danti", hours: 8 },
      { project: "Techfriar", hours: 6 },
      { project: "Unutilized", hours: 1 },
      { project: "Soezy", hours: 7 },
      { project: "Votefriar", hours: 3 },
      { project: "Court click", hours: 9 },
    ],
    stats: {
      saved: 3,
      approved: 3,
      rejected: 3,
    },
    timesheetData: {
      days: [
        { dayOfWeek: "MON", date: "14/10/2024", hours: "07:30" },
        { dayOfWeek: "TUE", date: "15/10/2024", hours: "08:00" },
        { dayOfWeek: "WED", date: "16/10/2024", hours: "08:30" },
        { dayOfWeek: "THUR", date: "17/10/2024", hours: "08:00" },
        { dayOfWeek: "FRI", date: "18/10/2024", hours: "07:00" },
        { dayOfWeek: "SAT", date: "19/10/2024", hours: "01:30" },
        { dayOfWeek: "SUN", date: "20/10/2024", hours: "00:00" },
        { dayOfWeek: "MON", date: "14/10/2026", hours: "08:30" },
        { dayOfWeek: "TUE", date: "15/10/2026", hours: "08:00" },
        { dayOfWeek: "WED", date: "16/10/2026", hours: "08:00" },
        { dayOfWeek: "THUR", date: "17/10/2026", hours: "07:45" },
        { dayOfWeek: "FRI", date: "18/10/2026", hours: "08:15" },
        { dayOfWeek: "SAT", date: "19/10/2026", hours: "01:00" },
        { dayOfWeek: "SUN", date: "20/10/2026", hours: "00:00" },
      ],
    },
    notifications: [
      {
        id: 1,
        message: "Your project deadline is approaching.",
        time: "14:30",
        origin: "System",
      },
      {
        id: 2,
        message: "New project has been assigned.",
        time: "09:00",
        origin: "Project Manager",
      },
      {
        id: 3,
        message: "Weekly report is due in 2 days.",
        time: "16:15",
        origin: "HR",
      },
    ],
  };

  // Get all days and dates in the specified range
  const allDates = getDatesInRange(startDate, endDate);

  // Filter the timesheet data
  const filteredData = data.timesheetData.days.filter((entry) => {
    const entryDate = new Date(entry.date.split("/").reverse().join("-"));
    return entryDate >= startDate && entryDate <= endDate;
  });

  // If no data is found, add all days from Sunday to Saturday with hours set to "00:00"
  if (filteredData.length === 0) {
    allDates.forEach(({ dayOfWeek, date }) => {
      filteredData.push({ dayOfWeek, date, hours: "00:00" });
    });
  } else {
    // Ensure we have all days from Sunday to Saturday
    const existingDays = filteredData.map((entry) => entry.dayOfWeek);
    allDates.forEach(({ dayOfWeek, date }) => {
      if (!existingDays.includes(dayOfWeek)) {
        filteredData.push({ dayOfWeek, date, hours: "00:00" });
      }
    });
  }

  // Reorganize the filteredData to ensure all days (Sunday to Saturday) are present, including total row
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const fullWeekData = daysOfWeek.map((day) => {
    const dayData = filteredData.find((entry) => entry.dayOfWeek === day);
    return {
      dayOfWeek: day,
      date: dayData ? dayData.date : "",
      hours: dayData ? dayData.hours : "00:00",
    };
  });

  // Calculate total hours for the full week data
  let totalHours = 0;
  fullWeekData.forEach((entry) => {
    const [hours, minutes] = entry.hours.split(":").map(Number);
    totalHours += hours + minutes / 60;
  });

  // Add the total row to the full week data
  const totalRow = {
    dayOfWeek: "TOTAL",
    date: " ",
    hours: formatTime(totalHours),
  };

  fullWeekData.push(totalRow);

  // Return the response with the full week data
  return NextResponse.json({
    projectTimeChart: data.projectTimeChart,
    stats: data.stats,
    timesheetData: {
      days: fullWeekData,
    },
    notifications: data.notifications,
  });
}
