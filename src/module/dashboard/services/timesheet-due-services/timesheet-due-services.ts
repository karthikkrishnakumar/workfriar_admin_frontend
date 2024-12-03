import axios from "axios";

// Define the interface for project time chart data
export interface TimesheetDay {
  date: string;
  hours: string;
  dayOfWeek: string;
  disable: boolean;
}

export interface TimesheetData {
  days: TimesheetDay[] | [];
  total?: string;
}

/**
 * Service class for fetching project time data.
 */
export class TimesheetDueService {
  /**
   * Fetches the project time data for a given date range.
   * @param startDate - The start date for the range.
   * @param endDate - The end date for the range.
   * @returns A promise containing the project time chart data.
   */
  static async fetchTimesheetDueData(
    startDate: Date | null,
    endDate: Date | null
  ): Promise<TimesheetData[]> {
    try {
      // Make an HTTP GET request to fetch the project time data
      const response = await axios.get("/api/dashboard/timesheet-due", {
        params: {
          startDate: startDate?.toISOString(), // Convert startDate to ISO string if it exists
          endDate: endDate?.toISOString(), // Convert endDate to ISO string if it exists
        },
        headers: {
          userID: "2", // Pass userID as a custom header
        },
      });

      
      return response.data; // Return the project time data
    } catch (error) {
      console.error("Error fetching project time data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  }
}
