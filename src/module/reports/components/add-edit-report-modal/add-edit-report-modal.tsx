import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import styles from "./add-edit-report-modal.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import FormField from "@/themes/components/reusable-fields/reusable-fields";
import ButtonComponent from "@/themes/components/button/button";
import UseProjectStatusServices from "../../services/project-status-report/project-status-report-services";
import {
  DropDownData,
  ReportDetails,
} from "@/interfaces/reports/project-status-report/project-status-report";

interface FormValues {
  project_name: string;
  project_name_id?: string; // Added for storing ID
  project_lead: string;
  project_lead_id?: string; // Added for storing ID
  reporting_period: string;
  progress: string;
  textareas: string[];
  [key: string]: string | string[] | undefined;
}

interface AddReportProps {
  onClose: () => void;
  mode: "add" | "edit";
  reportData?: ReportDetails;
}

interface SelectOption {
  value: string;
  label: string;
}

const AddReport: React.FC<AddReportProps> = ({ onClose, mode, reportData }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    project_name: "",
    project_lead: "",
    project_name_id: "",
    project_lead_id: "",
    reporting_period: "",
    progress: "",
    textareas: ["", "", "", ""],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [projects, setProjects] = useState<SelectOption[]>([]);
  const [projectLeads, setProjectLeads] = useState<SelectOption[]>([]);
  const [projectsData, setProjectsData] = useState<DropDownData[]>([]);

  setTimeout(() => {
    setLoading(false);
  }, 200);

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

  useEffect(() => {
    if (mode === "edit" && reportData) {
      let formattedReportingPeriod = reportData.reporting_period;

      if (
        formattedReportingPeriod &&
        /^\d{2}\/\d{2}\/\d{4}$/.test(formattedReportingPeriod)
      ) {
        const [day, month, year] = formattedReportingPeriod.split("/");
        formattedReportingPeriod = `${year}-${month}-${day}`;
      }

      // For edit mode, populate both display names and IDs
      setFormValues({
        project_name: reportData.project_name.name || "", // Display name
        project_name_id: reportData.project_name.id || "", // Store ID
        project_lead: reportData.project_lead.full_name || "", // Display name
        project_lead_id: reportData.project_lead.id || "", // Store ID
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

  const handleChange = (field: string, value: any, index?: number) => {
    setFormValues((prev) => {
      setFormErrors({});
      const newState = { ...prev };

      if (field === "project_name") {
        // Store both name and ID for project
        const selectedProject = projectsData.find((proj) => proj.id === value);
        newState.project_name = selectedProject?.name ?? "";
        newState.project_name_id = value;

        // Auto-populate project lead if available
        if (selectedProject?.project_lead) {
          newState.project_lead = selectedProject.project_lead.name || "";
          newState.project_lead_id = selectedProject.project_lead.id || "";
        }
      } else if (field === "project_lead") {
        // Store both name and ID for project lead
        const selectedLead = projectLeads.find((lead) => lead.value === value);
        newState.project_lead = selectedLead?.label ?? "";
        newState.project_lead_id = value;
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

  const prepareReportDataToSave = () => {
    return {
      project_name: formValues.project_name_id ?? "", // Send ID instead of name
      project_lead: formValues.project_lead_id ?? "", // Send ID instead of name
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

        if (reportData) {
          const response =
            await UseProjectStatusServices().editProjectStatusReport(
              reportDataToSave,
              reportData?.id
            );

          // Send data to service to update

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
      }
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const selectFields = [
    {
      label: "Project",
      name: "project_name",
      options: projects,
      value: formValues.project_name_id, // Use ID for value
    },
    {
      label: "Project Lead",
      name: "project_lead",
      options: projectLeads,
      value: formValues.project_lead_id, // Use ID for value
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
        title={mode === "edit" ? "Edit Report" : "Add Report"}
        theme="normal"
        onClose={onClose}
        content={
          <div className={styles.formsContentDiv}>
            <Form layout="vertical" requiredMark={false}>
              <div className={styles.flexContainer}>
                {selectFields.map((field) => (
                  <FormField
                    key={field.name}
                    type="select"
                    label={field.label}
                    name={field.name}
                    required
                    value={field.value}
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
        isLoading={loading}
        className={styles.modalDiv}
        classTitle={styles.titleClass}
        classBottom={styles.bottomClass}
      />
    </div>
  );
};

export default AddReport;
