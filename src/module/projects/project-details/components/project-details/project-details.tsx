import { useState, useEffect } from "react";
import { Spin } from "antd";
import styles from "./project-details.module.scss";
import { Card, Row, Col } from "antd";

/**
 * Interface representing the project data structure.
 * This interface defines the shape of the project data.
 * @interface ProjectData
 */
interface ProjectData {
  id: string;
  projectLogo: string;
  projectName: string;
  clientName: string;
  planned_start_date: string;
  planned_end_date: string;
  actual_start_date: string;
  actual_end_date: string;
  projectLead: string;
  projectDescription: string;
  billing_model: string;
  timeEntry: "closed" | "opened";
  status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
}

/**
 * Interface representing the project details structure.
 * This interface defines the props for the ProjectDetails component.
 * @interface ProjectDetailsProps
 */
interface ProjectDetailsProps {
  id: string;
}

const ProjectDetails = ({ id }: ProjectDetailsProps) => {
  const [project, setProject] = useState<ProjectData | null>(null);

  // useEffect hook to fetch project data based on the ID when the component mounts
  useEffect(() => {
    if (id) {
      const projectData: ProjectData = {
        id,
        projectLogo: "",
        projectName: "Example Project",
        clientName: "Techfriar India",
        planned_start_date: "11/10/2024",
        planned_end_date: "02/05/2025",
        actual_start_date: "11/10/2024",
        actual_end_date: "02/05/2025",
        projectLead: "Aswina Vinod",
        projectDescription: "Detailed description of the project.",
        billing_model: "Retainer",
        timeEntry: "closed",
        status: "in_progress",
      };
      setProject(projectData);
    }
  }, [id]);

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
                {project.projectName.charAt(0).toUpperCase()}
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
            <h4>{project.planned_start_date}</h4>
          </Col>
          <Col>
            <p>Planned end date</p>
            <h4>{project.planned_end_date}</h4>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className={styles.lastRow}>
          <Col>
            <p>Actual start date</p>
            <h4>{project.actual_start_date}</h4>
          </Col>
          <Col>
            <p>Actual end date</p>
            <h4>{project.actual_end_date}</h4>
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
