import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls

export interface FormValueData {
  _id: string;
  role: string; // Start date in string format
  department: string; // End date in string format
  status: boolean;
  users: [
    {
      id: string;
      full_name: string;
    }
  ];
}

export interface GetRolesResponse {
  status: string;
  data: FormValueData[];
  message: string;
  errors: Error | null;
}

// Define the request payload structure for adding or editing an employee
export interface EmployeeData {
  id?:string;
  name: string;
  email: string;
  phone_number: string;
  location: string;
  role_id: string;
  reporting_manager: string;
  status: string;
  profile_pic: string | null; // The avatar can be null if not provided
}

export interface AddUserResponse {
  status: string;
  data: EmployeeData;
  message: string;
  errors: Error | null;
}

export interface EditUserResponse {
  status: string;
  data: EmployeeData;
  message: string;
  errors: Error | null;
}

/**
 * Fetches employee data, employee projects data, and employees table data based on various conditions.
 */
export default function UseEmployeeData() {
  /**
   * Fetches employee details based on employee ID.
   * @param employeeId - ID of the employee to fetch data for.
   * @returns Employee data or throws an error if the request fails.
   */
  const fetchEmployeeData = async (id: string): Promise<any> => {
    const props: JSON = <JSON>(<unknown>{ id });

    try {
      const { body } = await http().post("/api/admin/employee-details/", props);
      console.log(body);
      return {
        status: body.status,
        data: body.data || null, // Return the response data
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
    userId: string
  ): Promise<any> => {
    const limit = pageSize;
    const props: JSON = <JSON>(<unknown>{ page, limit, userId });

    try {
      const { body } = await http().post(
        "/api/project/get-projects-by-user",
        props
      );

      console.log(body, "project ");
      return {
        status: body.status,
        data: body.data || null,
        total: body.pagination.totalPages,
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
    const props: JSON = <JSON>(<unknown>{ page, limit, tabKey });

    try {
      const { body } = await http().post("/api/admin/employees-data", props);

      return {
        status: body.status,
        data: body.data || null,
        total: body.pagination.totalPages,
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
      console.log(body, "hai");
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

  const addEmployee = async (data: EmployeeData): Promise<AddUserResponse> => {
    const props: JSON = <JSON>(<unknown>{ data });
    console.log(data, "in add service");
    try {
      const { body } = await http().post("/api/admin/addemployee", props);
      console.log(body, "hai");
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
    data: EmployeeData
  ): Promise<EditUserResponse> => {
    const props: JSON = <JSON>(<unknown>{data});

    console.log(data)
    try {
      const { body } = await http().post("/api/admin/editemployee", props);
      console.log(body, "hai");
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
  };
}
