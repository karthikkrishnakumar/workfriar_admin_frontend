"use client";

import React, { useEffect, useState } from "react";
import ReviewTabs from "../components/review-tabs/review-tabs";
import styles from "./review-timesheet.module.scss";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import CustomAvatar from "@/themes/components/avatar/avatar";
import { TeamMember } from "@/interfaces/approval-center/approval-center";

interface ReviewTimesheetProps {
  id: string;
}
const ReviewTimesheet: React.FC<ReviewTimesheetProps> = ({ id }) => {
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [approvedCount, setApprovedCount] = useState<number>(0);
  const [rejectedCount, setRejectedCount] = useState<number>(0);
  const [overDueCount, setOverDueCount] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(true);
  const [employeeProfile, setEmployeeProfile] = useState<TeamMember>();

  useEffect(() => {
    // fetchUserData(
    //   id,
    //   setPendingCount,
    //   setApprovedCount,
    //   setRejectedCount,
    //   setOverDueCount,
    //   setloading,
    //   setEmployeeProfile
    // );
  }, []);
  return (
    <div className={styles.reviewTimesheetWrapper}>
      {loading ? (
        <>
          <SkeletonLoader
            profile
            classNameItem={styles.customSkelton}
          />
          <SkeletonLoader
            paragraph={{ rows: 10 }}
            classNameItem={styles.customSkelton}
          />
        </>
      ) : (
        <>
          <div className={styles.profileWrapper}>
            <CustomAvatar
              name={employeeProfile?.full_name}
              src={employeeProfile?.profile_pic}
              size={63}
            />
            <h2>{employeeProfile?.full_name}</h2>
          </div>
          <ReviewTabs
            approvedCount={approvedCount}
            overDueCount={overDueCount}
            pendingCount={pendingCount}
            rejectedCount={rejectedCount}
          />
        </>
      )}
    </div>
  );
};

export default ReviewTimesheet;
