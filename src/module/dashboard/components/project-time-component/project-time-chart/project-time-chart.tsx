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
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Empty } from "antd";
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

interface VisibleData {
  tooltips: string[]; // Tooltip content as an array of strings
  labels: string[]; // Labels for the chart (project names)
  values: number[]; // Numeric values for the chart (hours in decimal)
}

// Define the structure for a single dataset in the chart
interface Dataset {
  data: number[]; // Data values for the chart
  backgroundColor: string; // Bar color
  hoverBackgroundColor?: string; // Optional hover color
  tooltips?: string[]; // Tooltip data (not a native Chart.js property, but used here)
  borderRadius?: number; // Optional bar border radius
  barPercentage?: number; // Optional bar percentage for width control
}

// Define the shape of the data for the chart (project name and hours worked)
interface ChartData {
  project_name: string;
  hours: string;
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
  const [visibleData, setVisibleData] = useState<VisibleData>({
    labels: [],
    values: [],
    tooltips: [],
  });

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
            label: (context: TooltipItem<"bar">) =>
              `${context.raw} hr (${visibleData.tooltips[context.dataIndex!]})`,
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

  const parseHoursToDecimal = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };
  // Function to update visible data based on scroll position
  const updateVisibleData = useCallback(
    (position: number) => {
      if (data.length > 0) {
        const startIndex = Math.floor(position * (data.length - ITEMS_TO_SHOW));
        const visibleItems = data.slice(startIndex, startIndex + ITEMS_TO_SHOW);

        setVisibleData({
          labels: visibleItems.map((item) => item.project_name),
          values: visibleItems.map((item) => parseHoursToDecimal(item.hours)),
          tooltips: visibleItems.map((item) => item.hours), // Keep original time for tooltips
        });
      }
    },
    [data]
  );

  // Prepare chart data based on visible data
  const chartData = {
    labels: visibleData.labels,
    datasets: [
      {
        data: visibleData.values,
        backgroundColor: "#FDB853",
        hoverBackgroundColor: "#D4983F",
        tooltips: visibleData.tooltips, // Include tooltips in dataset
        borderRadius: 0,
        barPercentage: Math.max(visibleData.values.length / 10),
      },
    ],
  };

  // Show loading message if the data is still being fetched
  if (loading) {
    return <div className={styles.loader}>Loading chart data...</div>;
  }

  if ( !data ||data?.length === 0) {
    return (
      <div className={styles.noData}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No project data available"
        />
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <div
        className={
          data?.length < 6 ? `${styles.smallChart}` : styles.chartWrapper
        }
      >
        {/* Render the Bar chart */}
        <Bar data={chartData} options={options ?? undefined} />
      </div>

      <CustomScrollbar
        totalItems={data?.length}
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
