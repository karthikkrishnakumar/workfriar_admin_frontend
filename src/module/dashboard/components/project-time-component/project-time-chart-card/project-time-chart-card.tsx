// components/project-time-chart-card/project-time-chart-card.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./project-time-chart-card.module.scss"; // Adjust the path as needed
import CardSection from "../../card-section/card-section";
import ButtonComponent from "@/themes/components/button/button";
import ProjectTimeChart from "../project-time-chart/project-time-chart";

import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import UseDashboardServices, {
  ProjectTimeChartProps,
} from "@/module/dashboard/services/dashboard-services/dashboard-services";

const ProjectTimeChartCard: React.FC = () => {
  const [projectTimeData, setProjectTimeData] = useState<
    ProjectTimeChartProps[] | []
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch project time data when the component mounts
  useEffect(() => {
    const fetchProjectTimeData = async () => {
      try {
        const data = await UseDashboardServices().fetchProjectTimes();
        setProjectTimeData(data.data); // Set fetched data
      } catch (error) {
        setError("Error fetching project time data.");
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchProjectTimeData();
  }, []);

  const handleClickAddEntry = () => {
    window.location.href = "/time-sheet";
  };

  if (error) return <div>{error}</div>;

  return (
    <CardSection
      title="Project time today"
      topRightContent={
        loading ? (
          <SkeletonLoader count={1} button={true} />
        ) : (
          <ButtonComponent
            label="Add Entry"
            theme="black"
            onClick={handleClickAddEntry}
          />
        )
      }
      centerContent={
        loading ? (
          <SkeletonLoader count={1} avatar={false} paragraph={{ rows: 10 }} />
        ) : (
          <ProjectTimeChart data={projectTimeData?.length>0?projectTimeData:[]} loading={loading} />
        )
      }
      className={styles.projectChartCard}
    />
  );
};

export default ProjectTimeChartCard;
