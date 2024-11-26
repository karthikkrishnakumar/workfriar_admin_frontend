"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./project-time-chart.module.scss";

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
  loading: Boolean;
}

const ProjectTimeChart: React.FC<ProjectTimeChartProps> = ({
  data,
  loading,
}) => {
  // State for storing fetched data, loading status, and chart options

  const [options, setOptions] = useState<any | undefined>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleData, setVisibleData] = useState<{
    labels: string[];
    values: number[];
  }>({ labels: [], values: [] });

  const ITEMS_TO_SHOW = 6; // Define the number of items to display at a time

  // Refs for custom scrollbar
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);

  // States for controlling the scrollbar drag interaction
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fetch data from the backend API on component mount
  useEffect(() => {
    // Set chart options for appearance and behavior
    const newOptions = {
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
          grid: {
            display: true,
            drawOnChartArea: false,
            drawTicks: true,
            borderColor: "#6A6A6D",
            borderWidth: 1,
            lineWidth: 1,
            tickLength: 10,
            tickColor: "#6A6A6D",
            borderDash: [6, 6],
            position: "bottom",
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
          grid: {
            color: "#FFF",
            display: true,
            drawBorder: false,
          },
          border: {
            color: "#FFF",
          },
          ticks: {
            color: "#6A6A6D",
            font: { size: 12 },
            callback: (value: number) => `${value} hr`,
          },
        },
      },
      animation: {
        duration: 800,
      },
    };

    setOptions(newOptions);
  }, []);

  // Update visible data based on the current scroll position
  useEffect(() => {
    if (data.length > 0) {
      updateVisibleData(scrollPosition);
    }
  }, [data, scrollPosition]);

  // Function to update visible data based on scroll position
  const updateVisibleData = (position: number) => {
    const startIndex = Math.floor(position * (data.length - ITEMS_TO_SHOW));
    const visibleItems = data.slice(startIndex, startIndex + ITEMS_TO_SHOW);

    setVisibleData({
      labels: visibleItems.map((item) => item.project),
      values: visibleItems.map((item) => item.hours),
    });
  };

  // Handle mouse events for scrollbar dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollTrackRef.current?.offsetLeft || 0));
    setScrollLeft(scrollPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollTrackRef.current || !scrollThumbRef.current)
      return;

    e.preventDefault();
    const x = e.pageX - scrollTrackRef.current.offsetLeft;
    const walk = x - startX;
    const scrollTrackWidth = scrollTrackRef.current.offsetWidth;
    const thumbWidth = scrollThumbRef.current.offsetWidth;

    let newPosition = scrollLeft + walk / (scrollTrackWidth - thumbWidth);
    newPosition = Math.max(0, Math.min(1, newPosition));

    setScrollPosition(newPosition);
  };

  // Cleanup event listeners when dragging ends
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

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

  // Calculate thumb width and position for custom scrollbar
  const thumbWidth = Math.max((ITEMS_TO_SHOW / data.length) * 100, 10);
  const thumbPosition = scrollPosition * (100 - thumbWidth);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrapper}>
        {/* Render the Bar chart */}
        <Bar data={chartData} options={options || null} />
      </div>

      <div className={styles.scrollTrackParentDiv}>
        {/* Render custom scrollbar if there are more items than the visible limit */}
        {data.length > ITEMS_TO_SHOW && (
          <div ref={scrollTrackRef} className={styles.scrollTrack}>
            <div
              ref={scrollThumbRef}
              className={styles.scrollThumb}
              style={{
                width: `${thumbWidth}%`,
                transform: `translateX(${thumbPosition}%)`,
              }}
              onMouseDown={handleMouseDown}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTimeChart;
