import axios from "axios";

// Define the interfaces for the data structures

/**
 * Interface representing the stats data for the dashboard.
 * @param saved - Number of saved entries
 * @param approved - Number of approved entries
 * @param rejected - Number of rejected entries
 */
export interface Stats {
  saved: number;
  approved: number;
  rejected: number;
}

/**
 * Interface representing the data structure for project hours chart.
 * @param project - Name of the project
 * @param hours - Number of hours associated with the project
 */
export interface ProjectTimeChartType {
  project: string;
  hours: number;
}

/**
 * Interface representing the notification data for the dashboard.
 * @param id - Unique identifier of the notification
 * @param message - Message content of the notification
 * @param time - Timestamp of the notification
 * @param origin - Origin or source of the notification
 */
export interface Notification {
  id: string;
  message: string;
  time: string;
  origin: string;
}

/**
 * Interface representing a single day's timesheet data.
 * @param date - The date of the timesheet entry
 * @param hours - Number of hours worked on that day
 * @param dayOfWeek - Day of the week (e.g., Monday, Tuesday)
 * @param disable - A flag indicating if the day is disabled
 */
export interface TimesheetDay {
  date: string;
  hours: string;
  dayOfWeek: string;
  disable: boolean;
}

/**
 * Interface representing the entire timesheet data for the dashboard.
 * @param days - An array of timesheet entries for each day
 * @param total - Optional total hours worked (can be omitted)
 */
export interface TimesheetData {
  days: TimesheetDay[] | [];
  total?: string;
}

/**
 * Interface for holiday
 * @param holidayName
 * @param holidayDate
 */

export interface HolidayProps {
  holidayName: string;
  holidayDate: string;
}

/**
 * Interface representing the overall dashboard data, including stats, project chart, and timesheet.
 * @param projectTimeChart - Array of project time chart data
 * @param stats - Statistics like saved, approved, and rejected entries
 * @param timesheetData - Data for the user's timesheet
 * @param notifications - List of notifications for the dashboard
 */
export interface DashboardData {
  projectTimeChart: ProjectTimeChartType[];
  stats: Stats;
  timesheetData: TimesheetData;
  notifications: Notification[];
  holidayData: HolidayProps[]; 
}

/**
 * Service class for fetching dashboard data.
 */
export class DashboardService {
  /**
   * Fetches the dashboard data from the API.
   * @param startDate - The start date for the dashboard data (optional)
   * @param endDate - The end date for the dashboard data (optional)
   * @returns A promise containing the DashboardData
   */
  static async fetchDashboardData(
    startDate: Date | null,
    endDate: Date | null
  ): Promise<DashboardData> {
    try {
      // Make an HTTP GET request to fetch the dashboard data
      const response = await axios.get("/api/dashboard/dashboard-api", {
        params: {
          startDate: startDate?.toISOString(), // Convert startDate to ISO string if it exists
          endDate: endDate?.toISOString(), // Convert endDate to ISO string if it exists
        },
        headers: {
          userID: "1", // Pass userID as a custom header
        },
      });


      console.log(response.data.holidayData)
      // Return the fetched data
      return response.data;
    } catch (error) {
      console.error("Error fetching project time chart data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  }
}
