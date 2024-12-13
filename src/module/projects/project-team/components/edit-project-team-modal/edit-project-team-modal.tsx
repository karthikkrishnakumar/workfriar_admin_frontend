"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import { ProjectTeamData } from "../../services/project-team-service";

interface EditProjectTeamModalProps {
  isEditModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  initialValues: ProjectTeamData | null;
}

const EditProjectTeamModal: React.FC<EditProjectTeamModalProps> = ({
  isEditModalOpen,
  onClose,
  onSave,
  initialValues,
}) => {
  const values = initialValues || {
    key: "",
    ProjectLogo: "",
    ProjectName: "",
    start_date: "",
    end_date: "",
    status: "completed",
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

export default EditProjectTeamModal;
