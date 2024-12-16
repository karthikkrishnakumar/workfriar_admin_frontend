"use client";

import React, { ReactNode, useState, useEffect, useRef } from "react";
import CustomTable from "@/themes/components/custom-table/custom-table";
import styles from "./approved-timesheet-table.module.scss";
import TimeInput from "@/themes/components/time-input/time-input";
import TextAreaButton from "../../text-area-button/text-area-button";
import {
  TimeEntry,
  TimesheetDataTable,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import {
  minutesToTime,
  timeToMinutes,
} from "@/utils/timesheet-utils/timesheet-time-formatter";

/**
 * Props for the ApprovedTimesheetsTable component.
 */
interface PastDueTableProps {
  /**
   * List of timesheet data to display in the table.
   * @default []
   */
  timesheetData?: TimesheetDataTable[];
  /**
   * Function to update the timesheet data in the parent component.
   */
  setTimeSheetData: (data: TimesheetDataTable[]) => void;
  /**
   * List of days of the week with details (name, date, etc.)
   */
  daysOfWeek: WeekDaysData[];
  /**
   * Function to handle going back to the previous screen.
   */
  backButtonFunction: () => void;
}

/**
 * Displays a table of approved timesheets and allows for displaying timesheet data, including task details and weekly times.
 * 
 * @param {PastDueTableProps} props - The component's props
 * @returns {JSX.Element} The rendered timesheet table
 */
const ApprovedTimesheetsTable: React.FC<PastDueTableProps> = ({
  timesheetData: initialTimesheetData = [],
  setTimeSheetData,
  daysOfWeek,
  backButtonFunction
}) => {
  const [timesheetData, setLocalTimesheetData] =
    useState<TimesheetDataTable[]>(initialTimesheetData);
  const [showTaskDetailModal, setTaskDetailModal] = useState<boolean>(false);
  const textAreaOnclick = (rowIndex: number) => {
    setEditingRowIndex(rowIndex);
    setTaskDetailModal(!showTaskDetailModal);
  };
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  /**
   * Calculates the total hours worked for a row based on time entries.
   * 
   * @param {TimeEntry[]} entries - The time entries for the row
   * @returns {string} The total hours worked in HH:MM format
   */
  const calculateTotalHours = (entries: TimeEntry[]) => {
    const totalMinutes = entries.reduce(
      (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
      0
    );
    return minutesToTime(totalMinutes);
  };

  /**
   * Maps time entries for each day of the week to the corresponding time input fields.
   * 
   * @param {TimeEntry[]} entries - The time entries for the row
   * @param {number} index - The index of the row in the table
   * @returns {Record<string, ReactNode>} A mapping of weekday names to JSX time input components
   */
  const mapTimeEntriesToWeek = (
    entries: TimeEntry[],
    index: number
  ): Record<string, ReactNode> => {
    const weekMap: Record<string, ReactNode> = {};
    daysOfWeek.forEach((day, dayIndex) => {
      const entry = entries[dayIndex] || {
        hours: "00:00",
        isHoliday: false,
        date: "",
      };
      weekMap[day.name] = (
        <TimeInput
          value={entry.hours}
          disabled={entry.isDisabled}
          tooltipContent={entry.isDisabled ? "These dates are in next week" : ""}
          readOnly={true}
        />
      );
    });
    return weekMap;
  };

  /**
   * Handles the submit action for the timesheet data.
   * This function displays a success alert for demonstration purposes.
   */
  const handleSubmit = () => {
    alert("Timesheet data submitted successfully!");
  };

  /**
   * Calculates the total hours worked for each day of the week across all timesheets.
   * 
   * @returns {Record<string, number>} A mapping of day names to total minutes worked
   */
  const calculateTotalByDay = () => {
    const dailyTotals: Record<string, number> = {};
    daysOfWeek.forEach((day) => {
      dailyTotals[day.name] = timesheetData.reduce((total, timesheet) => {
        const dayIndex = daysOfWeek.indexOf(day);
        const dayEntry = timesheet.dataSheet[dayIndex];
        return total + timeToMinutes(dayEntry?.hours || "00:00");
      }, 0);
    });

    return dailyTotals;
  };

  /**
   * Generates a row for the table displaying the total hours worked across all timesheets.
   * 
   * @returns {Record<string, ReactNode>} The total row with hours calculated for each day
   */
  const totalRow = () => {
    const dailyTotals = calculateTotalByDay();
    const totalAllDays = Object.values(dailyTotals).reduce((a, b) => a + b, 0);

    return {
      task: <span className={styles.totalRowTask}>Total</span>,
      details: <span></span>,
      ...Object.fromEntries(
        daysOfWeek.map((day) => [
          day.name,
          <span>{minutesToTime(dailyTotals[day.name])}</span>,
        ])
      ),
      total: (
        <span className={styles.rowWiseTotal}>
          <p>{minutesToTime(totalAllDays)}</p>
        </span>
      ),
      action: <span></span>,
      flag: "rowOfTotal",
    };
  };

  // Define columns for the table
  const columns = [
    { title: "Task", key: "task", width: 140 },
    {
      title: <span style={{ width: "100px" }}>Task Details</span>,
      key: "details",
      width: 155,
    },
    ...daysOfWeek.map((day) => ({
      title: (
        <span
          className={
            day.isHoliday
              ? `${styles.dateTitles} ${styles.holidayDateTitles}` // Apply holiday style
              : styles.dateTitles // Default style
          }
        >
          <p>{day.name}</p>
          <p>{day.formattedDate}</p>
        </span>
      ),
      key: day.name,
    })),
    { title: "Total", key: "total", width: 70 },
  ];

  // Prepare data for the table
  const data = timesheetData.map((timesheet, index) => {
    const totalHours = calculateTotalHours(timesheet.dataSheet);
    const taskStatusClass =
      timesheet.status === "approved"
        ? styles.approved
        : timesheet.status === "rejected"
        ? styles.rejected
        : "";

    return {
      task: (
        <div className={`${styles.tableDataCell} ${taskStatusClass}`}>
          <span className={styles.taskName}>{timesheet.categoryName}</span>
          <span className={styles.projectName}>{timesheet.projectName}</span>
        </div>
      ),
      details: (
        <TextAreaButton
          buttonvalue={timesheet.taskDetail}
          onclickFunction={() => textAreaOnclick(index)}
          showTaskDetailModal={editingRowIndex === index && showTaskDetailModal}
          value={timesheetData[index].taskDetail}
          setvalue={(newValue) => {
            const updatedData = [...timesheetData];
            updatedData[index].taskDetail = newValue;
            setLocalTimesheetData(updatedData);
            setTimeSheetData(updatedData);
          }}
          readOnly={true}
        />
      ),
      ...mapTimeEntriesToWeek(timesheet.dataSheet, index),
      total: (
        <span className={styles.rowWiseTotal}>
          <p>{totalHours}</p>
        </span>
      ),
    };
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.scrollContainer}>
        <div className={styles.tableWrapper}>
          <CustomTable
            columns={columns}
            data={[...data, totalRow()]}
          />
        </div>
      </div>
      <div className={styles.actionButtons}>
        <span className={styles.backButton} onClick={backButtonFunction}> {"< Back"}</span>
      </div>
    </div>
  );
};

export default ApprovedTimesheetsTable;
