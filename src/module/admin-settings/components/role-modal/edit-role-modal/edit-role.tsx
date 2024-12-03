import React from "react";
import ModalComponent from "@/themes/components/modal/modal";
import CustomInputField from "@/themes/components/input-field/input-field";
import CustomSelect from "@/themes/components/select-field/select-field";
import styles from "./edit-role.module.scss";

interface EditRoleModalProps {
  isVisible: boolean;
  role: string;
  department: string;
  status: string;
  departmentOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: string }[];
  onRoleChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
  onSetPermissions: () => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
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
  onSetPermissions,
}) => {
  return (
<ModalComponent
  isVisible={isVisible}
  title="Edit Role"
  theme="normal"
  content={
    <div className={styles.modalContent}>
      <div className={styles.field}>
        <label>Role<span className={styles.asterisk}>*</span></label>
        <CustomInputField
          value={role}
          onChange={onRoleChange}
          placeholder="Role"
        />
      </div>
      <div className={styles.field}>
        <label>Department<span className={styles.asterisk}>*</span></label>
        <CustomSelect
          options={departmentOptions}
          value={department}
          onChange={onDepartmentChange}
          placeholder="Department"
        />
      </div>
      <div className={styles.field}>
        <label>Status<span className={styles.asterisk}>*</span></label>
        <CustomSelect
          options={statusOptions}
          value={status}
          onChange={onStatusChange}
          placeholder="Status"
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

export default EditRoleModal;


