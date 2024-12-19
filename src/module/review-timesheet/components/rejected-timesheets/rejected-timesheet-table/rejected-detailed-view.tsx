import {
  TimeEntry,
  TimesheetDataTable,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import TimeInput from "@/themes/components/time-input/time-input";
import {
  minutesToTime,
  timeToMinutes,
} from "@/utils/timesheet-utils/timesheet-time-formatter";
import React, { ReactNode, useState } from "react";
import styles from "./rejected-detailed-view.module.scss";
import { Dropdown } from "antd";
import CustomTable from "@/themes/components/custom-table/custom-table";
import ButtonComponent from "@/themes/components/button/button";
import Icons from "@/themes/images/icons/icons";
import TextAreaButton from "@/module/time-sheet/components/text-area-button/text-area-button";

/**
 * `RejectedDetailedView` is a component that displays detailed information about rejected timesheets.
 * It allows the user to view time entries for specific tasks and also provides options to approve or reject individual timesheets.
 * It shows the details in a table format with time entries for each day of the week.
 *
 * @component
 * @example
 * return <RejectedDetailedView timeSheetData={timesheetData} daysOfWeek={daysOfWeek} backButtonFunction={handleBack} />;
 */
interface RejectedDetailedViewProps {
  timeSheetData: TimesheetDataTable[]; // Array of timesheet data to be displayed
  daysOfWeek: WeekDaysData[]; // Array of days of the week
  backButtonFunction: () => void; // Function to handle the back button click
}

const RejectedDetailedView: React.FC<RejectedDetailedViewProps> = ({
  timeSheetData,
  daysOfWeek,
  backButtonFunction,
}) => {
  // State management
  const [loading, setLoading] = useState(false); // Loading state for the component
  const [showTaskDetailModal, setTaskDetailModal] = useState<boolean>(false); // Modal visibility for task details
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null); // Row index of the task being edited

  /**
   * Handles the click on a task detail button, triggering the modal to show task details.
   * 
   * @param {number} rowIndex - Index of the row being clicked
   */
  const textAreaOnclick = (rowIndex: number) => {
    setEditingRowIndex(rowIndex);
    setTaskDetailModal(!showTaskDetailModal); // Toggle modal visibility
  };

  // Menu items for approve/reject actions
  const menuItems = [
    { key: "approve", label: "Approve" },
    { key: "reject", label: "Reject" },
  ];

  /**
   * Handles the click on approve/reject menu items for a specific timesheet.
   * 
   * @param {object} e - Event object containing the selected menu item
   * @param {string} id - The ID of the timesheet being acted upon
   */
  const handleMenuClick = (e: { key: string }, id?: string) => {
    if (e.key === "approve") {
      // Function to approve timesheet (to be implemented)
    } else if (e.key === "reject") {
      // Function to reject timesheet (to be implemented)
    }
  };

  /**
   * Calculates the total hours for a specific task by summing up all the time entries.
   * 
   * @param {TimeEntry[]} entries - Array of time entries for a specific task
   * @returns {string} - The total hours formatted as "HH:MM"
   */
  const calculateTotalHours = (entries: TimeEntry[]) => {
    const totalMinutes = entries.reduce(
      (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
      0
    );
    return minutesToTime(totalMinutes); // Convert minutes to time format
  };

  /**
   * Maps time entries to the corresponding weekdays for a task.
   * 
   * @param {TimeEntry[]} entries - Array of time entries for a specific task
   * @param {number} index - Index of the task in the timesheet data
   * @returns {Record<string, ReactNode>} - A mapping of weekdays to time entry inputs
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
          disabled={entry.is_disable}
          tooltipContent={
            entry.is_disable ? "These dates are in next week" : ""
          }
          readOnly={true} // Only for viewing
        />
      );
    });
    return weekMap;
  };

  /**
   * Calculates the total hours worked per day across all tasks.
   * 
   * @returns {Record<string, number>} - A mapping of weekdays to total minutes worked
   */
  const calculateTotalByDay = () => {
    const dailyTotals: Record<string, number> = {};
    daysOfWeek.forEach((day) => {
      dailyTotals[day.name] = timeSheetData.reduce((total, timesheet) => {
        const dayIndex = daysOfWeek.indexOf(day);
        const dayEntry = timesheet.data_sheet[dayIndex];
        return total + timeToMinutes(dayEntry?.hours || "00:00");
      }, 0);
    });
    return dailyTotals; // Return the daily totals for all tasks
  };

  /**
   * Generates the total row for the table, showing totals for all tasks and all days.
   * 
   * @returns {object} - The total row data to be added to the table
   */
  const totalRow = () => {
    const dailyTotals = calculateTotalByDay();
    const totalAllDays = Object.values(dailyTotals).reduce((a, b) => a + b, 0);

    return {
      task: <span className={styles.totalRowTask}>Total</span>, // Total task label
      details: <span></span>, // Empty cell for task details
      ...Object.fromEntries(
        daysOfWeek.map((day) => [
          day.name,
          <span>{minutesToTime(dailyTotals[day.name])}</span>, // Total hours per day
        ])
      ),
      total: (
        <span className={styles.rowWiseTotal}>
          <p>{minutesToTime(totalAllDays)}</p> {/* Total hours for all days */}
        </span>
      ),
      action: <span></span>, // Empty cell for actions
      flag: "rowOfTotal", // Flag for identifying this as the total row
    };
  };

  // Columns definition for the table
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

  // Map data for the table
  const data = timeSheetData.map((timesheet, index) => {
    const totalHours = calculateTotalHours(timesheet.data_sheet);
    let isDisabled;
    const taskStatusClass =
      timesheet.status === "approved"
        ? styles.approved
        : timesheet.status === "rejected"
        ? styles.rejected
        : "";

    if (timesheet.status === "approved" || timesheet.status === "rejected") {
      isDisabled = true; // Disable actions for approved/rejected timesheets
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
          value={timeSheetData[index].task_detail}
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
            onClick: (e) => handleMenuClick(e, timesheet.timesheetId),
          }}
          trigger={["click"]}
          disabled={isDisabled} // Disable dropdown for approved/rejected timesheets
        >
          <button
            className={styles.action}
            role="button"
            tabIndex={0}
            disabled={isDisabled}
          >
            <span>{Icons.threeDots}</span> {/* Dropdown icon */}
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

export default RejectedDetailedView;
