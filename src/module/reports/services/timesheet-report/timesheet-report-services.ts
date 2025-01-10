import { TimesheetReportReportsResponse } from "@/interfaces/reports/timesheet-report/timesheet-repot";
import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls

/**
 * Service functions to handle timesheet-related API calls.
 */
export default function UseTimeSheetServices() {
  /**
   * Fetches the timesheet report data based on the provided tab key.
   * @param tabKey - Key to filter the timesheet report.
   * @returns Timesheet report details or throws an error if the request fails.
   */
  const fetchTimeSheetReportData = async (
    tabKey: string,
    page?: number,
    limit?: number,
    startDate?: string,
    endDate?: string,
    projectIds?: string[],
    userIds?: string[],
    year?: string,
    month?: string
  ): Promise<TimesheetReportReportsResponse> => {
    const props: JSON = <JSON>(
      (<unknown>{
        tabKey,
        page,
        limit,
        startDate,
        endDate,
        projectIds,
        userIds,
        year,
        month,
      })
    ); // Properly formatted request body
    try {
        // Send a POST request to fetch timesheet report data
        const { body } = await http().post("/api/timesheet/get-timesheet-report",props);
        // Handle the API response and return filtered data
        return {
            status: body.status,
            data: body.data || null, // Return the report details
            total: body.pagination.totalItems,
            message: body.message || "Successfully fetched timesheet report data.",
            errors: body.errors || null,
        };
    } catch (error) {
        throw error
     
    }

  };

    /**
   * Fetches both the projects and employees in one API call.
   * @returns {Promise<any>} Projects and employees data.
   */
    const fetchProjectsAndEmployees = async (): Promise<any> => {
      try {
          // Send a GET request to fetch projects and employees
          const { body } = await http().post("/api/admin/list-projects-employees");  // Adjust the URL accordingly
          return {
              status: body.status,
              data: body.data || null, // Contains projects and employees arrays
              message: body.message || "Successfully fetched projects and employees.",
              errors: body.errors || null,
          };
      } catch (error) {
          throw error
      }
    };

  return {
    fetchTimeSheetReportData,
    fetchProjectsAndEmployees
  };
}
