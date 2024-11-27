import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./date-picker.module.scss";
import {
  findCurrentWeek,
  formatDate,
  formatYear,
  getDisabledWeeks,
  getWeekDates,
} from "@/utils/datepicker-util/datepicker-formater-routes";
import Icons from "@/themes/images/icons/icons";

interface DateRangePickerProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  initialStartDate,
  initialEndDate,
  onDateChange,
}) => {
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [disabledWeeks, setDisabledWeeks] = useState<boolean[]>([]);
  const [weekData, setWeekData] = useState<
    { start: string; end: string; week: number }[]
  >([]);

  useEffect(() => {
    // Fetch week data from the API
    const fetchWeekData = async () => {
      try {
        const response = await axios.get("/api/dashboard/datepicker-data");
        const { DatePickerData } = response.data;
        setWeekData(DatePickerData);

        // Set the current week and disabled weeks based on fetched data
        const current = findCurrentWeek(DatePickerData);
        setCurrentWeek(current);
        setDisabledWeeks(getDisabledWeeks(DatePickerData));

        const { startDate, endDate } = getWeekDates(DatePickerData, current);
        onDateChange(startDate, endDate);
      } catch (error) {
        console.error("Error fetching week data:", error);
      }
    };

    fetchWeekData();
  }, []);

  const handleWeekChange = (offset: number) => {
    const newWeek = currentWeek + offset;
    if (newWeek > 0 && newWeek <= weekData.length) {
      setCurrentWeek(newWeek);

      const { startDate, endDate } = getWeekDates(weekData, newWeek);
      onDateChange(startDate, endDate);
    }
  };

  if (weekData.length === 0) return <div>Loading...</div>;

  const { startDate, endDate } = getWeekDates(weekData, currentWeek);

  return (
    <div className={styles.dateRangePicker}>
      {/* Left navigation button */}
      <button
        onClick={() => handleWeekChange(-1)}
        className={styles.navigationButtonLeft}
        disabled={currentWeek === 1}
      >
        {Icons.arrowLeftGrey}
      </button>

      {/* Display current week */}
      <div className={styles.weekDisplay}>
        {formatDate(startDate)} - {formatDate(endDate)}, {formatYear(endDate)}
      </div>

      {/* Right navigation button */}
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
