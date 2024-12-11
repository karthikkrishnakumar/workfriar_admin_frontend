"use client";

import React, { useEffect, useState } from "react";
import TabComponent from "@/themes/components/tabs/tabs";
import DateRangePicker from "@/themes/components/date-picker/date-picker";
import { fetchDateData } from "@/module/time-sheet/services/time-sheet-services";
import ReviewAllTimesheetsTable from "../all-timesheets/all-timesheets";
import PendingOverviewTable from "../pending-timesheets/pending-timesheets-overview";
import ApprovedOverviewTable from "../approved-timesheets/approved-timesheets-overview";
import RejectedOverviewTable from "../rejected-timesheets/rejected-timesheets-overview";
import OverdueTable from "../overdue-timesheets/overdue-timesheets";


interface ReviewPageProps{
  pendingCount:number;
  approvedCount:number;
  rejectedCount:number;
  overDueCount:number;
}

const ReviewTabs:React.FC<ReviewPageProps> = ({pendingCount,approvedCount,rejectedCount,overDueCount}) => {

  const [loading, setLoadig] = useState(true);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [pastDueCount, setPastDueCount] = useState<number>(1);
  const [datePickerData, setDatePickerData] = useState<
    { start: string; end: string; week: number }[]
  >([]);
  const [activeTabKey, setActiveTabKey] = useState<string>("1"); // State to track active tab

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    const fetchDatePicker = async () => {
      try {
        const DatePickerData = await fetchDateData();
        setDatePickerData(DatePickerData);
      } catch (error) {
        console.error("Error fetching date picker data:", error);
      }
    };

    fetchDatePicker();
  }, []);


  const tabs = [
    {
      key: "1",
      label: <>All Timesheets</>,
      content: (
        <ReviewAllTimesheetsTable
          startDate={startDate}
          endDate={endDate}
        />
      ),
    },
    {
      key: "2",
      label: (
        <>
          Pending{" "}
          <span>
            <p>{pendingCount}</p>
          </span>
        </>
      ),
      content: <PendingOverviewTable />,
    },
    {
      key: "3",
      label: (
        <>
          Approved{" "}
          <span>
            <p>{approvedCount}</p>
          </span>
        </>
      ),
      content: <ApprovedOverviewTable />,
    },
    {
      key: "4",
      label: (
        <>
          Rejected{" "}
          <span>
            <p>{rejectedCount}</p>
          </span>
        </>
      ),
      content: <RejectedOverviewTable />,
    },
    {
      key: "5",
      label: (
        <>
          Overdue{" "}
          <span>
            <p>{overDueCount}</p>
          </span>
        </>
      ),
      content: <OverdueTable />,
    },
  ];
  return (
    <div>
      <TabComponent headings={tabs} subHeading={
        <DateRangePicker
        datePickerData={datePickerData}
        onDateChange={handleDateChange}
      />
      }/>
    </div>
  )
}

export default ReviewTabs;
