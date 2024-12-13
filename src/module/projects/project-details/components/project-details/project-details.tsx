"use client";
import { useState, useEffect } from "react";
import styles from "./project-details.module.scss";
import { Spin, message } from "antd";
import useProjectService, {
  ProjectData,
} from "@/module/projects/project-list/services/project-service";
import dayjs from "dayjs";
import GridContainer from "@/themes/components/grid-container/grid-container";

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
        setProject(result);
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
            name: project?.projectName,
            profile: project?.projectLogo || "",
            size: 100}}
          fields={[
            {
              label: "Project",
              value: project?.projectName,
            },
            { label: "Project lead", value: project?.projectLead },
          ]}
        />

      {/* Description Section */}
      <GridContainer
          isGrid={false}
          fields={[
            {
              label: "Project description",
              value: project?.projectDescription,
            }
          ]}
        />

      {/* Details Section */}
      <GridContainer
          isGrid={true}
          fields={[
            {
              label: "Client",
              value: project?.clientName,
            },
            { label: "Planned start date", value: dayjs(project?.planned_start_date).format("DD/MM/YYYY") },
            { label: "Planned end date", value: dayjs(project?.planned_end_date).format("DD/MM/YYYY") },
            { label: "Actual start date", value: dayjs(project?.actual_start_date).format("DD/MM/YYYY") },
            { label: "Actual end date", value: dayjs(project?.actual_end_date).format("DD/MM/YYYY") },
            {
              label: "Billing model",
              value: project?.billing_model,
            },
            {
              label: "Time entry",
              value: project?.timeEntry,
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
