import React, { useEffect, useState } from "react";
import styles from "./all-holidays.module.scss";
import { fetchAllHolidays, Holiday } from "../../services/holidays-services";
import MultipleBodytable, {
  BodyData,
} from "@/themes/components/multiple-body-table/multiple-body-table";
import { getWeekdayFromDate } from "@/utils/date-formatter-util/date-formatter";
import Icons from "@/themes/images/icons/icons";

/**
 * The AllHolidays component fetches and displays holidays categorized by National,
 * Public, Restricted, and Regional holidays for a given year. Each holiday is displayed
 * in a table with details like the holiday name, date, year, day of the week, location, and an action button.
 *
 * @param {Object} props - Component props
 * @param {string} props.year - The year to fetch holidays for
 * 
 * @returns {JSX.Element} The rendered AllHolidays component
 */
interface AllHolidaysProps {
  year: string;
}

const AllHolidays: React.FC<AllHolidaysProps> = ({ year }) => {
  const [nationalHolidays, setNationalHolidays] = useState<Holiday[]>([]); // State to store national holidays
  const [publicHolidays, setPublicHolidays] = useState<Holiday[]>([]); // State to store public holidays
  const [restrictedHolidays, setRestrictedHolidays] = useState<Holiday[]>([]); // State to store restricted holidays
  const [officeHolidays, setOfficeHolidays] = useState<Holiday[]>([]); // State to store regional (office) holidays

  // Fetch holidays when the year changes
  useEffect(() => {
    fetchAllHolidays(
      year,
      setNationalHolidays,
      setPublicHolidays,
      setRestrictedHolidays,
      setOfficeHolidays
    );
  }, [year]);

  // Column definitions for the table
  const columns = [
    { title: "Holiday", key: "holiday", align: "left" as "left" },
    { title: "Date", key: "date", align: "left" as "left" },
    { title: "Year", key: "year", align: "left" as "left" },
    { title: "Day of the Week", key: "dayOfWeek", align: "left" as "left" },
    { title: "Location", key: "location", align: "left" as "left" },
    { title: "", key: "action", width: 30, align: "left" as "left" },
  ];

  /**
   * Constructs the data for each holiday category (National, Public, Restricted, Regional).
   * Each holiday's details are mapped into rows for the table.
   */
  const data: BodyData[] = [
    {
      heading: <span className={styles.holidayHeading}>National Holidays</span>,
      rows: nationalHolidays.map((holiday) => {
        return {
          holiday: <span className={styles.dataCell}>{holiday.holiday_name}</span>,
          date: <span className={styles.dataCell}>{holiday.start_date}</span>,
          year: <span className={styles.dataCell}>{holiday.year}</span>,
          dayOfWeek: (
            <span className={styles.dataCell}>
              {getWeekdayFromDate(holiday.start_date)}
            </span>
          ),
          location: (
            <span className={styles.dataCell}>
              {holiday.location.length > 1 ? (
                holiday.location.map((loc, index) => (
                  <span key={index}>
                    {loc}
                    {index < holiday.location.length - 1 && "/"}
                  </span>
                ))
              ) : (
                holiday.location
              )}
            </span>
          ),
          action: <button>{Icons.threeDots}</button>,
        };
      }),
    },
    {
      heading: <span className={styles.holidayHeading}>Public Holidays</span>,
      rows: publicHolidays.map((holiday) => {
        return {
          holiday: <span className={styles.dataCell}>{holiday.holiday_name}</span>,
          date: <span className={styles.dataCell}>{holiday.start_date}</span>,
          year: <span className={styles.dataCell}>{holiday.year}</span>,
          dayOfWeek: (
            <span className={styles.dataCell}>
              {getWeekdayFromDate(holiday.start_date)}
            </span>
          ),
          location: (
            <span className={styles.dataCell}>
              {holiday.location.length > 1 ? (
                holiday.location.map((loc, index) => (
                  <span key={index}>
                    {loc}
                    {index < holiday.location.length - 1 && "/"}
                  </span>
                ))
              ) : (
                holiday.location
              )}
            </span>
          ),
          action: <button>{Icons.threeDots}</button>,
        };
      }),
    },
    {
      heading: <span className={styles.holidayHeading}>Restricted Holidays</span>,
      rows: restrictedHolidays.map((holiday) => {
        return {
          holiday: <span className={styles.dataCell}>{holiday.holiday_name}</span>,
          date: <span className={styles.dataCell}>{holiday.start_date}</span>,
          year: <span className={styles.dataCell}>{holiday.year}</span>,
          dayOfWeek: (
            <span className={styles.dataCell}>
              {getWeekdayFromDate(holiday.start_date)}
            </span>
          ),
          location: (
            <span className={styles.dataCell}>
              {holiday.location.length > 1 ? (
                holiday.location.map((loc, index) => (
                  <span key={index}>
                    {loc}
                    {index < holiday.location.length - 1 && "/"}
                  </span>
                ))
              ) : (
                holiday.location
              )}
            </span>
          ),
          action: <button>{Icons.threeDots}</button>,
        };
      }),
    },
    {
      heading: <span className={styles.holidayHeading}>Regional Holiday</span>,
      rows: officeHolidays.map((holiday) => {
        return {
          holiday: <span className={styles.dataCell}>{holiday.holiday_name}</span>,
          date: <span className={styles.dataCell}>{holiday.start_date}</span>,
          year: <span className={styles.dataCell}>{holiday.year}</span>,
          dayOfWeek: (
            <span className={styles.dataCell}>
              {getWeekdayFromDate(holiday.start_date)}
            </span>
          ),
          location: (
            <span className={styles.dataCell}>
              {holiday.location.length > 1 ? (
                holiday.location.map((loc, index) => (
                  <span key={index}>
                    {loc}
                    {index < holiday.location.length - 1 && "/"}
                  </span>
                ))
              ) : (
                holiday.location
              )}
            </span>
          ),
          action: <button>{Icons.threeDots}</button>,
        };
      }),
    },
  ];

  return (
    <div className={styles.allHolidaysWrapper}>
      {/* Render MultipleBodytable component with columns and data */}
      <MultipleBodytable columns={columns} data={data} />
    </div>
  );
};

export default AllHolidays;
