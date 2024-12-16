"use client";

import React, { ReactNode, useState } from "react";
import CustomTable from "@/themes/components/custom-table/custom-table";
import styles from "./rejected-timesheet-table.module.scss";
import TimeInput from "@/themes/components/time-input/time-input";
import Icons from "@/themes/images/icons/icons";
import TextAreaButton from "../../text-area-button/text-area-button";
import ButtonComponent from "@/themes/components/button/button";
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
 * Interface for the props passed to the RejectedTimesheetsTable component.
 * 
 * @interface RejectedTableProps
 * @property {TimesheetDataTable[]} [timesheetData] - Array of initial timesheet data (optional).
 * @property {function} setTimeSheetData - Function to update the global timesheet data.
 * @property {WeekDaysData[]} daysOfWeek - Array of weekdays with associated data.
 * @property {function} backButtonFunction - Function to handle back button click.
 */
interface RejectedTableProps {
  timesheetData?: TimesheetDataTable[]; // Array of initial timesheet data (optional).
  setTimeSheetData: (data: TimesheetDataTable[]) => void; // Function to update the global timesheet data.
  daysOfWeek: WeekDaysData[]; // Array of weekdays with associated data.
  backButtonFunction: () => void; // Function to handle back button click.
}

/**
 * RejectedTimesheetsTable component is responsible for rendering a table of rejected timesheets
 * where users can edit task details, input time for each day of the week, and delete rows.
 * 
 * @param {RejectedTableProps} props - The props for the component.
 * @returns {JSX.Element} The rendered RejectedTimesheetsTable component.
 */
