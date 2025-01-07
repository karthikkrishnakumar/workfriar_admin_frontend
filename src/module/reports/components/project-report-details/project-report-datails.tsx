import React from "react";
import styles from "./project-report-details.module.scss";
import GridContainer from "@/themes/components/grid-container/grid-container";

interface ProjectDetailsProps {
  project: any;
  loading: boolean;
  error: string | null;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  loading,
  error,
}) => {
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
          {/* Header with Avatar and Project Details */}
          <GridContainer
            isGrid={true}
            avatar={{
              name: project?.project_name.name,
              profile: project?.project_name.project_logo,
              size: 80,
            }}
            fields={[
              { label: "Project name", value: project?.project_name.name },
              { label: "Project lead", value: project?.project_lead.full_name },
            ]}
          />

          {/* Reporting and Dates */}
          <GridContainer
            isGrid={true}
            fields={[
              { label: "Reporting Period", value: project?.reporting_period },
              {
                label: "Planned Start Date",
                value: project?.planned_start_date,
              },
              { label: "Planned End Date", value: project?.planned_end_date || "--"},
              { label: "Actual Start Date", value: project?.actual_start_date },
              { label: "Actual End Date", value: project?.actual_end_date || "--"},
              { 
                label: "Progress", 
                value: project?.progress.includes('%') ? project?.progress : `${project?.progress}%` 
              }
            ]}
          />
          {/* Comments */}
          <GridContainer
            isGrid={false}
            fields={[{ label: "Comments", value: project?.comments || "--"}]}
          />
          {/* Accomplishments */}
          <GridContainer
            isGrid={false}
            fields={[
              { label: "Accomplishments", value: project?.accomplishments },
            ]}
          />
          {/* Goals */}
          <GridContainer
            isGrid={false}
            fields={[{ label: "Goals", value: project?.goals }]}
          />
          {/* Blockers */}
          <GridContainer
            isGrid={false}
            fields={[{ label: "Blockers", value: project?.blockers || "--"}]}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
