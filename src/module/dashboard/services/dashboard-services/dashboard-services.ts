import http from "@/utils/http";
// Define the interface for project time chart data
export interface ProjectTimeChartProps {
  project_name: string;
  hours: number;
}
export interface ProjectTimeResponse {
  status: string;
  data: ProjectTimeChartProps[];
  message: string;
  errors: Error | null;
}
export interface StatsProps {
  status: string;
  count: number;
}
export interface TimesheetSnapResponse {
  status: string;
  data: StatsProps[];
  message: string;
  errors: Error | null;
}
export interface TimesheetDue {
  dayOfWeek: string;
  date: string;
  hours: string;
  disable: boolean;
}
export interface TimesheetDueResponse {
  status: string;
  data: TimesheetDue[];
  range: string;
  message: string;
  errors: Error | null;
}

export interface Notification {
  id: string; // Unique identifier for the notification
  message: string; // The content of the notification
  time: string; // Timestamp of when the notification was sent
  is_read: boolean;
}

export interface NotificationResponse {
  status: string;
  data: Notification[] | [];
  message: string;
  errors: Error | null;
}

export interface Holidays {
  id: string; // Unique identifier for the notification
  holiday_name: string;
  holiday_date: string;
}

export interface HolidayResponse {
  status: string;
  data: Holidays[] | [];
  message: string;
  errors: Error | null;
}

/**
 * Fetches the project time data for a given date range.
 * @param startDate - The start date in ISO format (optional).
 * @param endDate - The end date in ISO format (optional).
 * @param prev - Whether to fetch the previous period (optional).
 * @param next - Whether to fetch the next period (optional).
 * @returns A promise containing the project time chart data.
 */
export default function UseDashboardServices() {
  const fetchProjectTimes = async (): Promise<ProjectTimeResponse> => {
    // Prepare the request payload
    try {
      // Make an HTTP POST request to fetch the project time data
      const { body } = await http().post(
        "/api/timesheet/get-current-day-timesheets"
      );

      // Return the project time data with additional details
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully fetched project time data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error fetching project time data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  const fetchTimesheetChartData = async (
    year?: number,
    month?: number
  ): Promise<TimesheetSnapResponse> => {
    try {
      const props: JSON = <JSON>(<unknown>{ year, month });
      // Make an HTTP POST request to fetch the project time data
      const { body } = await http().post(
        "/api/timesheet/get-timesheet-snapshot",
        props
      );

      console.log(body, "snapshot");
      // Return the project time data with additional details
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully fetched project time data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error fetching project time data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  const fetchTimesheetDueData = async (
    startDate?: string,
    endDate?: string,
    prev?: boolean,
    next?: boolean
  ): Promise<TimesheetDueResponse> => {
    try {
      const props: JSON = <JSON>(<unknown>{ startDate, endDate, prev, next });
      // Make an HTTP POST request to fetch the project time data
      const { body } = await http().post(
        "/api/timesheet/get-due-timesheets",
        props
      );

      console.log(body, "timesheet due");
      // Return the project time data with additional details
      return {
        status: body.status,
        data: body.data || null,
        range: body.date_range,
        message: body.message || "Successfully fetched project time data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error fetching project time data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  const fetchNotifications = async (): Promise<NotificationResponse> => {
    try {
      // Make an HTTP POST request to fetch the dashboard notifiaction data
      const { body } = await http().post("/api/user/notifications");

      // Return notification data with additional details
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully fetched notifications data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error fetching notifications data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  const fetchHolidays = async (): Promise<HolidayResponse> => {
    try {
      // Make an HTTP POST request to fetch the dashboard notifiaction data
      const { body } = await http().post("/api/holiday/get-next");

      console.log(body, "in services");
      // Return notification data with additional details
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully fetched holiday data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error fetching notifications data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  return {
    fetchProjectTimes,
    fetchTimesheetChartData,
    fetchTimesheetDueData,
    fetchNotifications,
    fetchHolidays,
  };
}
