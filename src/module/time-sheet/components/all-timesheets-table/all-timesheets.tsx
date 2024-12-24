"use client";

import React, { ReactNode, useState, useEffect, useRef } from "react";
import CustomTable from "@/themes/components/custom-table/custom-table";
import styles from "./all-timesheets.module.scss";
import TimeInput from "@/themes/components/time-input/time-input";
import Icons from "@/themes/images/icons/icons";
import TextAreaButton from "../text-area-button/text-area-button";
import ButtonComponent from "@/themes/components/button/button";
import DropDownModal from "@/themes/components/drop-down-modal/drop-down-modal";
import ProjectSelector from "../project-selector/project-selector";
import TaskSelector from "../task-selector/task-selector";

import {
  minutesToTime,
  timeToMinutes,
} from "@/utils/timesheet-utils/timesheet-time-formatter";
import {
  CategoryList,
  ProjectList,
  TimeEntry,
  TimesheetDataTable,
  WeekDaysData,
} from "@/interfaces/timesheets/timesheets";
import UseAllTimesheetsServices from "../../services/all-timesheet-services/all-time-sheet-services";
import { message } from "antd";

/**
 * Props for the AllTimesheetsTable component.
 */
interface AllTimeSheettableProps {
  timesheetData: TimesheetDataTable[];
  setTimeSheetData: (data: TimesheetDataTable[]) => void;
  daysOfWeek: WeekDaysData[];
}

/**
 * AllTimesheetsTable component displays and manages timesheet entries.
 *
 * @param {AllTimeSheettableProps} props - The component's props.
 * @returns {JSX.Element} The rendered table component.
 */
