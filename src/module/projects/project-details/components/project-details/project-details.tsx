"use client";
import { useState, useEffect } from "react";
import styles from "./project-details.module.scss";
import { Spin, message } from "antd";
import useProjectService from "@/module/projects/project-list/services/project-service";
import GridContainer from "@/themes/components/grid-container/grid-container";
import { ProjectData } from "@/interfaces/projects/projects";

/**
 * Interface representing the project details structure.
 * This interface defines the props for the ProjectDetails component.
 * @interface ProjectDetailsProps
 */
interface ProjectDetailsProps {
  id: string;
}

const ProjectDetails = ({ id }: ProjectDetailsProps) => {
  const { fetchProjectDetailsById } = useProjectService();
  const [project, setProject] = useState<ProjectData | null>(null);

  // useEffect hook to fetch project data based on the ID when the component mounts

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchProjectDetailsById(id); // Make sure you pass the ID
        setProject(result.data);
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, []);

  if (!project) {
    return (
      <div className={styles.loadingWrapper}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.projectDetailsWrapper}>
      <GridContainer
          isGrid={true}
          avatar={{
            name: project?.project_name,
            profile: project?.project_logo || "",
            size: 100}}
          fields={[
            {
              label: "Project",
              value: project?.project_name,
            },
            { label: "Project lead", value: project?.project_lead?.full_name },
          ]}
        />

      {/* Description Section */}
      <GridContainer
          isGrid={false}
          fields={[
            {
              label: "Project description",
              value: project.description || "--",
            }
          ]}
        />

      {/* Details Section */}
      <GridContainer
          isGrid={true}
          fields={[
            {
              label: "Client",
              value: project?.client_name?.client_name,
            },
            {
              label: "Planned start date",
              value: project?.planned_start_date || null,
            },
            {
              label: "Planned end date",
              value: project?.planned_end_date || null,
            },
            {
              label: "Actual start date",
              value: project?.actual_start_date || null,
            },
            {
              label: "Actual end date",
              value: project?.actual_end_date || null,
            },
            {
              label: "Billing model",
              value: project?.billing_model || "--",
            },
            {
              label: "Time entry",
              value: project?.open_for_time_entry            
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            },
            {
              label: "Status",
              value: project?.status,
            },
            
          ]}
        />
    </div>
  );
};

export default ProjectDetails;
