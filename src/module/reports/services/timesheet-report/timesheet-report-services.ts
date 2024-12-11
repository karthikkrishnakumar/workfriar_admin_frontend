import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls

/**
 * Service functions to handle timesheet-related API calls.
 */
export default function useTimeSheetServices() {

  /**
   * Fetches the timesheet report data based on the provided tab key.
   * @param tabKey - Key to filter the timesheet report.
   * @returns Timesheet report details or throws an error if the request fails.
   */
  const fetchTimeSheetReportData = async (tabKey: string): Promise<any> => {
    const props: JSON = <JSON>(<unknown>{ tabKey }); // Properly formatted request body

    try {
      // Send a POST request to fetch timesheet report data
      const { body } = await http().post(
        "api/timesheet/get-employee-detail-report",
        props
      );

      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || null, // Return the report details
        message: body.message || "Successfully fetched timesheet report data.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching timesheet report data. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  return {
    fetchTimeSheetReportData,
  };
}
