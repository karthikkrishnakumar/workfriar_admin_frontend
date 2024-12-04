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

import { TimeEntry, TimesheetDataTable } from "../../services/time-sheet-services";


interface AllTimeSheettableProps {
  timesheetData?: TimesheetDataTable[];
  setTimeSheetData: (data: TimesheetDataTable[]) => void;
}

const AllTimesheetsTable: React.FC<AllTimeSheettableProps> = ({
  timesheetData: initialTimesheetData = [],
  setTimeSheetData,
}) => {
  const [timesheetData, setLocalTimesheetData] = useState<TimesheetDataTable[]>(initialTimesheetData);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [isModalVisible, setModalVisible] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const addButtonWrapperRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);


  // Convert hours and minutes into total minutes
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map((unit) => parseInt(unit, 10));
    return hours * 60 + minutes;
  };

  // Convert total minutes back into hours and minutes
  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes}`;
  };

  // Reset modal states when project or task is selected
  useEffect(() => {
    if (selectedProject && selectedTask) {
      const newRow: TimesheetDataTable = {
        categoryName: selectedTask,
        projectName: selectedProject,
        taskDetail: "Add task description", // Set default task description
        dataSheet: daysOfWeek.map(() => ({
          date: "",
          hours: "00:00",
          isHoliday: false,
        })),
        status: "pending", // Default status
        timesheetId: String(timesheetData.length + 1),
      };

      const updatedData = [...timesheetData, newRow];
      setLocalTimesheetData(updatedData);
      setTimeSheetData(updatedData);

      // Reset modal and selection states
      setModalVisible(false);
      setShowSubModal(false);
      setSelectedProject(null);
      setSelectedTask(null);
    }
  }, [selectedProject, selectedTask, timesheetData, setTimeSheetData]);

  // Handle change in time input
  const handleTimeChange = (index: number, day: string, newTime: string) => {
    const updatedData = [...timesheetData];
    const dayIndex = daysOfWeek.indexOf(day);
    updatedData[index].dataSheet[dayIndex].hours = newTime;

    // Update the local state
    setLocalTimesheetData(updatedData);
    setTimeSheetData(updatedData);
  };

  // Calculate total hours for a row (task)
  const calculateTotalHours = (entries: TimeEntry[]) => {
    const totalMinutes = entries.reduce(
      (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
      0
    );
    return minutesToTime(totalMinutes);
  };

  // Map time entries to corresponding week days
  const mapTimeEntriesToWeek = (entries: TimeEntry[], index: number): Record<string, ReactNode> => {
    const weekMap: Record<string, ReactNode> = {};
    daysOfWeek.forEach((day, dayIndex) => {
      const entry = entries[dayIndex] || { hours: "00:00", isHoliday: false, date: "" };
      weekMap[day] = (
        <TimeInput
          value={entry.hours}
          disabled={entry.isHoliday}
          setValue={(newTime) => handleTimeChange(index, day, newTime)}  // Use setValue here
        />
      );
    });
    return weekMap;
  };

  const handleDeleteRow = (indexToDelete: number) => {
    const updatedData = timesheetData.filter((_, index) => index !== indexToDelete);
    setLocalTimesheetData(updatedData);
    setTimeSheetData(updatedData);
  };

  const columns = [
    { title: "Task", key: "task", width: 140 },
    {
      title: <span style={{ width: "100px" }}>Task Details</span>,
      key: "details",
      width: 155,
    },
    ...daysOfWeek.map((day) => ({
      title: day,
      key: day,
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
    const taskStatusClass = timesheet.status === "approved" ? styles.approved : timesheet.status === "rejected" ? styles.rejected : '';


    return {
      task: (
        <div className={`${styles.tableDataCell} ${taskStatusClass}`}>
          <span className={styles.taskName}>{timesheet.categoryName}</span>
          <span className={styles.projectName}>{timesheet.projectName}</span>
        </div>
      ),
      details: <TextAreaButton buttonvalue={timesheet.taskDetail} />,
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
            <TaskSelector setSelectedTask={setSelectedTask} />
          }
        />
      </div>
    ),
    details: <TextAreaButton buttonvalue="Add task description" disabled />,
    Mon: <TimeInput value="00:00" disabled />,
    Tue: <TimeInput value="00:00" disabled />,
    Wed: <TimeInput value="00:00" disabled />,
    Thu: <TimeInput value="00:00" disabled />,
    Fri: <TimeInput value="00:00" disabled />,
    Sat: <TimeInput value="00:00" disabled />,
    Sun: <TimeInput value="00:00" disabled />,
    total: (
      <span className={styles.rowWiseTotal}>
        <p>0:00</p>
      </span>
    ),

    action: <span>{Icons.deleteDisabled}</span>,
  });

  const calculateTotalByDay = () => {
    const dailyTotals: Record<string, number> = {};

    daysOfWeek.forEach((day) => {
      dailyTotals[day] = timesheetData.reduce((total, timesheet) => {
        const dayIndex = daysOfWeek.indexOf(day);
        const dayEntry = timesheet.dataSheet[dayIndex];
        return total + timeToMinutes(dayEntry?.hours || "00:00");
      }, 0);
    });


    return dailyTotals;
  };

  const totalRow = () => {
    const dailyTotals = calculateTotalByDay();
    const totalAllDays = Object.values(dailyTotals).reduce((a, b) => a + b, 0);

    return {
      task: <span className={styles.totalRowTask}>Total</span>,
      details: <span></span>,
      ...Object.fromEntries(
        daysOfWeek.map((day) => [day, <span>{minutesToTime(dailyTotals[day])}</span>])
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

  const finalData = [...data, addRow(), totalRow()];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.scrollContainer}>
        <div className={styles.tableWrapper}>

          <CustomTable columns={columns} data={finalData} />
        </div>
      </div>
      <div className={styles.actionButtons}>
        <ButtonComponent label="Submit" theme="black" />
        <ButtonComponent label="Save" theme="white" />
      </div>
    </div>
  );
};

export default AllTimesheetsTable;
