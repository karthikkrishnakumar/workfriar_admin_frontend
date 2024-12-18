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
  label: string; // Label associated with the date range
}

interface DateRangePickerProps {
  weekData: DatePickerData[] | null | undefined;
  onDateChange: (startDate: string, endDate: string) => void;
  dateChangeType?: "all" | "pastDue";
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  weekData,
  onDateChange,
  dateChangeType = "all",
}) => {
  const [currentWeek, setCurrentWeek] = useState<number | null>(
    dateChangeType === "pastDue" && weekData
      ? 0
      : Math.floor((weekData?.length ?? 0) / 2)
  );
  const [disabledWeeks, setDisabledWeeks] = useState<boolean[]>([]);

  useEffect(() => {
    if (!weekData || weekData.length === 0) return;

    const current = findCurrentWeek(weekData);
    setCurrentWeek(current);

    const disabled = getDisabledWeeks(weekData, dateChangeType);
    setDisabledWeeks(disabled || []);

    const weekDates = getWeekDates(weekData, current);
    if (weekDates?.startDate && weekDates?.endDate) {
      onDateChange(weekDates.startDate, weekDates.endDate);
    }
  }, [weekData]);

  const handleWeekChange = (offset: number) => {
    if (currentWeek === null || !weekData) return;

    const newWeek = currentWeek + offset;
    if (newWeek >= 0 && newWeek < weekData.length) {
      setCurrentWeek(newWeek);
      const weekDates = getWeekDates(weekData, newWeek);
      if (weekDates?.startDate && weekDates?.endDate) {
        onDateChange(weekDates.startDate, weekDates.endDate);
      }
    }
  };

  if (currentWeek === null) {
    return <div className={styles.nullState}>No data available</div>;
  }

  const weekDates = getWeekDates(weekData, currentWeek);

  if (!weekDates?.startDate || !weekDates?.endDate) {
    return <div className={styles.nullState}> </div>;
  }

  const { startDate, endDate } = weekDates;

  if (!weekData || weekData.length === 0) {
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
  }

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
