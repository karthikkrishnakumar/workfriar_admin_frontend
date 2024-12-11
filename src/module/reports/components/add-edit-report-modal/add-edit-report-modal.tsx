import React, { useState, useEffect } from "react";
import { Form } from "antd";
import styles from "./add-edit-report-modal.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import FormField from "@/themes/components/reusable-fields/reusable-fields"; // Import the new FormField component
import ButtonComponent from "@/themes/components/button/button";

/**
 * FormValues defines the structure of the form data.
 * @typedef {Object} FormValues
 * @property {string} project - The selected project name.
 * @property {string} projectLead - The selected project lead.
 * @property {string[]} dates - Array of dates for different stages of the project.
 * @property {string} progress - The progress percentage of the project.
 * @property {string[]} textareas - Array for comments, goals, blockers, etc.
 */

// Define the FormValues type
interface FormValues {
  project: string;
  projectLead: string;
  dates: string[];
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

const AddReport: React.FC<AddReportProps> = ({ onClose, mode, reportData }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    project: "",
    projectLead: "",
    dates: ["", "", "", "", ""],
    progress: "",
    textareas: ["", "", ""],
  });

  // Update form values if in "edit" mode and reportData is available
  useEffect(() => {
    if (mode === "edit" && reportData) {
      setFormValues({
        project: reportData.project || "",
        projectLead: reportData.projectLead || "",
        dates: [
          reportData.dates?.plannedStartDate || "",
          reportData.dates?.plannedEndDate || "",
          reportData.dates?.actualStartDate || "",
          reportData.dates?.actualEndDate || "",
          reportData.dates?.reportingPeriod || "",
        ],
        progress: reportData.progress || "",
        textareas: [
          reportData.comments || "",
          reportData.goals || "",
          reportData.blockers || "",
        ],
      });
    }
  }, [mode, reportData]);

  const handleChange = (field: string, value: any, index?: number) => {
    setFormValues((prev) => {
      const newState = { ...prev };
      if (index !== undefined) {
        if (field === "dates") {
          const newDates = [...prev.dates];
          newDates[index] = value ? value.format("YYYY-MM-DD") : "";
          newState.dates = newDates;
        } else if (field === "textareas") {
          const newTextareas = [...prev.textareas];
          newTextareas[index] = value.target.value;
          newState.textareas = newTextareas;
        }
      } else {
        (newState as any)[field] = value;
      }
      return newState;
    });
  };

  // Select options configuration
  const selectFields = [
    {
      label: "Project",
      name: "project",
      options: [
        { value: "project1", label: "Project 1" },
        { value: "project2", label: "Project 2" },
        { value: "project3", label: "Project 3" },
      ],
    },
    {
      label: "Project Lead",
      name: "projectLead",
      options: [
        { value: "lead1", label: "Lead 1" },
        { value: "lead2", label: "Lead 2" },
        { value: "lead3", label: "Lead 3" },
      ],
    },
  ];

  // Date fields configuration
  const dateFields = [
    { label: "Planned Start Date", name: "plannedStartDate", index: 0 },
    { label: "Planned End Date", name: "plannedEndDate", index: 1 },
    { label: "Actual Start Date", name: "actualStartDate", index: 2 },
    { label: "Actual End Date", name: "actualEndDate", index: 3 },
    { label: "Reporting Period", name: "reportingPeriod", index: 4 },
  ];

  // Textareas configuration
  const textareaFields = [
    { label: "Comments", name: "comments", index: 0 },
    { label: "Goals", name: "goals", index: 1 },
    { label: "Blockers", name: "blockers", index: 2 },
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
                  />
                ))}
              </div>

              {/* Dates Fields */}
              <div className={styles.dateContainer}>
                {dateFields.map((field) => (
                  <FormField
                    key={field.name}
                    type="datepicker"
                    label={field.label}
                    name={field.name}
                    required
                    value={formValues.dates[field.index]} // Access the value dynamically for dates
                    onChange={(date) =>
                      handleChange("dates", date, field.index)
                    }
                  />
                ))}

                {/* Progress */}
                <FormField
                  type="input"
                  label="Progress (%)"
                  name="progress"
                  required
                  value={formValues.progress}
                  onChange={(e) => handleChange("progress", e.target.value)}
                  placeholder="Enter progress"
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
                  onChange={(e) => handleChange("textareas", e, field.index)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  rows={field.index === 1 ? 3 : 4} // Customize rows based on field type
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

export default AddReport;
