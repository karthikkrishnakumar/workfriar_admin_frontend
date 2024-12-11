"use client ";

import React, { useEffect, useState } from "react";
import useTimeSheetServices from "../../services/timesheet-report/timesheet-report-services"; // Adjust the path if needed
import CustomTable from "@/themes/components/custom-table/custom-table"; // Adjust the path if needed
import CustomAvatar from "@/themes/components/avatar/avatar";
import styles from "./timesheet-report.module.scss";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

const TimesheetReport = ({ activeTab }: { activeTab: string }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  // Define params for each tab with exclude fields
  const params: Record<string, { exclude: string[] }> = {
    "project-summary": { exclude: ["employeeName", "dateRange"] },
    "project-details": { exclude: ["employeeName"] },
    "employee-summary": { exclude: ["dateRange"] },
    "employee-details": { exclude: [] },
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch data for the active tab
      const result = await useTimeSheetServices().fetchTimeSheetReportData(activeTab);

      const formattedData = result.map((item: any) => ({
        projectName: (
          <div className={styles.projectCell}>
            <CustomAvatar name={item.project_name} size={50} />
            <div className={styles.projectName}>{item.project_name}</div>
          </div>
        ),
        employeeName: (
          <div className={styles.employeeNameCell}>{item.employee_name}</div>
        ),
        year: <div className={styles.yearCell}>{item.year}</div>,
        month: <div className={styles.monthCell}>{item.month}</div>,
        dateRange: (
          <div className={styles.dateRangeCell}>{item.date_range}</div>
        ),
        loggedHours: (
          <div className={styles.loggedHoursCell}>{item.logged_hours}</div>
        ),
        approvedHours: (
          <div className={styles.approvedHoursCell}>{item.approved_hours}</div>
        ),
      }));

      setData(formattedData);
    } catch (error) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when activeTab changes
  }, [activeTab]);

  // Define the full set of columns
  const columns = [
    {
      title: "Project",
      key: "projectName",
      align: "left" as const,
      width: 180,
    },
    {
      title: "Employee Name",
      key: "employeeName",
      align: "left" as const,
    },
    { title: "Year", key: "year", align: "left" as const },
    { title: "Month", key: "month", align: "left" as const },
    { title: "Period", key: "dateRange", align: "left" as const, width: 280 },
    { title: "Time Logged", key: "loggedHours", align: "left" as const },
    {
      title: "Time Approved",
      key: "approvedHours",
      align: "left" as const,
      width: 120,
    },
  ];

  // Get the exclude fields for the active tab
  const excludeFields = params[activeTab]?.exclude || [];

  // Filter columns based on excludeFields
  const filteredColumns = columns.filter(
    (column) => !excludeFields.includes(column.key)
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.timeSheetTable}>
      {loading ? (
        <div>
          <SkeletonLoader count={3} paragraph={{ rows: 5 }} />
        </div> // Display loading state
      ) : (
        <div className={styles.tableWrapper}>
          <CustomTable columns={filteredColumns} data={data} />
        </div>
      )}
    </div>
  );
};

export default TimesheetReport;
