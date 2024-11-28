"use client";
import React, { useState, useEffect } from "react";
import styles from "./timesheet-due-card.module.scss";
import CardSection from "../../card-section/card-section";
import DateRangePicker from "@/themes/components/date-picker/date-picker";
import Timesheet from "../timesheet-due/timesheet-due";
import ButtonComponent from "@/themes/components/button/button";
import { TimesheetDueService } from "@/module/dashboard/services/timesheet-due-services/timesheet-due-services";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

const TimeSheetDueCard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleClickReview = () => {
    window.location.href = "/time-sheet";
  };

  // Fetch data whenever the selected dates change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TimesheetDueService.fetchTimesheetDueData(
          selectedStartDate,
          selectedEndDate
        );
        console.log(data);
        setDashboardData(data);
      } catch (error) {
        setError("Error fetching timesheet data.");
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchData();
  }, [selectedStartDate, selectedEndDate]);

  // Handle the date change from the DateRangePicker
  const handleDateChange = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    console.log("Updated Dates:", { startDate, endDate });
  };

  return (
    <CardSection
      title="Timesheet due"
      topRightContent={
        loading ? (
          <SkeletonLoader
            count={1}
            button={true}
          />
        ) :(
        <DateRangePicker
          initialStartDate={selectedStartDate ?? undefined}
          initialEndDate={selectedEndDate ?? undefined}
          onDateChange={handleDateChange}
        />
      )
      }
      centerContent={
        loading ? (
          <SkeletonLoader
            count={8}
            paragraph={{ rows: 3 }}
            className={styles.customSkeleton}
            classNameItem={styles.skeletonItem }
          />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <Timesheet
            data={dashboardData?.timesheetData || { days: [], total: "0" }}
          />
        )
      }
      bottomContent={
        loading ? (
          <SkeletonLoader
            count={2}
            button={true}
            className={styles.customSkeletonForButton}
          />
        ) : (
          <div>
            <ButtonComponent
              label="Review"
              theme="white"
              onClick={handleClickReview}
            />
            <ButtonComponent label="Submit" theme="black" />
          </div>
        )
      }
      className={styles.timesheetCard}
    />
  );
};

export default TimeSheetDueCard;
