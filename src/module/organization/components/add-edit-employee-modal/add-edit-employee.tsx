import React, { useState, useEffect, useRef } from "react";
import { Form, message } from "antd";
import styles from "./add-edit-employee.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import FormField from "@/themes/components/reusable-fields/reusable-fields";
import ButtonComponent from "@/themes/components/button/button";
import CustomAvatar from "@/themes/components/avatar/avatar";
import UseEmployeeData, {
  GetRolesResponse,
  FormValueData,
} from "../../services/organization-services/organization-services";

interface FormValues {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  location: string;
  role_id: string;
  role_name: string;
  reporting_manager_id: string;
  reporting_manager_name: string;
  department: string;
  status: string;
  profile_pic?: File | null;
  [key: string]: string | File | null | undefined;
}

interface AddEditEmployeeProps {
  onClose?: () => void;
  mode: "add" | "edit";
  employeeData?: any;
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
  const [roleOptions, setRoleOptions] = useState<SelectData[]>([]);
  const [reportingManagerOptions, setReportingManagerOptions] = useState<
    SelectData[]
  >([]);
  const [statusOptions, setStatusOptions] = useState<SelectData[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formValues, setFormValues] = useState<FormValues>({
    id: "",
    name: "",
    email: "",
    phone_number: "",
    location: "",
    role_id: "",
    role_name: "",
    reporting_manager_id: "",
    reporting_manager_name: "",
    department: "",
    status: "",
    profile_pic: null,
  });

