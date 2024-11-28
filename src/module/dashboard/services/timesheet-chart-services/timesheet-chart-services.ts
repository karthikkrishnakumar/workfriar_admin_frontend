import axios from "axios";

// Define the interface for the stats data returned by the API
export interface StatsProps {
  saved: number;
  approved: number;
  rejected: number;
}

/**
 * Service class for fetching project time stats data.
 */
export class TimesheetChartService {
  /**
   * Fetches the project time stats data.
   * @returns A promise containing the stats data.
   */
  static async fetchTimesheetChartData(): Promise<StatsProps> {
    try {
      // Make an HTTP GET request to fetch the project time stats data
      const response = await axios.get("/api/dashboard/timesheet-chart", {
        headers: {
          userID: "1", // Pass userID as a custom header
        },
      });
      return response.data.timesheet_chart; // Return the stats data
    } catch (error) {
      console.error("Error fetching project time stats:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  }
}
