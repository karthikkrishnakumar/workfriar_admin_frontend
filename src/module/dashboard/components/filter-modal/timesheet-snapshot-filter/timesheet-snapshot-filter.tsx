import React, { useState} from "react";
import styles from "./timesheet-snapshot-filter.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import ButtonComponent from "@/themes/components/button/button";
import TabbedComponent from "@/themes/components/tabbed-filter/tabbed-filter";
import RadioComponent from "@/themes/components/radio-button/radio-button";
import { RadioChangeEvent } from "antd";

interface TimeSheetSnapshotFilterProps {
  onYearChange: (year: number | null) => void;
  onMonthChange: (month: number | null) => void;
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

const TimeSheetSnapshotFilter: React.FC<TimeSheetSnapshotFilterProps> = ({
  onYearChange,
  onMonthChange,
  onClose,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // const currentYear = new Date().getFullYear();

  const handleYearChange  = (e: RadioChangeEvent) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear); // Assuming you have a state to set the selected year
  };

  const handleMonthChange = (e: RadioChangeEvent) => {
      const selectedMonth = e.target.value;
      setSelectedMonth(selectedMonth); // Assuming you have a state to set the selected month
    };

  const handleApplyChange = () => {


   
      onYearChange(selectedYear);
      onMonthChange(selectedMonth);
      

    onClose(); // Close the modal
  };

  const yearFilterContent = (
    <div className={styles.yearFilter}>
      {[
        2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019,
        2018, 2017, 2016,
      ].map((year) => (
        <label key={year} className={styles.radioLabel}>
          <RadioComponent
                checkedValue={selectedYear}
                value={year}
                onChange={handleYearChange}
              />
          {year}
        </label>
      ))}
    </div>
  );

  const monthFilterContent = (
    <div className={styles.monthFilter}>
      {months.map((month, index) => (
        <label key={index} className={styles.radioLabel}>
          <RadioComponent
                checkedValue={selectedMonth}
                value={month}
                onChange={handleMonthChange}
              />
          {month}
        </label>
      ))}
    </div>
  );

  return (
    <ModalComponent
      isVisible={true}
      title={"Filter"}
      content={
        <TabbedComponent
          tabs={[
            { name: "Year", content: yearFilterContent },
            { name: "Month", content: monthFilterContent },
          ]}
        />
      }
      bottomContent={
        <>
          <ButtonComponent label="Cancel" theme="white" onClick={onClose} />
          <ButtonComponent
            label="Apply"
            theme="black"
            onClick={handleApplyChange}
          />
        </>
      }
      theme="normal"
      onClose={onClose}
      className={styles.modalDiv}
    />
  );
};

export default TimeSheetSnapshotFilter;
