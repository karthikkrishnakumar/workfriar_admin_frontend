/**
 * DateRangePicker Component
 *
 * This component provides a date range picker to navigate through weeks using an API-provided dataset.
 * It displays the current week's date range and allows navigation to previous or next weeks.
 *
 * @component
 * @param {Object} props - The props for the DateRangePicker component.
 * @param {Date} [props.initialStartDate] - (Optional) Initial start date for the date range.
 * @param {Date} [props.initialEndDate] - (Optional) Initial end date for the date range.
 * @param {Function} props.onDateChange - Callback function invoked when the date range changes, passing the start and end dates.
 */

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
import SkeletonLoader from "../skeleton-loader/skeleton-loader";

interface DateRangePickerProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  dashboard?: boolean;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  initialStartDate,
  initialEndDate,
  dashboard = true,
  onDateChange,
}) => {
  // State to track the current week being displayed
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  // State to manage disabled weeks for navigation
  const [disabledWeeks, setDisabledWeeks] = useState<boolean[]>([]);
  // State to store week data fetched from the API
  const [weekData, setWeekData] = useState<
    { start: string; end: string; week: number }[]
  >([]);

  /**
   * useEffect hook to fetch week data on component mount.
   * Initializes week data, current week, and disabled weeks based on the API response.
   */
  useEffect(() => {
    const fetchWeekData = async () => {
      if (dashboard) {
        try {
          const response = await axios.get(
            "/api/dashboard/datepicker-due-data"
          );
          const { DatePickerData } = response.data;
          setWeekData(DatePickerData);
          const current = findCurrentWeek(DatePickerData);
          setCurrentWeek(current);
          setDisabledWeeks(getDisabledWeeks(DatePickerData));
          const { startDate, endDate } = getWeekDates(DatePickerData, current);
          onDateChange(startDate, endDate);
        } catch (error) {
          console.error("Error fetching week data:", error);
        }
      } else {
        try {
          const response = await axios.get("/api/dashboard/datepicker-data");
          const { DatePickerData } = response.data;
          setWeekData(DatePickerData);
          const current = findCurrentWeek(DatePickerData);
          setCurrentWeek(current);
          setDisabledWeeks(getDisabledWeeks(DatePickerData));
          const { startDate, endDate } = getWeekDates(DatePickerData, current);
          onDateChange(startDate, endDate);
        } catch (error) {
          console.error("Error fetching week data:", error);
        }
      }
    };

    fetchWeekData();
  }, []);

  /**
   * Handles changing the week based on an offset.
   * Updates the current week and triggers the onDateChange callback.
   *
   * @param {number} offset - Offset for the week change (e.g., -1 for previous, +1 for next).
   */
  const handleWeekChange = (offset: number) => {
    const newWeek = currentWeek + offset;
    if (newWeek >= 0 && newWeek < weekData.length) {
      setCurrentWeek(newWeek);
      const { startDate, endDate } = getWeekDates(weekData, newWeek);
      onDateChange(startDate, endDate);
    }
  };
  // Render a loading indicator while week data is being fetched
  if (weekData.length === 0)
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

  // Get the current week's start and end dates
  const { startDate, endDate } = getWeekDates(weekData, currentWeek);

  return (
    <div className={styles.dateRangePicker}>
      {/* Left navigation button to navigate to the previous week */}
      <button
        onClick={() => handleWeekChange(-1)}
        className={`${styles.navigationButtonLeft} ${
          currentWeek === 0 ? styles.disabled : ""
        }`}
        disabled={currentWeek === 0}
      >
        {Icons.arrowLeftGrey}
      </button>

      {/* Display the current week's date range */}
      <div className={styles.weekDisplay}>
        {formatDate(startDate)} - {formatDate(endDate)}, {formatYear(endDate)}
      </div>

      {/* Right navigation button to navigate to the next week */}
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
