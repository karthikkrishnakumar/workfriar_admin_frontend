import React from "react";
import styles from "./project-report-details.module.scss";
import CustomAvatar from "@/themes/components/avatar/avatar";

interface ProjectDetailsProps {
  project: any;
  loading: boolean;
  error: string | null;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, loading, error }) => {


  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.projectDetails}>
      {/* Top Header with Tabs */}

      {/* Main Content */}
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.detailsWrapper}>
          <div className={styles.header}>
            <div className={styles.headerGrid}>
              <CustomAvatar
                name={project?.project_name}
                profile={project?.logo}
                size={80}
              />

              <div className={styles.field}>
                <div className={styles.label}>Project name</div>
                <div className={styles.value}>{project?.project_name}</div>
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Project lead</div>
                <div className={styles.value}>{project?.project_lead}</div>
              </div>
            </div>
          </div>

          <div className={styles.header}>
            <div className={styles.headerGrid}>
              <div className={styles.field}>
                <div className={styles.label}>Reporting Period:</div>
                <div className={styles.value}>--</div>
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Planned Start Date:</div>
                <div className={styles.value}>
                  {project?.planned_start_date}
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Planned End Date:</div>
                <div className={styles.value}>{project?.planned_end_date}</div>
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Actual Start Date:</div>
                <div className={styles.value}>{project?.actual_start_date}</div>
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Actual End Date:</div>
                <div className={styles.value}>{project?.actual_end_date}</div>
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Progress:</div>
                <div className={styles.value}>{project?.progress}%</div>
              </div>
            </div>
          </div>

          <div className={styles.header}>
            <div className={styles.label}>Comments</div>
            <div className={styles.value}>
              {project?.comments || "No comments available."}
            </div>
          </div>

          <div className={styles.header}>
            <div className={styles.label}>Accomplishments</div>
            <div className={styles.value}>
              {project?.accomplishments || "No accomplishments available."}
            </div>
          </div>
          <div className={styles.header}>
            <div className={styles.label}>Goals</div>
            <div className={styles.value}>{project?.goals}</div>
          </div>
          <div className={styles.header}>
            <div className={styles.label}>Blockers</div>
            <div className={styles.value}>{project?.blockers}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
