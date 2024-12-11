"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import { AddModalProps } from "@/module/project-forecast/project-forecast/components/add-forecast-modal/add-forecast-modal";


const AddProjectModal: React.FC<AddModalProps> = ({
  isAddModalOpen,
  onClose,
  onSave,
}) => {

  return (
    <ModalFormComponent
      isVisible={isAddModalOpen}
      onClose={onClose}
      title={"Add Project"}
      primaryButtonLabel={"Save"}
      secondaryButtonLabel={"Cancel"}
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

export default AddProjectModal;
