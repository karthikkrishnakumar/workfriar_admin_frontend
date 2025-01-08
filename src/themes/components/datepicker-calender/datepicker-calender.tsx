import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datepicker-calender.module.scss";
import { enUS } from "date-fns/locale";
import { Locale } from "date-fns";
import Icons from "@/themes/images/icons/icons";

const customLocale: Locale = {
  ...enUS,
  localize: {
    ...enUS.localize,
    day: (n: number) => ["S", "M", "T", "W", "T", "F", "S"][n],
  } as Locale["localize"],
};

registerLocale("custom", customLocale);

type SingleCalendarRangePickerProps = {
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (dates: [Date | null, Date | null]) => void;
};

const SingleCalendarRangePicker: React.FC<SingleCalendarRangePickerProps> = ({
  startDate: initialStartDate = null,
  endDate: initialEndDate = null,
  onDateChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (onDateChange) {
      onDateChange(dates); // Notify the parent component
    }
  };

  const dayStyles = (date: Date) => {
    const isStartDate = startDate && moment(date).isSame(startDate, "day");
    const isEndDate = endDate && moment(date).isSame(endDate, "day");
    const isInRange =
      startDate &&
      endDate &&
      moment(date).isBetween(startDate, endDate, "day", "[]");

    if (isStartDate || isEndDate) return "start-end-day";
    if (isInRange) return "in-range-day";
    return "";
  };

  const renderCustomHeader = ({
    date,
    changeYear,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: {
    date: Date;
    changeYear: (year: number) => void;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
  }) => (
    <div className={styles.customHeader}>
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className={styles.arrowLeftButton}
      >
        {Icons.arrowRightDark}
      </button>
      <div className={styles.monthWithYear}>
        <span className={styles.currentMonth}>{moment(date).format("MMMM")}</span>
        <div className={styles.yearControl}>
          <span className={styles.currentYear}>{moment(date).format("YYYY")}</span>
          <div className={styles.yearButtons}>
            <button
              onClick={() => changeYear(moment(date).year() + 1)}
              className={styles.yearArrowUpButton}
            >
              {Icons.arrowDownFilled}
            </button>
            <button
              onClick={() => changeYear(moment(date).year() - 1)}
              className={styles.yearArrowDownButton}
            >
              {Icons.arrowDownFilled}
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className={styles.arrowRightButton}
      >
        {Icons.arrowRightDark}
      </button>
    </div>
  );

  return (
    <div className={styles.calendarWrapper}>
      <DatePicker
        selected={startDate}
        startDate={startDate!}
        endDate={endDate!}
        onChange={handleDateChange}
        selectsRange
        inline
        locale="custom"
        dayClassName={(date) => dayStyles(date)}
        renderCustomHeader={renderCustomHeader}
      />
      <style>
        {`
            /* Remove gaps and borders around date cells */
            .react-datepicker__day {
              margin:5px 0px ; /* Remove spacing between cells */
              padding: 0px; /* Adjust padding for uniform look */
              border: none; /* Remove borders for smooth transitions */
            }
            .react-datepicker {
              border: none !important;
              margin: 0; /* Remove outer calendar margin */
              box-shadow: none !important; /* Remove box-shadow for a clean look */
              padding:0px;
              width:100%;
            }
            .react-datepicker__header {
              padding-top:0px;
              border-bottom:0px solid #aeaeae;
            }
            .react-datepicker__month {
              margin:0px
            }
            .react-datepicker__current-month{
              height:35px;
              display:flex;
              align-items:center;
              justify-content:center;
              background-color:white;
              font-size:12px;
              font-weight:400;
            }
            .react-datepicker__day{
              padding: 1px 16px;
              display: inline-grid;
              align-items: center;
              justify-content: center;
              margin:3px 0px;
            }
            .react-datepicker__day--selected,
            .react-datepicker__day--in-selecting-range,
            .react-datepicker__day--in-range {
              border-radius: 0; /* Ensure no gaps by removing rounded corners */
            }
            .react-datepicker__day--selected{
              border-bottom-left-radius:5px;
              border-top-left-radius:5px;
            }
            .react-datepicker__day--in-selecting-range {
              background-color: var(--primary-golden-color-light) !important;
              color:var(--black)
            }
            .start-end-day {
              background-color: var(--primary-golden-color-medium) !important;
              color: #fff !important;
            }
            .react-datepicker__day--range-end{
              border-bottom-right-radius:5px;
              border-top-right-radius:5px;
            }
            .in-range-day {
              background-color: var(--primary-golden-color-light) !important;
              color: #000 !important;
            }
            .start-end-day:hover,
            .in-range-day:hover {
              background-color: var(--primary-golden-color-medium) !important; 
              color: #000 !important;
            }
            .react-datepicker {
              margin: 0; /* Remove outer calendar margin */
            }
            .react-datepicker__day:hover {
              background-color:var(--primary-golden-color-medium)  !important; 
              color: #000 !important;
            }
            .react-datepicker__day--outside-month{
              color:grey;
            }
          `}
      </style>
    </div>
  );
};

export default SingleCalendarRangePicker;
