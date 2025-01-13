// components/status-tag/status-tag.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import styles from "./status-tag.module.scss";

const StatusTag: React.FC = () => {
  // Read the status from the Redux store
  const status = useSelector((state: RootState) => state.timesheet.status);
  // Determine the styles and display value based on the status
  const { statusClass, statusValue } = (() => {
    switch (status) {
      case "saved":
        return { statusClass: styles.saved, statusValue: "Not Submitted" };
      case "submitted":
        return { statusClass: styles.submitted, statusValue: "Submitted" };
      case "accepted":
        return { statusClass: styles.approved, statusValue: "Approved" };
      case "rejected":
        return { statusClass: styles.rejected, statusValue: "Rejected" };
      default:
        return { statusClass: styles.default, statusValue: "Unknown" };
    }
  })();

  return (
    <div className={`${statusClass} ${styles.default}`}>
      {statusValue}
    </div>
  );
};

export default StatusTag;
