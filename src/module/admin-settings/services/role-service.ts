import http from "@/utils/http";
import { MOCK_MAPPED_USERS, MOCK_PERMISSIONS, MOCK_USERS } from "../constants";

/**
 * Interface representing a role in the system.
 * @param roleId - The unique identifier for the role
 * @param role - The name of the role (e.g., CEO, Product Manager)
 * @param department - The department associated with the role
 * @param permissions - Permissions associated with the role
 * @param usersCount - The number of usersCount assigned to this role
 * @param status - The current status of the role (active or inactive)
 */
export interface Role {
  roleId?: string;
  role: string;
  department: string;
  permissions?: Permission[];
  usersCount?: number;
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
 * Response structure for adding or updating a role.
 * @param status - The status of the request (success or failure)
 * @param message - A message providing more details about the request
 */
export interface RoleResponse {
  status: boolean;
  message: string;
  data?: {
    id: string;
  };
}

/**
 * Interface representing a permission.
 * @param category - The category of the permission (e.g., projects)
 * @param actions - List of actions allowed in the category (e.g., view, edit)
 */
export interface Permission {
  category: string;
  actions: {
    view: boolean;
    edit: boolean;
    review: boolean;
    delete: boolean;
  };
}

/**
 * Response structure for permissions.
 * @param status - The status of the request (success or failure)
 * @param message - A message providing more details about the request
 * @param data - List of permissions for the role
 */
export interface PermissionResponse {
  status: boolean;
  message: string;
  data?: Permission[];
}

export interface User{
  id: string;
  name: string;
}

export interface UserResponse {
  status: boolean;
  message: string;
  data?: User[];
}

/**
 * Service for managing roles in the system.
 * Contains methods for listing roles, adding roles, updating roles, and mapping usersCount to roles.
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
          { roleId: "1", role: "CEO", department: "Management", usersCount: 1, status: true },
          { roleId: "2", role: "Product Manager", department: "Operations", usersCount: 2, status: true },
          { roleId: "3", role: "Accountant", department: "Finance", usersCount: 2, status: false },
          { roleId: "4", role: "Team Lead - Software Development", department: "Technical", usersCount: 30, status: false },
          { roleId: "5", role: "HR Manager", department: "HR", usersCount: 3, status:false },
          { roleId: "6", role: "HR Manager", department: "HR", usersCount: 1, status:false },
          { roleId: "7", role: "HR Manager", department: "HR", usersCount: 1, status:true },
          { roleId: "8", role: "HR Manager", department: "HR", usersCount: 1, status:true },
          { roleId: "9", role: "HR Manager", department: "HR", usersCount: 5, status:false },
          { roleId: "10", role: "HR Manager", department: "HR", usersCount: 1, status:false },
          { roleId: "11", role: "Jacob", department: "Jacob", usersCount: 1, status:true },
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
   * @param roleData - The data of the role to update
   * @returns A promise resolving to the response of the role update operation
   */
  const updateRole = async (roleData: Role): Promise<RoleResponse> => {
    try {
      const payload: JSON = JSON.parse(JSON.stringify(roleData));
      const { body } = await http().post(`${apiUrl}/update`, payload);

      // Mock response
      const mockResponse: RoleResponse = {
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

  /**
   * Service to add a new role.
   * @param roleData - The data of the role to add
   * @returns A promise resolving to the response of the role creation operation
   */
  const addRole = async (roleData: Role): Promise<RoleResponse> => {
    try {
      const payload = {
        role: roleData.role,
        department: roleData.department,
        permissions: roleData.permissions || [],
        status: roleData.status,
      };

      const { body } = await http().post(`${apiUrl}/create`, payload);

      // Mock response
      const mockResponse: RoleResponse = {
        status: true,
        message: "Role added successfully",
        data: {
          id: "mock-id-123",
        },
      };
      return mockResponse;
      
    } catch (error) {
      return {
        status: false,
        message: "Failed to add role. Please try again.",
      };
    }
  };


  const deleteRole = async (roleId: string): Promise<RoleResponse> => {
    try {
      const payload = { roleId };
      const { body } = await http().post(`${apiUrl}/delete`, payload);

      // Mock response
      const mockResponse: RoleResponse = {
        status: true,
        message: "Role deleted successfully",
      };
      return mockResponse; // Replace this with `return body;` for real API responses
    } catch (error) {
      return { status: false, message: "Failed to delete role. Please try again." };
    }
  }

  //permissions 

  /**
   * Service to fetch permissions for a specific role.
   * @param roleId - The role ID to fetch permissions for.
   * @returns A promise resolving to the permissions data.
   */
  const fetchPermissionsByRoleId = async (roleId: string) :Promise<PermissionResponse> => {
    try {
      const { body } = await http().post(`${apiUrl}/permissions/list`, { roleId });

      // Mock response for demonstration
      const mockResponse = {
        status: true,
        message: "Permissions fetched successfully",
        data: MOCK_PERMISSIONS.data,
      };

      return mockResponse; // Replace `mockResponse` with `body` for real API responses
    } catch (error) {
      return {
        status: false,
        message: "Failed to fetch permissions. Please try again.",
      };
    }
  };

  /**
   * Service to update permissions for a specific role.
   * @param roleId - The role ID to update permissions for.
   * @param permissions - The updated permissions to save.
   * @returns A promise resolving to the success message.
   */
  const updatePermissionsByRoleId = async (roleId: string, permissions: Permission[]) :Promise<PermissionResponse> => {
    try {
      const payload = { roleId, permissions };
      const { body } = await http().post(`${apiUrl}/permissions/update`, payload);

      // Mock response for demonstration
      const mockResponse = {
        status: true,
        message: "Permissions updated successfully",
      };

      return mockResponse; // Replace `mockResponse` with `body` for real API responses
    } catch (error) {
      return {
        status: false,
        message: "Failed to update permissions. Please try again.",
      };
    }
  };

  //map users

  /**
 * Service to fetch all users.
 * @returns A promise resolving to the users data.
 */
  const fetchAllUsers = async (): Promise<UserResponse> => {
    try {
      const { body } = await http().post(`${apiUrl}/users/list`);

      // Mock response for demonstration
      const mockResponse = {
        status: true,
        message: "Users fetched successfully",
        data: MOCK_USERS.data,
      };

      return mockResponse; // Replace `mockResponse` with `body` for real API responses
    } catch (error) {
      return {
        status: false,
        message: "Failed to fetch users. Please try again.",
      };
    }
  };


  /**
 * Service to fetch users mapped to a specific role.
 * @param roleId - The role ID to fetch users mapped to.
 * @returns A promise resolving to the mapped users data.
 */
const fetchMappedUsers = async (roleId: string): Promise<UserResponse> => {
  try {
    const { body } = await http().post(`${apiUrl}/roles/${roleId}/mapped-users`);

    // Mock response for demonstration
    const mockResponse = {
      status: true,
      message: "Mapped users fetched successfully",
      data: MOCK_MAPPED_USERS.data,
    };

    return mockResponse; // Replace `mockResponse` with `body` for real API responses
  } catch (error) {
    return {
      status: false,
      message: "Failed to fetch mapped users. Please try again.",
    };
  }
};

  
  /**
 * Service to map users to a specific role.
 * @param roleId - The role ID to which users will be mapped.
 * @param userIds - The list of user IDs to be mapped.
 * @returns A promise resolving to the success message.
 */
  const mapUsersToRole = async (roleId: string, userIds: string[]): Promise<UserResponse> => {
    try {
      const payload = { roleId, userIds };
      const { body } = await http().post(`${apiUrl}/roles/map-users`, payload);

      // Mock response for demonstration
      const mockResponse = {
        status: true,
        message: "Users mapped to role successfully",
      };

      return mockResponse; // Replace `mockResponse` with `body` for real API responses
    } catch (error) {
      return {
        status: false,
        message: "Failed to map users to role. Please try again.",
      };
    }
  };



  return {
    listRoles,
    updateRole,
    addRole,
    deleteRole,
    fetchPermissionsByRoleId, 
    updatePermissionsByRoleId,
    fetchAllUsers,
    fetchMappedUsers,
    mapUsersToRole,
  };
};

export default useRoleService;
