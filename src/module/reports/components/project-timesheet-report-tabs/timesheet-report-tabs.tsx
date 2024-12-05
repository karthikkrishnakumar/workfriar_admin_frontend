"use client";
import React, { useEffect, useState } from "react";
import styles from "./timesheet-report-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs"; // Ensure this component is properly typed
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import TimesheetReport from "../timesheet-report/timesheet-report";

const TimeSheetReportTabs = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("project-summary");
  setTimeout(() => {
    setLoading(false);
  }, 500);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const tabs = [
    {
      key: "project-summary",
      label: <>Project Summary</>,
      content: (
        <div>
          <TimesheetReport key={activeTab} activeTab={activeTab} />{" "}
        </div>
      ),
    },
    {
      key: "project-details",
      label: <>Project Details</>,
      content: (
        <div>
          <TimesheetReport key={activeTab} activeTab={activeTab} />{" "}
        </div>
      ),
    },
    {
      key: "employee-summary",
      label: <>Employee Summary</>,
      content: (
        <div>
          <TimesheetReport key={activeTab} activeTab={activeTab} />{" "}
        </div>
      ),
    },
    {
      key: "employee-details",
      label: <>Employee Details</>,
      content: (
        <div>
          <TimesheetReport key={activeTab} activeTab={activeTab} />{" "}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.timesheetTabsWrapper}>
      {loading ? (
        <>
          <SkeletonLoader
            paragraph={{ rows: 2 }}
            classNameItem={styles.customSkeleton}
          />
          <SkeletonLoader
            count={3}
            paragraph={{ rows: 5 }}
            classNameItem={styles.customSkeleton}
          />
        </>
      ) : (
        <TabComponent
          headings={tabs}
          onChange={handleTabChange}
          subHeading={
            <ButtonComponent
              label="Filter"
              className={styles.mixedGold}
              theme="mixed-gold"
            />
          }
        />
      )}
    </div>
  );
};

export default TimeSheetReportTabs;
