"use client";
import React, { useEffect, useState } from "react";
import styles from "./rejected-overview-table.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import {
  fetchRejectedTimesheets,
  fetchRejectedWeeks,
} from "../../services/time-sheet-services";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import RejectedTimesheetsTable from "./rejected-timesheet-table/rejected-timesheet-table";
import { OverViewTable, TimesheetDataTable, WeekDaysData } from "@/interfaces/timesheets/timesheets";

/**
 * Interface for the props passed to the ApprovedOverviewTable component.
 * 
 * @interface PastDueOverviewProps
 * @property {OverViewTable[]} [tableData] - Optional array of overview table data.
 */
interface PastDueOverviewProps {
  tableData?: OverViewTable[]; // Optional array of overview table data.
}

/**
 * ApprovedOverviewTable component displays an overview of rejected timesheets.
 * It shows a table with time periods, logged time, approved time, and actions to view detailed timesheet data.
 * 
 * @param {PastDueOverviewProps} props - The props for the component.
 * @returns {JSX.Element} The rendered ApprovedOverviewTable component.
 */
const ApprovedOverviewTable: React.FC<PastDueOverviewProps> = ({ tableData }) => {
  // State variables
  const [table, setTable] = useState<OverViewTable[]>([]); // Stores the overview table data.
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>([]); // Stores the detailed timesheet data.
  const [showDetailedView, setShowDetailedView] = useState<boolean>(false); // Flag to toggle between overview and detailed view.
  const [loading, setLoading] = useState<boolean>(true); // Loading state to display skeleton loader while fetching data.
  const [dates, setDates] = useState<WeekDaysData[]>([]); // Stores the weekdays data for the timesheet.

  // Table column definitions
  const columns = [
    { title: "Time Period", key: "period", align: "left" as const },
    { title: "Time logged", key: "loggedTime", align: "left" as const },
    { title: "Time Approved", key: "approvedTime", align: "left" as const },
    { title: "Actions", key: "action", align: "left" as const, width: 100 },
  ];

  /**
   * Fetches the rejected timesheet data based on the selected date range.
   * 
   * @param {string} dateRange - The date range selected for fetching timesheet data.
   */
  const handleFetchTimesheets = (dateRange: string) => {
    setShowDetailedView(true);
    setLoading(true);
    fetchRejectedTimesheets(dateRange, setTimesheetTable, setDates, setLoading);
  };

  /**
   * Handles the action to go back to the overview table.
   */
  const handleBackToOverview = () => {
    setShowDetailedView(false);
  };

  // Mapping the table data for rendering in the overview table
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

  // Effect hook to fetch the rejected weeks data on component mount
  useEffect(() => {
    setLoading(true);
    fetchRejectedWeeks(setTable, setLoading);
  }, []);

  return (
    <div className={styles.pastOverDueTableWrapper}>
      {showDetailedView ? loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <RejectedTimesheetsTable
          timesheetData={timeSheetTable}
          setTimeSheetData={setTimesheetTable}
          daysOfWeek={dates}
          backButtonFunction={handleBackToOverview}
        />
        // Detailed view table should be rendered here
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