  const fetchDepartmentData = async (department: string) => {
    try {
      const response: GetRolesResponse =
        await UseEmployeeData().fetchRolesByDepartment(department);
      const roles = response.data;

      const activeRoles = roles
        .filter((role: FormValueData) => role.role)
        .map((role: FormValueData) => ({
          value: role._id,
          label: role.role,
        }));
      setRoleOptions(activeRoles);

      const reportingManagers = roles
        .filter((role: FormValueData) => role.users && role.users[0]?.full_name)
        .map((role: FormValueData) => ({
          value: role.users[0]?.id,
          label: role.users[0]?.full_name,
        }));
      setReportingManagerOptions(reportingManagers);

      if (mode === "edit") {
        const selectedRole = activeRoles.find(
          (role) => role.value === formValues.role_id
        );
        const selectedManager = reportingManagers.find(
          (manager) => manager.value === formValues.reporting_manager_id
        );

        if (selectedRole) {
          setFormValues((prev) => ({
            ...prev,
            role_name: selectedRole.label,
          }));
        }

        if (selectedManager) {
          setFormValues((prev) => ({
            ...prev,
            reporting_manager_name: selectedManager.label,
          }));
        }
      }

      const status = roles
        .filter((role: FormValueData) => role.status !== undefined)
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

  const handleRoleChange = (value: string) => {
    const selectedRole = roleOptions.find((role) => role.value === value);
    setFormValues((prev) => ({
      ...prev,
      role_id: value,
      role_name: selectedRole?.label ?? "",
    }));
  };

  const handleReportingManagerChange = (value: string) => {
    const selectedManager = reportingManagerOptions.find(
      (manager) => manager.value === value
    );
    setFormValues((prev) => ({
      ...prev,
      reporting_manager_id: value,
      reporting_manager_name: selectedManager?.label ?? "",
    }));
  };

  const handleDepartmentChange = (value: string) => {
    handleChange("department", value);
    if (value) {
      fetchDepartmentData(value);
      setFormValues((prevValues) => ({
        ...prevValues,
        role_id: "",
        role_name: "",
        reporting_manager_id: "",
        reporting_manager_name: "",
        status: "",
      }));
    } else {
      setRoleOptions([]);
      setReportingManagerOptions([]);
    }
  };

  useEffect(() => {
    if (mode === "edit" && employeeData) {
      const initialFormValues = {
        id: employeeData.id || "",
        name: employeeData.name || "",
        email: employeeData.email || "",
        phone_number: employeeData.phone_number || "",
        location: employeeData.location || "",
        role_id: employeeData.role_id || "",
        role_name: employeeData.role || "",
        reporting_manager_id: employeeData.reporting_manager_id || "",
        reporting_manager_name: employeeData.reporting_manager || "",
        department: employeeData.department || "",
        status: employeeData.status ? "active" : "inactive",
        profile_pic:employeeData.profile_pic_path
      };
      setFormValues(initialFormValues);
      setAvatarSrc(initialFormValues.profile_pic)
      if (employeeData.department) {
        fetchDepartmentData(employeeData.department);
      }
    }
  }, [mode, employeeData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setAvatarSrc(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      setFormValues((prev) => ({
        ...prev,
        profile_pic: file,
      }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const prepareSubmitData = () => {
    return {
      id: formValues.id || "",
      name: formValues.name,
      email: formValues.email,
      phone_number: formValues.phone_number,
      location: formValues.location,
      role_id: formValues.role_id,
      reporting_manager_id: formValues.reporting_manager_id,
      status: formValues.status,
      profile_pic: formValues.profile_pic,
    };
  };

  const handleSave = async () => {
    try {
      setFormErrors({});
      const validationErrors: { [key: string]: string } = {};

      if (!formValues.department) {
        validationErrors.department = "Department is required.";
      }

      const employeeData = prepareSubmitData();
      const response = await UseEmployeeData().addEmployee(employeeData);

      if (response?.errors) {
        response.errors.forEach((err: { field: string; message: string }) => {
          const fieldKey = err.field.replace(/\s+/g, "_").toLowerCase();
          validationErrors[fieldKey] = err.message;
        });
      }

      if (Object.keys(validationErrors).length > 0) {
        setFormErrors(validationErrors);
        return;
      }

      if (response.status) message.success(response.message);
      else message.error(response.message);


      onClose && onClose();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleEdit = async () => {
    try {
      setFormErrors({});
      const validationErrors: { [key: string]: string } = {};

      if (!formValues.department) {
        validationErrors.department = "Department is required.";
      }

      const employeeData = prepareSubmitData();
      const response = await UseEmployeeData().editEmployee(employeeData);

      if (response?.errors) {
        response.errors.forEach((err: { field: string; message: string }) => {
          const fieldKey = err.field.replace(/\s+/g, "_").toLowerCase();
          validationErrors[fieldKey] = err.message;
        });
      }

      if (Object.keys(validationErrors).length > 0) {
        setFormErrors(validationErrors);
        return;
      }

      if (response.status) message.success(response.message);
      else message.error(response.message);

      onClose && onClose();
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  // Constants for options
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

              <div className={styles.flexContainer}>
                <FormField
                  type="input"
                  label="Employee Name"
                  name="employeeName"
                  value={formValues.name}
                  onChange={(value) => handleChange("name", value)}
                  placeholder="Enter employee name"
                  error={formErrors.name}
                  required
                />
                <FormField
                  type="input"
                  label="Email Address"
                  name="email"
                  value={formValues.email}
                  onChange={(value) => handleChange("email", value)}
                  placeholder="Enter email"
                  error={formErrors.email}
                  required
                />
              </div>

              <div className={styles.flexContainer}>
                <FormField
                  type="input"
                  label="Phone Number"
                  name="phoneNumber"
                  value={formValues.phone_number}
                  onChange={(value) => handleChange("phone_number", value)}
                  placeholder="Enter phone number"
                  error={formErrors.phone_number}
                  required
                />
                <FormField
                  type="select"
                  label="Location"
                  name="location"
                  value={formValues.location}
                  onChange={(value) => handleChange("location", value)}
                  placeholder="Enter location"
                  options={locationOptions}
                  error={formErrors.location}
                  required
                />
              </div>

              <div className={styles.flexContainer}>
                <FormField
                  type="select"
                  label="Department"
                  name="department"
                  value={formValues.department}
                  onChange={handleDepartmentChange}
                  placeholder="Enter department"
                  options={departmentOptions}
                  error={formErrors.department}
                  required
                />
                <FormField
                  type="select"
                  label="Employee Role"
                  name="role"
                  value={formValues.role_id}
                  onChange={handleRoleChange}
                  placeholder="Select role"
                  options={roleOptions}
                  error={formErrors.role_id}
                  required
                />
              </div>

              <div className={styles.flexContainer}>
                <FormField
                  type="select"
                  label="Reporting Manager"
                  name="reportingManager"
                  value={formValues.reporting_manager_name}
                  onChange={handleReportingManagerChange}
                  placeholder="Enter reporting manager"
                  options={reportingManagerOptions}
                  error={formErrors.reporting_manager}
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
                  error={formErrors.status}
                  required
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
