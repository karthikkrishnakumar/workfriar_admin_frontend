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
  TimeEntry,
  TimesheetDataTable,
  WeekDaysData,
} from "../../services/time-sheet-services";
import {
  minutesToTime,
  timeToMinutes,
} from "@/utils/timesheet-utils/timesheet-time-formatter";

interface AllTimeSheettableProps {
  timesheetData?: TimesheetDataTable[];
  setTimeSheetData: (data: TimesheetDataTable[]) => void;
  daysOfWeek: WeekDaysData[];
}

const AllTimesheetsTable: React.FC<AllTimeSheettableProps> = ({
  timesheetData: initialTimesheetData = [],
  setTimeSheetData,
  daysOfWeek,
}) => {
  const [timesheetData, setLocalTimesheetData] =
    useState<TimesheetDataTable[]>(initialTimesheetData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const addButtonWrapperRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showTaskDetailModal, setTaskDetailModal] = useState<boolean>(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const textAreaOnclick = (rowIndex: number) => {
    setEditingRowIndex(rowIndex);
    setTaskDetailModal(!showTaskDetailModal);
  };
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  // Add a new row when a project and task are selected
  useEffect(() => {
    if (selectedProject && selectedTask) {
      const newRow: TimesheetDataTable = {
        categoryName: selectedTask,
        projectName: selectedProject,
        taskDetail: "Add task description",
        dataSheet: daysOfWeek.map((day) => ({
          weekday: day.name,
          date: day.date,
          hours: "00:00",
          isHoliday: day.isHoliday,
          isDisabled: day.isDisabled,
        })),
        status: "pending",
        timesheetId: String(timesheetData.length + 1),
      };

      const updatedData = [...timesheetData, newRow];
      setLocalTimesheetData(updatedData);
      setTimeSheetData(updatedData);
      setModalVisible(false);
      setShowSubModal(false);
      setSelectedProject(null);
      setSelectedTask(null);
    }
  }, [selectedProject, selectedTask, timesheetData, setTimeSheetData]);

  // Handle time input changes
  const handleTimeChange = (
    index: number,
    day: WeekDaysData,
    newTime: string
  ) => {
    const updatedData = [...timesheetData];
    const dayIndex = daysOfWeek.indexOf(day);
    updatedData[index].dataSheet[dayIndex].hours = newTime;
    setLocalTimesheetData(updatedData);
    setUnsavedChanges(true);
  };

  // Calculate total hours for a row
  const calculateTotalHours = (entries: TimeEntry[]) => {
    const totalMinutes = entries.reduce(
      (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
      0
    );
    return minutesToTime(totalMinutes);
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
          readOnly={timesheetData[index].status === "approved"? true : false}
        />
      );
    });
    return weekMap;
  };

  // Handle row deletion
  const handleDeleteRow = (indexToDelete: number) => {
    const updatedData = timesheetData.filter(
      (_, index) => index !== indexToDelete
    );
    setLocalTimesheetData(updatedData);
    setTimeSheetData(updatedData);
  };

  // Save button functionality
  const handleSave = () => {
    setTimeSheetData(timesheetData);
    setUnsavedChanges(false);
    alert("Changes saved successfully!");
    console.log(timesheetData);
  };

  // Submit button functionality
  const handleSubmit = () => {
    handleSave();
    alert("Timesheet data submitted successfully!");
  };

  // Add row component
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
          subModalContent={<TaskSelector setSelectedTask={setSelectedTask} />}
        />
      </div>
    ),
    details: <TextAreaButton buttonvalue="Add task description" disabled />,
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
            showTaskDetailModal={
              editingRowIndex === index && showTaskDetailModal
            }
            value={timesheetData[index].taskDetail} 
            setvalue={(newValue) => {
              const updatedData = [...timesheetData];
              updatedData[index].taskDetail = newValue;
              setLocalTimesheetData(updatedData);
              setTimeSheetData(updatedData);
            }}
            readOnly={timesheet.status === 'approved'}
          />
      ),
      ...mapTimeEntriesToWeek(timesheet.dataSheet, index),
      total: (
        <span className={styles.rowWiseTotal}>
          <p>{totalHours}</p>
        </span>
      ),
      action: (
        <button className={styles.deleteButton} disabled={timesheet.status === "approved"}>
          <span
            className={styles.deleteButton}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteRow(index)}
          >
            {Icons.deleteActive}
          </span>
        </button>
      ),
    };
  });

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