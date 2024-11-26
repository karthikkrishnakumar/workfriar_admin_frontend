import { NextResponse } from "next/server";

// Helper function to format total hours as hh:mm
function formatTime(totalHours: number): string {
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

export async function GET() {
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
  };

  // Example start and end dates for filtering (can be passed dynamically in the request)
  const startDate = new Date("2026-10-14");
  const endDate = new Date("2026-10-20");

  // Filter the timesheet data to include only entries between the startDate and endDate
  const filteredData = data.timesheetData.days.filter((entry) => {
    const entryDate = new Date(entry.date.split("/").reverse().join("-"));
    return entryDate >= startDate && entryDate <= endDate;
  });

  // Calculate total hours for the filtered data
  let totalHours = 0;
  filteredData.forEach((entry) => {
    const [hours, minutes] = entry.hours.split(":").map(Number);
    totalHours += hours + minutes / 60;
  });

  // Add the total row to the filtered data
  const totalRow = {
    dayOfWeek: "TOTAL",
    date: "",
    hours: formatTime(totalHours),
  };
  filteredData.push(totalRow);

  // Return only the filtered timesheet data with the total row
  return NextResponse.json({
    projectTimeChart: data.projectTimeChart,
    stats: data.stats,
    timesheetData: {
      days: filteredData,
    },
  });
}
