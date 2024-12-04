"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import dayjs from "dayjs";


interface EditProjectModalProps {
  isEditModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  initialValues: ProjectData | null;
}
interface ProjectData {
  key: string;
  projectLogo : string;
  projectName: string;
  clientName: string;
  planned_start_date: string | dayjs.Dayjs;
  planned_end_date: string | dayjs.Dayjs;
  actual_start_date: string | dayjs.Dayjs;
  actual_end_date: string | dayjs.Dayjs;
  projectLead: string;
  projectDescription: string;
  billing_model: string,
  timeEntry: "closed" | "opened";
  status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isEditModalOpen,
  onClose,
  onSave,
  initialValues,
}) => {
  const values = initialValues || {
    key: "",
    projectLogo: "",
    projectName: "",
    clientName: "",
    planned_start_date:"",
    planned_end_date:"",
    actual_start_date:"",
    actual_end_date:"",
    projectLead: "",
    projectDescription: "",
    timeEntry: "opened",
    status: "not_started",
    billing_model: "",
  };

  return (
    <ModalFormComponent
      isVisible={isEditModalOpen}
      onClose={onClose}
      title={"Edit Project"}
      primaryButtonLabel={"Save"}
      secondaryButtonLabel={"Cancel"}
      initialValues={values}
      onPrimaryClick={onSave}
      formRows={[
        {
          fields: [
            {
              name: "projectLogo",
              label: "Project",
              type: "image",
            },
          ],
        },
        {
          fields: [
            {
              name: "projectName",
              label: "Project",
              type: "text",
              required: true,
            },
            {
              name: "clientName",
              label: "Client",
              type: "select",
              options: [
                { label: "Techfriar India", value: "techfriar_india" },
                { label: "Techfriar Dubai", value: "techfriar_dubai" },
                { label: "Techfriar UK", value: "techfriar_uk" },
              ],
              required: true,
            },
          ],
        },
        {
          fields: [
            {
              name: "projectDescription",
              label: "Project Description",
              type: "textarea",
              required: true,
              isExtended:true,
            },
          ],
        },
        {
          fields: [
            {
              name: "planned_start_date",
              label: "Planned start date",
              type: "date",
              required: true,
            },
            {
              name: "planned_end_date",
              label: "Planned end date",
              type: "date",
              required: true,
            },
          ],
        },
        {
          fields: [
            {
              name: "actual_start_date",
              label: "Actual start date",
              type: "date",
              required: true,
            },
            {
              name: "actual_end_date",
              label: "Actual end date",
              type: "date",
              required: true,
            },
          ],
        },
        {
          fields: [
            {
              name: "projectLead",
              label: "Project lead",
              type: "select",
              options: [
                { label: "Aswina Vinod", value: "aswina_vinod" },
              ],
              required: true,
            },
            {
              name: "billing_model",
              label: "Billing model",
              type: "select",
              options: [
                { label: "Billing time (time and materials)", value: "billing_time" },
                { label: "Bill milestones / Fixed fee", value: "bill_fixed" },
                { label: "Retainer", value: "Retainer" },
                { label: "Non billable", value:"Non_billable" },
              ],
              required: true,
            },
          ],
        },
        {
          fields: [
            {
              name: "timeEntry",
              label: "Time entry",
              type: "select",
              options: [
                { label: "Opened", value: "opened" },
                { label: "Closed", value: "closed" },
              ],
              required: true,
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: [
                { label: "Not started", value: "Not_started" },
                { label: "In progress", value: "In_progress" },
                { label: "On hold", value: "On_hold" },
                { label: "Cancelled", value:"Cancelled" },
                { label: "Completed", value:"Completed" },
              ],
              required: true,
            },
          ],
        },
      ]}
    />
  );
};

export default EditProjectModal;
