import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Empty } from "antd";
import styles from "./snap-shot-chart.module.scss";

// Registering necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Defining the type for props
interface StatusGaugeProps {
  statusData: { status: string; count: number }[];
}

// StatusGauge component definition
export const StatusGauge: React.FC<StatusGaugeProps> = ({ statusData }) => {
  // Mapping statusData to match statuses array format
  const statuses = [
    { label: "Saved", value: 0, color: "#FFE3B8", colorClass: styles.saved },
    {
      label: "Approved",
      value: 0,
      color: "#FDB853",
      colorClass: styles.approved,
    },
    {
      label: "Rejected",
      value: 0,
      color: "#D4983F",
      colorClass: styles.rejected,
    },
  ];

  // Populate the statuses array based on statusData
  statusData.forEach((item) => {
    const match = statuses.find(
      (status) => status.label.toLowerCase() === item.status.toLowerCase()
    );
    if (match) {
      match.value = item.count;
    }
  });

  // Check if there is any non-zero value in statuses
  const isEmptyData =
    !statusData || statuses.every((status) => status.value === 0);

  // Generate chart data dynamically based on statuses
  const data = {
    datasets: [
      {
        data: statuses.map((status) => status.value),
        backgroundColor: statuses.map((status) => status.color),
        borderColor: statuses.map((status) => status.color),
        borderWidth: 1,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  // Chart options definition
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    cutout: "70%",
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.statusGauge}>
      <div className={styles.gaugeContainer}>
        {/* Render stats dynamically based on statuses */}
        <div className={styles.stats}>
          {statuses.map((status) => (
            <div
              key={status.label}
              className={`${styles.statItem} ${status.colorClass}`}
            >
              <span className={styles.label}>{status.label}</span>
              <span className={styles.value}>
                {status.value.toString().padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        {/* Chart rendering */}
       
          {isEmptyData ? (
            // Render empty illustration when no data is available
            <div className={styles.emptyWrapper}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Data Available" />
            </div>
          ) : (
            <div className={styles.chartWrapper}>
            <Doughnut
              className={styles.halfDonutChart}
              data={data}
              options={options}
            />
            </div>
          )}
        
      </div>
    </div>
  );
};
