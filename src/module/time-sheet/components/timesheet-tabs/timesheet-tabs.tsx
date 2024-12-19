"use client";

import React, { useEffect, useState } from "react";
import styles from "./timesheet-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import AllTimesheetsTable from "../all-timesheets-table/all-timesheets";
import DateRangePicker, {
  DatePickerData,
} from "@/themes/components/date-picker/date-picker";

import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import PastDueOverviewTable from "../past-due-overview-table/past-due-overview-table";
import RejectedOverviewTable from "../rejected-overview-table/rejected-overview-table";
import ApprovedOverviewTable from "../approved-overview-table/approved-overview-table";
import {
  TimesheetDataTable,
  WeekDateEntry,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import { fetchWeeks } from "@/module/review-timesheet/services/review-timesheet-services";
import UseAllTimesheetsServices from "../../services/all-timesheet-services/all-time-sheet-services";
import { dateStringToMonthDate } from "@/utils/date-formatter-util/date-formatter";
import { timesheetData } from "../../../../../public/test-data/timesheet-data";

/**
 * The TimesheetsTabs component displays a tabbed interface with different views of timesheet data.
 * It includes tabs for "All Timesheets", "Past Due", "Approved", and "Rejected".
 * Each tab shows a corresponding table of data, with the ability to filter by date range.
 *
 * @returns {JSX.Element} The rendered TimesheetsTabs component.
 */
const TimesheetsTabs = () => {
  const [loading, setLoadig] = useState(true); // State to handle loading state of the component
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeSheetData, setTimeSheetdata] = useState<
    TimesheetDataTable[] | undefined
  >([]); // Store timesheet data
  const [timesheetLoading, setTimesheetLoading] = useState<boolean>(true); // State to handle loading state of the timesheet data
  const [pastDueCount, setPastDueCount] = useState<number>(0); // Count of past due items
  const [approvedCount, setApprovedCount] = useState<number>(0); // Count of approved items
  const [rejectedCount, setRejectedCount] = useState<number>(0); // Count of rejected items
  const [datePickerData, setDatePickerData] = useState<
    { start: string; end: string; week: number }[]
  >([]); // Data for the date picker
  const [dates, setDates] = useState<WeekDaysData[] | undefined>([]); // Store week days data for the selected range
  const [activeTabKey, setActiveTabKey] = useState<string>("1"); // State to track active tab
  const [weeks, setWeeks] = useState<DatePickerData[]>([]);

  /**
   * Handles date range changes and updates state variables for filtering.
   * 

   * @param {string} startDate - The start date of the range
   * @param {string} endDate - The end date of the range
   */
  const handleDateChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  /**
   * Fetches timesheet data based on the current date range and updates the state.
   */
  const fetchAllTimesheet = async (startDate: string, endDate: string) => {
    setTimesheetLoading(true);
    try {
      const response = await UseAllTimesheetsServices().fetchAllTimesheets(
        startDate,
        endDate
      );

      console.log(response);

      setTimeSheetdata(response?.data);
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
      setTimesheetLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Fetches timesheet counts
   */
  const fetchTimeSheetsCount = async () => {
    try {
      const response = await UseAllTimesheetsServices().fetchTimesheetsCounts();
      setPastDueCount(response.data.totalSaved);
      setApprovedCount(response.data.totalApproved);
      setRejectedCount(response.data.totalRejected);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllTimesheet(startDate, endDate); // Fetch data when startDate and endDate change
    setLoadig(false); // Set loading to false after data is fetched
  }, [startDate, endDate]);

  /**
   * Fetches data for the date picker (though the actual fetch logic is not implemented).
   */
  useEffect(() => {
    fetchWeeks(setWeeks);
    fetchTimeSheetsCount();
  }, []);

  /**
   * Array of tab configurations for the TimesheetsTabs component.
   * Each tab contains a key, label, and content for the corresponding view.
   */
  const tabs = [
    {
      key: "1",
      label: <>All Timesheets</>,
      content: timesheetLoading ? (
        <SkeletonLoader
          paragraph={{ rows: 10 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <AllTimesheetsTable
          timesheetData={timeSheetData!}
          setTimeSheetData={setTimeSheetdata}
          daysOfWeek={dates!}
        />
      ),
    },
    {
      key: "2",
      label: (
        <>
          Past due{" "}
          <span>
            <p>{pastDueCount}</p> {/* Display past due count */}
          </span>
        </>
      ),
      content: <PastDueOverviewTable />, // Content for the Past Due tab
    },
    {
      key: "3",
      label: (
        <>
          Approved{" "}
          <span>
            <p>{approvedCount}</p> {/* Display approved count */}
          </span>
        </>
      ),
      content: <ApprovedOverviewTable />, // Content for the Approved tab
    },
    {
      key: "4",
      label: (
        <>
          Rejected{" "}
          <span>
            <p>{rejectedCount}</p> {/* Display rejected count */}
          </span>
        </>
      ),
      content: <RejectedOverviewTable />, // Content for the Rejected tab
    },
  ];

  return (
    <div className={styles.timesheetTabsWrapper}>
      {/* Render loading skeleton while data is being fetched */}
      {loading ? (
        <div>
          <SkeletonLoader
            paragraph={{ rows: 2 }}
            classNameItem={styles.customSkeleton}
          />
          <SkeletonLoader
            count={1}
            paragraph={{ rows: 15 }}
            classNameItem={styles.customSkeleton}
          />
        </div>
      ) : (
        <div>
          {/* Render the TabComponent with date range picker and tab content */}
          <TabComponent
            headings={tabs} // Pass the tabs array to TabComponent
            subHeading={
              <DateRangePicker
                weekData={weeks}
                onDateChange={handleDateChange}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default TimesheetsTabs;
