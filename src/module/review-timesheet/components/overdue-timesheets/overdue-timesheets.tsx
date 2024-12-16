"use client";

import React, { useEffect, useState } from "react";
import styles from "./overdue-timesheets.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import { fetchOverdueWeeks } from "../../services/review-timesheet-services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icons from "@/themes/images/icons/icons";
import { OverViewTable } from "@/interfaces/timesheets/timesheets";

/**
 * Props for the OverdueTable component.
 */
interface OverdueProps {
  tableData?: OverViewTable[]; // Optional initial data for the overdue table
}

/**
 * OverdueTable component renders a table of overdue timesheets with an option to notify users.
 */
const OverdueTable: React.FC<OverdueProps> = () => {
  const [table, setTable] = useState<OverViewTable[]>([]); // Holds the overdue table data
  const [loading, setLoading] = useState<boolean>(true); // Tracks loading state for fetching data

  /**
   * Column definitions for the overdue table.
   */
  const columns = [
    { title: "Time Period", key: "period", align: "left" as const },
    { title: "Time Logged", key: "loggedTime", align: "left" as const },
    { title: "Time Approved", key: "approvedTime", align: "left" as const },
    { title: "Actions", key: "action", align: "left" as const, width: 100 },
  ];

  /**
   * Handles the action to send a notification for a specific time period.
   * Displays a success toast message when the notification is sent.
   * @param dateRange - The selected date range for which to send a notification
   */
  const handleSendNotification = (dateRange: string) => {
    toast(
      <p className={styles.toastMessage}>
        <span className={styles.tickMark}>{Icons.whiteTick}</span> Notification sent successfully
      </p>,
      {
        className: styles.customToast,
        bodyClassName: styles.customToastBody,
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2000, // Toast disappears after 2 seconds
      }
    );
  };

  /**
   * Transforms the overdue table data into a format suitable for rendering.
   */
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
        onClick={() => handleSendNotification(element.dateRange)}
      >
        Notify
      </span>
    ),
  }));

  /**
   * Fetches the overdue timesheets data when the component is mounted.
   */
  useEffect(() => {
    setLoading(true);
    fetchOverdueWeeks(setTable, setLoading);
  }, []);

  return (
    <div className={styles.pastOverDueTableWrapper}>
      {/* Toast container to display notifications */}
      <ToastContainer />
      
      {/* Conditionally render skeleton loader or the table */}
      {loading ? (
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

export default OverdueTable;
