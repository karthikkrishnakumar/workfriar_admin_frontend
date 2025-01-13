import React, { useState } from "react";
import ModalComponent from "@/themes/components/modal/modal";
import RoleForm from "../role-form/role-form";

import useRoleService from "@/module/admin-settings/services/role-service";
import { message } from "antd";
import { Role, RoleResponse } from "@/interfaces/admin-settings/roles";

export interface EditRoleModalProps {
  isVisible: boolean;
  roleData: Role;
  departmentOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: boolean }[];
  onClose: () => void;
  onRoleUpdated: () => void; // Callback to refresh the role list
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  isVisible,
  roleData,
  departmentOptions,
  statusOptions,
  onClose,
  onRoleUpdated,
}) => {
  const { updateRole } = useRoleService();
  const [role, setRole] = useState<Role>(roleData); 

  const handleSave = async (): Promise<RoleResponse | null> => {
    const response = await updateRole(role); 
    if (response.status) {
      message.success("Role updated successfully!");
      onRoleUpdated();// Refresh the role list
      onClose();
      return response;  
    } else {
      message.error(response.message || "Failed to update role.");
      return null; // Return null if failed
    }
  };

  const handleFieldChange = (field: keyof Role, value: string | number | boolean) => {
    setRole((prev) => ({ ...prev, [field]: value })); 
  };

  return (
    <ModalComponent
      isVisible={isVisible}
      title="Edit Role"
      theme="normal"
      content={
        <RoleForm
          roleData={role} // Pass local state here
          departmentOptions={departmentOptions}
          statusOptions={statusOptions}
          onChange={handleFieldChange} // This updates the local state
          onSave={handleSave}
          onCancel={onClose}
        />
      }
      onClose={onClose}
    />
  );
};

export default EditRoleModal;