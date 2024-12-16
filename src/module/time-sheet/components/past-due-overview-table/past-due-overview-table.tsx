"use client";
import React, { useEffect, useState } from "react";
import styles from "./past-due-overview-table.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import {
  OverViewTable,
  TimesheetDataTable,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import PastDueTimesheetsTable from "./past-due-timesheet-table/past-due-timesheet-table";
import { fetchPastDueTimesheets, fetchPastDueWeeks } from "../../services/time-sheet-services";

/**
 * Interface for the props of the PastDueOverviewTable component.
 * 
 * @interface PastDueOverviewProps
 * @property {OverViewTable[]} [tableData] - Optional array of overview table data. If passed, it will populate the table with preloaded data.
 */
interface PastDueOverviewProps {
  tableData?: OverViewTable[];
}

/**
 * PastDueOverviewTable component displays an overview of past due timesheets.
 * It fetches and displays data in a table format and allows users to view detailed timesheet information.
 * 
 * @component
 * @example
 * // Usage example:
 * <PastDueOverviewTable tableData={data} />
 * 
 * @param {PastDueOverviewProps} props - Component properties.
 * @returns {React.ReactElement} The rendered component.
 */
const PastDueOverviewTable: React.FC<PastDueOverviewProps> = ({
  tableData,
}) => {
  const [table, setTable] = useState<OverViewTable[]>([]);
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>([]);
  const [showDetailedView, setShowDetailedView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dates, setDates] = useState<WeekDaysData[]>([]);

  /**
   * Columns configuration for the overview table.
   * @type {Array<Object>}
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
   * Fetches timesheet data for a specific date range.
   * @param {string} dateRange - The date range for which to fetch timesheet data.
   */
  const handleFetchTimesheets = (dateRange: string) => {
    setShowDetailedView(true);
    setLoading(true);
    fetchPastDueTimesheets(dateRange, setTimesheetTable, setDates, setLoading);
  };

  /**
   * Toggles back to the overview table from the detailed view.
   */
  const handleBackToOverview = () => {
    setShowDetailedView(false);
  };

  /**
   * Transforms the overview table data into a format suitable for the table component.
   * @returns {Array<Object>} The transformed data for the table.
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
   * Effect hook to fetch past due weeks data on component mount.
   */
  useEffect(() => {
    setLoading(true);
    fetchPastDueWeeks(setTable, setLoading);
  }, []);

  return (
    <div className={styles.pastOverDueTableWrapper}>
      {showDetailedView ? loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <PastDueTimesheetsTable timesheetData={timeSheetTable} setTimeSheetData={setTimesheetTable} daysOfWeek={dates} backButtonFunction={handleBackToOverview}/>
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

export default PastDueOverviewTable;
