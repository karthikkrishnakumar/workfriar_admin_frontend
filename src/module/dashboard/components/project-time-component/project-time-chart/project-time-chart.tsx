"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./project-time-chart.module.scss";
import CustomScrollbar from "@/themes/components/custom-scrollbar/custom-scrollbar";

// Register ChartJS components for chart rendering
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the shape of the data for the chart (project name and hours worked)
interface ChartData {
  project: string;
  hours: number;
}

interface ProjectTimeChartProps {
  data: ChartData[];
  loading: boolean;
}

const ProjectTimeChart: React.FC<ProjectTimeChartProps> = ({
  data,
  loading,
}) => {
  const ITEMS_TO_SHOW = 6; // Define the number of items to display at a time

  const [options, setOptions] = useState<ChartOptions<"bar"> | undefined>(
    undefined
  );
  const [visibleData, setVisibleData] = useState<{
    labels: string[];
    values: number[];
  }>({ labels: [], values: [] });

  // Fetch data from the backend API on component mount
  useEffect(() => {
    // Set chart options for appearance and behavior
    const newOptions: ChartOptions<"bar"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => `${context.formattedValue} hr`,
          },
        },
      },
      scales: {
        x: {
          type: "category",
          grid: {
            display: true,
            drawOnChartArea: false,
            drawTicks: true,
            lineWidth: 1,
            tickLength: 10,
            tickColor: "#6A6A6D",
          },
          border: {
            color: "#6A6A6D",
          },
          ticks: {
            color: "#6A6A6D",
            font: { size: 12 },
          },
        },
        y: {
          type: "linear",
          grid: {
            color: "#FFF",
            display: true,
          },
          border: {
            color: "#FFF",
          },
          ticks: {
            color: "#6A6A6D",
            font: { size: 12 },
            callback: (tickValue: number | string) => {
              if (typeof tickValue === "number") {
                return `${tickValue} hr`;
              }
              return tickValue;
            },
          },
        },
      },
      animation: {
        duration: 800,
      },
    };

    setOptions(newOptions);
  }, []);

  // Function to update visible data based on scroll position
  const updateVisibleData = useCallback((position: number) => {
    if (data.length > 0) {
      const startIndex = Math.floor(position * (data.length - ITEMS_TO_SHOW));
      const visibleItems = data.slice(startIndex, startIndex + ITEMS_TO_SHOW);

      setVisibleData({
        labels: visibleItems.map((item) => item.project),
        values: visibleItems.map((item) => item.hours),
      });
    }
  }, [data]);

  // Prepare chart data based on visible data
  const chartData = {
    labels: visibleData.labels,
    datasets: [
      {
        data: visibleData.values,
        backgroundColor: "#FDB853",
        hoverBackgroundColor: "#D4983F",
        borderRadius: 0,
        barPercentage: 0.4,
      },
    ],
  };

  // Show loading message if the data is still being fetched
  if (loading) {
    return <div className={styles.loader}>Loading chart data...</div>;
  }

  // Show a "no data" message if there is no data to display
  if (data.length === 0) {
    return <div className={styles.noData}>No data available to display</div>;
  }

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrapper}>
        {/* Render the Bar chart */}
        <Bar data={chartData} options={options ?? undefined} />
      </div>

      {/* Use the new CustomScrollbar component */}
      <CustomScrollbar
        totalItems={data.length} 
        visibleItemCount={ITEMS_TO_SHOW}
        onScrollPositionChange={updateVisibleData}
        className={styles.scrollTrackParentDiv}
        scrollTrackClassName={styles.customScrollTrack} // Track div
        scrollThumbClassName={styles.customScrollThumb} // Thumb button
      />
    </div>
  );
};

export default ProjectTimeChart;