const AllTimesheetsTable: React.FC<AllTimeSheettableProps> = ({
  timesheetData,
  setTimeSheetData,
  daysOfWeek,
}) => {
  const [localTimesheetData, setLocalTimesheetData] = useState<
    TimesheetDataTable[]
  >([]);
  const [localIdCounter, setLocalIdCounter] = useState<number>(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const addButtonWrapperRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectList | null>();
  const [selectedTask, setSelectedTask] = useState<CategoryList | null>(null);
  const [showTaskDetailModal, setTaskDetailModal] = useState<boolean>(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [modalString, setModalString] = useState<string>("");

  const textAreaOnclick = (row: TimesheetDataTable) => {
    setEditingRowId(row.local_id!);
    setModalString(row.task_detail);
    setTaskDetailModal(!showTaskDetailModal);
  };

  // Add local IDs to initial timesheet data when it changes
  useEffect(() => {
    const timesheetDataWithLocalIds = timesheetData?.map((entry, index) => {
      return {
        ...entry,
        local_id: index + 1,
      };
    });
    setLocalIdCounter(timesheetData?.length + 1);
    setLocalTimesheetData(timesheetDataWithLocalIds);
  }, [timesheetData]);

  const setTaskDetail = (newValue: string) => {
    setLocalTimesheetData((previous) =>
      previous.map((data) =>
        data.local_id === editingRowId
          ? { ...data, task_detail: newValue }
          : data
      )
    );
  };

  /**
   * Adds a new row to the timesheet when a project and task are selected.
   */
  useEffect(() => {
    if (selectedProject && selectedTask) {
      const newRow: TimesheetDataTable = {
        local_id: localIdCounter + 1, // Automatically assign local ID
        category_name: selectedTask.category,
        project_name: selectedProject.project_name,
        project_id: selectedProject.id,
        task_category_id: selectedTask._id,
        task_detail: "",
        data_sheet: daysOfWeek.map((day) => ({
          day_of_week: day.name,
          date: day.date,
          hours: "00:00",
          is_holiday: day.isHoliday,
          is_disable: day.isDisabled,
        })),
        status: "in_progress",
      };

      const updatedData = [...localTimesheetData, newRow];
      setLocalTimesheetData(updatedData);
      setTimeSheetData(updatedData);
      setLocalIdCounter((prevCounter) => prevCounter + 1); // Increment local ID counter
      setModalVisible(false);
      setShowSubModal(false);
      setSelectedProject(null);
      setSelectedTask(null);
    }
  }, [selectedProject, selectedTask, localTimesheetData, setTimeSheetData]);

  /**
   * Handles the time input change for a specific day in a specific row.
   *
   * @param {number} index - The index of the timesheet entry.
   * @param {WeekDaysData} day - The day of the week for the time entry.
   * @param {string} newTime - The new time value.
   */
  const handleTimeChange = (
    index: number,
    day: WeekDaysData,
    newTime: string
  ) => {
    const updatedData = [...localTimesheetData];
    const dayIndex = daysOfWeek.indexOf(day);
    updatedData[index].data_sheet[dayIndex].hours = newTime;
    setLocalTimesheetData(updatedData);
    setTimeSheetData(updatedData);
    setUnsavedChanges(true);
  };

  /**
   * Calculates the total hours worked for a specific row.
   *
   * @param {TimeEntry[]} entries - The time entries for a row.
   * @returns {string} The total hours as a string in HH:MM format.
   */
  const calculateTotalHours = (entries: TimeEntry[]) => {
    const totalMinutes = entries.reduce(
      (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
      0
    );
    return minutesToTime(totalMinutes);
  };

  /**
   * Maps the time entries to corresponding week days for rendering.
   *
   * @param {TimeEntry[]} entries - The time entries.
   * @param {number} index - The index of the timesheet entry.
   * @returns {Record<string, ReactNode>} A map of week days to JSX time input components.
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
          readOnly={
            localTimesheetData[index].status === "accepted" ||
            localTimesheetData[index].status === "submitted"
              ? true
              : false
          }
        />
      );
    });
    return weekMap;
  };

  /**
   * Deletes a row from the timesheet.
   *
   * @param {number} indexToDelete - The index of the row to delete.
   */
  const handleDeleteRow = async(idToDelete: number, timesheetId?:string) => {
    const updatedData = localTimesheetData.filter(
      (data) => data.local_id !== idToDelete
    );
    if(timesheetId){
      const response = await UseAllTimesheetsServices().deleteTimesheet(timesheetId);
      console.log(response);
    }
    setLocalTimesheetData(updatedData);
    setTimeSheetData(updatedData);
  };

  /**
   * Saves the current timesheet data.
   */
  const handleSave = async () => {
    setTimeSheetData(localTimesheetData);
    setUnsavedChanges(false);
    const response = await UseAllTimesheetsServices().saveAllTimesheets(localTimesheetData);
    setTimeSheetData(response.data!);
    if(response.status === true){
      message.success("Timesheet saved successfully");
    }else{
      message.error("Error on saving timesheet");
    }
  };

  /**
   * Submits the timesheet data after saving.
   */
  const handleSubmit = async() => {
    const response = await UseAllTimesheetsServices().submitAllTimesheets(timesheetData);
    console.log(response)
  };



  /**
   * Adds a new row with default values for task, details, and time entries.
   * @returns {Record<string, ReactNode>} The new row with default values.
   */
  const addRow = () => ({
    task: (
      <div ref={addButtonWrapperRef} className={styles.addButtonWrapper}>
        <button
          className={styles.addButton}
          ref={addButtonRef}
          onClick={() => setModalVisible(true)}
        >
          <span>{Icons.plusGold}</span> Add tasks
        </button>
        <DropDownModal
          isVisible={isModalVisible}
          content={
            <ProjectSelector
              showSubmodal={showSubModal}
              setShowSubmodal={setShowSubModal}
              setSelectedProject={setSelectedProject}
            />
          }
          theme="white"
          onClose={() => setModalVisible(false)}
          parentRef={addButtonWrapperRef}
          showSubModal={showSubModal}
          subModalContent={
            <TaskSelector
              projectId={selectedProject?.id}
              setSelectedTask={setSelectedTask}
            />
          }
        />
      </div>
    ),
    details: (
      <TextAreaButton buttonvalue="Add task description" disabled value="" />
    ),
    ...daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day.name]: <TimeInput value="00:00" disabled />,
      }),
      {}
    ),
    total: (
      <span className={styles.rowWiseTotal}>
        <p>0:00</p>
      </span>
    ),
    action: <span>{Icons.deleteDisabled}</span>,
  });

  /**
   * Calculates the total hours worked for each day across all rows.
   *
   * @returns {Record<string, number>} A map of day names to total minutes worked.
   */
  const calculateTotalByDay = () => {
    const dailyTotals: Record<string, number> = {};
    daysOfWeek.forEach((day) => {
      dailyTotals[day.name] = localTimesheetData?.reduce((total, timesheet) => {
        const dayIndex = daysOfWeek.indexOf(day);
        const dayEntry = timesheet.data_sheet[dayIndex];
        return total + timeToMinutes(dayEntry?.hours || "00:00");
      }, 0);
    });

    return dailyTotals;
  };

  /**
   * Returns a row representing the total hours worked across all rows.
   * @returns {Record<string, ReactNode>} The total row with hours calculated for each day.
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

  // Define the columns for the table
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
    {
      title: "",
      key: "action",
      width: 50,
    },
  ];

  // Prepare the data for the table rows
  const data = localTimesheetData ? localTimesheetData?.map((timesheet, index) => {
    const totalHours = calculateTotalHours(timesheet.data_sheet);
    const taskStatusClass =
      timesheet.status === "accepted"
        ? styles.approved
        : timesheet.status === "rejected"
        ? styles.rejected
        : "";

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
          onclickFunction={() => textAreaOnclick(timesheet)}
          showTaskDetailModal={
            editingRowId === timesheet.local_id && showTaskDetailModal
          }
          value={modalString}
          setvalue={setTaskDetail}
          readOnly={
            timesheet.status === "accepted" || timesheet.status === "submitted"
          }
        />
      ),
      ...mapTimeEntriesToWeek(timesheet.data_sheet, index),
      total: (
        <span className={styles.rowWiseTotal}>
          <p>{totalHours}</p>
        </span>
      ),
      action: (
        <button
          className={styles.deleteButton}
          disabled={
            timesheet.status === "accepted" || timesheet.status === "submitted"
          }
        >
          <span
            className={styles.deleteButton}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteRow(timesheet.local_id!,timesheet.timesheet_id)}
          >
            {Icons.deleteActive}
          </span>
        </button>
      ),
    };
  }): [] ;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.scrollContainer}>
        <div className={styles.tableWrapper}>
          <CustomTable
            columns={columns}
            data={[...data, addRow(), totalRow()]}
          />
        </div>
      </div>
      <div className={styles.actionButtons}>
        <ButtonComponent label="Save" theme="black" onClick={handleSave} />
        <ButtonComponent label="Submit" theme="white" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AllTimesheetsTable;
