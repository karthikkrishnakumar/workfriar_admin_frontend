"use client";
import React, { useEffect, useState } from "react";
import styles from "./approved-timesheet-overview.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import { OverViewTable, TimesheetDataTable, WeekDaysData } from "@/interfaces/timesheets/timesheets";
import ApprovedDetailedView from "./approved-timesheet-table/approved-detailed-view";
import { isoTOenGB } from "@/utils/date-formatter-util/date-formatter";

/**
 * Props for the ApprovedOverviewTable component.
 */
interface ApprovedOverviewProps {
  tableData?: OverViewTable[]; // Optional initial data for the overview table
}

/**
 * ApprovedOverviewTable component renders an overview of approved timesheets with options 
 * to view detailed information for specific time periods.
 */
const ApprovedOverviewTable: React.FC<ApprovedOverviewProps> = ({
  tableData,
}) => {
  const [table, setTable] = useState<OverViewTable[]>([]); // Stores the overview table data
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>([]); // Stores detailed timesheet data
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
   * Fetches detailed timesheet data for a specific date range and switches to the detailed view.
   * @param dateRange - The selected date range for which to fetch timesheet data
   */
  const handleFetchTimesheets = (startDate: string, endDate:string) => {
    setShowDetailedView(true);
    setLoading(true);
    // fetchApprovedTimesheets(dateRange, setTimesheetTable, setDates, setLoading);
  };

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
    period: <span className={styles.dataCell}>{isoTOenGB(element.startDate)}-{isoTOenGB(element.endDate)}</span>,
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
        onClick={() => handleFetchTimesheets(element.startDate, element.endDate)}
      >
        Details
      </span>
    ),
  }));

  /**
   * Fetches the approved weeks data when the component is mounted.
   */
  useEffect(() => {
    setLoading(true);
    // fetchApprovedWeeks(setTable, setLoading);
  }, []);

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
