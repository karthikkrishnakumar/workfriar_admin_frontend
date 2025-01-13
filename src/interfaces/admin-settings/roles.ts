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