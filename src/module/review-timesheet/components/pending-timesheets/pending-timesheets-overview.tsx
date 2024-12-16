"use client";
import React, { useEffect, useState } from "react";
import styles from "./pending-timesheets-overview.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import { OverViewTable, TimesheetDataTable, WeekDaysData } from "@/interfaces/timesheets/timesheets";
import { fetchPendingTimesheets, fetchPendingWeeks } from "../../services/review-timesheet-services";
import PendingDetailedView from "./pending-timesheet-table/pending-detailed-view";

/**
 * `PendingOverviewTable` component is responsible for displaying an overview of pending timesheets.
 * It fetches data on component mount and allows users to view more detailed timesheet data upon selection.
 *
 * @component
 * @example
 * return <PendingOverviewTable />;
 */
interface PendingOverviewProps {
  tableData?: OverViewTable[]; // Optional data passed in from a parent component
}

const PendingOverviewTable: React.FC<PendingOverviewProps> = ({ tableData }) => {
  // States to hold various data and control UI flow
  const [table, setTable] = useState<OverViewTable[]>([]); // Holds the overview table data
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>([]); // Holds detailed timesheet data
  const [showDetailedView, setShowDetailedView] = useState<boolean>(false); // Flag to toggle between overview and detailed view
  const [loading, setLoading] = useState<boolean>(true); // Flag to indicate loading state
  const [dates, setDates] = useState<WeekDaysData[]>([]); // Holds the dates associated with the timesheets

  // Columns for the overview table
  const columns = [
    { title: "Time Period", key: "period", align: "left" as const },
    {
      title: "Time logged",
      key: "loggedTime",
      align: "left" as const,
    },
    { title: "Time Approved", key: "approvedTime", align: "left" as const },
    {
      title: "Actions",
      key: "action",
      align: "left" as const,
      width: 100,
    },
  ];

  /**
   * Fetches the detailed timesheet data based on the selected date range.
   * This function is triggered when the user clicks the "Details" button in the overview table.
   * 
   * @param {string} dateRange - The selected date range for fetching timesheet data
   */
  const handleFetchTimesheets = (dateRange: string) => {
    setShowDetailedView(true); // Switch to the detailed view
    setLoading(true); // Set loading state to true while fetching data
    fetchPendingTimesheets(dateRange, setTimesheetTable, setDates, setLoading); // Fetch the data using the service
  };

  /**
   * Resets the view back to the overview when the user clicks the "Back" button in the detailed view.
   */
  const handleBackToOverview = () => {
    setShowDetailedView(false); // Switch back to the overview table
  };

  // Mapping the overview data to fit the table structure
  const data = table.map((element) => ({
    period: <span className={styles.dataCell}>{element.dateRange}</span>,
    loggedTime: (
      <span className={styles.dataCell}>
        {element.loggedHours ? element.loggedHours : "--"} hr
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
        onClick={() => {
          handleFetchTimesheets(element.dateRange); // Trigger detailed view on click
        }}
      >
        Details
      </span>
    ),
  }));

  // Fetch the initial overview data on component mount
  useEffect(() => {
    setLoading(true); // Set loading state while fetching data
    fetchPendingWeeks(setTable, setLoading); // Fetch the weeks data for the overview table
  }, []);

  return (
    <div className={styles.pastOverDueTableWrapper}>
      {showDetailedView ? loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <PendingDetailedView timeSheetData={timeSheetTable} daysOfWeek={dates} backButtonFunction={handleBackToOverview}/>
        // Show the detailed view with the fetched timesheet data
      ) : loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <CustomTable columns={columns} data={data} />
        // Show the overview table with the fetched data
      )}
    </div>
  );
};

export default PendingOverviewTable;
