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

export interface DatePickerData {
  start: string;
  end: string;
  week: number;
}


/**
 * Fetches the project time data for a given date range.
 * @param startDate - The start date for the range.
 * @param endDate - The end date for the range.
 * @returns A promise containing the project time chart data.
 */
export const TimesheetDueServices = async (
  startDate: Date | null,
  endDate: Date | null
): Promise<TimesheetData> => {
  try {
    // Make an HTTP POST request to fetch the project time data
    const response = await http().post("/api/dashboard/timesheet-due", {
      startDate: startDate?.toISOString(), // Convert startDate to ISO string if it exists
      endDate: endDate?.toISOString(), // Convert endDate to ISO string if it exists
    });
    return response.response.data; // Return the project time data
  } catch (error) {
    console.error("Error fetching project time data:", error);
    throw error; // Rethrow the error if something goes wrong
  }
};


export const fetchDatePickerData = async (): Promise<DatePickerData[]> => {
  try {
    const response = await http().post("/api/dashboard/datepicker-due-data");
    return response.response.data.DatePickerData;
  } catch (error) {
    console.error("Error fetching date picker data:", error);
    throw new Error("Failed to fetch date picker data");
  }
};