import React, { useState } from "react";
import styles from "./timesheet-report-filter.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import ButtonComponent from "@/themes/components/button/button";
import "react-datepicker/dist/react-datepicker.css"; // Include its styles
import TabbedComponent from "@/themes/components/tabbed-filter/tabbed-filter";
import CustomDatePicker from "@/themes/components/datepicker-calender/datepicker-calender";

interface TimeSheetReportFilterProps {
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onClose: () => void;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const projects = ["Project A", "Project B", "Project C"];
const employees = ["Employee 1", "Employee 2", "Employee 3"];

const TimeSheetReportFilter: React.FC<TimeSheetReportFilterProps> = ({
  onYearChange,
  onMonthChange,
  onClose,
}) => {
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const tabs = [
    {
      name: "Project",
      content: (
        <div className={styles.projectFilter}>
          {projects.map((project) => (
            <label key={project} className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkboxInput} />
              {project}
            </label>
          ))}
        </div>
      ),
    },
    {
      name: "Employee",
      content: (
        <div className={styles.employeeFilter}>
          {employees.map((employee) => (
            <label key={employee} className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkboxInput} />
              {employee}
            </label>
          ))}
        </div>
      ),
    },
    {
      name: "Year",
      content: (
        <div className={styles.yearFilter}>
          {[2024, 2023, 2022, 2021].map((year) => (
            <label key={year} className={styles.radioLabel}>
              <input
                type="radio"
                name="year"
                value={year}
                className={styles.radioInput}
                onChange={() => onYearChange(year)}
              />
              {year}
            </label>
          ))}
        </div>
      ),
    },
    {
      name: "Month",
      content: (
        <div className={styles.monthFilter}>
          {months.map((month, index) => (
            <label key={index} className={styles.radioLabel}>
              <input
                type="radio"
                name="month"
                value={index}
                className={styles.radioInput}
                onChange={() => onMonthChange(index)}
              />
              {month}
            </label>
          ))}
        </div>
      ),
    },

    {
      name: "Period",
      content: (
        <div className={styles.periodFilter}>
          <CustomDatePicker />
        </div>
      ),
    },
  ];

  return (
    <ModalComponent
      isVisible={true}
      title={"Filter"}
      content={<TabbedComponent tabs={tabs} />}
      bottomContent={
        <>
          <ButtonComponent label="Cancel" theme="white" onClick={onClose} />
          <ButtonComponent label="Apply" theme="black" />
        </>
      }
      theme="normal"
      onClose={onClose}
      className={styles.modalDiv}
    />
  );
};

export default TimeSheetReportFilter;
