"use client";

import React, { useEffect, useState } from "react";
import TabComponent from "@/themes/components/tabs/tabs";
import DateRangePicker, {
  DatePickerData,
} from "@/themes/components/date-picker/date-picker";
import ReviewAllTimesheetsTable from "../all-timesheets/all-timesheets";
import PendingOverviewTable from "../pending-timesheets/pending-timesheets-overview";
import ApprovedOverviewTable from "../approved-timesheets/approved-timesheets-overview";
import RejectedOverviewTable from "../rejected-timesheets/rejected-timesheets-overview";
import OverdueTable from "../overdue-timesheets/overdue-timesheets";
import { fetchWeeks } from "../../services/review-timesheet-services";

// Interface for the props expected by the ReviewTabs component
interface ReviewPageProps {
  pendingCount: number; // The number of pending timesheets
  approvedCount: number; // The number of approved timesheets
  rejectedCount: number; // The number of rejected timesheets
  overDueCount: number; // The number of overdue timesheets
}

// The ReviewTabs component handles the rendering of tabs and associated content
const ReviewTabs: React.FC<ReviewPageProps> = ({
  pendingCount,
  approvedCount,
  rejectedCount,
  overDueCount,
}) => {
  // State for loading status
  const [loading, setLoadig] = useState(true);

  // State for managing the start and end dates for the date range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [weeks, setWeeks] = useState<DatePickerData[]>([]);

  // State for managing the count of past-due timesheets
  const [pastDueCount, setPastDueCount] = useState<number>(1);

  // State to track the active tab (default is the first tab)
  const [activeTabKey, setActiveTabKey] = useState<string>("1");

  /**
   * Handles date range changes and updates state variables for filtering.
   * 

   * @param {string} startDate - The start date of the range
   * @param {string} endDate - The end date of the range
   */
  const handleDateChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  // Fetch date data for the date range picker when the component mounts
  useEffect(() => {
    // fetch dates
    fetchWeeks(setWeeks);
  }, []);

  // Define the tabs for the review page, each with a key, label, and content
  const tabs = [
    {
      key: "1", // Key for the "All Timesheets" tab
      label: <>All Timesheets</>,
      content: (
        <ReviewAllTimesheetsTable startDate={startDate} endDate={endDate} />
      ),
    },
    {
      key: "2", // Key for the "Pending" tab
      label: (
        <>
          Pending{" "}
          <span>
            <p>{pendingCount}</p> {/* Display the pending count */}
          </span>
        </>
      ),
      content: <PendingOverviewTable />, // Content for the pending tab
    },
    {
      key: "3", // Key for the "Approved" tab
      label: (
        <>
          Approved{" "}
          <span>
            <p>{approvedCount}</p> {/* Display the approved count */}
          </span>
        </>
      ),
      content: <ApprovedOverviewTable />, // Content for the approved tab
    },
    {
      key: "4", // Key for the "Rejected" tab
      label: (
        <>
          Rejected{" "}
          <span>
            <p>{rejectedCount}</p> {/* Display the rejected count */}
          </span>
        </>
      ),
      content: <RejectedOverviewTable />, // Content for the rejected tab
    },
    {
      key: "5", // Key for the "Overdue" tab
      label: (
        <>
          Overdue{" "}
          <span>
            <p>{overDueCount}</p> {/* Display the overdue count */}
          </span>
        </>
      ),
      content: <OverdueTable />, // Content for the overdue tab
    },
  ];

  return (
    <div>
      {/* Tab component for displaying different timesheet statuses */}
      <TabComponent
        headings={tabs} // Pass the tabs as headings
        subHeading={
          // Date range picker displayed as a subheading
          <DateRangePicker weekData={weeks} onDateChange={handleDateChange} />
        }
      />
    </div>
  );
};

export default ReviewTabs;
