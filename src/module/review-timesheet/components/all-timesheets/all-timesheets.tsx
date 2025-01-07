"use client";

import React, { useState, useEffect, ReactNode } from "react";
import CustomTable from "@/themes/components/custom-table/custom-table";
import styles from "./all-timesheets.module.scss";
import TimeInput from "@/themes/components/time-input/time-input";
import ButtonComponent from "@/themes/components/button/button";

import {
  minutesToTime,
  timeToMinutes,
} from "@/utils/timesheet-utils/timesheet-time-formatter";
import {
  TimeEntry,
  TimesheetDataTable,
  WeekDateEntry,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import Icons from "@/themes/images/icons/icons";
import { Dropdown, message } from "antd";
import TextAreaButton from "@/module/time-sheet/components/text-area-button/text-area-button";
import UseReviewTimesheetsServices from "../../services/review-timesheets-service";
import { dateStringToMonthDate } from "@/utils/date-formatter-util/date-formatter";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

/**
 * Props for the ReviewAllTimesheetsTable component.
 */
interface AllTimeSheetTableProps {
  startDate: string; // Start date of the timesheet period
  endDate: string; // End date of the timesheet period
  userId: string; // User ID for the timesheet
}

/**
 * ReviewAllTimesheetsTable component renders a timesheet table where users can review, edit, and take actions
 * (like approve or reject) on timesheet data.
 */
const ReviewAllTimesheetsTable: React.FC<AllTimeSheetTableProps> = ({
  startDate,
  endDate,
  userId,
}) => {
  const [timesheetData, setTimeSheetData] = useState<TimesheetDataTable[]>([]); // Stores the timesheet data
  const [unsavedChanges, setUnsavedChanges] = useState(false); // Tracks unsaved changes
  const [daysOfWeek, setDaysOfWeek] = useState<WeekDaysData[]>([]); // Days of the current week
  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [showTaskDetailModal, setTaskDetailModal] = useState<boolean>(false); // Controls visibility of task details modal
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null); // Index of the row being edited

  /**
   * Handles the click on the task detail text area to toggle the modal visibility.
   * @param rowIndex - Index of the row to edit
   */
  const textAreaOnclick = (rowIndex: number) => {
    setEditingRowIndex(rowIndex);
    setTaskDetailModal(!showTaskDetailModal);
  };

  /**
   * Dropdown menu items for approve/reject actions.
   */
  const menuItems = [
    { key: "approve", label: "Approve" },
    { key: "reject", label: "Reject" },
  ];

  /**
   * Handles the click on the dropdown menu actions.
   * @param e - Menu event object
   * @param id - Timesheet ID
   */
  const handleMenuClick = async(e: { key: string }, id?: string) => {
    if (!id) return;

    const response = await UseReviewTimesheetsServices().manageTimesheetStatus(id, e.key);

    if(response.status) {
      message.success(response.message);
      const updatedTimesheetData = timesheetData.map((timesheet) => {
        if (timesheet.timesheet_id === id) {
          return {
            ...timesheet,
            status: e.key === "approve" ? "accepted" : "rejected",
          };
        }
        return timesheet;
      });
  
      setTimeSheetData(updatedTimesheetData);
      setUnsavedChanges(true);
    }
  };

  /**
   * Handles time input changes in the table.
   * @param index - Index of the row being edited
   * @param day - Week day data
   * @param newTime - New time value
   */
  const handleTimeChange = (
    index: number,
    day: WeekDaysData,
    newTime: string
  ) => {
    const updatedData = [...timesheetData];
    const dayIndex = daysOfWeek.indexOf(day);
    updatedData[index].data_sheet[dayIndex].hours = newTime;
    setTimeSheetData(updatedData);
    setUnsavedChanges(true);
  };

  /**
   * Fetch data for the table.
   * @param startDate - Start date of the week
   * @param endDate - End date of the week
   */
  const fetchTimesheets = async (startDate: string, endDate: string) => {
    try {
      setLoading(true);
      const response =
        await UseReviewTimesheetsServices().fetchAllReviewTimesheets(
          userId,
          startDate,
          endDate
        );
      setTimeSheetData(response?.data);
      const uniqueDates: WeekDaysData[] = (
        response.weekDates as Partial<WeekDateEntry>[]
      ).map((day) => ({
        name: day.day_of_week!,
        date: day.date!,
        isHoliday: day.is_holiday!,
        formattedDate: dateStringToMonthDate(day.date!),
        isDisabled: day.is_disable!,
      }));

      setDaysOfWeek(uniqueDates);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTimesheets(startDate, endDate);
  }, [startDate, endDate]);

  /**
   * Calculates the total hours for a row in the table.
   * @param entries - Array of time entries
   * @returns Total hours in HH:mm format
   */
  const calculateTotalHours = (entries: TimeEntry[]) => {
    const totalMinutes = entries.reduce(
      (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
      0
    );
    return minutesToTime(totalMinutes);
  };

  /**
   * Maps time entries to their corresponding week days for rendering in the table.
   * @param entries - Array of time entries
   * @param index - Index of the row
   * @returns Object mapping week days to time input components
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
          setValue={(newTime) => handleTimeChange(index, day, newTime)}
          disabled={entry.is_disable}
          tooltipContent={
            entry.is_disable ? "These dates are in next week" : ""
          }
          readOnly={true}
        />
      );
    });
    return weekMap;
  };

  /**
   * Calculates the total hours for each day across all rows.
   * @returns Object mapping week days to total hours
   */
  const calculateTotalByDay = () => {
    const dailyTotals: Record<string, number> = {};
    daysOfWeek.forEach((day) => {
      dailyTotals[day.name] = timesheetData.reduce((total, timesheet) => {
        const dayIndex = daysOfWeek.indexOf(day);
        const dayEntry = timesheet.data_sheet[dayIndex];
        return total + timeToMinutes(dayEntry?.hours || "00:00");
      }, 0);
    });

    return dailyTotals;
  };

  /**
   * Generates the total row for the table.
   * @returns Object representing the total row data
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
   * Saves the changes made to the timesheet data.
   */
  const handleSave = () => {
    setTimeSheetData(timesheetData);
    setUnsavedChanges(false);
    alert("Changes saved successfully!");
  };

  /**
   * Submits the timesheet data after saving.
   */
  const handleSubmit = () => {
    handleSave();
    alert("Timesheet data submitted successfully!");
  };

  /**
   * Table column definitions.
   */
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
    { title: "", key: "action", width: 50 },
  ];

  /**
   * Processes timesheet data rows for rendering in the table.
   */
  const data = timesheetData?.map((timesheet, index) => {
    const totalHours = calculateTotalHours(timesheet.data_sheet);
    let isDisabled;
    const taskStatusClass =
      timesheet.status === "accepted"
        ? styles.approved
        : timesheet.status === "rejected"
        ? styles.rejected
        : "";

    if (timesheet.status === "accepted" || timesheet.status === "rejected") {
      isDisabled = true;
    } else {
      isDisabled = false;
    }

    return {
      task: (
        <div className={`${styles.tableDataCell} ${taskStatusClass}`}>
          <span className={styles.taskName}>{timesheet.category_name}</span>
          <span className={styles.projectName}>{timesheet.project_name}</span>
        </div>
      ),
      details: (
        <TextAreaButton
          buttonvalue={timesheet.task_detail}
          readOnly={true}
          onclickFunction={() => textAreaOnclick(index)}
          showTaskDetailModal={editingRowIndex === index && showTaskDetailModal}
          value={timesheetData[index].task_detail}
        />
      ),
      ...mapTimeEntriesToWeek(timesheet.data_sheet, index),
      total: (
        <span className={styles.rowWiseTotal}>
          <p>{totalHours}</p>
        </span>
      ),
      action: (
        <Dropdown
          menu={{
            items: menuItems,
            onClick: (e) => handleMenuClick(e, timesheet.timesheet_id),
          }}
          trigger={["click"]}
          disabled={isDisabled}
        >
          <button
            className={styles.action}
            role="button"
            tabIndex={0}
            disabled={isDisabled}
          >
            <span>{Icons.threeDots}</span>
          </button>
        </Dropdown>
      ),
    };
  });

  return loading ? (
    <SkeletonLoader
      paragraph={{ rows: 10 }}
      classNameItem={styles.customSkeleton}
    />
  ) : (
    <div className={styles.mainContainer}>
      <div className={styles.scrollContainer}>
        <div className={styles.tableWrapper}>
          <CustomTable
            columns={columns}
            data={data.length > 0 ? [...data, totalRow()] : data}
          />
        </div>
      </div>

      {data.length > 0 && (
        <>
          <div className={styles.timesheetNotesWrapper}>
            <h2>Timesheet Note</h2>
            <textarea
              className={styles.timesheetNote}
              placeholder="Write your timesheet note here."
            />
          </div>
          <div className={styles.actionButtons}>
            <ButtonComponent
              label="Approve"
              theme="black"
              onClick={handleSave}
            />
            <ButtonComponent
              label="Reject"
              theme="white"
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewAllTimesheetsTable;
