import React, { ReactNode, useState } from "react";
import styles from "./approved-detailed-view.module.scss";
import { Dropdown } from "antd";
import CustomTable from "@/themes/components/custom-table/custom-table";
import ButtonComponent from "@/themes/components/button/button";
import Icons from "@/themes/images/icons/icons";
import TextAreaButton from "@/module/time-sheet/components/text-area-button/text-area-button";
import TimeInput from "@/themes/components/time-input/time-input";
import {
  minutesToTime,
  timeToMinutes,
} from "@/utils/timesheet-utils/timesheet-time-formatter";
import {
  TimeEntry,
  TimesheetDataTable,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";

/**
 * Props for the ApprovedDetailedView component.
 */
interface ApprovedDetailedViewProps {
  /**
   * Array of timesheet data to be displayed.
   */
  timeSheetData: TimesheetDataTable[];

  /**
   * Array of week day data containing day names and dates.
   */
  daysOfWeek: WeekDaysData[];

  /**
   * Function to handle the back button click event.
   */
  backButtonFunction: () => void;
}

/**
 * ApprovedDetailedView
 *
 * Displays a detailed view of approved timesheets, including a table with tasks,
 * total hours, and action buttons for approval or rejection.
 *
 * @param {ApprovedDetailedViewProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered detailed view component.
 */
const ApprovedDetailedView: React.FC<ApprovedDetailedViewProps> = ({
  timeSheetData,
  daysOfWeek,
  backButtonFunction,
}) => {
  // State for managing loading status
  const [loading, setLoading] = useState(false);

  // State for showing/hiding the task detail modal
  const [showTaskDetailModal, setTaskDetailModal] = useState<boolean>(false);

  // State to track the currently edited row index
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  /**
   * Toggles the task detail modal for a specific row.
   * @param {number} rowIndex - Index of the row to toggle.
   */
  const textAreaOnclick = (rowIndex: number) => {
    setEditingRowIndex(rowIndex);
    setTaskDetailModal(!showTaskDetailModal);
  };

  /**
   * Menu items for the dropdown actions.
   */
  const menuItems = [
    { key: "approve", label: "Approve" },
    { key: "reject", label: "Reject" },
  ];

  /**
   * Handles menu click actions for approving or rejecting a task.
   * @param {object} e - Event object containing the key of the clicked item.
   * @param {string} [id] - Optional timesheet ID associated with the action.
   */
  const handleMenuClick = (e: { key: string }, id?: string) => {
    if (e.key === "approve") {
      // Implement approval logic
    } else if (e.key === "reject") {
      // Implement rejection logic
    }
  };

  /**
   * Calculates the total hours for a row by summing all time entries.
   * @param {TimeEntry[]} entries - Array of time entries.
   * @returns {string} Total hours in HH:MM format.
   */
  const calculateTotalHours = (entries: TimeEntry[]) => {
    const totalMinutes = entries.reduce(
      (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
      0
    );
    return minutesToTime(totalMinutes);
  };

  /**
   * Maps time entries to their corresponding week days.
   * @param {TimeEntry[]} entries - Array of time entries.
   * @param {number} index - Index of the current row.
   * @returns {Record<string, ReactNode>} Mapping of week days to time input components.
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
          tooltipContent={
            entry.isDisabled ? "These dates are in next week" : ""
          }
          readOnly={true}
        />
      );
    });
    return weekMap;
  };

  /**
   * Calculates the total hours worked for each day of the week.
   * @returns {Record<string, number>} Daily totals in minutes.
   */
  const calculateTotalByDay = () => {
    const dailyTotals: Record<string, number> = {};
    daysOfWeek.forEach((day) => {
      dailyTotals[day.name] = timeSheetData.reduce((total, timesheet) => {
        const dayIndex = daysOfWeek.indexOf(day);
        const dayEntry = timesheet.dataSheet[dayIndex];
        return total + timeToMinutes(dayEntry?.hours || "00:00");
      }, 0);
    });

    return dailyTotals;
  };

  /**
   * Generates the total row data for the table.
   * @returns {object} Total row object with calculated values.
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
   * Column definitions for the table.
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
   * Data for each row in the table.
   */
  const data = timeSheetData.map((timesheet, index) => {
    const totalHours = calculateTotalHours(timesheet.dataSheet);
    let isDisabled;
    const taskStatusClass =
      timesheet.status === "approved"
        ? styles.approved
        : timesheet.status === "rejected"
        ? styles.rejected
        : "";

    isDisabled = timesheet.status === "approved" || timesheet.status === "rejected";

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
          readOnly={true}
          onclickFunction={() => textAreaOnclick(index)}
          showTaskDetailModal={editingRowIndex === index && showTaskDetailModal}
          value={timeSheetData[index].taskDetail}
        />
      ),
      ...mapTimeEntriesToWeek(timesheet.dataSheet, index),
      total: (
        <span className={styles.rowWiseTotal}>
          <p>{totalHours}</p>
        </span>
      ),
      action: (
        <Dropdown
          menu={{
            items: menuItems,
            onClick: (e) => handleMenuClick(e, timesheet.timesheetId),
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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.scrollContainer}>
        <div className={styles.tableWrapper}>
          <CustomTable columns={columns} data={[...data, totalRow()]} />
        </div>
      </div>
      <div className={styles.timesheetNotesWrapper}>
        <h2>Timesheet Note</h2>
        <textarea
          className={styles.timesheetNote}
          placeholder="Write your timesheet note here."
        />
      </div>
      <div className={styles.actionButtons}>
        <div>
          <ButtonComponent label="Approve" theme="black" />
          <ButtonComponent label="Reject" theme="white" />
        </div>
        <span className={styles.backButton} onClick={backButtonFunction}>
          {" "}
          {"< Back"}
        </span>
      </div>
    </div>
  );
};

export default ApprovedDetailedView;
