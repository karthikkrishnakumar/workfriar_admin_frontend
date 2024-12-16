"use client";

import React, { useEffect, useState } from "react";
import styles from "./timesheet-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import AllTimesheetsTable from "../all-timesheets-table/all-timesheets";
import DateRangePicker from "@/themes/components/date-picker/date-picker";

import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import {
  fetchTimesheets
} from "../../services/time-sheet-services";
import PastDueOverviewTable from "../past-due-overview-table/past-due-overview-table";
import RejectedOverviewTable from "../rejected-overview-table/rejected-overview-table";
import ApprovedOverviewTable from "../approved-overview-table/approved-overview-table";
import { TimesheetDataTable, WeekDaysData } from "@/interfaces/timesheets/timesheets";

/**
 * The TimesheetsTabs component displays a tabbed interface with different views of timesheet data.
 * It includes tabs for "All Timesheets", "Past Due", "Approved", and "Rejected".
 * Each tab shows a corresponding table of data, with the ability to filter by date range.
 *
 * @returns {JSX.Element} The rendered TimesheetsTabs component.
 */
const TimesheetsTabs = () => {
  const [loading, setLoadig] = useState(true); // State to handle loading state of the component

  const [currentRange, setCurrentRange] = useState(""); // Date range for filtering timesheets
  const [prev, setPrev] = useState(false); // State to track if previous range should be displayed
  const [next, setNext] = useState(false); // State to track if next range should be displayed
  const [timeSheetData, setTimeSheetdata] = useState<TimesheetDataTable[]>([]); // Store timesheet data
  const [pastDueCount, setPastDueCount] = useState<number>(1); // Count of past due items
  const [approvedCount, setApprovedCount] = useState<number>(4); // Count of approved items
  const [rejectedCount, setRejectedCount] = useState<number>(2); // Count of rejected items
  const [datePickerData, setDatePickerData] = useState<{ start: string; end: string; week: number }[]>([]); // Data for the date picker
  const [dates, setDates] = useState<WeekDaysData[]>([]); // Store week days data for the selected range
  const [activeTabKey, setActiveTabKey] = useState<string>("1"); // State to track active tab

  /**
   * Handles date range changes and updates state variables for filtering.
   * 
   * @param {object} data - The new date range data
   * @param {string} data.startDate - The start date of the range
   * @param {string} data.endDate - The end date of the range
   * @param {boolean} data.prev - Whether the previous range should be displayed
   * @param {boolean} data.next - Whether the next range should be displayed
   */
  const handleDateChange = (data: {
    startDate: string;
    endDate: string;
    prev: boolean;
    next: boolean;
  }) => {
    setCurrentRange(`${data.startDate}-${data.endDate}`); // Update the date range
    setPrev(data.prev); // Update prev state
    setNext(data.next); // Update next state
  };

  /**
   * Fetches timesheet data based on the current date range and updates the state.
   */
  useEffect(() => {
    const parts = currentRange.split("-"); // Split the date range into start and end
    const startDate = parts.slice(0, 3).join("-"); // First part of the range
    const endDate = parts.slice(3, 6).join("-"); // Second part of the range

    fetchTimesheets(setTimeSheetdata, setDates, startDate, endDate); // Fetch data based on the range
    setLoadig(false); // Set loading to false after data is fetched
  }, [prev, next]);

  /**
   * Fetches data for the date picker (though the actual fetch logic is not implemented).
   */
  useEffect(() => {
    const fetchDatePicker = async () => {
      try {
        // You can implement fetching logic here
      } catch (error) {
        console.error("Error fetching date picker data:", error);
      }
    };

    fetchDatePicker(); // Fetch date picker data
  }, []);

  /**
   * Array of tab configurations for the TimesheetsTabs component.
   * Each tab contains a key, label, and content for the corresponding view.
   */
  const tabs = [
    {
      key: "1",
      label: <>All Timesheets</>,
      content: (
        <AllTimesheetsTable
          timesheetData={timeSheetData}
          setTimeSheetData={setTimeSheetdata}
          daysOfWeek={dates}
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
                range={currentRange} // Pass current date range
                onDateChange={handleDateChange} // Handle date change
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default TimesheetsTabs;
