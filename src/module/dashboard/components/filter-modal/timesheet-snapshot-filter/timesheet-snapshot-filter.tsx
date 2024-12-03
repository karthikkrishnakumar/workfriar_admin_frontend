import React, { useState } from "react";
import styles from "./timesheet-snapshot-filter.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import ButtonComponent from "@/themes/components/button/button";

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
  const [selectedTab, setSelectedTab] = useState<"year" | "month">("year");
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // Temporary states for holding the values until "Apply" is clicked
  const [tempYear, setTempYear] = useState<number>(selectedYear);
  const [tempMonth, setTempMonth] = useState<number | null>(selectedMonth);

  const handleTabChange = (tab: "year" | "month") => {
    setSelectedTab(tab);
  };

  const handleYearChange = (year: number) => {
    setTempYear(year);  // Use temporary year state
  };

  const handleMonthChange = (month: number) => {
    setTempMonth(month);  // Use temporary month state
  };

  const handleApplyChange = () => {
    // Apply the selected year and month when the "Apply" button is clicked
    onYearChange(tempYear);
    if (tempMonth !== null) {
      onMonthChange(tempMonth);
    }
    onClose();  // Close the modal after applying the filter
  };

  return (
    <ModalComponent
      isVisible={true}
      title={"Filter"}
      content={
        <div className={styles.timeSheetSnapshotFilter}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${
                selectedTab === "year" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("year")}
            >
              Year
            </button>
            <button
              className={`${styles.tabButton} ${
                selectedTab === "month" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("month")}
            >
              Month
            </button>
          </div>
          {selectedTab === "year" && (
            <div className={styles.yearFilter}>
              {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map(
                (year) => (
                  <label key={year} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="year"
                      value={year}
                      checked={tempYear === year}  // Use tempYear for checking
                      onChange={() => handleYearChange(year)}
                      className={styles.radioInput}
                    />
                    {year}
                  </label>
                )
              )}
            </div>
          )}
          {selectedTab === "month" && (
            <div className={styles.monthFilter}>
              {months.map((month, index) => (
                <label key={index} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="month"
                    value={index}
                    checked={tempMonth === index}  // Use tempMonth for checking
                    onChange={() => handleMonthChange(index)}
                    className={styles.radioInput}
                  />
                  {month}
                </label>
              ))}
            </div>
          )}
        </div>
      }
      bottomContent={
        <>
          <ButtonComponent label="Cancel" theme="white" onClick={onClose} />
          <ButtonComponent label="Apply" theme="black" onClick={handleApplyChange} />
        </>
      }
      theme="normal"
      onClose={onClose}
      className={styles.modalDiv}
    />
  );
};

export default TimeSheetSnapshotFilter;
