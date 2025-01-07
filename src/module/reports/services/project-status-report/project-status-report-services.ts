import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls

// Type definitions for the report data and response
export interface ReportData {
  project_name: string;
  project_lead: string;
  reporting_period: Date;
  progress: string;
  comments?: string;
  accomplishments: string;
  goals: string;
  blockers?: string;
}
interface ValidationError {
  forEach(arg0: (error: { field: string; message: string }) => void): unknown;
  field: string;
  message: string;
}
interface AddProjectStatusReportResponse {
  status: boolean;
  message: string;
  errors?: ValidationError;
  data?: ReportData;
}
interface EditProjectStatusReportResponse {
  status: boolean;
  message: string;
  errors?: ValidationError;
  data?: ReportData;
}
export interface DropDownData {
  id: string;
  name: string;
  project_lead?: {
    id: string;
    name: string;
  };
}
interface DropDownResponse {
  status: boolean;
  data: DropDownData[];
  message: string;
  errors: string[] | null;
}

/**
 * Service functions to handle project-related API calls.
 */
export default function UseProjectStatusServices() {
  /**
   * Fetches the project details based on the provided project ID.
   * @param id - The ID of the project to fetch details for.
   * @returns Project details or throws an error if the request fails.
   */
  const fetchProjectDetails = async (id: string): Promise<any> => {
    // const props: JSON = <JSON>(<unknown>{ id }); // Properly formatted request body

    try {
      // Send a POST request to fetch project details
      const { body } = await http().post(
        `/api/project-status-report/get-report/${id}`
      );

      console.log(body);
      // Handle the API response and return the report details
      return {
        status: body.status,
        data: body.data || null, // Return the project report details
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
  const fetchProjectStatusReport = async (
    page: number,
    limit: number
  ): Promise<any> => {
    const props: JSON = <JSON>(<unknown>{ page, limit }); // Request payload

    try {
      // Send a POST request to fetch project status report data
      const { body } = await http().post(
        "/api/project-status-report/list-report",
        props
      );

      console.log(body, "in report");
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data.reports || [], // Return the projects data
        total: body.data.pagination.totalCount || 0, // Total count of projects
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

  const addProjectStatusReport = async (
    reportData?: ReportData // Optional parameter for report data if saving
  ): Promise<AddProjectStatusReportResponse> => {
    const props: JSON = <JSON>(<unknown>reportData); // Adding report data to request payload

    console.log(props, "in adding status report ");
    try {
      // If reportData is passed, it's used for saving the report
      const { body } = await http().post(
        "/api/project-status-report/add-report", // Endpoint for fetching reports
        props
      );
      // Return fetched data response
      return {
        status: body.status,
        data: body.data || [], // Return the reports data
        message: body.message || "Successfully added project status reports.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Handle errors and return meaningful response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while processing the project status report. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  const editProjectStatusReport = async (
    reportData: ReportData, // Optional parameter for report data if saving
    reportId: string
  ): Promise<EditProjectStatusReportResponse> => {
    const props: JSON = <JSON>(<unknown>reportData); // Adding report data to request payload

    console.log(props, "in adding status report ");
    try {
      // If reportData is passed, it's used for saving the report
      const { body } = await http().post(
        `/api/project-status-report/update-report/${reportId}`, // Endpoint for saving the report
        props
      );
      console.log(body,"in edit");
      // Return fetched data response
      return {
        status: body.status,
        data: body.data || [], // Return the reports data
        message: body.message || "Successfully updated project status reports.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Handle errors and return meaningful response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while processing the project status report. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  async function fetchDropdownData(type: string): Promise<DropDownResponse> {
    try {
      // Call the API with the provided type to get project or lead data
      const response = await http().post(
        `/api/project-status-report/dropdown/${type}`
      );
      const body = response.body;

 
      // Return the fetched data response formatted as DropDownResponse
      return {
        status: body.status,
        data: body.data || [],
        message: body.message || "Data fetched successfully.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Handle and return errors in a structured format
      return {
        status: false,
        data: [],
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching dropdown data. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
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
