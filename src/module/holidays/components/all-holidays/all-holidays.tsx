import React, { useEffect, useState } from "react";
import styles from "./all-holidays.module.scss";
import UseHolidayServices from "../../services/holidays-services";
import MultipleBodytable, {
  BodyData,
} from "@/themes/components/multiple-body-table/multiple-body-table";
import {
  dateStringToMonthDate,
  getWeekdayFromDate,
  toISODateFormatter,
} from "@/utils/date-formatter-util/date-formatter";
import Icons from "@/themes/images/icons/icons";
import { Dropdown } from "antd";
import { Holiday } from "@/interfaces/holidays/holidays";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

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
  const [loading, setLoading] = useState<boolean>(true); // State to track loading state

  /**
   * Dropdown menu items for approve/reject actions.
   */
  const menuItems = [
    { key: "edit", label: "Edit" },
    { key: "delete", label: "Delete" },
  ];

  /**
   * Handles the click on the dropdown menu actions.
   * @param e - Menu event object
   * @param id - Timesheet ID
   */
  const handleMenuClick = (e: { key: string }, id?: string) => {
    if (e.key === "approve") {
      // Function to approve the timesheet
    } else if (e.key === "reject") {
      // Function to reject the timesheet
    }
  };

  /**
   * Fetches all holidays for a given year.
   * @param year - The year to fetch holidays for
   **/
  const fetchHolidays = async (year: string) => {
    const yearInt = parseInt(year, 10);
    const response = await UseHolidayServices().fetchAllHolidays(yearInt);
    const national_holidays = response.data.holidays
      .filter((holiday) => holiday.holiday_type === "National Holiday")
      .flatMap((holiday) => holiday.holidays); // Extract nested holidays array

    const public_holidays = response.data.holidays
      .filter((holiday) => holiday.holiday_type === "Public Holiday")
      .flatMap((holiday) => holiday.holidays); // Extract nested holidays array

    const restricted_holidays = response.data.holidays
      .filter((holiday) => holiday.holiday_type === "Restricted Holiday")
      .flatMap((holiday) => holiday.holidays); // Extract nested holidays array

    const office_holidays = response.data.holidays
      .filter((holiday) => holiday.holiday_type === "Office Shutdown")
      .flatMap((holiday) => holiday.holidays); // Extract nested holidays array

    setNationalHolidays(national_holidays);
    setPublicHolidays(public_holidays);
    setRestrictedHolidays(restricted_holidays);
    setOfficeHolidays(office_holidays);

    setLoading(false);
  };

  // Fetch holidays when the year changes
  useEffect(() => {
    setLoading(true);
    fetchHolidays(year);
  }, [year]);

  // Column definitions for the table
  const columns = [
    { title: "Holiday", key: "holiday", align: "left" as const },
    { title: "Date", key: "date", align: "left" as const },
    { title: "Year", key: "year", align: "left" as const },
    { title: "Day of the Week", key: "dayOfWeek", align: "left" as const },
    { title: "Location", key: "location", align: "left" as const },
    { title: "", key: "action", width: 50, align: "center" as const },
  ];

  /**
   * Constructs the data for each holiday category (National, Public, Restricted, Regional).
   * Each holiday's details are mapped into rows for the table.
   */
  const data: BodyData[] = [
    {
      heading: nationalHolidays.length > 0 && (
        <span className={styles.holidayHeading}>National Holidays</span>
      ),
      rows:
        nationalHolidays.length > 0
          ? nationalHolidays.map((holiday) => ({
              holiday: (
                <span className={styles.dataCell}>{holiday.holiday_name}</span>
              ),
              date: (
                <span className={styles.dataCell}>
                  {dateStringToMonthDate(
                    toISODateFormatter(holiday.start_date)
                  )}
                  {holiday.start_date === holiday.end_date
                    ? ""
                    : ` - ${dateStringToMonthDate(
                        toISODateFormatter(holiday.end_date)
                      )}`}
                </span>
              ),
              year: <span className={styles.dataCell}>{year}</span>,
              dayOfWeek: (
                <span className={styles.dataCell}>
                  {getWeekdayFromDate(holiday.start_date)}
                </span>
              ),
              location: (
                <span className={styles.dataCell}>
                  {holiday.location.length > 1
                    ? holiday.location.map((loc, index) => (
                        <span key={index}>
                          {loc}
                          {index < holiday.location.length - 1 && "/"}
                        </span>
                      ))
                    : holiday.location}
                </span>
              ),
              action: (
                <Dropdown
                  className={styles.dropDown}
                  menu={{
                    items: menuItems,
                    onClick: (e) => handleMenuClick(e, holiday.id),
                  }}
                  trigger={["click"]}
                >
                  <button className={styles.actionButton}>
                    {Icons.threeDots}
                  </button>
                </Dropdown>
              ),
            }))
          : [],
    },
    {
      heading: publicHolidays.length > 0 && (
        <span className={styles.holidayHeading}>Public Holidays</span>
      ),
      rows:
        publicHolidays.length > 0
          ? publicHolidays.map((holiday) => ({
              holiday: (
                <span className={styles.dataCell}>{holiday.holiday_name}</span>
              ),
              date: (
                <span className={styles.dataCell}>
                  {dateStringToMonthDate(
                    toISODateFormatter(holiday.start_date)
                  )}
                  {holiday.start_date === holiday.end_date
                    ? ""
                    : `-${dateStringToMonthDate(
                        toISODateFormatter(holiday.end_date)
                      )}`}
                </span>
              ),
              year: <span className={styles.dataCell}>{year}</span>,
              dayOfWeek: (
                <span className={styles.dataCell}>
                  {getWeekdayFromDate(holiday.start_date)}
                </span>
              ),
              location: (
                <span className={styles.dataCell}>
                  {holiday.location.length > 1
                    ? holiday.location.map((loc, index) => (
                        <span key={index}>
                          {loc}
                          {index < holiday.location.length - 1 && "/"}
                        </span>
                      ))
                    : holiday.location}
                </span>
              ),
              action: (
                <Dropdown
                  className={styles.dropDown}
                  menu={{
                    items: menuItems,
                    onClick: (e) => handleMenuClick(e, holiday.id),
                  }}
                  trigger={["click"]}
                >
                  <button className={styles.actionButton}>
                    {Icons.threeDots}
                  </button>
                </Dropdown>
              ),
            }))
          : [],
    },
    {
      heading: restrictedHolidays.length > 0 && (
        <span className={styles.holidayHeading}>Restricted Holidays</span>
      ),
      rows:
        restrictedHolidays.length > 0
          ? restrictedHolidays.map((holiday) => ({
              holiday: (
                <span className={styles.dataCell}>{holiday.holiday_name}</span>
              ),
              date: (
                <span className={styles.dataCell}>
                  {dateStringToMonthDate(
                    toISODateFormatter(holiday.start_date)
                  )}
                  {holiday.start_date === holiday.end_date
                    ? ""
                    : `-${dateStringToMonthDate(
                        toISODateFormatter(holiday.end_date)
                      )}`}
                </span>
              ),
              year: <span className={styles.dataCell}>{year}</span>,
              dayOfWeek: (
                <span className={styles.dataCell}>
                  {getWeekdayFromDate(holiday.start_date)}
                </span>
              ),
              location: (
                <span className={styles.dataCell}>
                  {holiday.location.length > 1
                    ? holiday.location.map((loc, index) => (
                        <span key={index}>
                          {loc}
                          {index < holiday.location.length - 1 && "/"}
                        </span>
                      ))
                    : holiday.location}
                </span>
              ),
              action: (
                <Dropdown
                  className={styles.dropDown}
                  menu={{
                    items: menuItems,
                    onClick: (e) => handleMenuClick(e, holiday.id),
                  }}
                  trigger={["click"]}
                >
                  <button className={styles.actionButton}>
                    {Icons.threeDots}
                  </button>
                </Dropdown>
              ),
            }))
          : [],
    },
    {
      heading: officeHolidays.length > 0 && (
        <span className={styles.holidayHeading}>Office Shutdown</span>
      ),
      rows:
        officeHolidays.length > 0
          ? officeHolidays.map((holiday) => ({
              holiday: (
                <span className={styles.dataCell}>{holiday.holiday_name}</span>
              ),
              date: (
                <span className={styles.dataCell}>
                  {dateStringToMonthDate(
                    toISODateFormatter(holiday.start_date)
                  )}
                  {holiday.start_date === holiday.end_date
                    ? ""
                    : `-${dateStringToMonthDate(
                        toISODateFormatter(holiday.end_date)
                      )}`}
                </span>
              ),
              year: <span className={styles.dataCell}>{year}</span>,
              dayOfWeek: (
                <span className={styles.dataCell}>
                  {getWeekdayFromDate(holiday.start_date)}
                </span>
              ),
              location: (
                <span className={styles.dataCell}>
                  {holiday.location.length > 1
                    ? holiday.location.map((loc, index) => (
                        <span key={index}>
                          {loc}
                          {index < holiday.location.length - 1 && "/"}
                        </span>
                      ))
                    : holiday.location}
                </span>
              ),
              action: (
                <Dropdown
                  className={styles.dropDown}
                  menu={{
                    items: menuItems,
                    onClick: (e) => handleMenuClick(e, holiday.id),
                  }}
                  trigger={["click"]}
                >
                  <button className={styles.actionButton}>
                    {Icons.threeDots}
                  </button>
                </Dropdown>
              ),
            }))
          : [],
    },
  ].filter((category) => category.rows.length > 0); // Filter out empty categories

  return (
    <>
      {loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <div className={styles.allHolidaysWrapper}>
          {/* Render MultipleBodytable component with columns and data */}
          <MultipleBodytable columns={columns} data={data} />
        </div>
      )}
    </>
  );
};

export default AllHolidays;
