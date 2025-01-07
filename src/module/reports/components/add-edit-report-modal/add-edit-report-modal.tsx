import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import styles from "./add-edit-report-modal.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import FormField from "@/themes/components/reusable-fields/reusable-fields"; // Import the new FormField component
import ButtonComponent from "@/themes/components/button/button";
import UseProjectStatusServices, {
  DropDownData,
} from "../../services/project-status-report/project-status-report-services";

/**
 * FormValues defines the structure of the form data.
 * @typedef {Object} FormValues
 * @property {string} project_name - The selected project name.
 * @property {string} project_lead - The selected project lead.
 * @property {string[]} dates - Array of dates for different stages of the project.
 * @property {string} progress - The progress percentage of the project.
 * @property {string[]} textareas - Array for comments, goals, blockers, etc.
 */

// Define the FormValues type
interface FormValues {
  project_name: string;
  project_lead: string;
  reporting_period: string;
  progress: string;
  textareas: string[];
  [key: string]: string | string[]; // Allow indexing with string keys
}

/**
 * AddReport component allows adding or editing a report.
 * @param {Object} props - The component props.
 * @param {function} props.onClose - Function to close the modal.
 * @param {"add" | "edit"} props.mode - Defines the mode as either "add" or "edit".
 * @param {Object} [props.reportData] - Data to pre-fill the form when in "edit" mode.
 */

interface AddReportProps {
  onClose: () => void;
  mode: "add" | "edit"; // Add or Edit mode
  reportData?: any; // Optional report data for editing
}

interface SelectOption {
  value: string;
  label: string;
}

