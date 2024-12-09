"use client";

import React, { useEffect, useState } from "react";
import TabComponent from "@/themes/components/tabs/tabs";
import DateRangePicker from "@/themes/components/date-picker/date-picker";

import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

import styles from './review-tabs.module.scss';
import { TimesheetDataTable, WeekDaysData } from "@/module/time-sheet/services/time-sheet-services";
import AllTimesheetsTable from "@/module/time-sheet/components/all-timesheets-table/all-timesheets";
import PastDueOverviewTable from "@/module/time-sheet/components/past-due-overview-table/past-due-overview-table";
import ApprovedOverviewTable from "@/module/time-sheet/components/approved-overview-table/approved-overview-table";
import RejectedOverviewTable from "@/module/time-sheet/components/rejected-overview-table/rejected-overview-table";

const ReviewTabs = () => {

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
  const [activeTabKey, setActiveTabKey] = useState<string>("1"); // State to track active tab

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

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
      content: <ApprovedOverviewTable />,
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
      content: <RejectedOverviewTable />,
    },
  ];
  return (
    <div>
      <TabComponent headings={tabs} />
    </div>
  )
}

export default ReviewTabs;
