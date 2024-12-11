"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import { AddModalProps } from "@/module/project-forecast/project-forecast/components/add-forecast-modal/add-forecast-modal";


const AddProjectTeamModal: React.FC<AddModalProps> = ({
  isAddModalOpen,
  onClose,
  onSave,
}) => {
  return (
    <ModalFormComponent
      isVisible={isAddModalOpen}
      onClose={onClose}
      title={"Add Project Team"}
      primaryButtonLabel={"Save"}
      secondaryButtonLabel={"Cancel"}
      onPrimaryClick={onSave}
      formRows={[
        {
          fields: [
            {
              name: "ProjectName",
              label: "Project",
              type: "select",
              options: [
                { label: "Diamond Lease", value: "diamond" },
                { label: "Platinum Hire", value: "platinum" },
              ],
              required: true,
              placeholder: "Select project",
            },
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
        {
          fields: [
            {
              name: "start_date",
              label: "Start date",
              type: "date",
              required: true,
            },
            {
              name: "end_date",
              label: "End date",
              type: "date",
              required: true,
            },
          ],
        },
        {
          fields: [
            {
              name: "ProjectTeam",
              label: "Team members",
              type: "select",
              options: [
                { label: "Vishnu M S", value: "vishnuMS" },
                { label: "Aswina Vinod", value: "aswinaVinod" },
              ],
              required: true,
              placeholder: "Select team members",
            },
          ],
        },
      ]}
    />
  );
};

export default AddProjectTeamModal;
