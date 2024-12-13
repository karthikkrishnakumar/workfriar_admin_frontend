import React, { useEffect, useState } from "react";
import styles from "./all-holidays.module.scss";
import { fetchAllHolidays, Holiday } from "../../services/holidays-services";
import MultipleBodytable, { BodyData } from "@/themes/components/multiple-body-table/multiple-body-table";

interface AllHolidaysProps {
  year: string;
}
const AllHolidays: React.FC<AllHolidaysProps> = ({ year }) => {
  const [nationalHolidays, setNationalHolidays] = useState<Holiday[]>([]);
  const [publicHolidays, setPublicHolidays] = useState<Holiday[]>([]);
  const [restrictedHolidays, setRestrictedHolidays] = useState<Holiday[]>([]);
  const [officeHolidays, setOfficeHolidays] = useState<Holiday[]>([]);
  useEffect(() => {
    fetchAllHolidays(
      year,
      setNationalHolidays,
      setPublicHolidays,
      setRestrictedHolidays,
      setOfficeHolidays
    );
  }, [year]);

  const columns = [
    { title: "Holiday", key: "holiday", align: "left" as "left" },
    { title: "Date", key: "date", align: "center" as "center" },
    { title: "Year", key: "year", align: "center" as "center" },
    { title: "Day of the Week", key: "dayOfWeek", align: "center" as "center" },
    { title: "Location", key: "location", align: "left" as "left" },
  ];

  const data: BodyData[] = [
    {
      heading: "National Holiday",
      rows: (nationalHolidays.map((holiday)=>{
        return {
          holiday: holiday.holiday_name,
          date: holiday.start_date,
          year: holiday.year,
          dayOfWeek: holiday.end_date,
          location: holiday.location
        }
      }))
    },
    {
      heading: "Public holiday",
      rows: (publicHolidays.map((holiday)=>{
        return {
          holiday: holiday.holiday_name,
          date: holiday.start_date,
          year: holiday.year,
          dayOfWeek: holiday.end_date,
          location: holiday.location
        }
      }))
    },
    {
      heading: "Upcoming Holidays",
      rows: (restrictedHolidays.map((holiday)=>{
        return {
          holiday: holiday.holiday_name,
          date: holiday.start_date,
          year: holiday.year,
          dayOfWeek: holiday.end_date,
          location: holiday.location
        }
      }))
    },
    {
      heading: "Regional Holidays",
      rows: (officeHolidays.map((holiday)=>{
        return {
          holiday: holiday.holiday_name,
          date: holiday.start_date,
          year: holiday.year,
          dayOfWeek: holiday.end_date,
          location: holiday.location
        }
      }))
    },
  ];

  return (
    <div className={styles.allHolidaysWrapper}>
      <MultipleBodytable columns={columns} data={data} />
    </div>
  );
};

export default AllHolidays;
