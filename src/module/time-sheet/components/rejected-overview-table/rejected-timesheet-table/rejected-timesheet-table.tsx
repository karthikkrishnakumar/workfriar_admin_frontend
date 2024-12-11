"use client";

import React, { ReactNode, useState, useRef } from "react";
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
} from "../../../services/time-sheet-services";
import {
  minutesToTime,
  timeToMinutes,
} from "@/utils/timesheet-utils/timesheet-time-formatter";

interface RejectedTableProps {
  timesheetData?: TimesheetDataTable[];
  setTimeSheetData: (data: TimesheetDataTable[]) => void;
  daysOfWeek: WeekDaysData[];
  backButtonFunction: () => void;
}

const RejectedTimesheetsTable: React.FC<RejectedTableProps> = ({
  timesheetData: initialTimesheetData = [],
  setTimeSheetData,
  daysOfWeek,
  backButtonFunction,
}) => {
  const [timesheetData, setLocalTimesheetData] =
    useState<TimesheetDataTable[]>(initialTimesheetData);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  // Handle time input changes and update status to "pending"
  const handleTimeChange = (
    index: number,
    day: WeekDaysData,
    newTime: string
  ) => {
    const updatedData = [...timesheetData];
    const dayIndex = daysOfWeek.indexOf(day);

    // Update the specific time entry
    updatedData[index].dataSheet[dayIndex].hours = newTime;

    // Set the status to "pending" if not already
    if (updatedData[index].status !== "pending") {
      updatedData[index].status = "pending";
    }

    setLocalTimesheetData(updatedData);
    setUnsavedChanges(true); // Enable Save and Submit buttons
  };

  // Handle row deletion
  const handleDeleteRow = (indexToDelete: number) => {
    const updatedData = timesheetData.filter(
      (_, index) => index !== indexToDelete
    );
    setLocalTimesheetData(updatedData);
    setTimeSheetData(updatedData);
    setUnsavedChanges(true); // Enable Save and Submit buttons
  };

  // Save button functionality
  const handleSave = () => {
    setTimeSheetData(timesheetData);
    setUnsavedChanges(false); // Disable Save and Submit buttons
    alert("Changes saved successfully!");
  };

  // Submit button functionality
  const handleSubmit = () => {
    handleSave();
    alert("Timesheet data submitted successfully!");
  };

  // Calculate total hours for a row
  const calculateTotalHours = (entries: TimeEntry[]) => {
    const totalMinutes = entries.reduce(
      (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
      0
    );
    return minutesToTime(totalMinutes);
  };

  // Calculate total hours by day
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

  // Map time entries to corresponding week days
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
          setValue={(newTime) => handleTimeChange(index, day, newTime)}
          disabled={entry.isDisabled}
          tooltipContent={
            entry.isDisabled ? "These dates are in next week" : ""
          }
        />
      );
    });
    return weekMap;
  };

  // Total row component
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

  // Columns and final data
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
    {
      title: "",
      key: "action",
      width: 50,
    },
  ];

  const data = timesheetData.map((timesheet, index) => {
    const totalHours = calculateTotalHours(timesheet.dataSheet);
    const taskStatusClass =
      timesheet.status === "approved"
        ? styles.approved
        : timesheet.status === "rejected"
        ? styles.rejected
        : styles.pending; // Add class for pending status

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
            setUnsavedChanges(true); // Enable Save and Submit buttons
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
