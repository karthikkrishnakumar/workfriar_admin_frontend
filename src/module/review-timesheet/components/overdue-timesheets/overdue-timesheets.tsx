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

export interface ExtendedOverViewTable extends OverViewTable {
  notified: boolean;
}

interface OverdueProps {
  id: string;
}

const OverdueTable: React.FC<OverdueProps> = ({ id }) => {
  const [table, setTable] = useState<ExtendedOverViewTable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rowLoading, setRowLoading] = useState<Record<string, boolean>>({}); // Track loading state for each row

  const handleSendNotification = async (startDate: string, endDate: string) => {
    const rowKey = `${startDate}-${endDate}`;
    setRowLoading((prev) => ({ ...prev, [rowKey]: true }));

    try {
      const response =
        await UseReviewTimesheetsServices().sentOverdueNotification(
          id,
          `${isoTOenGB(startDate)}-${isoTOenGB(endDate)}`
        );

      if (response.status) {
        toast(
          <p className={styles.toastMessage}>
            <span className={styles.tickMark}>{Icons.whiteTick}</span>{" "}
            Notification sent successfully
          </p>,
          {
            className: styles.customToast,
            bodyClassName: styles.customToastBody,
            hideProgressBar: true,
            closeButton: false,
            autoClose: 2000,
          }
        );

        // Update the state to mark the row as notified
        setTable((prevTable) =>
          prevTable.map((row) =>
            row.startDate === startDate && row.endDate === endDate
              ? { ...row, notified: true }
              : row
          )
        );
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setRowLoading((prev) => ({ ...prev, [rowKey]: false }));
    }
  };

  const fetchOverViewTable = async () => {
    try {
      const response = await UseReviewTimesheetsServices().fetchOverDueWeeks(
        id
      );
      setTable(
        response.data.map((item: OverViewTable) => ({
          ...item,
          notified: false,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchOverViewTable();
  }, []);

  const columns = [
    { title: "Time Period", key: "period", align: "left" as const },
    { title: "Time Logged", key: "loggedTime", align: "left" as const },
    { title: "Time Approved", key: "approvedTime", align: "left" as const },
    { title: "Actions", key: "action", align: "left" as const, width: 100 },
  ];

  const data = table.map((element) => {
    const rowKey = `${element.startDate}-${element.endDate}`;

    return {
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
        <>
          {rowLoading[rowKey] ? (
          <SkeletonLoader classNameItem={styles.customSkeleton}  width="60%" button />
          ) : (
            <button
              className={`${styles.dataCell} ${styles.actionDataCell} ${
                element.notified ? styles.disabled : ""
              }`}
              onClick={() =>
                !element.notified &&
                !rowLoading[rowKey] &&
                handleSendNotification(element.startDate, element.endDate)
              }
              disabled={element.notified || rowLoading[rowKey]} // Disable button if notified or loading
            >
              {element.notified ? "Notified" : "Notify"}
            </button>
          )}
        </>
      ),
    };
  });

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
