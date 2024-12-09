import { NextResponse } from "next/server";

interface TimeSheetData {
  date_range: string;
  project_name: string;
  year: number;
  month: string;
  logged_hours: number;
  approved_hours: number;
  employee_name: string;
}

// Demo data for now
const demoData: TimeSheetData[] = [
  {
    date_range: "2024/01/01-2024/01/31",
    project_name: "Project A",
    year: 2024,
    month: "January",
    logged_hours: 160,
    approved_hours: 150,
    employee_name: "John Doe",
  },
  {
    date_range: "2024/02/01-2024/02/28",
    project_name: "Project B",
    year: 2024,
    month: "February",
    logged_hours: 140,
    approved_hours: 135,
    employee_name: "Jane Smith",
  },
  // Add more demo data entries here as needed
];

export async function POST(request: Request) {
  try {
    // Directly extract tabKey and its associated exclude and include fields
    const { tabKey } = await request.json();
    // Define the params object for each tab
    const params: Record<string, { exclude: string[] }> = {
      "project-summary": { exclude: ["employee_name", "dateRange"] },
      "project-details": { exclude: ["employee_name"] },
      "employee-summary": { exclude: ["dateRange"] },
      "employee-details": { exclude: [] },
    };

    // Check if the tabKey exists in the params object
    const { exclude = [] } = params[tabKey] || {};

    // Log the exclude and include arrays
    console.log("exclude:", exclude); // Logs the exclude array

    // Filter the demo data based on the exclude and include fields
    const filteredData = demoData.map((item) => {
      let filteredItem: Partial<TimeSheetData> = {};

      // 1. Exclude fields first
      Object.keys(item).forEach((key) => {
        if (!exclude.includes(key)) {
          filteredItem[key as keyof TimeSheetData] = item[key];
        }
      });

      return filteredItem;
    });

    console.log("filtered data", filteredData); // Logs the filtered data

    return NextResponse.json({
      timesheet_report_details: filteredData,
    });
  } catch (error) {
    console.error("Error fetching project status data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch project status data",
      },
      { status: 500 }
    );
  }
}
