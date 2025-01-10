"use client";
import React, { useState } from "react";
import styles from "./timesheet-report-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs"; // Ensure this component is properly typed
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import TimesheetReport from "../timesheet-report/timesheet-report";
import Icons from "@/themes/images/icons/icons";
import TimeSheetReportFilter from "../timesheet-report-filter/timesheet-report-filter";

export interface FilterFormData {
  startDate?: string | null;
  endDate?: string | null;
  projectIds: string[] | null;
  userIds: string[] | null;
  year?: string | null;
  month?: string | null;
}

const TimeSheetReportTabs = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("project_summary");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<FilterFormData>();

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const tabs = [
    {
      key: "project_summary",
      label: <>Project Summary</>,
      content: (
        <div>
          <TimesheetReport
            key={activeTab}
            activeTab={activeTab}
            filters={filterData}
          />{" "}
        </div>
      ),
    },
    {
      key: "project_detail",
      label: <>Project Details</>,
      content: (
        <div>
          <TimesheetReport
            key={activeTab}
            activeTab={activeTab}
            filters={filterData}
          />{" "}
        </div>
      ),
    },
    {
      key: "employee_summary",
      label: <>Employee Summary</>,
      content: (
        <div>
          <TimesheetReport
            key={activeTab}
            activeTab={activeTab}
            filters={filterData}
          />{" "}
        </div>
      ),
    },
    {
      key: "employee_detail",
      label: <>Employee Details</>,
      content: (
        <div>
          <TimesheetReport
            key={activeTab}
            activeTab={activeTab}
            filters={filterData}
          />{" "}
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

  const handleFilterApply = (filters: any) => {
    setFilterData(filters); // Update filter data
    setIsModalVisible(false); // Close the modal
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
          onFilterApply={handleFilterApply}
          appliedFilters={filterData}
        />
      )}
    </div>
  );
};

export default TimeSheetReportTabs;
