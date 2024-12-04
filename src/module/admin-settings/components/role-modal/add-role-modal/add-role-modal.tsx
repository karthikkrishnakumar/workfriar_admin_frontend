import React from "react";
import ModalComponent from "@/themes/components/modal/modal";
import CustomInputField from "@/themes/components/input-field/input-field";
import CustomSelect from "@/themes/components/select-field/select-field";
import styles from "./add-role.module.scss";

export interface RoleModalProps {
  isVisible: boolean;
  role: string;
  department: string;
  status: string;
  departmentOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: string }[];
  onRoleChange: (value: string | number) => void;
  onDepartmentChange: (value: string | number) => void;
  onStatusChange: (value: string | number) => void;
  onSave: () => void;
  onClose: () => void;
}

const AddRoleModal: React.FC<RoleModalProps> = ({
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
      title="Add Role"
      theme="normal"
      content={
        <div className={styles.modalContent}>
          <div className={styles.field}>
            <label>
              Role<span className={styles.asterisk}>*</span>
            </label>
            <CustomInputField
              value={role}
              onChange={onRoleChange}
              placeholder="Enter Job role"
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
      }
      primaryButtonLabel="Cancel"
      secondaryButtonLabel="Save"
      onPrimaryClick={onClose}
      onSecondaryClick={onSave}
      onClose={onClose}
    />
  );
};

export default AddRoleModal;
