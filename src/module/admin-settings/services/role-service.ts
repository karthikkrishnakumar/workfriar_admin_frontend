import http from "@/utils/http";
import { MOCK_MAPPED_USERS, MOCK_PERMISSIONS, MOCK_USERS } from "../constants";

/**
 * Interface representing a role in the system.
 * @param roleId - The unique identifier for the role
 * @param role - The name of the role (e.g., CEO, Product Manager)
 * @param department - The department associated with the role
 * @param permissions - Permissions associated with the role
 * @param no_of_users - The number of no_of_users assigned to this role
 * @param status - The current status of the role (active or inactive)
 */
export interface Role extends BaseRecord {
  roleId?: string;
  role: string;
  department: string;
  permissions?: Permission[];
  no_of_users?: number | string;
  status: boolean;
}

export interface BaseRecord {
  isSkeletonData?: boolean;
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
    roleId: string;
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
  roles?: string[];
}

export interface UserResponse {
  status: boolean;
  message: string;
  data?: User[];
}

/**
 * Service for managing roles in the system.
 * Contains methods for listing roles, adding roles, updating roles, and mapping no_of_users to roles.
 */
const useRoleService = () => {
  const apiUrl = "/api/admin";
  let cachedUsers: User[] = []; 

  /**
   * Service to list all roles.
   * @returns A promise resolving to the list of roles or an error message
   */
  const listRoles = async (): Promise<ListRolesResponse> => {
    try {
      const { body } = await http().post(`${apiUrl}/all-roles`);

      const ListRolesResponse: ListRolesResponse = {
        status: body.status,
        message: body.message,
        roles: body.data
      };
      return ListRolesResponse;
    } catch (error) {
      return {
        
        status: false,
        message: "Failed to fetch roles. Please try again.",
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
      const payload: JSON = <JSON>(<unknown>roleData);

      const { body } = await http().post(`${apiUrl}/add-role`, payload);
      const RoleResponse: RoleResponse = {
        status: body.status,
        message: body.message,
        data:{
          roleId:body.data[0]._id
        }
      };
      return RoleResponse;
      
    } catch (error) {
      return {
        status: false,
        message: "Failed to add role. Please try again.",
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
      const payload: JSON = <JSON>(<unknown>roleData);


      const { body } = await http().post(`${apiUrl}/update-role`, payload);

      // Mock response
      const RoleResponse: RoleResponse = {
        status: body.status,
        message: body.message,
      };
      return RoleResponse;
    } catch (error) {
      return {
        status: false,
        message: "Failed to update role status. Please try again.",
      };
    }
  };

  

  const deleteRole = async (roleId: string): Promise<RoleResponse> => {
    try {
      const payload: JSON= <JSON>(<unknown>{ "roleId": roleId })
      const { body } = await http().post(`${apiUrl}/delete-role`, payload);

      const deleteResponse: RoleResponse = {
        status: body.status,
        message: body.message,
      };
      return deleteResponse; 
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

      const payload: JSON= <JSON>(<unknown>{ "roleId": roleId })

      const { body } = await http().post(`${apiUrl}/all-roll-permissions`,  payload );

      // Mock response for demonstration
      const permissionResponse = {
        status: body.status,
        message: body.message,
        data: body.data,
      };

      return permissionResponse; 
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
      const payload:JSON= <JSON>(<unknown>{ roleId, permissions });

      const { body } = await http().post(`${apiUrl}/update-role`, payload);

      const permissionsResponse = {
        status: body.status,
        message: body.message,
      };

      console.log(permissionsResponse)

      return permissionsResponse; 
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
      const { body } = await http().post(`${apiUrl}/list-all-employees`);
      cachedUsers = body.data;
      const userResponse = {
        status: body.status,
        message: body.message,
        data: cachedUsers,
      };

      return userResponse; 
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
      // Filter users mapped to the specific role
      const mappedUsers = cachedUsers.filter(
        (user) => user.roles?.includes(roleId) ?? false
      );
      const mappedUsersResponse = {
        status: true,
        message: "Mapped users fetched successfully",
        data: mappedUsers,
      };

      return mappedUsersResponse;
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
      const payload:JSON= <JSON>(<unknown>{ roleId, userIds });

      const { body } = await http().post(`${apiUrl}/map-role`, payload);

      const mapUsersResponse = {
        status: body.status,
        message: body.message,
      };

      return mapUsersResponse; 
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
