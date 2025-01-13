import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd"; // Import message from antd
import CustomInputField from "@/themes/components/input-field/input-field";
import CustomSelect from "@/themes/components/select-field/select-field";
import styles from "./role-form.module.scss";

import ButtonComponent from "@/themes/components/button/button";
import { Role, RoleResponse } from "@/interfaces/admin-settings/roles";

export interface RoleFormProps {
  roleData: Role;
  departmentOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: boolean }[];
  onChange: (field: keyof Role, value: string | number | boolean) => void;
  onSave: () => Promise<RoleResponse | null>;
  onCancel: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({
  roleData,
  departmentOptions,
  statusOptions,
  onChange,
  onSave,
  onCancel,
}) => {
  const router = useRouter();
  const [initialRoleData, setInitialRoleData] = useState<Role | null>(null);
  const [hasMounted, setHasMounted] = useState(false); // Track whether the component has mounted

  useEffect(() => {

    console.log("Role Status Value:", roleData.status);
    
    if (!hasMounted) {
      setInitialRoleData(roleData); // Set initial data only once
      setHasMounted(true); // Set mounted flag to true
    }
  }, [ hasMounted]);

  const handleChange =
    (field: keyof Role) => (value: string | number | boolean) => {
      onChange(field, value);
    };

  const hasChanges = () => {
    if (!initialRoleData) return false; // Prevent comparison before initialRoleData is set
    return (
      roleData.role !== initialRoleData.role ||
      roleData.department !== initialRoleData.department ||
      roleData.status !== initialRoleData.status
    );
  };


  const handleContinueToPermissions = async () => {

    if (roleData.roleId) {
      // If the role already has an ID (edit case), check if there are any changes
      if (hasChanges()) {
        // If there are changes, wait for onSave to complete
        const response = await onSave();
        if (response?.status) {
          // If the save was successful, navigate to the permissions page
          router.push(`/settings/permissions/${roleData.roleId}`);
        } else {
          // Handle failure, show an error message with antd message component
          message.error("Failed to update role.");
        }
      } else {
        // No changes, navigate directly to the permissions page
        router.push(`/settings/permissions/${roleData.roleId}`);
      }
    } else {
      // If the role does not have an ID (add case), wait for onSave to complete
      const response = await onSave(); // Wait for the save action to complete
      if (response?.status && response?.data?.roleId) {

        // If the role is added successfully and an ID is returned, navigate to the permissions page
        router.push(`/settings/permissions/${response.data.roleId}`);
      } 
    }
  };

  return (
    <>
      <div className={styles.modalContent}>
        <div className={styles.field}>
          <label>
            Role<span className={styles.asterisk}>*</span>
          </label>
          <CustomInputField
            value={roleData.role}
            onChange={handleChange("role")}
            placeholder="Enter Job role"
          />
        </div>
        <div className={styles.field}>
          <label>
            Department<span className={styles.asterisk}>*</span>
          </label>
          <CustomSelect
            options={departmentOptions}
            value={roleData.department || undefined}
            onChange={handleChange("department")}
            placeholder="Select department"
          />
        </div>
        <div className={styles.field}>
          <label>
            Status<span className={styles.asterisk}>*</span>
          </label>
          <CustomSelect
  options={statusOptions}
  value={roleData.status} // Pass the boolean value directly
  onChange={(value) => handleChange("status")(value)} // Update the boolean value
  placeholder="Select status"
/>

        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.link} onClick={handleContinueToPermissions}>
          Continue to Set Role Permissions
        </button>
        <ButtonComponent label="Cancel" theme="white" onClick={onCancel} />
        <ButtonComponent label="Save" theme="black" onClick={onSave} />
      </div>
    </>
  );
};

export default RoleForm;
