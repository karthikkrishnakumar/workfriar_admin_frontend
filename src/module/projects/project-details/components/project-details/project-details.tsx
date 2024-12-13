"use client";
import { useState, useEffect } from "react";
import styles from "./project-details.module.scss";
import { Card, Row, Col, Spin, message } from "antd";
import useProjectService, {
  ProjectData,
} from "@/module/projects/project-list/services/project-service";
import dayjs from "dayjs";

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
      <Card>
        <Row gutter={[16, 16]} align="middle" className={styles.firstRow}>
          <Col>
            {project.projectLogo ? (
              <img
                src={project.projectLogo}
                alt={project.projectName}
                className={styles.circleImage}
              />
            ) : (
              <div className={styles.circle}>
                {project?.projectName?.charAt(0).toUpperCase()}
              </div>
            )}
          </Col>
          <Col>
            <p>Project</p>
            <h4>{project.projectName}</h4>
          </Col>
          <Col>
            <p>Project lead</p>
            <h4>{project.projectLead}</h4>
          </Col>
        </Row>
      </Card>

      {/* Description Section */}
      <Card className={styles.middleRow}>
        <p>Project description</p>
        <h4>{project.projectDescription}</h4>
      </Card>

      {/* Details Section */}
      <Card className={styles.middleRow}>
        <Row gutter={[16, 16]} align="middle" className={styles.lastRow}>
          <Col>
            <p>Client</p>
            <h4>{project.clientName}</h4>
          </Col>
          <Col>
            <p>Planned start date</p>
            <h4>{dayjs(project?.planned_start_date).format("DD/MM/YYYY")}</h4>
          </Col>
          <Col>
            <p>Planned end date</p>
            <h4>{dayjs(project?.planned_end_date).format("DD/MM/YYYY")}</h4>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className={styles.lastRow}>
          <Col>
            <p>Actual start date</p>
            <h4>{dayjs(project?.actual_start_date).format("DD/MM/YYYY")}</h4>
          </Col>
          <Col>
            <p>Actual end date</p>
            <h4>{dayjs(project?.actual_end_date).format("DD/MM/YYYY")}</h4>
          </Col>
          <Col>
            <p>Billing model</p>
            <h4>{project.billing_model}</h4>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className={styles.lastRow}>
          <Col>
            <p>Time entry</p>
            <h4>{project.timeEntry}</h4>
          </Col>
          <Col>
            <p>Status</p>
            <h4>{project.status}</h4>
          </Col>
          <Col></Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProjectDetails;
