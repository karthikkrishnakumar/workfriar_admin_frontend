import http from "@/utils/http";

/**
 * Interface representing a role in the system.
 * @param id - The unique identifier for the role
 * @param role - The name of the role (e.g., CEO, Product Manager)
 * @param department - The department associated with the role
 * @param users - The number of users assigned to this role
 * @param status - The current status of the role (active or inactive)
 */
export interface Role {
  id: string;
  role: string;
  department: string;
  users: number;
  status: boolean;
}

/**
 * Response structure for listing roles.
 * @param status - The status of the request (success or failure)
 * @param message - A message providing more details about the request
 * @param roles - A list of roles if the request is successful
 */
export interface ListRolesResponse {
  status: boolean;
  message: string;
  roles?: Role[];
}

/**
 * Response structure for updating a role.
 * @param status - The status of the request (success or failure)
 * @param message - A message providing more details about the request
 */
export interface UpdateRoleResponse {
  status: boolean;
  message: string;
}

/**
 * Service for managing roles in the system.
 * Contains methods for listing roles, updating roles.
 */
const useRoleService = () => {

  const apiUrl = "/api/admin/";

  /**
   * Service to list all roles.
   * @returns A promise resolving to the list of roles or an error message
   */
  const listRoles = async (): Promise<ListRolesResponse> => {
    try {
      const { body } = await http().post(`${apiUrl}/list`);

      // Mock response
      const mockResponse: ListRolesResponse = {
        status: true,
        message: "Roles fetched successfully",
        roles: [
          { id: "1", role: "CEO", department: "Management", users: 1, status: true },
          { id: "2", role: "Product Manager", department: "Operations", users: 2, status: true },
          { id: "3", role: "Accountant", department: "Finance", users: 2, status: false },
          { id: "4", role: "Team Lead - Software Development", department: "Technical", users: 30, status: false },
          { id: "5", role: "HR Manager", department: "HR", users: 3, status:false },
          { id: "6", role: "HR Manager", department: "HR", users: 1, status:false },
          { id: "7", role: "HR Manager", department: "HR", users: 1, status:false },
          { id: "8", role: "HR Manager", department: "HR", users: 1, status:false },
          { id: "9", role: "HR Manager", department: "HR", users: 5, status:false },
          { id: "10", role: "HR Manager", department: "HR", users: 1, status:false },
          { id: "11", role: "HR Manager", department: "HR", users: 1, status:false },
        ],
      };
      return mockResponse;

    } catch (error) {
      return {
        status: false,
        message: "Failed to fetch roles. Please try again.",
      };
    }
  };

  /**
   * Service to update the status of a role.
   * @param id - The ID of the role to update
   * @param status - The new status to assign to the role (e.g., "active" or "inactive")
   * @returns A promise resolving to the response of the role update operation
   */
  const updateRole = async (id: string, status: boolean): Promise<UpdateRoleResponse> => {
    try {
      // payload expected to be a JSON object
      const payload: JSON = JSON.parse(JSON.stringify({ id, status }));

      const { body } = await http().post(`${apiUrl}/update`, payload);
      // Mock response
      const mockResponse: UpdateRoleResponse = {
        status: true,
        message: "Role status updated successfully",
      };
      return mockResponse;
    } catch (error) {
      return {
        status: false,
        message: "Failed to update role status. Please try again.",
      };
    }
  };

  return {
    listRoles,
    updateRole,
  };
};

export default useRoleService;
