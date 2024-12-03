"use client";
import React, { useState, useEffect } from "react";
import styles from "./timesheet-due-card.module.scss";
import CardSection from "../../card-section/card-section";
import DateRangePicker from "@/themes/components/date-picker/date-picker";
import Timesheet from "../timesheet-due/timesheet-due";
import ButtonComponent from "@/themes/components/button/button";
import {
  TimesheetData,
  TimesheetDueServices,
} from "@/module/dashboard/services/timesheet-due-services/timesheet-due-services";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import TimeDueModal from "../../submit-timesheet-modal/submit-timesheet-modal";

const TimeSheetDueCard: React.FC = () => {
  const [timesheetDueData, setTimesheetDueData] =
    useState<TimesheetData | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<string>("0");

  const handleClickReview = () => {
    window.location.href = "/time-sheet";
  };

  // Fetch data whenever the selected dates change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: TimesheetData = await TimesheetDueServices(
          selectedStartDate,
          selectedEndDate
        );
        setTimesheetDueData(data);

        // Calculate the total time (hours) based on the new data
        const totalHours =
          data?.timesheetData?.days?.find(
            (item: any) => item.dayOfWeek === "TOTAL"
          )?.hours ?? "0";

        setTotalTime(totalHours); // Update totalTime state with the fetched data
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
  };

  const handleSubmitClick = () => {
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <CardSection
        title="Timesheet due"
        topRightContent={
          loading ? (
            <SkeletonLoader
              count={1}
              button={true}
              classNameItem={styles.customSkeletonDatepicker}
            />
          ) : (
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
              classNameItem={styles.skeletonItem}
            />
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : (
            <Timesheet data={timesheetDueData?.timesheetData!} />
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
              <ButtonComponent
                label="Submit"
                theme="black"
                onClick={handleSubmitClick}
              />
            </div>
          )
        }
        className={styles.timesheetCard}
      />

      {isModalVisible && (
        <TimeDueModal onClose={handleCloseModal} totalTime={totalTime} />
      )}
    </>
  );
};

export default TimeSheetDueCard;
