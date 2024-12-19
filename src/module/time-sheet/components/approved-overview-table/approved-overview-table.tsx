"use client";
import React, { useEffect, useState } from "react";
import styles from "./approved-overdue-table.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import {
  OverViewTable,
  TimesheetDataTable,
  WeekDateEntry,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ApprovedTimesheetsTable from "./approved-timesheet-table/approved-timesheet-table";
import UseAllTimesheetsServices from "../../services/all-timesheet-services/all-time-sheet-services";
import {
  dateStringToMonthDate,
  isoTOenGB,
} from "@/utils/date-formatter-util/date-formatter";

/**
 * Displays an overview table of approved timesheets with options to view detailed timesheet data.
 *
 * @returns {JSX.Element} The rendered overview table or detailed view based on user interaction
 */
const ApprovedOverviewTable = () => {
  const [table, setTable] = useState<OverViewTable[]>([]);
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>(
    []
  );
  const [showDetailedView, setShowDetailedView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dates, setDates] = useState<WeekDaysData[]>([]);

  /**
   * fetch overview table to show
   */
  const fetchOverViewTable = async () => {
    try {
      const response = await UseAllTimesheetsServices().fetchApprovedWeeks();
      console.log(response);
      setTable(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Fetches approved timesheets data for the given date range and sets the state for detailed view.
   *
   * @param {string} startDate - The date range for fetching the timesheet data
   * @param {string} endDate - The date range for fetching the timesheet data
   */
  const handleFetchTimesheets = async (startDate: string, endDate: string) => {
    setShowDetailedView(true);
    setLoading(true);
    const response = await UseAllTimesheetsServices().fetchApprovedTimesheets(
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
   * Handles returning to the overview table from the detailed view.
   */
  const handleBackToOverview = () => {
    setShowDetailedView(false);
  };

  /**
   * Fetches approved weeks (overview data) on initial load.
   */
  useEffect(() => {
    setLoading(true);
    fetchOverViewTable();
  }, []);

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
   * Maps the data from the overview table and structures it for display.
   *
   * @returns {Array<object>} An array of data objects representing each row in the overview table
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
          <ApprovedTimesheetsTable
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

export default ApprovedOverviewTable;
