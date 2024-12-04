"use client";


import React, { useEffect, useState } from "react";
import styles from "./timesheet-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import AllTimesheetsTable from "../all-timesheets-table/all-timesheets";
import PastDueTable from "../past-due-table/past-due-table";
import RejectedTimesheetsTable from "../rejected-timesheets-table/rejected-timesheets-table";
import DateRangePicker from "@/themes/components/date-picker/date-picker";

import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import {
  fetchTimesheets,
  TimesheetDataTable,
} from "../../services/time-sheet-services";

const TimesheetsTabs = () => {
  const [loading, setLoadig] = useState(true);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [timeSheetData, setTimeSheetdata] = useState<TimesheetDataTable[]>([]);
  const [pastDueCount, setPastDueCount] = useState<number>(10);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    fetchTimesheets(
      setTimeSheetdata,
      startDate?.toISOString(),
      endDate?.toISOString()
    );
    setLoadig(false);
    console.log("setLoad");
  }, [startDate, endDate]);

  const tabs = [
    {
      key: "1",
      label: <>All Timesheets</>,
      content: (
        <AllTimesheetsTable
          timesheetData={timeSheetData}
          setTimeSheetData={setTimeSheetdata}
        />
      ),
    },
    {
      key: "2",
      label: (
        <>
          Past due <span className={styles.count}>{pastDueCount}</span>
        </>
      ),
      content: <PastDueTable />,
    },
    {
      key: "3",
      label: (
        <>
          Approved <span className={styles.count}>{pastDueCount}</span>
        </>
      ),
      content: <PastDueTable />,
    },
    {
      key: "4",
      label: (
        <>
          Rejected <span className={styles.count}>{pastDueCount}</span>
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
            subHeading={<DateRangePicker onDateChange={handleDateChange} />}
          />
        </div>
      )}
    </div>
  );
};

export default TimesheetsTabs;
