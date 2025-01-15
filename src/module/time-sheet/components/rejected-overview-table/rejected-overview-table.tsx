"use client";
import React, { useEffect, useState } from "react";
import styles from "./rejected-overview-table.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import RejectedTimesheetsTable from "./rejected-timesheet-table/rejected-timesheet-table";
import {
  OverViewTable,
  TimesheetDataTable,
  WeekDateEntry,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import {
  dateStringToMonthDate,
  isoTOenGB,
} from "@/utils/date-formatter-util/date-formatter";
import UseAllTimesheetsServices from "../../services/all-timesheet-services/all-time-sheet-services";
import { useDispatch, useSelector } from "react-redux";
import { setShowDetailedView, setShowStatusTag } from "@/redux/slices/timesheetSlice";
import { RootState } from "@/redux/store";

/**
 * Interface for the props passed to the ApprovedOverviewTable component.
 *
 * @interface PastDueOverviewProps
 * @property {OverViewTable[]} [tableData] - Optional array of overview table data.
 */
interface PastDueOverviewProps {
  tableData?: OverViewTable[]; // Optional array of overview table data.
}

/**
 * ApprovedOverviewTable component displays an overview of rejected timesheets.
 * It shows a table with time periods, logged time, approved time, and actions to view detailed timesheet data.
 *
 * @param {PastDueOverviewProps} props - The props for the component.
 * @returns {JSX.Element} The rendered ApprovedOverviewTable component.
 */
const ApprovedOverviewTable: React.FC<PastDueOverviewProps> = ({
  tableData,
}) => {
  // State variables
  const [table, setTable] = useState<OverViewTable[]>([]); // Stores the overview table data.
  const [timeSheetTable, setTimesheetTable] = useState<TimesheetDataTable[]>(
    []
  ); // Stores the detailed timesheet data.
  const [rejectionNote,setRejectionNote] = useState<string | undefined>(undefined);
  const showDetailedView = useSelector(
    (state: RootState) => state.timesheet.showDetailedView
  ); // Flag to toggle between overview and detailed view.
  const [loading, setLoading] = useState<boolean>(true); // Loading state to display skeleton loader while fetching data.
  const [dates, setDates] = useState<WeekDaysData[]>([]); // Stores the weekdays data for the timesheet.
  const dispatch = useDispatch();

  /**
   * Handles the action to go back to the overview table.
   */
  const handleBackToOverview = () => {
    dispatch(setShowStatusTag(false));
    dispatch(setShowDetailedView(false));
  };

  const fetchOverViewTable = async () => {
    try {
      const response = await UseAllTimesheetsServices().fetchRejectedWeeks();
      setTable(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Fetches approved timesheets data for the given date range and sets the state for detailed view.
   *
   * @param {string} startDate - The date range for fetching the timesheet data
   * @param {string} endDate - The date range for fetching the timesheet data
   */
  const handleFetchTimesheets = async (startDate: string, endDate: string) => {
    dispatch(setShowDetailedView(true));
    setLoading(true);
    const response = await UseAllTimesheetsServices().fetchRejectedTimesheets(
      startDate,
      endDate
    );
    setTimesheetTable(response.data);
    if(response.notes){
      setRejectionNote(response.notes.message);
    }
    const uniqueDates: WeekDaysData[] = (
      response.weekDates as Partial<WeekDateEntry>[]
    ).map((day) => ({
      name: day.day_of_week!,
      date: day.date!,
      isHoliday: day.is_holiday!,
      formattedDate: dateStringToMonthDate(day.date!),
      isDisabled: day.is_disable!,
    }));
    setDates(uniqueDates);
    setLoading(false);
  };

  // Effect hook to fetch the rejected weeks data on component mount
  useEffect(() => {
    setLoading(true);
    fetchOverViewTable();
  }, []);

  
  // Table column definitions
  const columns = [
    { title: "Time Period", key: "period", align: "left" as const },
    { title: "Time logged", key: "loggedTime", align: "left" as const },
    { title: "Time Approved", key: "approvedTime", align: "left" as const },
    { title: "Actions", key: "action", align: "left" as const, width: 100 },
  ];

  // Mapping the table data for rendering in the overview table
  const data = table?.map((element) => ({
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
        onClick={() => {
          handleFetchTimesheets(element.startDate, element.endDate);
        }}
      >
        Details
      </span>
    ),
  }));

  return (
    <div className={styles.pastOverDueTableWrapper}>
      {showDetailedView ? (
        loading ? (
          <SkeletonLoader
            paragraph={{ rows: 15 }}
            classNameItem={styles.customSkeleton}
          />
        ) : (
          <RejectedTimesheetsTable
            timesheetData={timeSheetTable}
            setTimeSheetData={setTimesheetTable}
            daysOfWeek={dates}
            backButtonFunction={handleBackToOverview}
            rejectionNote={rejectionNote}
          />
          // Detailed view table should be rendered here
        )
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

export default ApprovedOverviewTable;
