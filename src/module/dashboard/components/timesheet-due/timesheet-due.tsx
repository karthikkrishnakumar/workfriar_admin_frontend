// components/Timesheet.tsx
import React from "react";
import styles from "./timesheet-due.module.scss";

interface TimesheetProps {
  data: TimesheetData;
}
// types.ts
interface TimesheetDay {
  date: string;
  hours: string;
  dayOfWeek: string;
}

interface TimesheetData {
  days: TimesheetDay[];
  total?: string;
}

const Timesheet: React.FC<TimesheetProps> = ({ data }) => {
  return (
    <div className={styles.timesheet}>
      <div className={styles.grid}>
        {data.days.slice(0, 4).map((day, index) => (
          <div key={index} className={styles.day}>
            <div className={styles.dayOfWeek}>{day.dayOfWeek}</div>
            <div className={styles.date}>{day.date}</div>
            <div className={styles.hours}>{day.hours}</div>
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        {data.days.slice(4, 8).map((day, index) => (
          <div key={index} className={styles.day}>
            <div className={styles.dayOfWeek}>{day.dayOfWeek}</div>
            <div className={styles.date}>{day.date}</div>
            <div className={styles.hours}>{day.hours}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timesheet;
