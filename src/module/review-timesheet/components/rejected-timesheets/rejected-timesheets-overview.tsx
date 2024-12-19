"use client";
import React, { useEffect, useState } from "react";
import styles from "./rejected-timesheets-overview.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import RejectedDetailedView from "./rejected-timesheet-table/rejected-detailed-view";
import { OverViewTable, TimesheetDataTable, WeekDaysData } from "@/interfaces/timesheets/timesheets";
import { isoTOenGB } from "@/utils/date-formatter-util/date-formatter";

// Interface for props that RejectedOverviewTable expects
interface RejectedOverviewProps {
  tableData?: OverViewTable[]; // Optional data for the overview table
}

const RejectedOverviewTable: React.FC<RejectedOverviewProps> = ({
  tableData, // Table data passed as prop (optional)
}) => {
  // State variables
  const [table, setTable] = useState<OverViewTable[]>([]); // Stores the overview table data
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>([]); // Stores detailed timesheet data
  const [showDetailedView, setShowDetailedView] = useState<boolean>(false); // Determines if detailed view is shown
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching data
  const [dates, setDates] = useState<WeekDaysData[]>([]); // Stores the week days data

  // Columns definition for the overview table
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

  // Fetch timesheet data for the selected date range
  const handleFetchTimesheets = (startDate: string,  endaDate:string) => {
    setShowDetailedView(true); // Show detailed view
    setLoading(true); // Set loading state to true while fetching
    // Fetch timesheet data and set the state
    // fetchRejectedTimesheets(dateRange, setTimesheetTable, setDates, setLoading);
  };

  // Handle the back button to return to the overview table
  const handleBackToOverview = () => {
    setShowDetailedView(false); // Hide the detailed view
  };

  // Map the data from the overview table to a format that can be displayed in the table
  const data = table.map((element) => ({
    period: <span className={styles.dataCell}>{isoTOenGB(element.startDate)}-{isoTOenGB(element.endDate)}</span>, // Date range for the period
    loggedTime: (
      <span className={styles.dataCell}>
        {element.totalHours? element.totalHours : "--"} hr
      </span>
    ), // Display logged hours or default "--" if not available
    approvedTime: (
      <span className={styles.dataCell}>
        {element.approvedHours ? element.approvedHours : "--"} hr
      </span>
    ), // Display approved hours or default "--" if not available
    action: (
      <span
        className={`${styles.dataCell} ${styles.actionDataCell}`}
        onClick={() => {
          handleFetchTimesheets(element.startDate,element.endDate); // Fetch detailed data on click
        }}
      >
        Details
      </span>
    ), // Action to view details
  }));

  // useEffect hook to fetch the rejected weeks on initial load
  useEffect(() => {
    setLoading(true); // Set loading state to true
    // Fetch rejected weeks and set the table data
    // fetchRejectedWeeks(setTable, setLoading);
  }, []);

  return (
    <div className={styles.pastOverDueTableWrapper}>
      {showDetailedView ? loading ? (
        // Display skeleton loader while fetching data
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        // Show detailed timesheet view once data is fetched
        <RejectedDetailedView timeSheetData={timeSheetTable} daysOfWeek={dates} backButtonFunction={handleBackToOverview} />
      ) : loading ? (
        // Display skeleton loader on initial load
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        // Show overview table with fetched data
        <CustomTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default RejectedOverviewTable;
