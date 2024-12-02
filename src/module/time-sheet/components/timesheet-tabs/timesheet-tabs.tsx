"use client";

import React, { useState } from "react";
import styles from "./timesheet-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import AllTimesheetsTable from "../all-timesheets-table/all-timesheets";
import PastDueTable from "../past-due-table/past-due-table";
import RejectedTimesheetsTable from "../rejected-timesheets-table/rejected-timesheets-table";
import DateRangePicker from "@/themes/components/date-picker/date-picker";

const TimesheetsTabs = () => {
  const tabs = [
    { key: "1", label: "All timesheets", content: <AllTimesheetsTable /> },
    { key: "2", label: "Past due", content: <PastDueTable /> },
    {
      key: "3",
      label: "Rejected timesheet",
      content: <RejectedTimesheetsTable />,
    },
  ];

  const [date,setDate] = useState<Date>();
  return (
    <div className={styles.timesheetTabsWrapper}>
      <div>
        <TabComponent headings={tabs} subHeading={<DateRangePicker onDateChange={setDate} />} />
      </div>
    </div>
  );
};

export default TimesheetsTabs;
