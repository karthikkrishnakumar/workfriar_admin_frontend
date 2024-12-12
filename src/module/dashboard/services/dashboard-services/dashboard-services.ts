import http from "@/utils/http";

// Define the interface for project time chart data
export interface ProjectTimeChartProps {
  project_name: string;
  hours: number;
}

export interface ProjectTimeResponse {
  status: string;
  data: ProjectTimeChartProps[] | null;
  message: string;
  errors: any | null;
}


export interface StatsProps {
  status: string; 
  count: number; 
}

export interface TimesheetSnapResponse {
  status: string;
  data:StatsProps[];
  message: string;
  errors: any | null;
}



/**
 * Fetches the project time data for a given date range.
 * @param startDate - The start date in ISO format (optional).
 * @param endDate - The end date in ISO format (optional).
 * @param prev - Whether to fetch the previous period (optional).
 * @param next - Whether to fetch the next period (optional).
 * @returns A promise containing the project time chart data.
 */
export default function useDashboardServices() {
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
      const { body } = await http().post("/api/timesheet/get-timesheet-snapshot",props);

      console.log(body,"in services")
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

  return {
    fetchProjectTimes,
    fetchTimesheetChartData,
  };
}
