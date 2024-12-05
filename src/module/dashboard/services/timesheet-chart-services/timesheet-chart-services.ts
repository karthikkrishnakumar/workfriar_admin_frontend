import http from "@/utils/http";


// Define the interface for the stats data returned by the API
export interface StatsProps {
  saved: number;
  approved: number;
  rejected: number;
}

/**
 * Fetches the timesheet stats data with optional filters for year and month.
 * @param year Optional year to filter the stats data.
 * @param month Optional month to filter the stats data (0-based index).
 * @returns A promise containing the stats data.
 */
export const fetchTimesheetChartData = async (
  year?: number,
  month?: number
): Promise<StatsProps> => {
  try {
    // Prepare query parameters based on filters
    const params: Record<string, any> = {};
    if (year) params.year = year;
    if (month !== undefined) params.month = month;

    // Make an HTTP POST request to fetch the timesheet stats data
    const response = await http().post(
      "/api/dashboard/timesheet-chart",
      params
    );
    return response.response.data.timesheet_chart; // Return the stats data
  } catch (error) {
    console.error("Error fetching timesheet stats:", error);
    throw error; // Rethrow the error if something goes wrong
  }
};
