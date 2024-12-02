// components/Timesheet.tsx
import React from "react";
import styles from "./timesheet-due.module.scss";

// Define the TimesheetProps interface for the component's expected props
/**
 * Props for the Timesheet component
 *
 * @param data - The timesheet data, which contains information about the days and hours worked.
 */
interface TimesheetProps {
  data: TimesheetData; // The timesheet data containing an array of days and hours worked.
}

// Define types for TimesheetDay and TimesheetData
// types.ts
/**
 * Represents a single day's entry in the timesheet.
 *
 * @param date - The date of the day (e.g., "2024-11-26").
 * @param hours - The number of hours worked on that day (e.g., "8").
 * @param dayOfWeek - The name of the day (e.g., "Monday").
 * @param disable
 */
interface TimesheetDay {
  date: string; // The date of the day.
  hours: string; // The number of hours worked.
  dayOfWeek: string; // The day of the week (e.g., "Monday").
  disable: boolean; // Add this property
}

/**
 * Represents the overall timesheet data.
 *
 * @param days - An array of TimesheetDay objects representing each day's data.
 * @param total - An optional field for the total number of hours worked (e.g., "40").
 */
interface TimesheetData {
  days: TimesheetDay[] | []; // Array of days and their respective hours worked.
  total?: string; // Optional total hours worked, can be left undefined.
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

const Timesheet: React.FC<TimesheetProps> = ({ data }) => {
  return (
    <div className={styles.timesheet}>
      {/* Grid for first 4 days */}
      <div className={styles.grid}>
        {data.days.slice(0, 4).map((day, index) => {
          // Determine if the date is empty
          const isMuted = day.disable;

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
                className={`${styles.date} ${isMuted ? styles.mutedDate : ""}`}
              >
                {day.date}
              </div>
              <div
                className={`${styles.hours} ${isMuted ? styles.mutedHour : ""}`}
              >
                {day.hours}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid for next 4 days */}
      <div className={styles.grid}>
        {data.days.slice(4, 8).map((day, index) => {
          // Determine if the date is empty
          const isMuted =day.disable;

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
                className={`${styles.date} ${isMuted ? styles.mutedDate : ""}`}
              >
                {day.date}
              </div>
              <div
                className={`${styles.hours} ${isMuted ? styles.mutedHour : ""}`}
              >
                {day.hours}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timesheet;
