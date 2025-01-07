"use client";

import React, { useEffect, useState } from "react";
import styles from "./overdue-timesheets.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icons from "@/themes/images/icons/icons";
import { OverViewTable } from "@/interfaces/timesheets/timesheets";
import { isoTOenGB } from "@/utils/date-formatter-util/date-formatter";
import UseReviewTimesheetsServices from "../../services/review-timesheets-service";

/**
 * Props for the OverdueTable component.
 */
interface OverdueProps {
  id: string;
}

/**
 * OverdueTable component renders a table of overdue timesheets with an option to notify users.
 */
const OverdueTable: React.FC<OverdueProps> = ({ id }) => {
  const [table, setTable] = useState<OverViewTable[]>([]); // Holds the overdue table data
  const [loading, setLoading] = useState<boolean>(true); // Tracks loading state for fetching data

  /**
   * Handles the action to send a notification for a specific time period.
   * Displays a success toast message when the notification is sent.
   * @param startDate- The selected date range for which to send a notification
   * @param endDate - The selected date range for which to send a notification
   */
  const handleSendNotification = (dateRange: string, endDate: string) => {
    toast(
      <p className={styles.toastMessage}>
        <span className={styles.tickMark}>{Icons.whiteTick}</span> Notification
        sent successfully
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
   * Fetches past due weeks data and sets the table state.
   */
  const fetchOverViewTable = async () => {
    try {
      const response = await UseReviewTimesheetsServices().fetchOverDueWeeks(
        id
      );
      setTable(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Fetches the overdue timesheets data when the component is mounted.
   */
  useEffect(() => {
    setLoading(true);
    fetchOverViewTable();
  }, []);

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
   * Transforms the overdue table data into a format suitable for rendering.
   */
  const data = table.map((element) => ({
    period: (
      <span className={styles.dataCell}>
        {isoTOenGB(element.startDate)}-{isoTOenGB(element.endDate)}
      </span>
    ),
    loggedTime: (
      <span className={styles.dataCell}>
        {element.totalHours ? element.totalHours : "--"} hr
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
        onClick={() =>
          handleSendNotification(element.startDate, element.endDate)
        }
      >
        Notify
      </span>
    ),
  }));

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
