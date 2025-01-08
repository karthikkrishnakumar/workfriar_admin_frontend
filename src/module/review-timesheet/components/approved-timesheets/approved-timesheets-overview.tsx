"use client";
import React, { useEffect, useState } from "react";
import styles from "./approved-timesheet-overview.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import {
  OverViewTable,
  TimesheetDataTable,
  WeekDateEntry,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import ApprovedDetailedView from "./approved-timesheet-table/approved-detailed-view";
import { dateStringToMonthDate, isoTOenGB } from "@/utils/date-formatter-util/date-formatter";
import UseReviewTimesheetsServices from "../../services/review-timesheets-service";

/**
 * Props for the ApprovedOverviewTable component.
 */
interface ApprovedOverviewProps {
  id:string;
}

/**
 * ApprovedOverviewTable component renders an overview of approved timesheets with options
 * to view detailed information for specific time periods.
 */
const ApprovedOverviewTable: React.FC<ApprovedOverviewProps> = ({
  id
}) => {
  const [table, setTable] = useState<OverViewTable[]>([]); // Stores the overview table data
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>(
    []
  ); // Stores detailed timesheet data
  const [showDetailedView, setShowDetailedView] = useState<boolean>(false); // Toggles between overview and detailed view
  const [loading, setLoading] = useState<boolean>(true); // Tracks loading state for fetching data
  const [dates, setDates] = useState<WeekDaysData[]>([]); // Stores the week dates for detailed view

  /**
   * Column definitions for the overview table.
   */
  const columns = [
    { title: "Time Period", key: "period", align: "left" as const },
    { title: "Time logged", key: "loggedTime", align: "left" as const },
    { title: "Time Approved", key: "approvedTime", align: "left" as const },
    { title: "Actions", key: "action", align: "left" as const, width: 100 },
  ];

  /**
   * Fetches past due weeks data and sets the table state.
   */
  const fetchOverViewTable = async () => {
    try {
      const response = await UseReviewTimesheetsServices().fetchApprovedWeeks(
        id
      );
      setTable(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Fetches timesheet data for a specific date range.
   * @param {string} startDate - The date range for which to fetch timesheet data.
   * @param {string} endDate - The date range for which to fetch timesheet data.
   */
  const handleFetchTimesheets = async (startDate: string, endDate: string) => {
    setShowDetailedView(true);
    setLoading(true);
    const response = await UseReviewTimesheetsServices().fetchApprovedTimesheets(
      id,
      startDate,
      endDate
    );
    console.log(response);
    setTimesheetTable(response.data);
    const uniqueDates: WeekDaysData[] = (
      response.weekDates as Partial<WeekDateEntry>[]
    ).map((day) => ({
      name: day.day_of_week!,
      date: day.date!,
      isHoliday: day.is_holiday!,
      formattedDate: dateStringToMonthDate(day.date!),
      isDisabled: day.is_disable!,
    }));
    setDates(uniqueDates);
    setLoading(false);
  };


  /**
   * Fetches the approved weeks data when the component is mounted.
   */
  useEffect(() => {
    setLoading(true);
    fetchOverViewTable();
  }, []);

  /**
   * Handles the action to go back to the overview table from the detailed view.
   */
  const handleBackToOverview = () => {
    setShowDetailedView(false);
  };

  /**
   * Transforms the overview table data into a format suitable for rendering.
   */
  const data = table.map((element) => ({
    period: (
      <span className={styles.dataCell}>
        {isoTOenGB(element.startDate)}-{isoTOenGB(element.endDate)}
      </span>
    ),
    loggedTime: (
      <span className={styles.dataCell}>
        {element.totalHours ? element.totalHours : "--"} hr
      </span>
    ),
    approvedTime: (
      <span className={styles.dataCell}>
        {element.approvedHours ? element.approvedHours : "--"} hr
      </span>
    ),
    action: (
      <span
        className={`${styles.dataCell} ${styles.actionDataCell}`}
        onClick={() =>
          handleFetchTimesheets(element.startDate, element.endDate)
        }
      >
        Details
      </span>
    ),
  }));

  return (
    <div className={styles.pastOverDueTableWrapper}>
      {/* If detailed view is selected */}
      {showDetailedView ? (
        loading ? (
          // Show skeleton loader while data is loading
          <SkeletonLoader
            paragraph={{ rows: 15 }}
            classNameItem={styles.customSkeleton}
          />
        ) : (
          // Render the detailed view component with timesheet data
          <ApprovedDetailedView
            timeSheetData={timeSheetTable}
            daysOfWeek={dates}
            backButtonFunction={handleBackToOverview}
          />
        )
      ) : loading ? (
        // If in overview mode and data is loading, show skeleton loader
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        // Render the overview table with data
        <CustomTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default ApprovedOverviewTable;
