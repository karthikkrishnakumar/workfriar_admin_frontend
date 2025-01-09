import { AddUserResponse, EditEmployeeData, EditUserResponse, GetAllEmployeeResponse, GetEmployeePorjectsResponse, GetEmployeeResponse, GetRolesResponse } from "@/interfaces/organization/organization";
import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls


/**
 * Fetches employee data, employee projects data, and employees table data based on various conditions.
 */
export default function UseEmployeeData() {
  /**
   * Fetches employee details based on employee ID.
   * @param employeeId - ID of the employee to fetch data for.
   * @returns Employee data or throws an error if the request fails.
   */
  const fetchEmployeeData = async (id: string): Promise<GetEmployeeResponse> => {
    const props: JSON = <JSON>(<unknown>{ id });

    try {
      const { body } = await http().post("/api/admin/employee-details/", props);
      return {
        status: body.status,
        data: body.data || null, // Return the response data
        message: body.message || "Successfully fetched employee data.",
        errors: body.errors || null,
      };
    } catch (error) {
      throw error;
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
    userId: string
  ): Promise<GetEmployeePorjectsResponse> => {
    const limit = pageSize;
    const props: JSON = <JSON>(<unknown>{ page, limit, userId });

    try {
      const { body } = await http().post(
        "/api/project/get-projects-by-user",
        props
      );

      console.log(body.data,"emplpoyee project")
      console.log(body.data,"projects")
      return {
        status: body.status,
        data: body.data || null,
        total: body.pagination.totalItems,
        message: body.message || "Successfully fetched employee projects data.",
        errors: body.errors || null,
      };
    } catch (error) {
      throw error;
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
  ): Promise<GetAllEmployeeResponse> => {
    const props: JSON = <JSON>(<unknown>{ page, limit, tabKey });

    try {
      const { body } = await http().post("/api/admin/employees-data", props);
      console.log(body.data)
      return {
        status: body.status,
        data: body.data || null,
        total: body.pagination.totalItems,
        message: body.message || "Successfully fetched employee data.",
        errors: body.errors || null,
      };
    } catch (error) {
      throw error;
    }
  };

  /**
   * Fetches employees data based on selected department or tab.
   * @param department- Current page number.
   * @returns Filtered employee data or throws an error if the request fails.
   */
  const fetchRolesByDepartment = async (
    department: string
  ): Promise<GetRolesResponse> => {
    const props: JSON = <JSON>(<unknown>{ department });
    try {
      const { body } = await http().post("/api/admin/getroles", props);
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully fetched employee data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error fetching Datepicker data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  const addEmployee = async (data: EditEmployeeData): Promise<AddUserResponse> => {
    const props: JSON = <JSON>(<unknown>data);
    try {
      const { body } = await http().post("/api/admin/addemployee", props);
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully edited employee data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error adding employee data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  const editEmployee = async (
    data: EditEmployeeData
  ): Promise<EditUserResponse> => {
    const props: JSON = <JSON>(<unknown>data);
    const hasFile: boolean = <boolean>true;

    try {
      const { body } = await http().post(
        "/api/admin/editemployee",
        props,
        hasFile
      );
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully edited employee data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error error editing employee data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  const updateEmployeeStatus = async (
    id: string,
    newStatus: boolean
  ): Promise<any> => {
    const props: JSON = <JSON>(<unknown>{ id, status: newStatus });

    try {
      const { body } = await http().post(
        "/api/admin/update-employee-status",
        props
      );
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully edited employee data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error error editing employee data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  const updateProjectStatus = async (
    id: string,
    newStatus: string
  ): Promise<any> => {
    const props: JSON = <JSON>(<unknown>{ id, status: newStatus });

    try {
      const { body } = await http().post(
        "/api/admin/update-employee-projects-status",
        props
      );
      return {
        status: body.status,
        data: body.data || null,
        message: body.message || "Successfully edited employee data.",
        errors: body.errors || null,
      };
    } catch (error) {
      console.error("Error error editing employee data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  };

  return {
    fetchEmployeeData,
    fetchEmployeeProjectsData,
    fetchEmployeesData,
    fetchRolesByDepartment,
    addEmployee,
    editEmployee,
    updateEmployeeStatus,
    updateProjectStatus,
  };
}
