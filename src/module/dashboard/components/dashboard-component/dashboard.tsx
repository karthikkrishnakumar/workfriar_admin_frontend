"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./dashboard.module.scss";
import CardSection from "../card-section/card-section";
import ButtonComponent from "@/themes/components/Button/Button";
import DateRangePicker from "@/themes/components/date-picker/date-picker";
import {
  DashboardData,
  DashboardService,
} from "../../services/dashboard-services/dashboard-services";
import ProjectTimeChart from "../project-time-chart/project-time-chart";
import Timesheet from "../timesheet-due/timesheet-due";
import { StatusGauge } from "../timesheet-snap-shot-chart/snap-shot-chart";

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
  const cardRef = useRef<HTMLDivElement>(null);

  // Type the state variables using the interfaces
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(2024, 9, 14)
  ); // Oct 14, 2024
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(2024, 9, 18));

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    console.log("Updated Dates:", { startDate, endDate });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DashboardService.fetchProjectTimeChart(
          selectedStartDate,
          selectedEndDate
        );
        setDashboardData(data);
      } catch (error) {
        setError("Error fetching dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedStartDate, selectedEndDate]);

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
          ref={cardRef}
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
          ref={cardRef}
          title="Timesheet due"
          topRightContent={
            <DateRangePicker
              initialStartDate={selectedStartDate}
              initialEndDate={selectedEndDate}
              onDateChange={handleDateChange}
            />
          }
          centerContent={
            <Timesheet
              data={dashboardData?.timesheetData || { days: [], total: "0" }}
            />
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
          ref={cardRef}
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
            ref={cardRef}
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
            ref={cardRef}
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
