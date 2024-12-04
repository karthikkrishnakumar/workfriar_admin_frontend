import React from "react";
import CustomInputField from "@/themes/components/input-field/input-field";
import CustomSelect from "@/themes/components/select-field/select-field";
import styles from "./role-form.module.scss";

interface RoleFormProps {
  role: string;
  department: string;
  status: boolean;
  departmentOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: string }[];
  onRoleChange: (value: string | number) => void;
  onDepartmentChange: (value: string | number) => void; 
  onStatusChange: (value: string | number) => void; 
}


const RoleForm: React.FC<RoleFormProps> = ({
  role,
  department,
  status,
  departmentOptions,
  statusOptions,
  onRoleChange,
  onDepartmentChange,
  onStatusChange,
}) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.field}>
        <label>
          Role<span className={styles.asterisk}>*</span>
        </label>
        <CustomInputField
          value={role}
          onChange={onRoleChange}
          placeholder="Enter role"
        />
      </div>
      <div className={styles.field}>
        <label>
          Department<span className={styles.asterisk}>*</span>
        </label>
        <CustomSelect
          options={departmentOptions}
          value={department}
          onChange={onDepartmentChange}
          placeholder="Select department"
        />
      </div>
      <div className={styles.field}>
        <label>
          Status<span className={styles.asterisk}>*</span>
        </label>
        <CustomSelect
          options={statusOptions}
          value={status}
          onChange={onStatusChange}
          placeholder="Select status"
        />
      </div>
    </div>
  );
};

export default RoleForm;
