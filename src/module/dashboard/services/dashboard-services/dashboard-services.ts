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
  isDisable: boolean;
}
export interface TimesheetDueResponse {
  status: string;
  data: TimesheetDue[];
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

export interface DatePickerData {
  startDate: string;  // Start date in string format
  endDate: string;    // End date in string format
  week: number;   // Week number
  label: string;  // Label associated with the date range
}


export interface DatePickerResponse{
  status: string;
  data: DatePickerData[];
  message: string;
  errors: Error | null;
}

export interface saveTimesheetDueResponse{
  status: boolean;
  data:[];
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
      throw error; // Rethrow the error if something goes wrong
    }
  };

  const fetchTimesheetChartData = async (
    year?: number | null,
    month?: number | null
  ): Promise<TimesheetSnapResponse> => {
    try {
      const props: JSON = <JSON>(<unknown>{ year, month });
      // Make an HTTP POST request to fetch the project time data
      const { body } = await http().post(
        "/api/timesheet/get-timesheet-snapshot",
        props
      );

      // Return the project time data with additional details
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully fetched project time data.",
        errors: body.errors || null,
      };
    } catch (error) {
      throw error; // Rethrow the error if something goes wrong
    }
  };

  
  const fetchTimesheetDueData = async (
    startDate?: string,
    endDate?: string,
    
  ): Promise<TimesheetDueResponse> => {
    try {
      const props: JSON = <JSON>(<unknown>{ startDate, endDate});

      // Make an HTTP POST request to fetch the project time data
      const { body } = await http().post(
        "/api/timesheet/get-due-timesheets",
        props
      );

      // Return the project time data with additional details
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully fetched project time data.",
        errors: body.errors || null,
      };
    } catch (error) {
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
      throw error; // Rethrow the error if something goes wrong
    }
  };

  const fetchHolidays = async (): Promise<HolidayResponse> => {
    try {
      // Make an HTTP POST request to fetch the dashboard notifiaction data
      const { body } = await http().post("/api/holiday/dashboard-holiday");

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


  const fetchDatePickerData = async (): Promise<DatePickerResponse> => {
    try {
      // Make an HTTP POST request to fetch the dashboard datepicker data
      const { body } = await http().post("/api/user/getduedates");

      // Return datepicker data with additional details
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully fetched Datepicker data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error fetching Datepicker data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  }

  const saveTimesheetDue = async (
    startDate: string,
    endDate: string,
  ): Promise<saveTimesheetDueResponse> => {
    try {
      const props: JSON = <JSON>(<unknown>{ startDate, endDate});
      // Make an HTTP POST request to fetch the dashboard datepicker data
      const { body } = await http().post("/api/timesheet/submit-due-timesheets" , props);

      // Return datepicker data with additional details
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully saved due timesheets.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error saving due timesheets:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  }

  return {
    fetchProjectTimes,
    fetchTimesheetChartData,
    fetchTimesheetDueData,
    fetchNotifications,
    fetchHolidays,
    fetchDatePickerData,
    saveTimesheetDue
  };
}
