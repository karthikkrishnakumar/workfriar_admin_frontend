import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls

/**
 * Fetches employee data, employee projects data, and employees table data based on various conditions.
 */
export const useEmployeeData = () => {

  /**
   * Fetches employee details based on employee ID.
   * @param employeeId - ID of the employee to fetch data for.
   * @returns Employee data or throws an error if the request fails.
   */
  const fetchEmployeeData = async (id: string): Promise<any> => {
    const props: JSON = <JSON>(<unknown> { id });

    try {
      const { body } = await http().post("/api/admin/employee-details/", props);
      return {
        status: body.status,
        data: body.data || null,  // Return the response data
        message: body.message || "Successfully fetched employee data.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching employee data. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  /**
   * Fetches employee projects data based on employee ID.
   * @param page - Current page number.
   * @param pageSize - Number of records per page.
   * @param employeeId - ID of the employee to fetch projects for.
   * @returns Employee projects data or throws an error if the request fails.
   */
  const fetchEmployeeProjectsData = async (
    page: number,
    pageSize: number,
    employeeId: string
  ): Promise<any> => {
    const props: JSON = <JSON>(<unknown> { page, pageSize, employeeId });

    try {
      const { body } = await http().post(
        "/api/employee-projects-details/",
        props
      );

      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully fetched employee projects data.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching employee projects data. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  /**
   * Fetches employees data based on selected department or tab.
   * @param page - Current page number.
   * @param pageSize - Number of records per page.
   * @param tabKey - Key representing the department or "all" for all departments.
   * @returns Filtered employee data or throws an error if the request fails.
   */
  const fetchEmployeesData = async (
    page: number,
    limit: number,
    tabKey: string
  ): Promise<any> => {
    const props: JSON = <JSON>(<unknown> { page, limit, tabKey });

    try {
      const { body } = await http().post(
        "/api/admin/employees-data",
        props
      );

      return {
        status: body.status,
        data: body.data || null,
        total:body.pagination.totalPages,
        message: body.message || "Successfully fetched employee data.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching employee data. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  return {
    fetchEmployeeData,
    fetchEmployeeProjectsData,
    fetchEmployeesData,
  };
};
