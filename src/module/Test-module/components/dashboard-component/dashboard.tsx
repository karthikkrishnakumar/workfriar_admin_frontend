import React from "react";
import styles from "./dashboard.module.scss";
import CardSection from "../card-section/card-section";
import DynamicChart from "../project-time-chart/project-time-chart";
import ButtonComponent from "@/themes/components/button/dfc";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.leftMainDiv}>
        {/* Project Time Today */}
        <CardSection
          title="Project time today"
          topRightContent={
            <ButtonComponent label={"Add Entry"} theme={"black"} />
          }
          centerContent={
            <DynamicChart />
          }
          className={styles.projectChartCard}
        />

        {/* Timesheet Due */}
        <CardSection
          title="Timesheet due"
          topRightContent={<span>Oct 14 - Oct 18, 2024</span>}
          centerContent={
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>UI/UX Design</td>
                  <td>10:00</td>
                </tr>
                <tr>
                  <td>Bug Analysis</td>
                  <td>08:00</td>
                </tr>
              </tbody>
            </table>
          }
          bottomContent={
            <div>
                <ButtonComponent label={"Review"} theme={"white"} />
                <ButtonComponent label={"Submit"} theme={"black"} />
            </div>
          
          }
          className={styles.timesheetCard}
        />
      </div>
      <div className={styles.rightMainDiv}>
        {/* Project Snapshot */}
        <CardSection
          title="Timesheet snapshot"
          centerContent={
            <div className={styles.donutChart}>
              <div className={styles.donut}></div>
            </div>
          }
          bottomContent={
            <div className={styles.snapshotDetails}>
              <div>Saved: 03</div>
              <div>Approved: 03</div>
              <div>Rejected: 03</div>
            </div>
          }
          className={styles.snapshotCard}
        />

        <div className={styles.additionalDiv}>
          {/* Notifications */}
          <CardSection
            title="Notifications"
            centerContent={
              <ul>
                <li>Your timesheet is due for last week.</li>
                <li>Your timesheet is approved by Maddy.</li>
              </ul>
            }
            className={styles.notificationCard}
          />

          {/* Holidays */}
          <CardSection
            title="Holidays"
            centerContent={
              <div className={styles.holidays}>
                <h3 className={styles.holidayTitle}>Diwali</h3>
                <p>Thu, 31 October, 2024</p>
              </div>
            }
            className={styles.holidaysCard}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
