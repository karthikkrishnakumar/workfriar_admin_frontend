"use client";
import React, { useEffect, useState } from "react";
import styles from "./approved-overdue-table.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import {
  OverViewTable,
  TimesheetDataTable,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ApprovedTimesheetsTable from "./approved-timesheet-table/approved-timesheet-table";
import { fetchApprovedTimesheets, fetchApprovedWeeks } from "../../services/time-sheet-services";

/**
 * Props for the ApprovedOverviewTable component.
 */
interface PastDueOverviewProps {
  /**
   * Optional prop to pass in table data for the overview.
   * @default []
   */
  tableData?: OverViewTable[];
}

/**
 * Displays an overview table of approved timesheets with options to view detailed timesheet data.
 * 
 * @param {PastDueOverviewProps} props - The component's props
 * @returns {JSX.Element} The rendered overview table or detailed view based on user interaction
 */
const ApprovedOverviewTable: React.FC<PastDueOverviewProps> = ({
  tableData = [],
}) => {
  const [table, setTable] = useState<OverViewTable[]>(tableData);
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>([]);
  const [showDetailedView, setShowDetailedView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dates, setDates] = useState<WeekDaysData[]>([]);

  /**
   * Defines the columns for the overview table.
   */
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
   * Fetches approved timesheets data for the given date range and sets the state for detailed view.
   * 
   * @param {string} dateRange - The date range for fetching the timesheet data
   */
  const handleFetchTimesheets = (dateRange: string) => {
    setShowDetailedView(true);
    setLoading(true);
    fetchApprovedTimesheets(dateRange, setTimesheetTable, setDates, setLoading);
  };

  /**
   * Handles returning to the overview table from the detailed view.
   */
  const handleBackToOverview = () => {
    setShowDetailedView(false);
  };

  /**
   * Maps the data from the overview table and structures it for display.
   * 
   * @returns {Array<object>} An array of data objects representing each row in the overview table
   */
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
          handleFetchTimesheets(element.dateRange);
        }}
      >
        Details
      </span>
    ),
  }));

  /**
   * Fetches approved weeks (overview data) on initial load.
   */
  useEffect(() => {
    setLoading(true);
    fetchApprovedWeeks(setTable, setLoading);
  }, []);

  return (
    <div className={styles.pastOverDueTableWrapper}>
      {showDetailedView ? loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <ApprovedTimesheetsTable 
          timesheetData={timeSheetTable} 
          setTimeSheetData={setTimesheetTable} 
          daysOfWeek={dates} 
          backButtonFunction={handleBackToOverview}
        />
      ) : loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <CustomTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default ApprovedOverviewTable;
