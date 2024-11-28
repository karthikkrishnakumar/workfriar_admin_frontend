// components/project-time-chart-card/project-time-chart-card.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./project-time-chart-card.module.scss"; // Adjust the path as needed
import CardSection from "../../card-section/card-section";
import ButtonComponent from "@/themes/components/button/button";
import ProjectTimeChart from "../project-time-chart/project-time-chart";
import {
  ProjectTimeChartProps,
  ProjectTimeService,
} from "@/module/dashboard/services/project-time-services/project-time-services";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

const ProjectTimeChartCard: React.FC = () => {
  const [projectTimeData, setProjectTimeData] = useState<
    ProjectTimeChartProps[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch project time data when the component mounts
  useEffect(() => {
    const fetchProjectTimeData = async () => {
      try {
        const data = await ProjectTimeService.fetchProjectTimeData();
        console.log(data, "in project time today");
        setProjectTimeData(data); // Set fetched data
      } catch (error) {
        setError("Error fetching project time data.");
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchProjectTimeData();
  }, []);

  return (
    <CardSection
      title="Project time today"
      topRightContent={
        loading ? (
          <SkeletonLoader
            count={1}
            button={true}
          />
        ) : (
          <ButtonComponent label="Add Entry" theme="black" />
        )
      }
      centerContent={
        loading ? (
          <SkeletonLoader
            count={1}
            avatar={false}
            paragraph={{ rows: 8 }}
          />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <ProjectTimeChart
            data={projectTimeData ? projectTimeData : []}
            loading={loading}
          />
        )
      }
      className={styles.projectChartCard}
    />
  );
};

export default ProjectTimeChartCard;
