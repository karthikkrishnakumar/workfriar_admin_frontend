import React from "react";
import styles from "./timesheet-view.module.scss";
import TimesheetsTabs from "../components/timesheet-tabs/timesheet-tabs";

const TImesheetViews = () => {
  return (
    <div className={styles.timesheetWrapper}>
      <TimesheetsTabs />
    </div>
  );
};

export default TImesheetViews;
