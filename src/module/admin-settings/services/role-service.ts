import { ListRolesResponse, Permission, PermissionResponse, Role, RoleResponse, User, UserResponse } from "@/interfaces/admin-settings/roles";
import http from "@/utils/http";

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
