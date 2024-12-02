import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./snap-shot-chart.module.scss";

// Registering necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Defining the type for props
/**
 * @param {number} saved - The number of saved items.
 * @param {number} approved - The number of approved items.
 * @param {number} rejected - The number of rejected items.
 */
interface StatusGaugeProps {
  saved: number;
  approved: number;
  rejected: number;
}

// StatusGauge component definition
/**
 *
 * @param {StatusGaugeProps} props - The props passed to the component, which includes `saved`, `approved`, and `rejected` values.
 */

// StatusGauge component definition
export const StatusGauge: React.FC<StatusGaugeProps> = ({
  saved,
  approved,
  rejected,
}) => {
  // Array for statuses with dynamic values and associated classes
  const statuses = [
    { label: "Saved", value: saved, colorClass: styles.saved },
    { label: "Approved", value: approved, colorClass: styles.approved },
    { label: "Rejected", value: rejected, colorClass: styles.rejected },
  ];

  // Generating chart data dynamically based on statuses
  const data = {
    datasets: [
      {
        data: statuses.map((status) => status.value),
        backgroundColor: statuses.map((status) => {
          switch (status.label) {
            case "Saved":
              return "#FFE3B8";
            case "Approved":
              return "#FDB853";
            case "Rejected":
              return "#D4983F";
            default:
              return "#000";
          }
        }),
        borderColor: statuses.map((status) => {
          switch (status.label) {
            case "Saved":
              return "#FFE3B8";
            case "Approved":
              return "#FDB853";
            case "Rejected":
              return "#D4983F";
            default:
              return "#000";
          }
        }),
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
                {status.value.toString().padStart(2, "0")}{" "}
                {/* Format value with padding */}
              </span>
            </div>
          ))}
        </div>

        {/* Chart rendering */}
        <div className={styles.chartWrapper}>
          <Doughnut
            className={styles.halfDonutChart}
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};
