import React from "react";
import styles from "./dashboard.module.scss";
import ProjectTimeChartCard from "../project-time-component/project-time-chart-card/project-time-chart-card";
import TimeSheetDueCard from "../timesheet-due-component/timesheet-due-card/timesheet-due-card";
import TimesheetSnapshotChartCard from "../timesheet-snapshot-component/timesheet-chart-card/timesheet-chart-card";
import NotificationCard from "../notification-component/notification-card/notifcation-card";
import HolidayCard from "../holiday-component/holiday-card/holiday-card";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.leftMainDiv}>
        <ProjectTimeChartCard />
        <TimeSheetDueCard />
      </div>
      <div className={styles.rightMainDiv}>
        {/* Project Snapshot */}
        <TimesheetSnapshotChartCard />
        <div className={styles.additionalDiv}>
          {/* Notifications */}
          <NotificationCard />
          {/* Holidays */}
          <HolidayCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
