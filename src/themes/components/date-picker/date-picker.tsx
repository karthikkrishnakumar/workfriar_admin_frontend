"use client";

import React, { useState } from "react";
import styles from "./date-picker.module.scss";
import Icons from "@/themes/images/icons/icons";

interface DateRangePickerProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  initialStartDate,
  initialEndDate,
  onDateChange,
}) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  // Calculate the week range based on the offset
  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4);

    return { startOfWeek, endOfWeek };
  };

  // Format the date as "Oct 14"
  const formatDate = (date: Date) =>
    `${months[date.getMonth()]} ${date.getDate()}`;

  const handleWeekChange = (offset: number) => {
    const newWeek = currentWeek + offset;
    setCurrentWeek(newWeek);

    const { startOfWeek, endOfWeek } = getWeekDates(newWeek);
    onDateChange(startOfWeek, endOfWeek);
  };

  // Get the current week's dates(with conditional, get date from props?)
  const { startOfWeek, endOfWeek } =
    initialStartDate && initialEndDate
      ? { startOfWeek: initialStartDate, endOfWeek: initialEndDate }
      : getWeekDates(currentWeek);

  return (
    <div className={styles.dateRangePicker}>
      {/* left navigationButton */}
      <button
        onClick={() => handleWeekChange(-1)}
        className={styles.navigationButtonLeft}
      >
        {Icons.arrowRightDark}
      </button>

      {/* date range */}
      <div className={styles.weekDisplay}>
        {`${formatDate(startOfWeek)} - ${formatDate(
          endOfWeek
        )}, ${startOfWeek.getFullYear()}`}
      </div>

      {/* right navigationButton */}
      <button
        onClick={() => handleWeekChange(1)}
        className={styles.navigationButtonRight}
      >
        {Icons.arrowRightDark}
      </button>
    </div>
  );
};

export default DateRangePicker;