const RejectedTimesheetsTable: React.FC<RejectedTableProps> = ({
  timesheetData: initialTimesheetData = [],
  setTimeSheetData,
  daysOfWeek,
  backButtonFunction,
}) => {
  const [timesheetData, setLocalTimesheetData] = useState<TimesheetDataTable[]>(initialTimesheetData);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  /**
   * Handles time input changes and updates the timesheet status to "pending".
   * 
   * @param {number} index - The index of the row being updated.
   * @param {WeekDaysData} day - The day of the week that is being updated.
   * @param {string} newTime - The new time entered.
   */
  const handleTimeChange = (
    index: number,
    day: WeekDaysData,
    newTime: string
  ) => {
    const updatedData = [...timesheetData];
    const dayIndex = daysOfWeek.indexOf(day);

    updatedData[index].dataSheet[dayIndex].hours = newTime;

    if (updatedData[index].status !== "pending") {
      updatedData[index].status = "pending";
    }

    setLocalTimesheetData(updatedData);
    setUnsavedChanges(true);
  };

  /**
   * Handles the deletion of a row in the timesheet table.
   * 
   * @param {number} indexToDelete - The index of the row to delete.
   */
  const handleDeleteRow = (indexToDelete: number) => {
    const updatedData = timesheetData.filter((_, index) => index !== indexToDelete);
    setLocalTimesheetData(updatedData);
    setTimeSheetData(updatedData);
    setUnsavedChanges(true);
  };

  /**
   * Saves the current state of the timesheet data and resets the "unsaved changes" flag.
   */
  const handleSave = () => {
    setTimeSheetData(timesheetData);
    setUnsavedChanges(false);
    alert("Changes saved successfully!");
  };

  /**
   * Submits the timesheet data by saving it and displaying a success message.
   */
  const handleSubmit = () => {
    handleSave();
    alert("Timesheet data submitted successfully!");
  };

  /**
   * Calculates the total hours worked for a specific row based on the time entries.
   * 
   * @param {TimeEntry[]} entries - Array of time entries for the row.
   * @returns {string} - Total hours formatted as "HH:MM".
   */
  const calculateTotalHours = (entries: TimeEntry[]) => {
    const totalMinutes = entries.reduce(
      (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
      0
    );
    return minutesToTime(totalMinutes);
  };

  /**
   * Calculates the total hours worked for each day of the week across all timesheets.
   * 
   * @returns {Record<string, number>} - Object mapping each day to the total minutes worked.
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
   * Maps the time entries to each day of the week and returns a record with JSX elements
   * to render the TimeInput components for each day.
   * 
   * @param {TimeEntry[]} entries - Array of time entries for a specific timesheet row.
   * @param {number} index - The index of the timesheet row.
   * @returns {Record<string, ReactNode>} - Object mapping day names to corresponding TimeInput components.
   */
  const mapTimeEntriesToWeek = (
    entries: TimeEntry[],
    index: number
  ): Record<string, ReactNode> => {
    const weekMap: Record<string, ReactNode> = {};
    daysOfWeek.forEach((day, dayIndex) => {
      const entry = entries[dayIndex] || { hours: "00:00", isHoliday: false, date: "" };
      weekMap[day.name] = (
        <TimeInput
          value={entry.hours}
          setValue={(newTime) => handleTimeChange(index, day, newTime)}
          disabled={entry.isDisabled}
          tooltipContent={entry.isDisabled ? "These dates are in next week" : ""}
        />
      );
    });
    return weekMap;
  };

  /**
   * Generates the total row for the table, displaying the total hours for each day and overall.
   * 
   * @returns {object} - Object representing the total row.
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

  /**
   * Defines the columns for the table, including task, day columns, and action buttons.
   * 
   * @returns {Array} - Array of column definitions.
   */
  const columns = [
    { title: "Task", key: "task", width: 140 },
    { title: <span style={{ width: "100px" }}>Task Details</span>, key: "details", width: 155 },
    ...daysOfWeek.map((day) => ({
      title: (
        <span
          className={
            day.isHoliday
              ? `${styles.dateTitles} ${styles.holidayDateTitles}`
              : styles.dateTitles
          }
        >
          <p>{day.name}</p>
          <p>{day.formattedDate}</p>
        </span>
      ),
      key: day.name,
    })),
    { title: "Total", key: "total", width: 70 },
    { title: "", key: "action", width: 50 },
  ];

  /**
   * Maps the timesheet data to table rows.
   * 
   * @returns {Array} - Array of table rows.
   */
  const data = timesheetData.map((timesheet, index) => {
    const totalHours = calculateTotalHours(timesheet.dataSheet);
    const taskStatusClass =
      timesheet.status === "approved"
        ? styles.approved
        : timesheet.status === "rejected"
        ? styles.rejected
        : styles.pending;

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
          onclickFunction={() => setEditingRowIndex(index)}
          showTaskDetailModal={editingRowIndex === index}
          value={timesheetData[index].taskDetail}
          setvalue={(newValue) => {
            const updatedData = [...timesheetData];
            updatedData[index].taskDetail = newValue;
            setLocalTimesheetData(updatedData);
            setUnsavedChanges(true);
          }}
        />
      ),
      ...mapTimeEntriesToWeek(timesheet.dataSheet, index),
      total: (
        <span className={styles.rowWiseTotal}>
          <p>{totalHours}</p>
        </span>
      ),
      action: (
        <span
          className={styles.deleteButton}
          role="button"
          tabIndex={0}
          style={{ cursor: "pointer" }}
          onClick={() => handleDeleteRow(index)}
        >
          {Icons.deleteActive}
        </span>
      ),
    };
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.scrollContainer}>
        <div className={styles.tableWrapper}>
          <CustomTable columns={columns} data={[...data, totalRow()]} />
        </div>
      </div>
      <div className={styles.timesheetNotesWrapper}>
        <h2>Timesheet Note</h2>
        <div className={styles.timesheetNote}>
          <ul>
            <li>
              Please note that you can edit the task details, delete entries,
              and add new entries.
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.actionButtons}>
        <div>
          <ButtonComponent
            label="Save"
            theme="black"
            onClick={handleSave}
            disabled={!unsavedChanges}
          />
          <ButtonComponent
            label="Submit"
            theme="white"
            onClick={handleSubmit}
            disabled={!unsavedChanges}
          />
        </div>
        <span className={styles.backButton} onClick={backButtonFunction}>
          {"< Back"}
        </span>
      </div>
    </div>
  );
};

export default RejectedTimesheetsTable;
