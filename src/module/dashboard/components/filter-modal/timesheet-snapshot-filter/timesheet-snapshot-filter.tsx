import React, { useState } from "react";
import styles from "./timesheet-snapshot-filter.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import ButtonComponent from "@/themes/components/button/button";
import TabbedComponent from "@/themes/components/tabbed-filter/tabbed-filter";
import RadioComponent from "@/themes/components/radio-button/radio-button";
import { RadioChangeEvent } from "antd";

interface TimeSheetSnapshotFilterProps {
  onFilterApply: (filters: {
    year?: number | null;
    month?: number | null;
  }) => void;
  onClose: () => void;
  appliedFilters?: {
    year?: number | null;
    month?: number | null;
  };
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
  onFilterApply,
  onClose,
  appliedFilters = {},
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(
    appliedFilters.year ?? null
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    appliedFilters.month ?? null
  );

  const handleYearChange = (e: RadioChangeEvent) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear); // Assuming you have a state to set the selected year
  };

  const handleMonthChange = (e: RadioChangeEvent) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth); // Assuming you have a state to set the selected month
  };

  const handleApplyChange = () => {
    onFilterApply({
      year: selectedYear ?? null,
      month: selectedMonth ?? null,
    });
    onClose();
  };

  const yearFilterContent = (
    <div className={styles.yearFilter}>
       {Array.from({ length: 20 }, (_, i) => 2030 - i).map((year) => (
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
            value={index + 1}
            onChange={handleMonthChange}
          />
          {month}
        </label>
      ))}
    </div>
  );

  const handleClearAll = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
    onFilterApply({
      year: null,
      month: null,
    });
  };

  return (
    <ModalComponent
      isVisible={true}
      title={"Filter"}
      topButtonContent={
        <ButtonComponent
          label="Clear All"
          theme="golden"
          onClick={handleClearAll}
        />
      }
      content={
        <TabbedComponent
          tabs={[
            { name: "Year", content: yearFilterContent },
            { name: "Month", content: monthFilterContent },
          ]}
          classTabbedComponent={styles.classTabbedComponent}
        />
      }
      bottomContent={
        <>
          <ButtonComponent label="Cancel" theme="white" onClick={onClose} />
          <ButtonComponent
            label="Apply"
            theme="black"
            onClick={handleApplyChange}
            disabled={selectedYear===null || selectedMonth ===null ? true : false}
          />
        </>
      }
      theme="normal"
      onClose={onClose}
      className={styles.modalDiv}
      classTitle={styles.classTitle}
      classTopButton={styles.classTopButton}
    />
  );
};

export default TimeSheetSnapshotFilter;
