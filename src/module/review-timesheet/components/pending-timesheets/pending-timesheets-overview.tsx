"use client";
import React, { useEffect, useState } from "react";
import styles from "./pending-timesheets-overview.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import {
  OverViewTable,
  TimesheetDataTable,
  WeekDateEntry,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import PendingDetailedView from "./pending-timesheet-table/pending-detailed-view";
import { dateStringToMonthDate, isoTOenGB } from "@/utils/date-formatter-util/date-formatter";
import UseReviewTimesheetsServices from "../../services/review-timesheets-service";

/**
 * `PendingOverviewTable` component is responsible for displaying an overview of pending timesheets.
 * It fetches data on component mount and allows users to view more detailed timesheet data upon selection.
 *
 * @component
 * @example
 * return <PendingOverviewTable />;
 */
interface PendingOverviewProps {
  id:string;
}

const PendingOverviewTable: React.FC<PendingOverviewProps> = ({
  id
}) => {
  // States to hold various data and control UI flow
  const [table, setTable] = useState<OverViewTable[]>([]); // Holds the overview table data
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>(
    []
  ); // Holds detailed timesheet data
  const [showDetailedView, setShowDetailedView] = useState<boolean>(false); // Flag to toggle between overview and detailed view
  const [loading, setLoading] = useState<boolean>(true); // Flag to indicate loading state
  const [dates, setDates] = useState<WeekDaysData[]>([]); // Holds the dates associated with the timesheets


  /**
   * Fetches past due weeks data and sets the table state.
   */
  const fetchOverViewTable = async () => {
    try {
      const response = await UseReviewTimesheetsServices().fetchPendingWeeks(id);
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
      const response = await UseReviewTimesheetsServices().fetchPendingTimesheets(
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
   * Resets the view back to the overview when the user clicks the "Back" button in the detailed view.
   */
  const handleBackToOverview = () => {
    setShowDetailedView(false); // Switch back to the overview table
  };

  // Fetch the initial overview data on component mount.
  useEffect(() => {
    setLoading(true); // Set loading state while fetching data
    fetchOverViewTable(); // Fetch the data using the service
  }, []);

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

  // Mapping the overview data to fit the table structure
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
          handleFetchTimesheets(element.startDate, element.endDate); // Trigger detailed view on click
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
          <PendingDetailedView
            timeSheetData={timeSheetTable}
            daysOfWeek={dates}
            backButtonFunction={handleBackToOverview}
            setTimesheetData={setTimesheetTable}
          />
          // Show the detailed view with the fetched timesheet data
        )
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
