import React, { useState, useEffect } from "react";
import styles from "./timesheet-snapshot-filter.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import ButtonComponent from "@/themes/components/button/button";
import TabbedComponent from "@/themes/components/tabbed-filter/tabbed-filter";

interface TimeSheetSnapshotFilterProps {
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

const TimeSheetSnapshotFilter: React.FC<TimeSheetSnapshotFilterProps> = ({
  onYearChange,
  onMonthChange,
  onClose,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [tempYear, setTempYear] = useState<number | null>(null);
  const [tempMonth, setTempMonth] = useState<number | null>(null);

  const currentYear = new Date().getFullYear();

  // Synchronize temp values with selected values when modal is opened
  useEffect(() => {
    setTempYear(selectedYear);
    setTempMonth(selectedMonth);
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (year: number) => {
    setTempYear(year);
  };

  const handleMonthChange = (month: number) => {
    setTempMonth(month);
  };

  const handleApplyChange = () => {
    const finalYear = tempYear !== null ? tempYear : currentYear;

    if (tempMonth !== null) {
      onYearChange(finalYear);
      onMonthChange(tempMonth);
      setSelectedYear(finalYear);
      setSelectedMonth(tempMonth);
    } else if (tempYear !== null) {
      onYearChange(tempYear);
      setSelectedYear(tempYear);
    }

    onClose(); // Close the modal
  };

  const yearFilterContent = (
    <div className={styles.yearFilter}>
      {[
        2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019,
        2018, 2017, 2016,
      ].map((year) => (
        <label key={year} className={styles.radioLabel}>
          <input
            type="radio"
            name="year"
            value={year}
            checked={tempYear === year}
            onChange={() => handleYearChange(year)}
            className={styles.radioInput}
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
          <input
            type="radio"
            name="month"
            value={index + 1}
            checked={tempMonth === index + 1}
            onChange={() => handleMonthChange(index + 1)}
            className={styles.radioInput}
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
