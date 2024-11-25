"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import CardSection from "../card-section/card-section";
import ButtonComponent from "@/themes/components/button/button";
import { StatusGauge } from "../timesheet-snap-shot-chart/snap-shot-chart";
import ProjectTimeChart from "../project-time-chart/project-time-chart";
import {
  DashboardData,
  DashboardService,
} from "../../services/dashboard-services/dashboard-services";
import Timesheet from "../timesheet-due/timesheet-due";

export interface TimesheetDay {
  date: string;
  hours: string;
  dayOfWeek: string;
}

export interface TimesheetData {
  days: TimesheetDay[];
  total: string;
}

const Dashboard: React.FC = () => {
  // Type the state variables using the interfaces
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const timesheetData: TimesheetData = {
    days: [
      { dayOfWeek: "MON", date: "14/10", hours: "07:30" },
      { dayOfWeek: "TUE", date: "15/10", hours: "08:00" },
      { dayOfWeek: "WED", date: "16/10", hours: "08:00" },
      { dayOfWeek: "THUR", date: "17/10", hours: "08:00" },
      { dayOfWeek: "FRI", date: "18/10", hours: "08:00" },
      { dayOfWeek: "SAT", date: "19/10", hours: "00:00" },
      { dayOfWeek: "SUN", date: "20/10", hours: "00:00" },
      { dayOfWeek: "TOTAL", date: "", hours: "35:30" },
    ],
    total: "35:30",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DashboardService.fetchProjectTimeChart();
        setDashboardData(data);
      } catch (error) {
        setError("Error fetching dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            <ProjectTimeChart
              data={dashboardData?.projectTimeChart ?? []}
              loading={loading}
            />
          }
          className={styles.projectChartCard}
        />

        {/* Timesheet Due */}
        <CardSection
          title="Timesheet due"
          topRightContent={<span>Oct 14 - Oct 18, 2024</span>}
          centerContent={<Timesheet data={timesheetData} />}
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
              <StatusGauge
                saved={dashboardData?.stats?.saved ?? 0}
                approved={dashboardData?.stats?.approved ?? 0}
                rejected={dashboardData?.stats?.rejected ?? 0}
              />
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
