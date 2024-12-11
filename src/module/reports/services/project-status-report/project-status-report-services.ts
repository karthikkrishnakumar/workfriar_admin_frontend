import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls

/**
 * Service functions to handle project-related API calls.
 */
export default function useProjectStatusServices() {

  /**
   * Fetches the project details based on the provided project ID.
   * @param id - The ID of the project to fetch details for.
   * @returns Project details or throws an error if the request fails.
   */
  const fetchProjectDetails = async (id: string): Promise<any> => {
    const props: JSON = <JSON>(<unknown>{ id }); // Properly formatted request body

    try {
      // Send a POST request to fetch project details
      const { body } = await http().post(
        "/api/project-status-report/get-report",
        props
      );

      // Handle the API response and return the report details
      return {
        status: body.status,
        data: body.report_details || null, // Return the project report details
        message: body.message || "Successfully fetched project details.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching project details. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  /**
   * Fetches the project status report data with pagination.
   * @param page - Current page number for pagination.
   * @param limit - Number of items per page.
   * @returns Project status report details or throws an error if the request fails.
   */
  const fetchProjectStatusReport = async (page: number, limit: number): Promise<any> => {
    const props: JSON = <JSON>(<unknown>{ page, limit }); // Request payload

    try {
      // Send a POST request to fetch project status report data
      const { body } = await http().post(
        "/api/project-status-report/list-report",
        props
      );

      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.reports || [], // Return the projects data
        total: body.pagination.totalPages || 0, // Total count of projects
        message: body.message || "Successfully fetched project status report.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching project status report. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  return {
    fetchProjectDetails,
    fetchProjectStatusReport,
  };
}