const AddReport: React.FC<AddReportProps> = ({ onClose, mode, reportData }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    project_name: "",
    project_lead: "",
    reporting_period: "",
    progress: "",
    textareas: ["", "", "", ""],
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [projects, setProjects] = useState<SelectOption[]>([]);
  const [projectLeads, setProjectLeads] = useState<SelectOption[]>([]);
  const [projectsData, setProjectsData] = useState<DropDownData[]>([]);


  // Fetch projects and leads data
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const services = UseProjectStatusServices();
        const [projectsResponse, leadsResponse] = await Promise.all([
          services.fetchDropdownData("projects"),
          services.fetchDropdownData("leads"),
        ]);

        const projectsList = projectsResponse.data || [];
        setProjectsData(projectsList);

        setProjects(
          projectsList.map((proj: DropDownData) => ({
            value: proj.id,
            label: proj.name,
          }))
        );

        setProjectLeads(
          leadsResponse.data?.map((lead: DropDownData) => ({
            value: lead.id,
            label: lead.name,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownOptions();
  }, []);

  // Update form values if in "edit" mode and reportData is available
  useEffect(() => {
    if (mode === "edit" && reportData) {
      // Parse the reporting period to ensure it is in the correct format
      let formattedReportingPeriod = reportData.reporting_period;

      // Check if the reporting_period is a valid string in "dd/mm/yyyy" format
      if (
        formattedReportingPeriod &&
        /^\d{2}\/\d{2}\/\d{4}$/.test(formattedReportingPeriod)
      ) {
        const [day, month, year] = formattedReportingPeriod.split("/");
        formattedReportingPeriod = `${year}-${month}-${day}`;
      }

      setFormValues({
        project_name: reportData.project_name.id || "",
        project_lead: reportData.project_lead.id || "",
        reporting_period: formattedReportingPeriod || "",
        progress: reportData?.progress.includes("%")
          ? reportData?.progress.replace("%", "")
          : reportData?.progress,
        textareas: [
          reportData.comments || "",
          reportData.accomplishments || "",
          reportData.goals || "",
          reportData.blockers || "",
        ],
      });
    }
  }, [mode, reportData]);

  // Handle form value changes
  const handleChange = (field: string, value: any, index?: number) => {
    setFormValues((prev) => {
      setFormErrors({});
      const newState = { ...prev };

      if (field === "project_name") {
        // Update project and auto-populate the project lead
        newState.project_name = value;
        const selectedProject = projectsData.find((proj) => proj.id === value);
        newState.project_lead = selectedProject?.project_lead?.id ?? "";
      } else if (index !== undefined && field === "textareas") {
        const newTextareas = [...prev.textareas];
        newTextareas[index] = value.target.value;
        newState.textareas = newTextareas;
      } else {
        (newState as any)[field] = value;
      }
      return newState;
    });
  };

  console.log(formValues, "formvalues");

  const prepareReportDataToSave = () => {
    return {
      project_name: formValues.project_name || "",
      project_lead: formValues.project_lead,
      reporting_period: new Date(formValues.reporting_period),
      progress: formValues.progress,
      comments: formValues.textareas[0],
      accomplishments: formValues.textareas[1],
      goals: formValues.textareas[2],
      blockers: formValues.textareas[3],
    };
  };
  const handleSave = async () => {
    try {
      if (mode === "add") {
        setFormErrors({});
        const validationErrors: { [key: string]: string } = {};
        // Prepare data for saving
        const reportDataToSave = prepareReportDataToSave();

        // Send data to service
        const response =
          await UseProjectStatusServices().addProjectStatusReport(
            reportDataToSave
          );

        // Handle response errors
        if (response?.errors) {
          response.errors.forEach(
            (error: { field: string; message: string }) => {
              const { field, message } = error;
              // Map textarea fields to their respective indices
              if (
                ["comments", "accomplishments", "goals", "blockers"].includes(
                  field
                )
              ) {
                const textareaIndex = [
                  "comments",
                  "accomplishments",
                  "goals",
                  "blockers",
                ].indexOf(field);
                validationErrors[`textareas_${textareaIndex}`] = message;
              } else {
                // Handle other fields
                validationErrors[field] = message;
              }
            }
          );

          // Update formErrors with the mapped validation errors
          setFormErrors(validationErrors);
          return;
        }
        // Handle successful response
        if (response.status) message.success(response.message);
        else message.error(response.message);
        onClose && onClose();
      }
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  // Handle edit (Update mode)
  const handleEdit = async () => {
    try {
      if (mode === "edit") {
        setFormErrors({});
        const validationErrors: { [key: string]: string } = {};
        const reportDataToSave = prepareReportDataToSave();

        // Send data to service to update
        const response =
          await UseProjectStatusServices().editProjectStatusReport(
            reportDataToSave,
            reportData.id
          );

        if (response?.errors) {
          response.errors.forEach(
            (error: { field: string; message: string }) => {
              const { field, message } = error;
              if (
                ["comments", "accomplishments", "goals", "blockers"].includes(
                  field
                )
              ) {
                const textareaIndex = [
                  "comments",
                  "accomplishments",
                  "goals",
                  "blockers",
                ].indexOf(field);
                validationErrors[`textareas_${textareaIndex}`] = message;
              } else {
                validationErrors[field] = message;
              }
            }
          );

          setFormErrors(validationErrors);
          return;
        }

        if (response.status) message.success(response.message);
        else message.error(response.message);
        onClose && onClose();
      }
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  // Select options configuration
  const selectFields = [
    {
      label: "Project",
      name: "project_name",
      options: projects,
    },
    {
      label: "Project Lead",
      name: "project_lead",
      options: projectLeads,
    },
  ];

  // Textareas configuration
  const textareaFields = [
    { label: "Comments", name: "comments", index: 0 },
    { label: "Accomplishments", name: "accomplishments", index: 1, require },
    { label: "Goals", name: "goals", index: 2, require },
    { label: "Blockers", name: "blockers", index: 3 },
  ];


  return (
    <div>
      <ModalComponent
        isVisible={true}
        title={mode === "edit" ? "Edit Report" : "Add Report"} // Set the title based on the mode
        theme="normal"
        onClose={onClose}
        content={
          <div className={styles.formsContentDiv}>
            <Form layout="vertical" requiredMark={false}>
              {/* Project and Project Lead Selection */}
              <div className={styles.flexContainer}>
                {selectFields.map((field) => (
                  <FormField
                    key={field.name}
                    type="select"
                    label={field.label}
                    name={field.name}
                    required
                    value={formValues[field.name]} // Access the value dynamically
                    onChange={(value) => handleChange(field.name, value)}
                    placeholder={`Select ${field.label.toLowerCase()}`}
                    options={field.options}
                    error={formErrors[field.name]}
                  />
                ))}
              </div>

              {/* Dates Fields */}
              <div className={styles.dateContainer}>
                <FormField
                  type="datepicker"
                  label="Reporting period"
                  name="reporting period"
                  required
                  value={formValues.reporting_period} // Access the value dynamically for dates
                  onChange={(date) => handleChange("reporting_period", date)}
                  error={formErrors.reporting_period} // Pass the error dynamically
                />

                {/* Progress */}
                <FormField
                  type="input"
                  label="Progress (%)"
                  name="progress"
                  required
                  value={formValues.progress}
                  onChange={(value) => handleChange("progress", value)}
                  placeholder="Enter progress"
                  error={formErrors.progress}
                  numberOnly
                />
              </div>

              {/* Textareas */}
              {textareaFields.map((field) => (
                <FormField
                  key={field.name}
                  type="textarea"
                  label={field.label}
                  name={field.name}
                  value={formValues.textareas[field.index]} // Access the value dynamically for textareas
                  onChange={(value) =>
                    handleChange("textareas", value, field.index)
                  }
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  rows={4} // Customize rows based on field type
                  required={field.require ? true : false}
                  error={formErrors[`textareas_${field.index}`]}
                />
              ))}
            </Form>
          </div>
        }
        bottomContent={
          <>
            <ButtonComponent label="Cancel" theme="white" onClick={onClose} />
            <ButtonComponent
              label="Save"
              theme="black"
              onClick={mode == "add" ? handleSave : handleEdit}
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

export default AddReport;
