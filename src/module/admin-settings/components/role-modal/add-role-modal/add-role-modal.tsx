import React, { useState } from "react";
import ModalComponent from "@/themes/components/modal/modal";
import RoleForm from "../role-form/role-form";

import useRoleService from "@/module/admin-settings/services/role-service";
import { message } from "antd";
import { Role, RoleResponse } from "@/interfaces/admin-settings/roles";

export interface AddRoleModalProps {
  isVisible: boolean;
  departmentOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: boolean }[];
  onClose: () => void;
  onRoleAdded: () => void; 
}

interface NewRole extends Omit<Role, "id"> {
  permissions: [];
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({
  isVisible,
  departmentOptions,
  statusOptions,
  onClose,
  onRoleAdded,
}) => {
  const { addRole } = useRoleService();

  // Initialize state for a new role
  const [role, setRole] = useState<NewRole>({
    role: "",
    department: "",
    status: true,
    permissions: [], // Empty since permissions are added later
  });

  const handleSave = async (): Promise<RoleResponse | null> => {
    if (!role.role || !role.department) {
      message.error("Please fill all required fields.");
      return null;
    }
  
    const response = await addRole(role); // Call the addRole service
    if (response.status) {
      message.success("Role added successfully!");
      onRoleAdded(); // Refresh the role list
      onClose()
      return response; // Return the response for further use
    } else {
      message.error(response.message || "Failed to add role.");
      return null;
    }
  };
  
  const handleFieldChange = (
    field: keyof NewRole,
    value: string | number | boolean
  ) => {
    setRole((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ModalComponent
      isVisible={isVisible}
      title="Add Role"
      theme="normal"
      content={
        <RoleForm
          roleData={role}
          departmentOptions={departmentOptions}
          statusOptions={statusOptions}
          onChange={handleFieldChange}
          onSave={handleSave}
          onCancel={onClose}
        />
      }
      onClose={onClose}
    />
  );
};

export default AddRoleModal;
