import React from "react";
import ModalComponent from "@/themes/components/modal/modal";
import RoleForm from "../role-form/role-form";
import { RoleModalProps } from "../add-role-modal/add-role-modal";


const EditRoleModal: React.FC<RoleModalProps> = ({
  isVisible,
  role,
  department,
  status,
  departmentOptions,
  statusOptions,
  onRoleChange,
  onDepartmentChange,
  onStatusChange,
  onSave,
  onClose,
}) => {
  return (
    <ModalComponent
      isVisible={isVisible}
      title="Edit Role"
      theme="normal"
      content={
        <RoleForm
          role={role}
          department={department}
          status={status}
          departmentOptions={departmentOptions}
          statusOptions={statusOptions}
          onRoleChange={onRoleChange}
          onDepartmentChange={onDepartmentChange}
          onStatusChange={onStatusChange}
        />
      }
      primaryButtonLabel="Cancel"
      secondaryButtonLabel="Save"
      onPrimaryClick={onClose}
      onSecondaryClick={onSave}
      onClose={onClose}
    />
  );
};

export default EditRoleModal;
