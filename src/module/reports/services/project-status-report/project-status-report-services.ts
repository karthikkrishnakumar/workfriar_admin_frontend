import { AddProjectStatusReportResponse, DropDownResponse, EditProjectStatusReportResponse, ProjectStatusReportDetailsResponse, ProjectStatusReportsResponse, ReportData } from "@/interfaces/reports/project-status-report/project-status-report";
import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls

/**
 * Service functions to handle project-related API calls.
 */
export default function UseProjectStatusServices() {
  /**
   * Fetches the project details based on the provided project ID.
   * @param id - The ID of the project to fetch details for.
   * @returns Project details or throws an error if the request fails.
   */
  const fetchProjectDetails = async (id: string): Promise<ProjectStatusReportDetailsResponse> => {
    try {
        // Send a POST request to fetch project details
        const { body } = await http().post(`/api/project-status-report/get-report/${id}`);
        // Handle the API response and return the report details
        return {
            status: body.status,
            data: body.data || null, // Return the project report details
            message: body.message || "Successfully fetched project details.",
            errors: body.errors || null,
        };
    } catch (error) {
        throw error; // Rethrow the error if something goes wrong
    }
  };


  /**
   * Fetches the project status report data with pagination.
   * @param page - Current page number for pagination.
   * @param limit - Number of items per page.
   * @returns Project status report details or throws an error if the request fails.
   */
  const fetchProjectStatusReport = async (
    page: number,
    limit: number
  ): Promise<ProjectStatusReportsResponse> => {
    const props: JSON = <JSON>(<unknown>{ page, limit }); // Request payload
    try {
        // Send a POST request to fetch project status report data
        const { body } = await http().post("/api/project-status-report/list-report",props);
        // Handle the API response and return filtered data
        return {
            status: body.status,
            data: body.data.reports || [], // Return the projects data
            total: body.data.pagination.totalCount || 0, // Total count of projects
            message: body.message || "Successfully fetched project status report.",
            errors: body.errors || null,
        };
    } catch (error) {
        throw error; // Rethrow the error if something goes wrong
    }
  };


  const addProjectStatusReport = async (
    reportData?: ReportData // Optional parameter for report data if saving
  ): Promise<AddProjectStatusReportResponse> => {
    const props: JSON = <JSON>(<unknown>reportData); // Adding report data to request payload
    try {
        // If reportData is passed, it's used for saving the report
        const { body } = await http().post("/api/project-status-report/add-report",props);
        // Return fetched data response
        return {
            status: body.status,
            data: body.data || [], // Return the reports data
            message: body.message || "Successfully added project status reports.",
            errors: body.errors || null,
        };
    } catch (error) {
        throw error; // Rethrow the error if something goes wrong
    }
  };

  const editProjectStatusReport = async (
    reportData: ReportData, // Optional parameter for report data if saving
    reportId: string
  ): Promise<EditProjectStatusReportResponse> => {
    const props: JSON = <JSON>(<unknown>reportData); // Adding report data to request payload
    try {
        // If reportData is passed, it's used for saving the report
        const { body } = await http().post(`/api/project-status-report/update-report/${reportId}`, props);
        // Return fetched data response
        return {
            status: body.status,
            data: body.data || [], // Return the reports data
            message: body.message || "Successfully updated project status reports.",
            errors: body.errors || null,
        };
    } catch (error) {
        throw error; // Rethrow the error if something goes wrong
    }
  };

  async function fetchDropdownData(type: string): Promise<DropDownResponse> {
    try {
        // Call the API with the provided type to get project or lead data
        const response = await http().post(`/api/project-status-report/dropdown/${type}`);
        const body = response.body;
        // Return the fetched data response formatted as DropDownResponse
        return {
            status: body.status,
            data: body.data || [],
            message: body.message || "Data fetched successfully.",
            errors: body.errors || null,
        };
    } catch (error) {
        throw error; // Rethrow the error if something goes wrong
    }
  }

  return {
    fetchProjectDetails,
    fetchProjectStatusReport,
    addProjectStatusReport,
    editProjectStatusReport,
    fetchDropdownData,
  };
}
