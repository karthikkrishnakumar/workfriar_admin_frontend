// components/Timesheet.tsx
import React from "react";
import styles from "./timesheet-due.module.scss";
import { Empty } from "antd";

// Define the TimesheetProps interface for the component's expected props
/**
 * Props for the Timesheet component
 *
 * @param data - The timesheet data, which contains information about the days and hours worked.
 */

interface TimesheetDataProps {
  data: TimesheetDue[] | []; // Array of days and their respective hours worked.
}

// Define types for TimesheetDay and TimesheetData
// types.ts
/**
 * Represents a single day's entry in the timesheet.
 *
 * @param date - The date of the day (e.g., "2024-11-26").
 * @param hours - The number of hours worked on that day (e.g., "8").
 * @param dayOfWeek - The name of the day (e.g., "Monday").
 * @param isDisable
 */
interface TimesheetDue {
  date: string; // The date of the day.
  hours: string; // The number of hours worked.
  dayOfWeek: string; // The day of the week (e.g., "Monday").
  isDisable: boolean; // Add this property
}

// The Timesheet component receives the 'data' prop and renders the timesheet grid
/**
 * Timesheet Component
 *
 * This component renders the timesheet, displaying the days of the week, dates, and hours worked.
 * It divides the days into two grids (first 4 days and last 4 days) for better layout.
 *
 * @param data - The timesheet data (days and hours worked).
 * @returns JSX.Element - The rendered timesheet grid.
 */

const Timesheet: React.FC<TimesheetDataProps> = ({ data }) => {
  const isEmptyData = !data ||data?.length === 0;

  return (
    <>
      {isEmptyData ? (
        // Render empty illustration when no data is available
        <div className={styles.emptyWrapper}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Timesheet due Available"
          />
        </div>
      ) : (
        <div className={styles.timesheet}>
          {/* Grid for first 4 days */}
          <div className={styles.grid}>
            {data?.slice(0, 4).map((day, index) => {
              // Determine if the date is empty
              const isMuted = day.isDisable;

              return (
                <div
                  key={index}
                  className={`${styles.day} ${isMuted ? styles.muted : ""}`}
                >
                  <div
                    className={`${styles.dayOfWeek} ${
                      isMuted ? styles.mutedDay : ""
                    }`}
                  >
                    {day.dayOfWeek}
                  </div>
                  <div
                    className={`${styles.date} ${
                      isMuted ? styles.mutedDate : ""
                    }`}
                  >
                    {day.date}
                  </div>
                  <div
                    className={`${styles.hours} ${
                      isMuted ? styles.mutedHour : ""
                    }`}
                  >
                    {day.hours}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grid for next 4 days */}
          <div className={styles.grid}>
            {data?.slice(4, 8).map((day, index) => {
              // Determine if the date is empty
              const isMuted = day.isDisable;

              return (
                <div
                  key={index}
                  className={`${styles.day} ${isMuted ? styles.muted : ""}`}
                >
                  <div
                    className={`${styles.dayOfWeek} ${
                      isMuted ? styles.mutedDay : ""
                    }`}
                  >
                    {day.dayOfWeek}
                  </div>
                  <div
                    className={`${styles.date} ${
                      isMuted ? styles.mutedDate : ""
                    }`}
                  >
                    {day.date}
                  </div>
                  <div
                    className={`${styles.hours} ${
                      isMuted ? styles.mutedHour : ""
                    }`}
                  >
                    {day.hours}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Timesheet;
