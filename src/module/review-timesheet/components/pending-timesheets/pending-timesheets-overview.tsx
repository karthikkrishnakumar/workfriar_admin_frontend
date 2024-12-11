"use client";
import React, { useEffect, useState } from "react";
import styles from "./pending-timesheets-overview.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";

import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import { OverViewTable, TimesheetDataTable, WeekDaysData } from "@/module/time-sheet/services/time-sheet-services";
import { fetchPendingTimesheets, fetchPendingWeeks } from "../../services/review-timesheet-services";
import PendingDetailedView from "./pending-timesheet-table/pending-detailed-view";

interface PendingOverviewProps {
  tableData?: OverViewTable[];
}

const PendingOverviewTable: React.FC<PendingOverviewProps> = ({
  tableData,
}) => {
  const [table, setTable] = useState<OverViewTable[]>([]);
  const [timeSheetTable,setTimesheetTable] = useState<TimesheetDataTable[]>([]);
  const [showDetailedView, setShowDetailedView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dates, setDates] = useState<WeekDaysData[]>([]);

  const columns = [
    { title: "Time Period", key: "period", align: "left" as const },
    {
      title: "Time logged",
      key: "loggedTime",
      align: "left" as const,
    },
    { title: "Time Approved", key: "approvedTime", align: "left" as const },
    {
      title: "Actions",
      key: "action",
      align: "left" as const,
      width: 100,
    },
  ];

  const handleFetchTimesheets = (dateRange: string) => {
    setShowDetailedView(true);
    setLoading(true);
    fetchPendingTimesheets(dateRange,setTimesheetTable, setDates,setLoading);
  };

  const handleBackToOverview = () => {
    setShowDetailedView(false);
  }

  const data = table.map((element) => ({
    period: <span className={styles.dataCell}>{element.dateRange}</span>,
    loggedTime: (
      <span className={styles.dataCell}>
        {element.loggedHours ? element.loggedHours : "--"} hr
      </span>
    ),
    approvedTime: (
      <span className={styles.dataCell}>
        {element.approvedHours ? element.approvedHours : "--"} hr
      </span>
    ),
    action: (
      <span
        className={`${styles.dataCell} ${styles.actionDataCell}`}
        onClick={() => {
          handleFetchTimesheets(element.dateRange);
        }}
      >
        Details
      </span>
    ),
  }));

  useEffect(() => {
    setLoading(true);
    fetchPendingWeeks(setTable, setLoading);
  }, []);

  return (
    <div className={styles.pastOverDueTableWrapper}>
      {showDetailedView ? loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <PendingDetailedView timeSheetData={timeSheetTable} daysOfWeek={dates} backButtonFunction={handleBackToOverview}/>
        // detailed view table shhould be here
      ) : loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <CustomTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default PendingOverviewTable;
