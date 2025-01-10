import { DatePickerResponse, HolidayResponse, NotificationResponse, ProjectTimeResponse, SaveTimesheetDueResponse, TimesheetDueResponse, TimesheetSnapResponse } from "@/interfaces/dashboard/dashboard";
import http from "@/utils/http";

// Define the interface for project time chart data


export default function UseDashboardServices() {
      /**
       * Fetches the project time data for the current day.
       * @returns A promise containing the project time data.
       */
      const fetchProjectTimes = async (): Promise<ProjectTimeResponse> => {
        // Prepare the request payload
        try {
            // Make an HTTP POST request to fetch the project time data
            const { body } = await http().post("/api/timesheet/get-current-day-timesheets");
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


      /**
       * Fetches timesheet chart data for a given year and month.
       * @param year - The year for the chart data (optional).
       * @param month - The month for the chart data (optional).
       * @returns A promise containing the timesheet chart data.
       */
      const fetchTimesheetChartData = async (
        year?: number | null,
        month?: number | null
      ): Promise<TimesheetSnapResponse> => {
        try {
          if (year==null && month==null){
            year = undefined
            month = undefined
          }
            const props: JSON = <JSON>(<unknown>{ year, month });
            // Make an HTTP POST request to fetch the project time data
            const { body } = await http().post("/api/timesheet/get-timesheet-snapshot",props);
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


      /**
       * Fetches timesheet due data for a given date range.
       * @param startDate - The start date of the due data (optional).
       * @param endDate - The end date of the due data (optional).
       * @returns A promise containing the timesheet due data.
       */
      const fetchTimesheetDueData = async (
        startDate?: string,
        endDate?: string
      ): Promise<TimesheetDueResponse> => {
        try {
            const props: JSON = <JSON>(<unknown>{ startDate, endDate });
            // Make an HTTP POST request to fetch the project time data
            const { body } = await http().post("/api/timesheet/get-due-timesheets",props);
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


      /**
       * Fetches the notification data for the dashboard.
       * @returns A promise containing the notification data.
       */
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


      /**
       * Fetches the holiday data for the dashboard.
       * @returns A promise containing the holiday data.
       */
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


      /**
       * Fetches the date picker data for the dashboard.
       * @returns A promise containing the date picker data.
       */
      const fetchDatePickerData = async (): Promise<DatePickerResponse> => {
        try {
            // Make an HTTP POST request to fetch the dashboard datepicker data
            const { body } = await http().post("/api/timesheet/getduedates");
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
      };


      /**
       * Saves the due timesheet data for a given date range.
       * @param startDate - The start date of the due timesheet data.
       * @param endDate - The end date of the due timesheet data.
       * @returns A promise containing the response data for the saved timesheets.
       */
      const saveTimesheetDue = async (
        startDate: string,
        endDate: string
      ): Promise<SaveTimesheetDueResponse> => {
        try {
            const props: JSON = <JSON>(<unknown>{ startDate, endDate });
            // Make an HTTP POST request to fetch the dashboard datepicker data
            const { body } = await http().post("/api/timesheet/submit-due-timesheets",props);              
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
      };

  return {
    fetchProjectTimes,
    fetchTimesheetChartData,
    fetchTimesheetDueData,
    fetchNotifications,
    fetchHolidays,
    fetchDatePickerData,
    saveTimesheetDue,
  };
}
