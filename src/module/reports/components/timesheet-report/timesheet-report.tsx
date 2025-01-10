"use client ";

import React, { ReactNode, useEffect, useState } from "react";
import UseTimeSheetServices from "../../services/timesheet-report/timesheet-report-services"; // Adjust the path if needed
import CustomTable from "@/themes/components/custom-table/custom-table"; // Adjust the path if needed
import CustomAvatar from "@/themes/components/avatar/avatar";
import styles from "./timesheet-report.module.scss";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import PaginationComponent from "@/themes/components/pagination-button/pagination-button";
import { TimesheetReportsList } from "@/interfaces/reports/timesheet-report/timesheet-repot";

interface FormattedData {
  projectName: ReactNode;
  employeeName: ReactNode;
  year: ReactNode;
  month: ReactNode;
  dateRange: ReactNode;
  loggedHours: ReactNode;
  approvedHours: ReactNode;
  [key: string]: string | number | boolean | ReactNode | undefined;
}

const TimesheetReport = ({
  activeTab,
  filters,
}: {
  activeTab: string;
  filters: {
    startDate?: string;
    endDate?: string;
    projectIds?: string[];
    userIds?: string[];
    year?: string;
    month?: string;
  };
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FormattedData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalRecords, setTotalRecords] = useState(0); // Total records for pagination
  const pageSize = 5; // Number of rows per page

  // Define params for each tab with exclude fields
  const params: Record<string, { exclude: string[] }> = {
    project_summary: { exclude: ["employeeName", "dateRange"] },
    project_detail: { exclude: ["employeeName"] },
    employee_summary: { exclude: ["dateRange"] },
    employee_detail: { exclude: [] },
  };
  const { startDate, endDate, projectIds, userIds, year, month } = filters;

  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch data for the active tab
      const result = await UseTimeSheetServices().fetchTimeSheetReportData(
        activeTab,
        page,
        pageSize,
        startDate,
        endDate,
        projectIds,
        userIds,
        year,
        month
      );

      const formattedData = result.data.map((item: TimesheetReportsList) => ({
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
          <div className={styles.loggedHoursCell}>{item.logged_hours} hrs</div>
        ),
        approvedHours: (
          <div className={styles.approvedHoursCell}>
            {item.approved_hours} hrs
          </div>
        ),
      }));

      setData(formattedData);
      setTotalRecords(result.total);
    } catch (error) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage); // Fetch data when activeTab changes
  }, [
    activeTab,
    currentPage,
    startDate,
    endDate,
    projectIds,
    userIds,
    year,
    month,
  ]);

  // Define the full set of columns
  const columns = [
    {
      title: "Project",
      key: "projectName",
      align: "left" as const,
      width: 200,
    },
    {
      title: "Employee Name",
      key: "employeeName",
      align: "left" as const,
      width: 190,
    },
    { title: "Year", key: "year", align: "left" as const },
    { title: "Month", key: "month", align: "left" as const },
    { title: "Period", key: "dateRange", align: "left" as const, width: 220 },
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page
  };

  return (
    <>
      <div className={styles.timeSheetTable}>
        {loading ? (
          <div>
            <SkeletonLoader count={3} paragraph={{ rows: 3 }} />
          </div> // Display loading state
        ) : (
          <div className={styles.tableWrapper}>
            <CustomTable columns={filteredColumns} data={data} />
          </div>
        )}
      </div>
      <div className={styles.paginationDiv}>
        <PaginationComponent
          className={styles.pagination}
          total={totalRecords}
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          // style={{ textAlign: "right", marginTop: "20px" }}
          loading={loading}
        />
      </div>
    </>
  );
};

export default TimesheetReport;
