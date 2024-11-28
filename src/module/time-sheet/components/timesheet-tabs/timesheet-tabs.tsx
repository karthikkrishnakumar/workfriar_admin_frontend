"use client";

import React from "react";
import styles from "./timesheet-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import AllTimesheetsTable from "../all-timesheets-table/all-timesheets";
import PastDueTable from "../past-due-table/past-due-table";
import RejectedTimesheetsTable from "../rejected-timesheets-table/rejected-timesheets-table";

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
  return (
    <div className={styles.timesheetTabsWrapper}>
      <div>
        <TabComponent headings={tabs} />
        
      </div>
    </div>
  );
};

export default TimesheetsTabs;
