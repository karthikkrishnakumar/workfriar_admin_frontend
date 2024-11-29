import React, { useState } from "react";
import { Radio, RadioChangeEvent } from "antd";
import styles from "./timesheet-snapshot-filter.module.scss";
import ModalComponent from "@/themes/components/modal/modal";

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
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleYearChange = (e: RadioChangeEvent) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    onYearChange(year);
    setSelectedMonth(null);
  };

  const handleMonthChange = (e: RadioChangeEvent) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    onMonthChange(month);
  };

  return (
    <ModalComponent
      isVisible={true}
      title={"Filter"}
      content={
        <div className={styles.timeSheetSnapshotFilter}>
          <div className={styles.yearFilter}>
            <span className={styles.label}>Year:</span>
            <Radio.Group
              value={selectedYear.toString()}
              onChange={handleYearChange}
            >
              <Radio.Button value="2024">2024</Radio.Button>
              <Radio.Button value="2023">2023</Radio.Button>
              <Radio.Button value="2022">2022</Radio.Button>
              <Radio.Button value="2021">2021</Radio.Button>
              <Radio.Button value="2020">2020</Radio.Button>
              <Radio.Button value="2019">2019</Radio.Button>
            </Radio.Group>
          </div>
          {selectedYear && (
            <div className={styles.monthFilter}>
              <span className={styles.label}>Month:</span>
              <Radio.Group
                value={selectedMonth?.toString() || null}
                onChange={handleMonthChange}
              >
                {months.map((month, index) => (
                  <Radio.Button key={index} value={index.toString()}>
                    {month}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
          )}
        </div>
      }
      primaryButtonLabel={"Cancel"}
      secondaryButtonLabel={"Apply"}
      theme="normal"
      onClose={onClose}
    />
  );
};

export default TimeSheetSnapshotFilter;
