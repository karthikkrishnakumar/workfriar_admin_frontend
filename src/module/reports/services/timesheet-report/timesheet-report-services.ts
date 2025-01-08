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
  ): Promise<any> => {
   

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

    console.log(props, "timesheet props ");
    console.log(props, "timesheet report ");
    try {
      // Send a POST request to fetch timesheet report data
      const { body } = await http().post(
        "/api/timesheet/get-timesheet-report",
        props
      );

      console.log(body);
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || null, // Return the report details
        total: body.pagination.totalItems,
        message: body.message || "Successfully fetched timesheet report data.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        data: [],
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching timesheet report data. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
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
  
        console.log(body, "Fetched projects and employees");
  
        return {
          status: body.status,
          data: body.data || null, // Contains projects and employees arrays
          message: body.message || "Successfully fetched projects and employees.",
          errors: body.errors || null,
        };
      } catch (error: any) {
        return {
          status: false,
          data: [],
          message:
            error?.response?.data?.message ||
            "An error occurred while fetching projects and employees data. Please try again.",
          errors: error?.response?.data?.errors || null,
        };
      }
    };

  return {
    fetchTimeSheetReportData,
    fetchProjectsAndEmployees
  };
}
