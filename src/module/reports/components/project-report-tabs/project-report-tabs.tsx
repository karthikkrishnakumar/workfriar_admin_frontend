"use client";

import React, { useEffect, useState } from "react";
import styles from "./project-report-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import ProjectDetails from "../project-report-details/project-report-datails";
import { fetchProjectDetails } from "../../services/project-status-report/project-reports-details";
import { message } from "antd";

interface ReportTabProps {
  id: string;
}

const ProjectReportTabs: React.FC<ReportTabProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    {
      key: "1",
      label: <>Report</>,
      content: (
        <ProjectDetails project={project} loading={loading} error={error} />
      ), // Pass props to ProjectDetails
    },
  ];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchProjectDetails(id as string); // Make sure you pass the ID
        setProject(result);
      } catch (error) {
        setError("Failed to fetch project details.");
        message.error("Failed to fetch project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className={styles.timesheetTabsWrapper}>
      {loading ? (
        <div>
          <SkeletonLoader
            paragraph={{ rows: 2 }}
            classNameItem={styles.customSkeleton}
          />
          <SkeletonLoader profile classNameItem={styles.customSkeletonItem} />
          <SkeletonLoader
            paragraph={{ rows: 10 }}
            classNameItem={styles.customSkeleton}
          />
          <SkeletonLoader
            paragraph={{ rows: 7 }}
            classNameItem={styles.customSkeleton}
          />
        </div>
      ) : (
        <div>
          <TabComponent
            headings={tabs}
            subHeading={
              <ButtonComponent
                label="Edit Report"
                className={styles.mixedGold}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default ProjectReportTabs;
