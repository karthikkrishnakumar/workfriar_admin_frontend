import React, { useEffect, useState } from "react";
import styles from "./date-picker.module.scss";
import Icons from "@/themes/images/icons/icons";
import { formatDate ,formatYear } from "@/utils/datepicker-util/datepicker-formater-routes";

interface DateRangePickerProps {
  range: string; // The range in "YYYY-MM-DD-YYYY-MM-DD" format
  onDateChange: (data: {
    startDate: string;
    endDate: string;
    prev: boolean;
    next: boolean;
  }) => void;
  isPrev?: boolean; // True if the previous button should be disabled
  isNext?: boolean; // True if the next button should be disabled
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  range,
  onDateChange,
  isPrev=false,
  isNext=false,
}) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Parse and set the initial range
  useEffect(() => {
    const rangePattern = /^\d{4}-\d{2}-\d{2}-\d{4}-\d{2}-\d{2}$/;

    if (!rangePattern.test(range)) {
      console.error("Invalid range format. Expected 'YYYY-MM-DD-YYYY-MM-DD'");
      return;
    }

    const parts = range.split("-");
    const start = parts.slice(0, 3).join("-"); // First part of the range
    const end = parts.slice(3, 6).join("-"); // Second part of the range

    setStartDate(start);
    setEndDate(end);
  }, [range]);

  // Handle navigation (Previous or Next)
  const handleNavigation = (isPrev: boolean) => {
    if (startDate && endDate) {
      onDateChange({
        startDate,
        endDate,
        prev: isPrev,
        next: !isPrev,
      });
    }
  };

  return (
    <div className={styles.dateRangePicker}>
      {/* Previous Week Button */}
      <button
        onClick={() => handleNavigation(true)} // Previous
        className={styles.navigationButtonLeft}
        disabled={isPrev} // Disable if isPrev is true
      >
        {Icons.arrowLeftGrey}
      </button>

      {/* Display the Date Range */}
      <div className={styles.weekDisplay}>
        {startDate && endDate ? (
          <>
            {formatDate(startDate)} - {formatDate(endDate)},{" "}
            {formatYear(endDate)}
          </>
        ) : (
          "Loading..."
        )}
      </div>

      {/* Next Week Button */}
      <button
        onClick={() => handleNavigation(false)} // Next
        className={styles.navigationButtonRight}
        disabled={isNext} // Disable if isNext is true
      >
        {Icons.arrowRightGrey}
      </button>
    </div>
  );
};

export default DateRangePicker;
