"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import CustomTable from "@/themes/components/custom-table/custom-table";
import styles from "./all-timesheets.module.scss";
import TimeInput from "@/themes/components/time-input/time-input";
import Icons from "@/themes/images/icons/icons";
import DropDownModal from "@/themes/components/drop-down-modal/drop-down-modal";
import ProjectSelector from "../project-selector/project-selector";
import TaskSelector from "../task-selector/task-selector";
import TextAreaButton from "../text-area-button/text-area-button";
import ButtonComponent from "@/themes/components/button/button";
import CustomMenu from "@/themes/menu-component/menu-component";

interface TimeEntry {
  date: string;
  hours: string;
  holiday: boolean;
}

interface TimesheetData {
  task: ReactNode;
  project: string;
  details: ReactNode;
  dates: TimeEntry[];
  status: string;
}

const AllTimesheetsTable = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (isModalVisible) {
      setShowSubModal(!showSubModal);
    } else {
      setShowSubModal(false);
    }
  };

  const addButtonWrapperRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const timesheetData: TimesheetData[] = [
    {
      task: "UI/UX Design",
      project: "Danti",
      details: <TextAreaButton buttonvalue="Bug analysis" />,
      dates: [
        { date: "2022-01-01", hours: "08:00", holiday: false },
        { date: "2022-01-02", hours: "10:30", holiday: false },
        { date: "2022-01-03", hours: "06:45", holiday: false },
        { date: "2022-01-04", hours: "04:50", holiday: false },
        { date: "2022-01-05", hours: "0", holiday: true },
        { date: "2022-01-06", hours: "08:00", holiday: false },
        { date: "2022-01-07", hours: "08:15", holiday: false },
        { date: "2022-01-08", hours: "01:30", holiday: false },
      ],
      status: "pending",
    },
    {
      task: "UI/UX Design",
      project: "Danti",
      details: <TextAreaButton buttonvalue="Bug analysis" />,
      dates: [
        { date: "2022-01-01", hours: "08:00", holiday: false },
        { date: "2022-01-02", hours: "10:30", holiday: false },
        { date: "2022-01-03", hours: "06:45", holiday: false },
        { date: "2022-01-04", hours: "04:50", holiday: false },
        { date: "2022-01-05", hours: "0", holiday: true },
        { date: "2022-01-06", hours: "08:00", holiday: false },
        { date: "2022-01-07", hours: "08:15", holiday: false },
        { date: "2022-01-08", hours: "01:30", holiday: false },
      ],
      status: "pending",
    }, {
      task: "UI/UX Design",
      project: "Danti",
      details: <TextAreaButton buttonvalue="Bug analysis" />,
      dates: [
        { date: "2022-01-01", hours: "08:00", holiday: false },
        { date: "2022-01-02", hours: "10:30", holiday: false },
        { date: "2022-01-03", hours: "06:45", holiday: false },
        { date: "2022-01-04", hours: "04:50", holiday: false },
        { date: "2022-01-05", hours: "0", holiday: true },
        { date: "2022-01-06", hours: "08:00", holiday: false },
        { date: "2022-01-07", hours: "08:15", holiday: false },
        { date: "2022-01-08", hours: "01:30", holiday: false },
      ],
      status: "pending",
    }, {
      task: "UI/UX Design",
      project: "Danti",
      details: <TextAreaButton buttonvalue="Bug analysis" />,
      dates: [
        { date: "2022-01-01", hours: "08:00", holiday: false },
        { date: "2022-01-02", hours: "10:30", holiday: false },
        { date: "2022-01-03", hours: "06:45", holiday: false },
        { date: "2022-01-04", hours: "04:50", holiday: false },
        { date: "2022-01-05", hours: "0", holiday: true },
        { date: "2022-01-06", hours: "08:00", holiday: false },
        { date: "2022-01-07", hours: "08:15", holiday: false },
        { date: "2022-01-08", hours: "01:30", holiday: false },
      ],
      status: "pending",
    }

   
  ];

  const [taskData, setTaskData] = useState<TimesheetData[]>(timesheetData);

  const calculateTotalHours = (dates: TimeEntry[]) => {
    return dates.reduce(
      (total, entry) => total + parseFloat(entry.hours || "0"),
      0
    );
  };

  const columns = [
    { title: "Task", key: "task", width: 140 },
    {
      title: <span style={{ width: "100px" }}>Task Details</span>,
      key: "details",
      width: 155,
    },
    ...["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
      title: day,
      key: day,
    })),
    { title: "Total", key: "total", width: 70 },
    {
      title: "",
      key: "action",
      width: 50, // Add custom width for action column
    },
  ];

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = taskData.map((task, taskIndex) => ({
    task: (
      <div>
        <span className={styles.taskName}>{task.task}</span>
        <span className={styles.projectName}>{task.project}</span>
      </div>
    ),
    details: task.details,
    ...task.dates.reduce<{ [key: string]: ReactNode }>(
      (acc, dateEntry, dateIndex) => {
        const dayOfWeek = daysOfWeek[dateIndex];
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
    action: (
      <span>
        {task.status === "pending" ? Icons.deleteActive : Icons.deleteDisabled}
      </span>
    ), // Ensure this is a React element
  }));

  const addRow = () => ({
    task: (
      <div ref={addButtonWrapperRef} className={styles.addButtonWrapper}>
        <button
          className={styles.addButton}
          ref={addButtonRef}
          onClick={toggleModal}
        >
          <span>{Icons.plusGold}</span> Add tasks
        </button>

        {/* testing custom antd menu component */}
        {/* <CustomMenu
          isVisible={isModalVisible}
          content={
            <ProjectSelector
              showSubmodal={showSubModal}
              setShowSubmodal={setShowSubModal}
            />
          }
          theme="white"
          onClose={() => setModalVisible(false)}
          parentRef={addButtonWrapperRef}
          offsetLeft={5}
          showSubModal={true}
          subModalContent={<TaskSelector />}
        /> */}

        {/* Original drop down modal */}
        <DropDownModal
          isVisible={isModalVisible}
          content={
            <ProjectSelector
              showSubmodal={showSubModal}
              setShowSubmodal={setShowSubModal}
            />
          }
          theme="white"
          onClose={() => setModalVisible(false)}
          parentRef={addButtonWrapperRef}
          showSubModal={showSubModal}
          subModalContent={<TaskSelector />}
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
        <p>0.00</p>
      </span>
    ),
    action: <span>{Icons.deleteDisabled}</span>, // Change to a React element instead of empty string
  });

  const totalRow = () => ({
    task: <span className={styles.totalRowTask}>Total</span>,
    details: <span></span>,
    Mon: <span>00:00</span>,
    Tue: <span>00:00</span>,
    Wed: <span>00:00</span>,
    Thu: <span>00:00</span>,
    Fri: <span>00:00</span>,
    Sat: <span>00:00</span>,
    Sun: <span>00:00</span>,
    total: (
      <span className={styles.rowWiseTotal}>
        <p>00:00</p>
      </span>
    ),
    action: <span></span>, // Add action column to match other rows
    flag: "rowOfTotal",
  });

  data.push(addRow());
  data.push(totalRow());

  return (
    <div className={styles.mainContainer}>
      <div className={styles.scrollContainer}>
        <div className={styles.tableWrapper}>
          <CustomTable columns={columns} data={data} />
        </div>
      
      </div>
      <div className={styles.actionButtons}>
        <ButtonComponent label="Save" theme="white" />
        <ButtonComponent label="Submit" theme="black" />
      </div>
     
    </div>
  );
};

export default AllTimesheetsTable;
