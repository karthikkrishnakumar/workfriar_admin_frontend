"use client";

import React, { useEffect, useState } from "react";
import ReviewTabs from "../components/review-tabs/review-tabs";
import styles from "./review-timesheet.module.scss";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import CustomAvatar from "@/themes/components/avatar/avatar";
import { TeamMember } from "@/interfaces/approval-center/approval-center";
import UseReviewTimesheetsServices from "../services/review-timesheets-service";

interface ReviewTimesheetProps {
  id: string; // Unique identifier for the user whose timesheet data is being reviewed
}

/**
 * ReviewTimesheet Component
 * 
 * This component is responsible for rendering the review timesheet page. It displays
 * a user's profile information and provides tabs for reviewing the status of their timesheets,
 * including counts for approved, rejected, overdue, and pending timesheets.
 * 
 * @param {ReviewTimesheetProps} props - The props for the component
 * @returns {JSX.Element} The rendered ReviewTimesheet component
 */
const ReviewTimesheet: React.FC<ReviewTimesheetProps> = ({ id }) => {
  // State variables
  const [pendingCount, setPendingCount] = useState<number>(0); // Count of pending timesheets
  const [approvedCount, setApprovedCount] = useState<number>(0); // Count of approved timesheets
  const [rejectedCount, setRejectedCount] = useState<number>(0); // Count of rejected timesheets
  const [overDueCount, setOverDueCount] = useState<number>(0); // Count of overdue timesheets
  const [loading, setLoading] = useState<boolean>(true); // Indicates whether data is still loading
  const [employeeProfile, setEmployeeProfile] = useState<TeamMember>(); // User profile information

  /**
   * Fetches timesheet counts for the given user.
   * Updates state variables for overdue, approved, rejected, and pending counts.
   */
  const fetchTimeSheetsCount = async () => {
    try {
      const response = await UseReviewTimesheetsServices().fetchTimesheetsCounts(id);
      setOverDueCount(response.data.totalSaved); // Set overdue count
      setApprovedCount(response.data.totalApproved); // Set approved count
      setRejectedCount(response.data.totalRejected); // Set rejected count
      setPendingCount(response.data.totalSubmitted); // Set pending count
    } catch (error) {
      console.error("Error fetching timesheet counts:", error);
    }
  };

  /**
   * Fetches user profile data for the given user ID.
   * Updates the employeeProfile state with user details such as name and profile picture.
   *
   * @param {string} id - The user ID for which to fetch profile data
   */
  const fetchUserData = async (id: string) => {
    try {
      const response = await UseReviewTimesheetsServices().fetchUserDetails(id);
      if (response.data) {
        setEmployeeProfile({
          id: response.data?.id,
          full_name: response.data?.name,
          profile_pic: response.data?.profile_pic_path,
        });
      }
      setLoading(false); // Set loading state to false once data is fetched
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  /**
   * useEffect hook
   * Fetches user data and timesheet counts when the component mounts or when the `id` prop changes.
   */
  useEffect(() => {
    fetchUserData(id); // Fetch user profile data
    fetchTimeSheetsCount(); // Fetch timesheet counts
  }, [id]);

  return (
    <div className={styles.reviewTimesheetWrapper}>
      {loading ? (
        // Render skeleton loaders while data is loading
        <>
          <SkeletonLoader profile classNameItem={styles.customSkelton} />
          <SkeletonLoader
            paragraph={{ rows: 10 }}
            classNameItem={styles.customSkelton}
          />
        </>
      ) : (
        // Render user profile and review tabs once data is loaded
        <>
          <div className={styles.profileWrapper}>
            <CustomAvatar
              name={employeeProfile?.full_name} // Display user's name
              src={employeeProfile?.profile_pic} // Display user's profile picture
              size={63} // Set avatar size
            />
            <h2>{employeeProfile?.full_name}</h2>
          </div>
          <ReviewTabs
            approvedCount={approvedCount} // Pass approved count to ReviewTabs
            overDueCount={overDueCount} // Pass overdue count to ReviewTabs
            pendingCount={pendingCount} // Pass pending count to ReviewTabs
            rejectedCount={rejectedCount} // Pass rejected count to ReviewTabs
            userId={id} // Pass user ID to ReviewTabs
          />
        </>
      )}
    </div>
  );
};

export default ReviewTimesheet;
