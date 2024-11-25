"use client";

import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/charts";
import axios from "axios";
import styles from "./project-time-chart.module.scss";

interface ChartData {
  project: string;
  hours: number;
}

const DynamicChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/dashboard/project-time-chart");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const config = {
    data,
    xField: "project",
    yField: "hours",
    columnWidthRatio: 0.5,
    // Apply golden theme color directly to the column
    color: "#FFD700",
    // Add style configurations
    style: {
      fill: "#FFD700",
    },
    xAxis: {
      title: {
        text: "Projects",
        style: { fontSize: 12, color: "var(--secondary-font-color-dark)" },
      },
      label: {
        style: {
          fill: "var(--secondary-font-color-dark)",
        },
        autoHide: false,
      },
    },
    yAxis: {
      title: {
        text: "Time Spent (hours)",
        style: { fontSize: 12, color: "var(--secondary-font-color-dark)" },
      },
      label: {
        formatter: (value: number) => `${value} hr`,
        style: {
          fill: "var(--secondary-font-color-dark)",
        },
      },
    },
    // Configure column appearance
    columnStyle: {
      fill: "#FFD700",
      radius: [4, 4, 0, 0],
    },
    // Add hover state color
    state: {
      active: {
        style: {
          fill: "#DAA520", // Darker golden color for hover state
        },
      },
    },
    // Animation configuration
    animation: {
      appear: {
        animation: "scale-in-y",
        duration: 800,
      },
    },
    interactions: [{ type: "active-region" }],
  };

  if (loading) {
    return <div className={styles.loader}>Loading chart data...</div>;
  }

  if (data.length === 0) {
    return <div className={styles.noData}>No data available to display</div>;
  }

  return (
    <div className={styles.chartContainer}>
      <Column {...config} />
    </div>
  );
};

export default DynamicChart;
