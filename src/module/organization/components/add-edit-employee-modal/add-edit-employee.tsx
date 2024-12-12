import React, { useState, useEffect } from "react";
import { Form } from "antd";
import styles from "./add-edit-employee.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import FormField from "@/themes/components/reusable-fields/reusable-fields";
import ButtonComponent from "@/themes/components/button/button";
import CustomAvatar from "@/themes/components/avatar/avatar";

/**
 * FormValues defines the structure of the form data.
 * @typedef {Object} FormValues
 * @property {string} employeeName - Employee's name.
 * @property {string} email - Employee's email address.
 * @property {string} phoneNumber - Employee's phone number.
 * @property {string} location - Employee's location.
 * @property {string} role - Employee's role.
 * @property {string} reportingManager - Reporting manager's name.
 * @property {string} department - Employee's department.
 * @property {string} status - Employee's status.
 */
interface FormValues {
  employeeName: string;
  email: string;
  phoneNumber: string;
  location: string;
  role: string;
  reportingManager: string;
  department: string;
  status: string;
  [key: string]: string; // Allow indexing with string keys
}

/**
 * AddEditEmployeeModal component allows adding or editing a report.
 * @param {Object} props - The component props.
 * @param {function} props.onClose - Function to close the modal.
 * @param {"add" | "edit"} props.mode - Defines the mode as either "add" or "edit".
 * @param {Object} [props.employeeData] - Data to pre-fill the form when in "edit" mode.
 */
interface AddEditEmployeeProps {
  onClose: () => void;
  mode: "add" | "edit"; // Add or Edit mode
  employeeData?: any; // Optional employee data for editing
}

const AddEditEmployeeModal: React.FC<AddEditEmployeeProps> = ({
  onClose,
  mode,
  employeeData,
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    employeeName: "",
    email: "",
    phoneNumber: "",
    location: "",
    role: "",
    reportingManager: "",
    department: "",
    status: "",
  });

  // Update form values if in "edit" mode and employeeData is available
  useEffect(() => {
    if (mode === "edit" && employeeData) {
      setFormValues({
        employeeName: employeeData.employeeName || "",
        email: employeeData.email || "",
        phoneNumber: employeeData.phoneNumber || "",
        location: employeeData.location || "",
        role: employeeData.role || "",
        reportingManager: employeeData.reportingManager || "",
        department: employeeData.department || "",
        status: employeeData.status || "",
      });
    }
  }, [mode, employeeData]);

  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const roleStatusFields = [
    {
      label: "Employee Role",
      name: "role",
      options: [
        { value: "role1", label: "Role 1" },
        { value: "role2", label: "Role 2" },
      ],
    },
    {
      label: "Status",
      name: "status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  return (
    <div>
      <ModalComponent
        isVisible={true}
        title={mode === "edit" ? "Edit Employee" : "Add Employee"}
        theme="normal"
        onClose={onClose}
        content={
          <div className={styles.formsContentDiv}>
            <Form layout="vertical" requiredMark={false}>
              <div className={styles.avatarflexContainer}>
                <div className={styles.avatar}>
                  <CustomAvatar name={`${formValues.employeeName}`} size={60} />
                  <ButtonComponent
                    label="Employee Photo"
                    theme="golden"
                    className={styles.avatarButton}
                  />
                </div>
              </div>
              {/* Avatar and Employee Name */}
              <div className={styles.flexContainer}>
                <FormField
                  type="input"
                  label="Employee Name"
                  name="employeeName"
                  value={formValues.employeeName}
                  onChange={(e) => handleChange("employeeName", e.target.value)}
                  placeholder="Enter employee name"
                />
                <FormField
                  type="input"
                  label="Email Address"
                  name="email"
                  value={formValues.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter email"
                />
              </div>

              {/* Employee Info */}
              <div className={styles.flexContainer}>
                <FormField
                  type="input"
                  label="Phone Number"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  placeholder="Enter phone number"
                />
                <FormField
                  type="input"
                  label="Location"
                  name="location"
                  value={formValues.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Enter location"
                />
              </div>

              {/* Role, Reporting Manager, Department, Status */}
              <div className={styles.flexContainer}>
                <FormField
                  type="select"
                  label="Employee Role"
                  name="role"
                  value={formValues.role}
                  onChange={(value) => handleChange("role", value)}
                  placeholder="Select role"
                  options={roleStatusFields[0].options}
                />

                <FormField
                  type="select"
                  label="Reporting Manager"
                  name="reportingManager"
                  value={formValues.reportingManager}
                  onChange={(e) =>
                    handleChange("reportingManager", e.target.value)
                  }
                  placeholder="Enter reporting manager"
                />
              </div>

              {/* Status */}
              <div className={styles.flexContainer}>
                <FormField
                  type="select"
                  label="Department"
                  name="department"
                  value={formValues.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  placeholder="Enter department"
                />
                <FormField
                  type="select"
                  label="Status"
                  name="status"
                  value={formValues.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  placeholder="Select status"
                  options={roleStatusFields[1].options}
                />
              </div>
            </Form>
          </div>
        }
        bottomContent={
          <>
            <ButtonComponent label="Cancel" theme="white" onClick={onClose} />
            <ButtonComponent
              label="Save"
              theme="black"
              onClick={() => console.log(formValues)}
            />
          </>
        }
        className={styles.modalDiv}
        classTitle={styles.titleClass}
        classBottom={styles.bottomClass}
      />
    </div>
  );
};

export default AddEditEmployeeModal;
