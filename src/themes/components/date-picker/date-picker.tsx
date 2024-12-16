import React, { useState, useEffect } from "react";
import styles from "./date-picker.module.scss";
import {
  formatDate,
  formatYear,
  findCurrentWeek,
  getDisabledWeeks,
  getWeekDates,
} from "@/utils/datepicker-util/datepicker-formater-routes";
import Icons from "@/themes/images/icons/icons";
import SkeletonLoader from "../skeleton-loader/skeleton-loader";

export interface DatePickerData {
  startDate: string; // Start date in string format
  endDate: string; // End date in string format
  week: number; // Week number
  label: string; // Label associated with the date range
}

interface DateRangePickerProps {
  weekData: DatePickerData[];
  onDateChange: (startDate: string, endDate: string) => void;
  dateChangeType?: "all" | "pastDue";
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  weekData,
  onDateChange,
  dateChangeType = "all",
}) => {
  const [currentWeek, setCurrentWeek] = useState<number>(
    dateChangeType === "pastDue" ? 0 : weekData.length / 2
  );
  const [disabledWeeks, setDisabledWeeks] = useState<boolean[]>([]);

  useEffect(() => {
    const current = findCurrentWeek(weekData);
    setCurrentWeek(current);
    console.log(currentWeek);
    setDisabledWeeks(getDisabledWeeks(weekData, dateChangeType));

    const { startDate, endDate } = getWeekDates(weekData, current);
    onDateChange(startDate, endDate);
  }, [weekData]);

  const handleWeekChange = (offset: number) => {
    const newWeek = currentWeek + offset;
    if (newWeek >= 0 && newWeek < weekData.length) {
      setCurrentWeek(newWeek);
      const { startDate, endDate } = getWeekDates(weekData, newWeek);
      onDateChange(startDate, endDate);
    }
  };

  if (!weekData || weekData.length === 0)
    return (
      <div>
        <SkeletonLoader
          count={1}
          button={true}
          className={styles.customSkeleton}
          classNameItem={styles.customSkeletonItem}
        />
      </div>
    );

  const { startDate, endDate } = getWeekDates(weekData, currentWeek);

  return (
    <div className={styles.dateRangePicker}>
      <button
        onClick={() => handleWeekChange(-1)}
        className={`${styles.navigationButtonLeft} ${
          currentWeek === 0 ? styles.disabled : ""
        }`}
        disabled={currentWeek === 0}
      >
        {Icons.arrowLeftGrey}
      </button>

      <div className={styles.weekDisplay}>
        {formatDate(startDate)} - {formatDate(endDate)}, {formatYear(endDate)}
      </div>

      <button
        onClick={() => handleWeekChange(1)}
        className={`${styles.navigationButtonRight} ${
          disabledWeeks[currentWeek + 1] ? styles.disabled : ""
        }`}
        disabled={disabledWeeks[currentWeek + 1]}
      >
        {Icons.arrowRightGrey}
      </button>
    </div>
  );
};

export default DateRangePicker;
