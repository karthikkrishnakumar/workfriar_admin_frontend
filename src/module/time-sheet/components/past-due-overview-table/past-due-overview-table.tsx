"use client";
import React, { useEffect, useState } from "react";
import styles from "./past-due-overview-table.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import {
  OverViewTable,
  TimeEntry,
  TimesheetDataTable,
  WeekDateEntry,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import PastDueTimesheetsTable from "./past-due-timesheet-table/past-due-timesheet-table";
import UseAllTimesheetsServices from "../../services/all-timesheet-services/all-time-sheet-services";
import {
  dateStringToMonthDate,
  isoTOenGB,
} from "@/utils/date-formatter-util/date-formatter";



/**
 * PastDueOverviewTable component displays an overview of past due timesheets.
 * It fetches and displays data in a table format and allows users to view detailed timesheet information.
 *
 * @component
 * @example
 * // Usage example:
 * @returns {React.ReactElement} The rendered component.
 */
const PastDueOverviewTable = () => {
  const [table, setTable] = useState<OverViewTable[]>([]);
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>(
    []
  );
  const [showDetailedView, setShowDetailedView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dates, setDates] = useState<WeekDaysData[]>([]);

  /**
   * Fetches past due weeks data and sets the table state.
   */
  const fetchOverViewTable = async () => {
    try {
      const response = await UseAllTimesheetsServices().fetchPastDueWeeks();
      setTable(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };


  /**
   * Fetches timesheet data for a specific date range.
   * @param {string} dateRange - The date range for which to fetch timesheet data.
   */
  const handleFetchTimesheets = async (startDate: string, endDate: string) => {
    setShowDetailedView(true);
    setLoading(true);
    const response = await UseAllTimesheetsServices().fetchPastDueTimesheets(
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
   * Effect hook to fetch past due weeks data on component mount.
   */
  useEffect(() => {
    setLoading(true);
    fetchOverViewTable();
  }, []);

  /**
   * Toggles back to the overview table from the detailed view.
   */
  const handleBackToOverview = () => {
    setShowDetailedView(false);
  };

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
   * Transforms the overview table data into a format suitable for the table component.
   * @returns {Array<Object>} The transformed data for the table.
   */
  const data = table?.map((element) => ({
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
        onClick={() => {
          handleFetchTimesheets(element.startDate, element.endDate);
        }}
      >
        Details
      </span>
    ),
  }));

  

  return (
    <div className={styles.pastOverDueTableWrapper}>
      {showDetailedView ? (
        loading ? (
          <SkeletonLoader
            paragraph={{ rows: 15 }}
            classNameItem={styles.customSkeleton}
          />
        ) : (
          <PastDueTimesheetsTable
            timesheetData={timeSheetTable}
            setTimeSheetData={setTimesheetTable}
            daysOfWeek={dates}
            backButtonFunction={handleBackToOverview}
          />
        )
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
