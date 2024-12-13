import http from "@/utils/http";

// Define the interface for project time chart data
export interface TimesheetDay {
  dayOfWeek: string;
  date: string;
  hours: string;
  disable: boolean;
}

export interface TimesheetData {
  timesheetData: {
    days: TimesheetDay[];
  };
}

/**
 * Fetches the project time data for a given date range.
 * @param startDate - The start date in ISO format (optional).
 * @param endDate - The end date in ISO format (optional).
 * @param prev - Whether to fetch the previous period (optional).
 * @param next - Whether to fetch the next period (optional).
 * @returns A promise containing the project time chart data.
 */
export const useTimesheetDue = () => {
  const fetchTimesheetData = async (
    startDate?: string,
    endDate?: string,
    prev?: boolean,
    next?: boolean
  ): Promise<any> => {
    console.log(startDate, endDate, prev, next, "in services");
    // Prepare the request payload
    const props: JSON = <JSON>(<unknown>{ startDate, endDate, prev, next });

    try {
      const { body } = await http().post(
        "/api/timesheet/get-due-timesheets",
        props
      );

      console.log(body);
      return {
        status: body.status,
        data: body.data || null,
        range: body.range,
        message: body.message || "Successfully fetched project time data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error fetching project time data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  return {
    fetchTimesheetData,
  };
};
