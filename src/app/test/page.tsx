"use client";
import EmployeeCard from "@/module/approval-center/components/employee-list-tab/employee-list/employee-card/employee-card";
import MultipleBodyTable, { BodyData } from "@/themes/components/multiple-body-table/multiple-body-table";
import React, { useRef, useState } from "react";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

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
      rows: [
        {
          holiday: "New Year's Day",
          date: "2024-01-01",
          year: 2024,
          dayOfWeek: "Monday",
          location: "Worldwide",
        },
        {
          holiday: "Christmas Day",
          date: "2024-12-25",
          year: 2024,
          dayOfWeek: "Wednesday",
          location: "Worldwide",
        },
      ],
    },
    {
      heading: "Public holiday",
      rows: [
        {
          holiday: "New Year's Day",
          date: "2024-01-01",
          year: 2024,
          dayOfWeek: "Monday",
          location: "Worldwide",
        },
        {
          holiday: "Christmas Day",
          date: "2024-12-25",
          year: 2024,
          dayOfWeek: "Wednesday",
          location: "Worldwide",
        },
      ],
    },
    {
      heading: "Upcoming Holidays",
      rows: [
        {
          holiday: "New Year's Day",
          date: "2024-01-01",
          year: 2024,
          dayOfWeek: "Monday",
          location: "Worldwide",
        },
        {
          holiday: "Christmas Day",
          date: "2024-12-25",
          year: 2024,
          dayOfWeek: "Wednesday",
          location: "Worldwide",
        },
      ],
    },
    {
      heading: "Regional Holidays",
      rows: [
        {
          holiday: "Diwali",
          date: "2024-11-12",
          year: 2024,
          dayOfWeek: "Tuesday",
          location: "India",
        },
      ],
    },
  ];

  return (
    <div ref={parentRef} style={{ margin: "100px" }}>
      <MultipleBodyTable columns={columns} data={data} className="custom-table" />
    </div>
  );
}
