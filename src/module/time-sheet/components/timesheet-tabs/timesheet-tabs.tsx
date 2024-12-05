"use client";

import React, { useEffect, useState } from "react";
import styles from "./timesheet-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import AllTimesheetsTable from "../all-timesheets-table/all-timesheets";
import RejectedTimesheetsTable from "../rejected-timesheets-table/rejected-timesheets-table";
import DateRangePicker from "@/themes/components/date-picker/date-picker";

import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import {
  fetchDateData,
  fetchTimesheets,
  TimesheetDataTable,
  WeekDaysData,
} from "../../services/time-sheet-services";
import PastDueOverviewTable from "../past-due-overview-table/past-due-overview-table";

const TimesheetsTabs = () => {
  const [loading, setLoadig] = useState(true);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [timeSheetData, setTimeSheetdata] = useState<TimesheetDataTable[]>([]);
  const [pastDueCount, setPastDueCount] = useState<number>(1);
  const [approvedCount, setApprovedCount] = useState<number>(4);
  const [rejectedCount, setRejectedCount] = useState<number>(2);
  const [datePickerData, setDatePickerData] = useState<
    { start: string; end: string; week: number }[]
  >([]);
  const [dates, setDates] = useState<WeekDaysData[]>([]);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    fetchTimesheets(
      setTimeSheetdata,
      setDates,
      startDate?.toISOString(),
      endDate?.toISOString()
    );
    setLoadig(false);
  }, [startDate, endDate]);
  useEffect(() => {
    const fetchDatePicker = async () => {
      try {
        const DatePickerData = await fetchDateData();
        setDatePickerData(DatePickerData);
      } catch (error) {
        console.error("Error fetching date picker data:", error);
      }
    };

    fetchDatePicker();
  }, []);

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
            <p>{pastDueCount}</p>
          </span>
        </>
      ),
      content: <PastDueOverviewTable />,
    },
    {
      key: "3",
      label: (
        <>
          Approved{" "}
          <span>
            <p>{approvedCount}</p>
          </span>
        </>
      ),
      content: <RejectedTimesheetsTable />,
    },
    {
      key: "4",
      label: (
        <>
          Rejected{" "}
          <span>
            <p>{rejectedCount}</p>
          </span>
        </>
      ),
      content: <RejectedTimesheetsTable />,
    },
  ];

  return (
    <div className={styles.timesheetTabsWrapper}>
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
          <TabComponent
            headings={tabs}
            subHeading={
              <DateRangePicker
                datePickerData={datePickerData}
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
