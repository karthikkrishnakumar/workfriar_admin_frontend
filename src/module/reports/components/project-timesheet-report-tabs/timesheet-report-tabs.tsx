"use client";
import React, { useState } from "react";
import styles from "./timesheet-report-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs"; // Ensure this component is properly typed
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import TimesheetReport from "../timesheet-report/timesheet-report";
import Icons from "@/themes/images/icons/icons";
import TimeSheetReportFilter from "../timesheet-report-filter/timesheet-report-filter";

const TimeSheetReportTabs = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("project-summary");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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


  const handleClickFilter = () => {
    setIsModalVisible(true); // Open the modal when the filter button is clicked
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal when required
  };
  const handleYearChange = (year: number) => {
  
  };

  const handleMonthChange = (month: number) => {
   
  };

  return (
    <div className={styles.timesheetTabsWrapper}>
      {loading ? (
          <SkeletonLoader
            paragraph={{ rows: 2 }}
            classNameItem={styles.customSkeletonItem}
          />

      ) : (
        <TabComponent
          headings={tabs}
          onChange={handleTabChange}
          subHeading={
            <ButtonComponent
              label="Filter"
              className={styles.mixedGold}
              theme="mixed-gold"
              content={Icons.filter}
              onClick={handleClickFilter}
            />
          }
        />
      )}

    {isModalVisible && (
        <TimeSheetReportFilter
          onClose={handleCloseModal}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
        />
      )}
    </div>
  );
};

export default TimeSheetReportTabs;
