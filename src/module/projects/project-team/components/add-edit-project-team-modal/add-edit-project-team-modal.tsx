"use client";
import React, { useEffect, useState } from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import useProjectTeamService, { ProjectTeamData } from "../../services/project-team-service";
import { message } from "antd";

interface ModalProps {
  isModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  initialValues?: ProjectTeamData | null;
  id?: string;
  type?:string;
}

const ProjectTeamModal: React.FC<ModalProps> = ({
  isModalOpen,
  onClose,
  onSave,
  initialValues,
  id,
  type
}) => {
  const values = initialValues || {
    key: "",
    ProjectLogo: "",
    ProjectName: "",
    start_date: "",
    end_date: "",
    status: "completed",
  };
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const projects = await useProjectTeamService().fetchProjects(); 
        console.log(projects)
        setProjects(projects.data);
      } catch (error) {
        message.error("Failed to fetch details.");
      }
    };

    fetchDetails();
  }, []);
  
  return (
    <ModalFormComponent
      isVisible={isModalOpen}
      onClose={onClose}
      title={type === "edit" ? "Edit Project Team" : "Add Project Team"}
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
              options: projects?.map((projects:any) => ({
                label: projects.name, 
                value: projects.id,
              })),
              required: true,
              placeholder: "Select project",
            },
            {
              name: "ProjectTeam",
              label: "Team members",
              type: "checkboxSelect",
              options: [
                { label: "Vishnu M S", value: "vishnuMS" },
                { label: "Aswina Vinod", value: "aswinaVinod" },
              ],
              required: true,
              placeholder: "Select team members",
            },
            // {
            //   name: "status",
            //   label: "Status",
            //   type: "select",
            //   options: [
            //     { label: "Not started", value: "Not_started" },
            //     { label: "In progress", value: "In_progress" },
            //     { label: "On hold", value: "On_hold" },
            //     { label: "Cancelled", value: "Cancelled" },
            //     { label: "Completed", value: "Completed" },
            //   ],
            //   required: true,
            //   placeholder: "Select status",
            // },
          ],
        },
        // {
        //   fields: [
        //     {
        //       name: "start_date",
        //       label: "Start date",
        //       type: "date",
        //       required: true,
        //     },
        //     {
        //       name: "end_date",
        //       label: "End date",
        //       type: "date",
        //       required: true,
        //     },
        //   ],
        // },
        // {
        //   fields: [
        //     {
        //       name: "ProjectTeam",
        //       label: "Team members",
        //       type: "checkboxSelect",
        //       options: [
        //         { label: "Vishnu M S", value: "vishnuMS" },
        //         { label: "Aswina Vinod", value: "aswinaVinod" },
        //       ],
        //       required: true,
        //       placeholder: "Select team members",
        //     },
        //   ],
        // },
      ]}
    />
  );
};

export default ProjectTeamModal;
