"use client";

import React, { useEffect, useState } from "react";
import styles from "./project-report-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import ProjectDetails from "../project-report-details/project-report-datails";

import { message } from "antd";
import AddEditReport from "../add-edit-report-modal/add-edit-report-modal";
import UseProjectStatusServices from "../../services/project-status-report/project-status-report-services";

interface ReportTabProps {
  id: string;
}

const ProjectReportTabs: React.FC<ReportTabProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  console.log(project, "project");
  const tabs = [
    {
      key: "1",
      label: <>Report</>,
      content: (
        <ProjectDetails project={project} loading={loading} error={error} />
      ), // Pass props to ProjectDetails
    },
  ];

  const fetchDetails = async () => {
    try {
      const result = await UseProjectStatusServices().fetchProjectDetails(id); // Make sure you pass the ID
      setProject(result.data);
    } catch (error) {
      setError("Failed to fetch project details.");
      message.error("Failed to fetch project details.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleClickEdit = () => {
    setIsModalVisible(true); // Open the modal when the filter button is clicked
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal when required
    fetchDetails();
  };

  return (
    <div className={styles.timesheetTabsWrapper}>
      {loading ? (
        <div>
          <SkeletonLoader
            paragraph={{ rows: 2 }}
            classNameItem={styles.customSkeletonItem}
          />
          <SkeletonLoader profile classNameItem={styles.customSkeleton} />
          <SkeletonLoader
            paragraph={{ rows: 8 }}
            classNameItem={styles.customSkeletonItem}
          />
          <SkeletonLoader
            count={2}
            paragraph={{ rows: 4 }}
            classNameItem={styles.customSkeletonItem}
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
                onClick={handleClickEdit}
              />
            }
          />
        </div>
      )}

      {isModalVisible && (
        <AddEditReport
          onClose={handleCloseModal}
          mode="edit"
          reportData={project}
        />
      )}
    </div>
  );
};

export default ProjectReportTabs;
