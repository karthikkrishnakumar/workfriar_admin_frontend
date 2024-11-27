"use client";
import React, { ReactNode, useRef, useState } from "react";
import CustomTable from "@/themes/components/custom-table/custom-table";
import styles from "./all-timesheets.module.scss";
import TimeInput from "@/themes/components/time-input/time-input";
import Icons from "@/themes/images/icons/icons";
import DropDownModal from "@/themes/components/drop-down-modal/drop-down-modal";
import ProjectSelector from "../project-selector/project-selector";

// Interface for the time entry data
interface TimeEntry {
  date: string;
  hours: string;
  holiday: boolean;
}

// Interface for the timesheet data from backend
interface TimesheetData {
  task: string | ReactNode;
  project: string;
  details: string;
  dates: TimeEntry[];
  status: string;
}

const AllTimesheetsTable = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);
  const addButtonWrapperRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  // Sample timesheet data (you should fetch this from the backend)
  const timesheetData: TimesheetData[] = [
    {
      task: "UI/UX Design",
      project: "Danti",
      details: "Bug analysis",
      dates: [
        { date: "2022-01-01", hours: "08:00", holiday: false },
        { date: "2022-01-02", hours: "10:30", holiday: false },
        { date: "2022-01-03", hours: "06:45", holiday: false },
        { date: "2022-01-04", hours: "04:50", holiday: false },
        { date: "2022-01-05", hours: "0", holiday: true },
      ],
      status: "approved",
    },
  ];

  // State to hold timesheet data
  const [taskData, setTaskData] = useState(timesheetData);

  // Function to calculate total hours for a task
  const calculateTotalHours = (dates: TimeEntry[]) => {
    return dates.reduce((total, entry) => total + parseFloat(entry.hours), 0);
  };

  // Define columns for the table (now with ReactNode support for placeholders and edit fields)
  const columns = [
    { title: "Task", key: "task" },
    { title: "Task details", key: "details" },
    ...["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
      title: day,
      key: day,
    })),
    { title: "Total", key: "total" },
  ];

  // Map days of the week to the corresponding index (Mon to Sun)
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Transform the task data into row data that CustomTable can accept
  const data = taskData.map((task, taskIndex) => {
    return {
      task: task.task,
      details: task.details,
      ...task.dates.reduce<{ [key: string]: React.ReactNode }>(
        (acc, dateEntry, dateIndex) => {
          const dayOfWeek = daysOfWeek[dateIndex]; // Get the correct day of the week
          acc[dayOfWeek] = (
            <TimeInput value={dateEntry.hours} disabled={dateEntry.holiday} />
          );
          return acc;
        },
        {}
      ),
      total: (
        <span className={styles.rowWiseTotal}>
          <p>{calculateTotalHours(task.dates).toFixed(2)}</p>
        </span>
      ),
    };
  });

  const addRow = () => ({
    task: (
      <div ref={addButtonWrapperRef} className={styles.addButtonWrapper}>
        <button className={styles.addButton} ref={addButtonRef} onClick={toggleModal}>
          <span>{Icons.plusGold}</span> Add tasks
        </button>
        <DropDownModal
          isVisible={isModalVisible}
          content={<ProjectSelector />}
          theme="white"
          onClose={() => setModalVisible(false)}
          parentRef={addButtonWrapperRef}
          offsetTop={-290}
          offsetLeft={0}
        />
      </div>
    ),
    details: "New details",
    Mon: <TimeInput value="00:00" disabled={true} />,
    Tue: <TimeInput value="00:00" disabled={true} />,
    Wed: <TimeInput value="00:00" disabled={true} />,
    Thu: <TimeInput value="00:00" disabled={true} />,
    Fri: <TimeInput value="00:00" disabled={true} />,
    Sat: <TimeInput value="00:00" disabled={true} />,
    Sun: <TimeInput value="00:00" disabled={true} />,
    total: <span className={styles.rowWiseTotal}><p>0</p></span>,
  });

  const totalRow = () => ({
    task: "Total",
    details: "",
    Mon: "00:00",
    Tue: "00:00",
    Wed: "00:00",
    Thu: "00:00",
    Fri: "00:00",
    Sat: "00:00",
    Sun: "00:00",
    total: <span className={styles.rowWiseTotal}><p>00:00</p></span>,
    flag: "rowOfTotal",
  });

  // Correctly mutate the data array by pushing a new row
  data.push(addRow());
  data.push(totalRow());

  return (
    <div className={styles.tableWrapper}>
      <CustomTable columns={columns} data={data} />
    </div>
  );
};

export default AllTimesheetsTable;