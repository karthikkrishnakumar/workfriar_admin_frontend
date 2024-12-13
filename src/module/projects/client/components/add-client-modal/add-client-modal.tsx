"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import { AddModalProps } from "@/module/project-forecast/project-forecast/components/add-forecast-modal/add-forecast-modal";


const AddClientModal: React.FC<AddModalProps> = ({
  isAddModalOpen,
  onClose,
  onSave,
}) => {
  return (
    <ModalFormComponent
      isVisible={isAddModalOpen}
      onClose={onClose}
      title={"Add Client"}
      primaryButtonLabel={"Save"}
      secondaryButtonLabel={"Cancel"}
      onPrimaryClick={onSave}
      formRows={[
        {
          fields: [
            {
              name: "client_name",
              label: "Client",
              type: "text",
              required: true,
              placeholder: "Enter client",
            },
            {
              name: "location",
              label: "Location",
              type: "select",
              options: [
                { label: "India", value: "india" },
                { label: "Dubai", value: "dubai" },
                { label: "UK", value: "uk" },
              ],
              required: true,
              placeholder: "Select location",
            },
          ],
        },
        {
          fields: [
            {
              name: "client_manager",
              label: "Client Manager",
              type: "select",
              options: [{ label: "Aswina Vinod", value: "aswina_vinod" }],
              required: true,
              placeholder: "Select client manager",
            },
            {
              name: "billing_currency",
              label: "Billing currency",
              type: "select",
              options: [{ label: "Dirham", value: "dirham" }],
              required: true,
              placeholder: "Select billing currency",
            },
          ],
        },
        {
          fields: [
            {
              name: "status",
              label: "Status",
              type: "select",
              options: [
                { label: "Not started", value: "Not_started" },
                { label: "In progress", value: "In_progress" },
                { label: "On hold", value: "On_hold" },
                { label: "Cancelled", value: "Cancelled" },
                { label: "Completed", value: "Completed" },
              ],
              required: true,
              placeholder: "Select status",
            },
          ],
        },
      ]}
    />
  );
};

export default AddClientModal;
