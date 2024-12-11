"use client";

import React, { useEffect, useState } from "react";
import styles from "./overdue-timesheets.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import { OverViewTable } from "@/module/time-sheet/services/time-sheet-services";
import { fetchOverdueWeeks } from "../../services/review-timesheet-services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icons from "@/themes/images/icons/icons";

interface OverdueProps {
  tableData?: OverViewTable[];
}

const OverdueTable: React.FC<OverdueProps> = () => {
  const [table, setTable] = useState<OverViewTable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columns = [
    { title: "Time Period", key: "period", align: "left" as const },
    { title: "Time Logged", key: "loggedTime", align: "left" as const },
    { title: "Time Approved", key: "approvedTime", align: "left" as const },
    {
      title: "Actions",
      key: "action",
      align: "left" as const,
      width: 100,
    },
  ];

  const handleSendNotification = (dateRange: string) => {
    toast(<p className={styles.toastMessage}><span className={styles.tickMark}>{Icons.whiteTick}</span> Notification sent successfully</p>, {
      className: styles.customToast,
      bodyClassName: styles.customToastBody,
      hideProgressBar: true,
      closeButton:false,
      autoClose: 2000
    });
  };

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

  useEffect(() => {
    setLoading(true);
    fetchOverdueWeeks(setTable, setLoading);
  }, []);

  return (
    <div className={styles.pastOverDueTableWrapper}>
      <ToastContainer />
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
