"use client";
import React, { useEffect, useState } from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import useProjectTeamService from "../../services/project-team-service";
import { message } from "antd";
import { ProjectTeamData } from "@/interfaces/project-team/project-team";

interface ModalProps {
  isModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  initialValues?: ProjectTeamData;
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
  const values = initialValues;
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        
        const projects = await useProjectTeamService().fetchProjects(); 
        setProjects(projects.data);
        const teamMembers = await useProjectTeamService().fetchTeamMembers("Technical"); 
        const excludedIds =(values?.teamMembers || []).map(
          (member: { id: string }) => member.id
        );
        const filteredTeamMembers = teamMembers.data.filter(
          (member: { id: any; }) => !excludedIds.includes(member.id)
        );
        setTeamMembers(filteredTeamMembers);
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
              name: "project_id",
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
              name: "teamMembers",
              label: "Team members",
              type: "checkboxSelect",
              options: teamMembers?.map((member:any) => ({
                label: member.name, 
                value: member.id,
              })),
              required: true,
              placeholder: "Select team members",
            },
          ],
        },
       
      ]}
    />
  );
};

export default ProjectTeamModal;
