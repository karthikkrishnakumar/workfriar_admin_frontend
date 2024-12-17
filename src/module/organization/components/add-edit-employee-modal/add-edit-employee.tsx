import React, { useState, useEffect, useRef } from "react";
import { Form } from "antd";
import styles from "./add-edit-employee.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import FormField from "@/themes/components/reusable-fields/reusable-fields";
import ButtonComponent from "@/themes/components/button/button";
import CustomAvatar from "@/themes/components/avatar/avatar";
import UseEmployeeData, {
  GetRolesResponse,
  FormValueData,
  EmployeeData,
} from "../../services/organization-services/organization-services";

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
  id: string;
  name: string;
  email: string;
  phone_number: string;
  location: string;
  role_id: string;
  reporting_manager: string;
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
  onClose?: () => void;
  mode: "add" | "edit"; // Add or Edit mode
  employeeData?: any; // Optional employee data for editing
}

interface SelectData {
  value: string;
  label: string;
}

const AddEditEmployeeModal: React.FC<AddEditEmployeeProps> = ({
  onClose,
  mode,
  employeeData,
}) => {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    id: "",
    name: "",
    email: "",
    phone_number: "",
    location: "",
    role: "",
    role_id: "",
    reporting_manager: "",
    reporting_manager_id: "",
    department: "",
    status: "",
  });

  const [roleOptions, setRoleOptions] = useState<SelectData[]>([]);
  const [reportingManagerOptions, setReportingManagerOptions] = useState<
    SelectData[]
  >([]);
  const [statusOptions, setStatusOptions] = useState<SelectData[]>([]);

  const fetchDepartmentData = async (department: string) => {
    try {
      const response: GetRolesResponse =
        await UseEmployeeData().fetchRolesByDepartment(department);
      const roles = response.data;

      console.log(roles);

      // Filter and format active roles
      const activeRoles = roles
        .filter((role: FormValueData) => role.role) // Include only active roles
        .map((role: FormValueData) => ({
          value: role._id,
          label: role.role,
        }));
      setRoleOptions(activeRoles);

      // Format reporting managers from users.full_name
      const reportingManagers = roles
        .filter((role: FormValueData) => role.users[0]?.full_name)
        .map((role: FormValueData, index) => ({
          value: role.users[index]?.id,
          label: role.users[index]?.full_name,
        }));
      setReportingManagerOptions(reportingManagers);
      const status = roles
        .filter((role: FormValueData) => role.status)
        .map((role: FormValueData) => ({
          value: role.status ? "active" : "inactive",
          label: role.status ? "Active" : "Inactive",
        }));
      setStatusOptions(status);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDepartmentChange = (value: string) => {
    handleChange("department", value);
    console.log(value);
    if (value) {
      fetchDepartmentData(value);
    } else {
      setRoleOptions([]); // Reset role options if no department is selected
      setReportingManagerOptions([]);
    }
  };

  // Update form values if in "edit" mode and employeeData is available
  useEffect(() => {
    if (mode === "edit" && employeeData) {
      console.log("Setting form values from employeeData:", employeeData);
      setFormValues({
        id: employeeData.id || "",
        name: employeeData.name || "",
        email: employeeData.email || "",
        phone_number: employeeData.phone_number || "",
        location: employeeData.location || "",
        role: employeeData.role || "",
        role_id: employeeData.role_id || "",
        reporting_manager: employeeData.reporting_manager || "",
        reporting_manager_id: employeeData.reporting_manager_id || "",
        department: employeeData.department || "",
        status: employeeData.status ? "active" : "inactive",
      });
    }
  }, [mode, employeeData]);

  console.log(formValues);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setAvatarSrc(reader.result as string); // Update avatar preview
        }
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const statusFields = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const departmentOptions = [
    { value: "Management", label: "Management" },
    { value: "HR", label: "HR" },
    { value: "Finance", label: "Finance" },
    { value: "Operations", label: "Operations" },
    { value: "Technical", label: "Technical" },
  ];
  const locationOptions = [
    { value: "India", label: "India" },
    { value: "UK", label: "UK" },
    { value: "UAE", label: "UAE" },
  ];

  // Handle Save action
  const handleSave = async () => {
    try {
      // Call the service to add or edit employee data
      const employeeData: EmployeeData = {
        name: formValues.name,
        email: formValues.email,
        phone_number: formValues.phone_number,
        location: formValues.location,
        role_id: formValues.role_id,
        reporting_manager: formValues.reporting_manager_id,
        status: formValues.status,
        profile_pic: formValues.avatar,
      };

      await UseEmployeeData().addEmployee(employeeData);

      onClose && onClose(); // Close modal after successful save
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };
  // Handle Save action
  const handleEdit = async () => {
    try {
      // Call the service to add or edit employee data
      const employeeData: EmployeeData = {
        id: formValues.id,
        name: formValues.name,
        email: formValues.email,
        phone_number: formValues.phone_number,
        location: formValues.location,
        role_id: formValues.role_id,
        reporting_manager: formValues.reporting_manager_id,
        status: formValues.status,
        profile_pic: formValues.avatar,
      };

      await UseEmployeeData().editEmployee(employeeData);

      onClose && onClose(); // Close modal after successful save
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

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
                  <CustomAvatar
                    name={`${formValues.name}`}
                    size={60}
                    src={avatarSrc ?? undefined}
                  />
                  <ButtonComponent
                    label="Employee Photo"
                    theme="golden"
                    className={styles.avatarButton}
                    onClick={handleUploadClick}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {/* Avatar and Employee Name */}
              <div className={styles.flexContainer}>
                <FormField
                  type="input"
                  label="Employee Name"
                  name="employeeName"
                  value={formValues.name}
                  onChange={(value) => handleChange("name", value)}
                  placeholder="Enter employee name"
                />
                <FormField
                  type="input"
                  label="Email Address"
                  name="email"
                  value={formValues.email}
                  onChange={(value) => handleChange("email", value)}
                  placeholder="Enter email"
                />
              </div>

              {/* Employee Info */}
              <div className={styles.flexContainer}>
                <FormField
                  type="input"
                  label="Phone Number"
                  name="phoneNumber"
                  value={formValues.phone_number}
                  onChange={(value) => handleChange("phone_number", value)}
                  placeholder="Enter phone number"
                />
                <FormField
                  type="select"
                  label="Location"
                  name="location"
                  value={formValues.location}
                  onChange={(value) => handleChange("location", value)}
                  placeholder="Enter location"
                  options={locationOptions}
                />
              </div>

              {/* Role, Reporting Manager, Department, Status */}
              <div className={styles.flexContainer}>
                <FormField
                  type="select"
                  label="Department"
                  name="department"
                  value={formValues.department}
                  onChange={(value) => handleDepartmentChange(value)}
                  placeholder="Enter department"
                  options={departmentOptions}
                />
                <FormField
                  type="select"
                  label="Employee Role"
                  name="role"
                  value={formValues.role}
                  onChange={(value) => handleChange("role_id", value)}
                  placeholder="Select role"
                  options={roleOptions}
                />
              </div>

              {/* Status */}
              <div className={styles.flexContainer}>
                <FormField
                  type="select"
                  label="Reporting Manager"
                  name="reportingManager"
                  value={formValues.reporting_manager}
                  onChange={(value) => handleChange("reporting_manager", value)}
                  placeholder="Enter reporting manager"
                  options={reportingManagerOptions}
                />

                <FormField
                  type="select"
                  label="Status"
                  name="status"
                  value={formValues.status}
                  onChange={(value) => handleChange("status", value)}
                  placeholder="Select status"
                  options={
                    statusOptions.length > 0 ? statusOptions : statusFields
                  }
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
              onClick={mode === "add" ? handleSave : handleEdit}
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
